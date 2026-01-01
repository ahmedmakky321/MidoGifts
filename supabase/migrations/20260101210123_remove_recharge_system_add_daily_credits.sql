/*
  # Remove Recharge System and Implement Daily Credits

  1. Changes
    - Drop recharge_links table (no longer needed)
    - Drop recharge_redemptions table (no longer needed)
    - Add last_reset_date column to users table
    - Set default credits to 100 for daily reset system
  
  2. New Daily Credits System
    - Each user gets 100 credits per day automatically
    - Credits reset based on calendar day
    - No manual recharge needed
    - No admin involvement required
  
  3. Notes
    - This is a simplified system for better stability
    - Donation support message will be shown in UI
    - No external payment integration needed
*/

-- Drop recharge system tables
DROP TABLE IF EXISTS recharge_redemptions CASCADE;
DROP TABLE IF EXISTS recharge_links CASCADE;

-- Add last_reset_date column to users table if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'last_reset_date'
  ) THEN
    ALTER TABLE users ADD COLUMN last_reset_date date DEFAULT CURRENT_DATE;
  END IF;
END $$;

-- Update all users to have 100 credits and today's reset date
UPDATE users 
SET credits = 100, 
    last_reset_date = CURRENT_DATE
WHERE last_reset_date IS NULL OR last_reset_date < CURRENT_DATE;

-- Ensure credits column has a default of 100
ALTER TABLE users ALTER COLUMN credits SET DEFAULT 100;