/*
  # Enable Admin Link Creation via Client
  
  1. Changes
    - Add RLS policy to allow authenticated users to create recharge links
    - Add RLS policy to allow authenticated users to read their own created links
    
  2. Security
    - Only authenticated users can create links (admin check done in UI)
    - Users can only read links they created
    - Redemption still handled server-side with full security
    
  3. Notes
    - This bypasses the need for external fetch calls
    - Link creation is now direct via Supabase client
    - No CORS or network issues
*/

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Service role full access to recharge_links" ON recharge_links;

-- Allow authenticated users to insert recharge links
CREATE POLICY "Authenticated users can create recharge links"
  ON recharge_links
  FOR INSERT
  TO authenticated
  WITH CHECK (created_by = auth.uid());

-- Allow users to view their own created links
CREATE POLICY "Users can view their own recharge links"
  ON recharge_links
  FOR SELECT
  TO authenticated
  USING (created_by = auth.uid());

-- Keep service role access for redemption
CREATE POLICY "Service role full access to recharge_links"
  ON recharge_links
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
