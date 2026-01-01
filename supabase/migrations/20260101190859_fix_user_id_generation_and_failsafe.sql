/*
  # Fix User ID Generation and Add Failsafe

  1. Purpose
    - Ensure every user gets a unique User ID
    - Fix trigger to handle all cases (new users and existing users)
    - Add failsafe to generate missing User IDs
  
  2. Changes
    - Update trigger function to ALWAYS ensure user_id exists
    - Add function to generate user_id for any user missing it
    - Handle ON CONFLICT to update user_id if missing
  
  3. Failsafe
    - If user_id is NULL after trigger, generate immediately
    - Works for both new signups and existing users
*/

-- Ensure generate_unique_user_id function exists
CREATE OR REPLACE FUNCTION generate_unique_user_id()
RETURNS text AS $$
DECLARE
  new_id text;
  id_exists boolean;
BEGIN
  LOOP
    -- Generate random 6-character alphanumeric string
    new_id := 'MG-' || upper(substring(md5(random()::text || clock_timestamp()::text) from 1 for 6));
    
    -- Check if ID already exists
    SELECT EXISTS(SELECT 1 FROM users WHERE user_id = new_id) INTO id_exists;
    
    -- Exit loop if ID is unique
    EXIT WHEN NOT id_exists;
  END LOOP;
  
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Update trigger function with better conflict handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert new user into public.users table with generated user_id
  INSERT INTO public.users (id, email, display_name, user_id, created_at, last_login_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', ''),
    generate_unique_user_id(),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    last_login_at = NOW(),
    user_id = COALESCE(users.user_id, generate_unique_user_id()),
    email = COALESCE(EXCLUDED.email, users.email),
    display_name = COALESCE(EXCLUDED.display_name, users.display_name);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to ensure user has user_id (failsafe)
CREATE OR REPLACE FUNCTION ensure_user_has_user_id(p_user_id uuid)
RETURNS text AS $$
DECLARE
  v_user_id text;
BEGIN
  -- Get current user_id
  SELECT user_id INTO v_user_id FROM users WHERE id = p_user_id;
  
  -- If user_id is NULL, generate and update
  IF v_user_id IS NULL THEN
    v_user_id := generate_unique_user_id();
    UPDATE users SET user_id = v_user_id WHERE id = p_user_id;
  END IF;
  
  RETURN v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update any existing users without user_id
UPDATE users
SET user_id = generate_unique_user_id()
WHERE user_id IS NULL OR user_id = '';

-- Ensure user_id is NOT NULL (add constraint if not exists)
DO $$
BEGIN
  -- First ensure all existing users have a user_id
  UPDATE users SET user_id = generate_unique_user_id() WHERE user_id IS NULL;
  
  -- Then add NOT NULL constraint if not exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'users' 
    AND column_name = 'user_id' 
    AND is_nullable = 'YES'
  ) THEN
    ALTER TABLE users ALTER COLUMN user_id SET NOT NULL;
  END IF;
END $$;