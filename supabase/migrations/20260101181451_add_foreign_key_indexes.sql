/*
  # Add Indexes for Foreign Keys

  1. Performance Optimization
    - Add covering indexes for foreign keys to improve query performance
    - Foreign keys without indexes can cause performance issues during:
      - JOIN operations
      - CASCADE operations (UPDATE/DELETE)
      - Foreign key constraint checks

  2. New Indexes
    - `idx_gift_interactions_gift_id` on gift_interactions(gift_id)
      - Covers foreign key: gift_interactions_gift_id_fkey
      - Improves JOIN performance with gifts table
      - Speeds up CASCADE operations
    
    - `idx_gifts_user_id` on gifts(user_id)
      - Covers foreign key: gifts_user_id_fkey
      - Improves JOIN performance with users table
      - Essential for user-based queries (e.g., "show all gifts by user")
      - Speeds up CASCADE operations

  3. Notes
    - Indexes are created with IF NOT EXISTS to ensure idempotency
    - Using btree index type (default) which is optimal for equality and range queries
*/

-- Add index for gift_interactions.gift_id foreign key
CREATE INDEX IF NOT EXISTS idx_gift_interactions_gift_id 
ON gift_interactions(gift_id);

-- Add index for gifts.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_gifts_user_id 
ON gifts(user_id);
