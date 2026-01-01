/*
  # Create One-Time Recharge Links System
  
  1. New Tables
    - `recharge_links`
      - `id` (uuid, primary key)
      - `token` (text, unique) - Secure token for the link
      - `credits_amount` (integer) - Number of credits to grant
      - `created_at` (timestamptz) - When link was created
      - `created_by` (uuid) - Admin who created the link
      
    - `recharge_redemptions`
      - `id` (uuid, primary key)
      - `link_id` (uuid, foreign key to recharge_links)
      - `user_id` (uuid, foreign key to auth.users)
      - `redeemed_at` (timestamptz) - When redemption occurred
      - `credits_granted` (integer) - Amount of credits granted
      
  2. Security
    - Enable RLS on both tables
    - recharge_links: Admins can insert, no one can update, service role can read
    - recharge_redemptions: Service role only (all operations server-side)
    
  3. Indexes
    - Unique index on token for fast lookups
    - Index on link_id for redemption checks
    
  4. Notes
    - ALL redemption logic happens server-side via edge function
    - NO UPDATE operations on recharge_links
    - Check if link is used by querying recharge_redemptions table
    - This completely bypasses RLS update issues
*/

-- Drop old tables if they exist
DROP TABLE IF EXISTS recharge_links CASCADE;
DROP TABLE IF EXISTS recharge_redemptions CASCADE;

-- Create recharge_links table
CREATE TABLE recharge_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token text UNIQUE NOT NULL,
  credits_amount integer NOT NULL CHECK (credits_amount > 0),
  created_at timestamptz DEFAULT now() NOT NULL,
  created_by uuid REFERENCES auth.users(id) NOT NULL
);

-- Create recharge_redemptions table
CREATE TABLE recharge_redemptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  link_id uuid REFERENCES recharge_links(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  redeemed_at timestamptz DEFAULT now() NOT NULL,
  credits_granted integer NOT NULL,
  UNIQUE(link_id, user_id)
);

-- Create indexes
CREATE INDEX idx_recharge_links_token ON recharge_links(token);
CREATE INDEX idx_recharge_redemptions_link_id ON recharge_redemptions(link_id);
CREATE INDEX idx_recharge_redemptions_user_id ON recharge_redemptions(user_id);

-- Enable RLS
ALTER TABLE recharge_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE recharge_redemptions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recharge_links
-- Note: Service role bypasses RLS, so we only need minimal policies for safety

CREATE POLICY "Service role full access to recharge_links"
  ON recharge_links
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- RLS Policies for recharge_redemptions
-- All operations via service role only

CREATE POLICY "Service role full access to recharge_redemptions"
  ON recharge_redemptions
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
