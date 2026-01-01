/*
  # Create Recharge Links Table

  1. New Tables
    - `recharge_links`
      - `id` (uuid, primary key) - Unique identifier
      - `token` (text, unique) - Secure random token for the link
      - `credits` (integer) - Amount of credits to add
      - `status` (text) - Status of link: 'unused' or 'used'
      - `used_by` (uuid, nullable, foreign key to users.id) - User who redeemed the link
      - `used_at` (timestamptz, nullable) - When the link was redeemed
      - `created_at` (timestamptz) - When the link was created
      - `created_by` (text) - Admin who created the link

  2. Security
    - Enable RLS on `recharge_links` table
    - Policy for authenticated users to read unused links by token (for redemption)
    - Policy for authenticated users to update unused links they are redeeming

  3. Important Notes
    - Tokens must be long, random, and unguessable (generated client-side using crypto)
    - Each link can only be used once (enforced by status check and atomic update)
    - Status check prevents double-use even with concurrent requests
*/

CREATE TABLE IF NOT EXISTS recharge_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  credits integer NOT NULL CHECK (credits > 0),
  status text NOT NULL DEFAULT 'unused' CHECK (status IN ('unused', 'used')),
  used_by uuid REFERENCES users(id),
  used_at timestamptz,
  created_at timestamptz DEFAULT now(),
  created_by text NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_recharge_links_token ON recharge_links(token);
CREATE INDEX IF NOT EXISTS idx_recharge_links_status ON recharge_links(status);

ALTER TABLE recharge_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read unused links by token"
  ON recharge_links
  FOR SELECT
  TO authenticated
  USING (status = 'unused');

CREATE POLICY "Users can update unused links when redeeming"
  ON recharge_links
  FOR UPDATE
  TO authenticated
  USING (status = 'unused')
  WITH CHECK (status = 'used' AND used_by = auth.uid());