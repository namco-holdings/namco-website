-- Add header background color to site_settings
ALTER TABLE site_settings 
ADD COLUMN IF NOT EXISTS header_background_color TEXT DEFAULT '#ffffff',
ADD COLUMN IF NOT EXISTS header_text_color TEXT DEFAULT '#171717';



