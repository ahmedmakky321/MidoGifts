/*
  # Add user_id column to gifts table
  
  ## Description
  Adds optional user_id column to track which user created each gift. This enables:
  - Daily usage limits per user
  - Different limits for guests vs authenticated users
  - User gift history tracking
  
  ## Changes
  
  ### Modified Tables
  - `gifts` table
    - Added `user_id` (uuid, optional, foreign key to auth.users)
    - Indexed for performance on usage queries
  
  ## Security
  - No RLS policy changes needed
  - Column is optional to support both guest and authenticated users
  - Foreign key constraint ensures data integrity
  
  ## Notes
  - Existing gifts will have NULL user_id (guest gifts)
  - New gifts can be created with or without user_id
*/

-- Add user_id column to gifts table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'gifts' AND column_name = 'user_id'
  ) THEN
    ALTER TABLE gifts ADD COLUMN user_id uuid REFERENCES auth.users(id);
    CREATE INDEX IF NOT EXISTS gifts_user_id_idx ON gifts(user_id);
    CREATE INDEX IF NOT EXISTS gifts_created_at_idx ON gifts(created_at);
  END IF;
END $$;
