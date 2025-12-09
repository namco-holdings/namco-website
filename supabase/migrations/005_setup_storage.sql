-- Create storage buckets for file uploads
-- These buckets will store images and other media files

-- Create images bucket for general images (logos, favicons, portfolio, etc.)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'images',
  'images',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/x-icon']
)
ON CONFLICT (id) DO NOTHING;

-- Create content bucket for blog/news images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'content',
  'content',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for images bucket
-- Anyone can read public images
CREATE POLICY "Public images are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Authenticated users can upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Users can update their own uploads
CREATE POLICY "Users can update their own images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Users can delete their own uploads
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'images' 
  AND auth.role() = 'authenticated'
);

-- Storage policies for content bucket
-- Anyone can read public content
CREATE POLICY "Public content is viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'content');

-- Authenticated users can upload content
CREATE POLICY "Authenticated users can upload content"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'content' 
  AND auth.role() = 'authenticated'
);

-- Users can update their own content
CREATE POLICY "Users can update their own content"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'content' 
  AND auth.role() = 'authenticated'
);

-- Users can delete their own content
CREATE POLICY "Users can delete their own content"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'content' 
  AND auth.role() = 'authenticated'
);



