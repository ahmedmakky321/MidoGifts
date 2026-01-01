/*
  # Add Unique User ID System

  1. Changes
    - Add `user_id` column to users table
    - User ID format: MG-XXXXXX (where X is alphanumeric)
    - User ID is unique, permanent, and visible to users
    - Used for admin credit recharge instead of email
  
  2. Implementation
    - Add user_id column with unique constraint
    - Create function to generate unique user IDs
    - Update trigger to generate user_id at registration
  
  3. Purpose
    - Replace email-based credit recharge with ID-based system
    - Provide consistent identifier across all signup methods
    - Enable easy copy-paste for credit recharge requests
*/

-- Add user_id column to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE users ADD COLUMN user_id text UNIQUE;
  END IF;
END $$;

-- Create function to generate unique user ID
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

-- Update trigger function to include user_id generation
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
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generate user_ids for existing users who don't have one
UPDATE users
SET user_id = generate_unique_user_id()
WHERE user_id IS NULL;

-- Make user_id NOT NULL after populating existing records
ALTER TABLE users ALTER COLUMN user_id SET NOT NULL;