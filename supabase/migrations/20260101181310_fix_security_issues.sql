/*
  # Fix Security Issues

  1. RLS Performance Optimization
    - Fix RLS policies on `users` table to use `(select auth.uid())` instead of `auth.uid()`
    - This prevents re-evaluation of auth.uid() for each row, improving query performance at scale
    - Policies affected:
      - "Users can view own profile" (SELECT)
      - "Users can update own profile" (UPDATE)

  2. Remove Unused Indexes
    - Drop unused indexes to reduce storage overhead and improve write performance:
      - `idx_gift_interactions_gift_id` on gift_interactions
      - `idx_usage_limits_user_id` on usage_limits
      - `idx_usage_limits_device` on usage_limits
      - `idx_analytics_daily_date` on analytics_daily
      - `gifts_user_id_idx` on gifts
      - `gifts_created_at_idx` on gifts

  3. Security Notes
    - RLS remains enabled on all tables
    - All security restrictions are maintained
    - Only performance and storage optimization applied
*/

-- ============================================
-- Part 1: Fix RLS Performance on Users Table
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Recreate policies with optimized auth.uid() calls
CREATE POLICY "Users can view own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = id)
  WITH CHECK ((select auth.uid()) = id);

-- ============================================
-- Part 2: Drop Unused Indexes
-- ============================================

-- Drop unused indexes on gift_interactions
DROP INDEX IF EXISTS idx_gift_interactions_gift_id;

-- Drop unused indexes on usage_limits
DROP INDEX IF EXISTS idx_usage_limits_user_id;
DROP INDEX IF EXISTS idx_usage_limits_device;

-- Drop unused indexes on analytics_daily
DROP INDEX IF EXISTS idx_analytics_daily_date;

-- Drop unused indexes on gifts
DROP INDEX IF EXISTS gifts_user_id_idx;
DROP INDEX IF EXISTS gifts_created_at_idx;
