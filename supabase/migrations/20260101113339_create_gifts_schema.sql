/*
  # MidoGifts Database Schema

  ## Overview
  Creates the core database structure for the MidoGifts application, which allows users to create and share virtual greeting gifts without authentication.

  ## New Tables
  
  ### `gifts`
  Stores all created greeting gifts with their content and metadata.
  
  - `id` (uuid, primary key) - Unique identifier for each gift
  - `occasion` (text, required) - Type of occasion (birthday, eid, christmas, etc.)
  - `message` (text, required) - Personal message from the sender
  - `sender_name` (text, optional) - Name of the person sending the gift
  - `image_url` (text, optional) - URL to uploaded image in storage
  - `created_at` (timestamptz) - Timestamp when gift was created
  
  ## Security
  
  ### Row Level Security (RLS)
  - RLS is enabled on the `gifts` table
  - Public read access: Anyone can view any gift (needed for sharing links)
  - Public insert access: Anyone can create a new gift (no auth required)
  - No update or delete: Gifts are immutable once created
  
  ## Storage
  
  ### `gift-images` bucket
  - Public bucket for storing uploaded gift images
  - Anyone can upload (insert)
  - Anyone can view (select) 
  - No updates or deletes allowed
  
  ## Notes
  - No authentication required - anonymous gift creation and viewing
  - Gifts are permanent and cannot be edited or deleted
  - Simple, focused schema for MVP functionality
*/

-- Create gifts table
CREATE TABLE IF NOT EXISTS gifts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  occasion text NOT NULL,
  message text NOT NULL,
  sender_name text DEFAULT '',
  image_url text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to view gifts (needed for sharing)
CREATE POLICY "Anyone can view gifts"
  ON gifts
  FOR SELECT
  USING (true);

-- Allow anyone to create gifts (no auth required)
CREATE POLICY "Anyone can create gifts"
  ON gifts
  FOR INSERT
  WITH CHECK (true);

-- Create storage bucket for gift images
INSERT INTO storage.buckets (id, name, public)
VALUES ('gift-images', 'gift-images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view images
CREATE POLICY "Anyone can view gift images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'gift-images');

-- Allow anyone to upload images
CREATE POLICY "Anyone can upload gift images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'gift-images');