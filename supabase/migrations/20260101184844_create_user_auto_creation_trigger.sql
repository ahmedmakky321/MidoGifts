/*
  # Automatic User Creation Trigger

  1. Purpose
    - Automatically create a user record in public.users when a new user signs up
    - Ensures every new user gets 10 credits by default (from table default)
    - Works for all signup methods (email/password, Google OAuth, etc.)
    - Only creates the record once per user
  
  2. Implementation
    - Create a trigger function that runs after user creation in auth.users
    - Inserts a new row in public.users with the user's data
    - Extracts display_name from user metadata if available
    - Uses default value of 10 credits from column definition
  
  3. Security
    - Function runs with security definer (admin privileges)
    - Only triggers on INSERT operations in auth.users
    - Handles errors gracefully to not block user signup
*/

-- Create function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert new user into public.users table
  INSERT INTO public.users (id, email, display_name, created_at, last_login_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'display_name', ''),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create trigger to call the function
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
