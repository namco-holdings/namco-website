-- Add overlay controls for background images
-- This allows controlling opacity and color of overlays on background images

-- Add overlay fields to hero_section
ALTER TABLE hero_section 
ADD COLUMN IF NOT EXISTS background_overlay_color TEXT DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS background_overlay_opacity NUMERIC(3,2) DEFAULT 0 CHECK (background_overlay_opacity >= 0 AND background_overlay_opacity <= 1);

-- Add overlay fields to about_section (for future use)
ALTER TABLE about_section 
ADD COLUMN IF NOT EXISTS image_overlay_color TEXT DEFAULT '#000000',
ADD COLUMN IF NOT EXISTS image_overlay_opacity NUMERIC(3,2) DEFAULT 0.0 CHECK (image_overlay_opacity >= 0 AND image_overlay_opacity <= 1);

