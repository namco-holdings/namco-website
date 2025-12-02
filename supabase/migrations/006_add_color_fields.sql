-- Add additional color fields to site_settings for full theme customization

ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS background_color TEXT DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS background_color_dark TEXT DEFAULT '#0a0a0a',
ADD COLUMN IF NOT EXISTS text_color TEXT DEFAULT '#171717',
ADD COLUMN IF NOT EXISTS text_color_dark TEXT DEFAULT '#ededed',
ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#2563eb',
ADD COLUMN IF NOT EXISTS accent_color_hover TEXT DEFAULT '#1e40af',
ADD COLUMN IF NOT EXISTS border_color TEXT DEFAULT '#e5e7eb',
ADD COLUMN IF NOT EXISTS border_color_dark TEXT DEFAULT '#374151';

