-- Add content font size field to about_section
ALTER TABLE about_section 
ADD COLUMN IF NOT EXISTS content_font_size TEXT DEFAULT NULL;

COMMENT ON COLUMN about_section.content_font_size IS 'Font size for the content text (e.g., "16px", "1rem", "1.2em")';

