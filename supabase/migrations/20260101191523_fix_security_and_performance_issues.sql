/*
  # Fix Security and Performance Issues

  1. Purpose
    - Optimize RLS policy performance for credits_history table
    - Remove unused indexes to reduce database overhead
    - Secure function search paths to prevent injection attacks
  
  2. RLS Policy Optimization
    - Replace `auth.uid()` with `(select auth.uid())` in credits_history policy
    - This prevents re-evaluation for each row, improving query performance
  
  3. Index Cleanup
    - Drop unused indexes that are not being utilized by queries
    - Reduces storage and maintenance overhead
  
  4. Function Security
    - Set explicit search_path on functions to prevent search_path injection
    - Use 'pg_catalog, public' for security
*/

-- Fix RLS policy performance for credits_history table
DROP POLICY IF EXISTS "Users can view own credit history" ON credits_history;

CREATE POLICY "Users can view own credit history"
  ON credits_history
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Drop unused indexes to reduce overhead
DROP INDEX IF EXISTS idx_gift_interactions_gift_id;
DROP INDEX IF EXISTS idx_gifts_user_id;
DROP INDEX IF EXISTS idx_credits_history_user_id;
DROP INDEX IF EXISTS idx_credits_history_created_at;

-- Fix function search paths for security
ALTER FUNCTION generate_unique_user_id() SET search_path = pg_catalog, public;
ALTER FUNCTION handle_new_user() SET search_path = pg_catalog, public;
ALTER FUNCTION ensure_user_has_user_id(uuid) SET search_path = pg_catalog, public;