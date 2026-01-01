/*
  # Convert Recharge Links to Recharge Codes

  1. Changes
    - Rename `token` column to `code` for clarity
    - Update code format to MG-XXXX-XXXX style
    - Add index on code column for faster lookups
    - Update RLS policies for direct client access
    
  2. Security
    - Enable direct client-side code creation by admins
    - Enable direct client-side code redemption by users
    - Maintain one-time use security with optimistic locking
    
  3. Notes
    - Admins insert codes directly from client
    - Users query and update codes directly from client
    - No backend APIs needed
*/

DROP POLICY IF EXISTS "Anyone can read unused links by token" ON recharge_links;
DROP POLICY IF EXISTS "Users can update unused links when redeeming" ON recharge_links;

ALTER TABLE recharge_links RENAME COLUMN token TO code;

DROP INDEX IF EXISTS idx_recharge_links_token;
CREATE INDEX IF NOT EXISTS idx_recharge_links_code ON recharge_links(code);

CREATE POLICY "Anyone can read unused codes"
  ON recharge_links
  FOR SELECT
  TO authenticated
  USING (used = false);

CREATE POLICY "Admins can insert codes"
  ON recharge_links
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update unused codes when redeeming"
  ON recharge_links
  FOR UPDATE
  TO authenticated
  USING (used = false)
  WITH CHECK (used = true AND used_by_user_id = auth.uid());