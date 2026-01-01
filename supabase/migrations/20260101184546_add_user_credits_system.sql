/*
  # Add Credits System to Users

  1. Changes
    - Add `credits` column to users table
      - Stores the available credits for each user
      - Default value: 10 (free credits for new users)
      - Allows admin to recharge user credits
    
    - Add `credits_history` table for tracking credit usage
      - Tracks all credit additions and deductions
      - Includes reason, amount, and admin_id for auditing
      - Helps with transparency and debugging
  
  2. Security
    - Enable RLS on credits_history table
    - Only admins can view credit history
    - Users can view their own credit history
  
  3. Indexes
    - Add index on credits_history(user_id) for efficient queries
    - Add index on credits_history(created_at) for time-based queries
*/

-- Add credits column to users table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'credits'
  ) THEN
    ALTER TABLE users ADD COLUMN credits integer DEFAULT 10 NOT NULL;
  END IF;
END $$;

-- Create credits_history table for audit trail
CREATE TABLE IF NOT EXISTS credits_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount integer NOT NULL,
  balance_after integer NOT NULL,
  reason text NOT NULL,
  admin_email text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE credits_history ENABLE ROW LEVEL SECURITY;

-- Policies for credits_history
CREATE POLICY "Users can view own credit history"
  ON credits_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Service role can manage all credit history"
  ON credits_history
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_credits_history_user_id 
ON credits_history(user_id);

CREATE INDEX IF NOT EXISTS idx_credits_history_created_at 
ON credits_history(created_at DESC);
