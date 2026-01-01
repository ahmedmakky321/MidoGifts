/*
  # Fix Recharge Links Table Schema

  1. Changes
    - Drop existing policies that depend on status column
    - Replace `status` text field with `used` boolean field
    - Rename `used_by` to `used_by_user_id` for clarity
    - Remove `created_by` field (not needed)
    - Recreate policies with new schema
    
  2. Data Migration
    - Convert existing 'unused' status to false
    - Convert existing 'used' status to true
    
  3. Security
    - Create RLS policies using new `used` boolean field
    - Maintain one-time use security guarantee
*/

DROP POLICY IF EXISTS "Anyone can read unused links by token" ON recharge_links;
DROP POLICY IF EXISTS "Users can update unused links when redeeming" ON recharge_links;

DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'recharge_links' AND column_name = 'status'
  ) THEN
    ALTER TABLE recharge_links ADD COLUMN IF NOT EXISTS used boolean DEFAULT false;
    
    UPDATE recharge_links SET used = false WHERE status = 'unused';
    UPDATE recharge_links SET used = true WHERE status = 'used';
    
    ALTER TABLE recharge_links DROP COLUMN status;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'recharge_links' AND column_name = 'used_by'
  ) THEN
    ALTER TABLE recharge_links RENAME COLUMN used_by TO used_by_user_id;
  END IF;
  
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'recharge_links' AND column_name = 'created_by'
  ) THEN
    ALTER TABLE recharge_links DROP COLUMN created_by;
  END IF;
END $$;

DROP INDEX IF EXISTS idx_recharge_links_status;
CREATE INDEX IF NOT EXISTS idx_recharge_links_used ON recharge_links(used);

CREATE POLICY "Anyone can read unused links by token"
  ON recharge_links
  FOR SELECT
  TO authenticated
  USING (used = false);

CREATE POLICY "Users can update unused links when redeeming"
  ON recharge_links
  FOR UPDATE
  TO authenticated
  USING (used = false)
  WITH CHECK (used = true AND used_by_user_id = auth.uid());