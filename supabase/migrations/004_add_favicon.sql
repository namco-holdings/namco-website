-- Add favicon_url to site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS favicon_url TEXT;

