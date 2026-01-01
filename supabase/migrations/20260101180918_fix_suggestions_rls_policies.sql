/*
  # Fix Suggestions RLS Policies

  1. Changes
    - Drop restrictive SELECT policy that only allows users to see their own suggestions
    - Add new policy allowing anyone to view all suggestions (needed for admin dashboard)
    - Keep existing INSERT policy allowing anyone to create suggestions

  2. Security
    - Public read access for suggestions (safe as suggestions are just feature requests)
    - Public write access for suggestions (already exists)
    - Suggestions remain with RLS enabled
*/

-- Drop the restrictive SELECT policy
DROP POLICY IF EXISTS "Users can view own suggestions" ON suggestions;

-- Allow anyone to view all suggestions (needed for admin dashboard)
CREATE POLICY "Anyone can view suggestions"
  ON suggestions
  FOR SELECT
  USING (true);
