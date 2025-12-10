-- Add subtitle alignment field to hero_section
ALTER TABLE hero_section 
ADD COLUMN IF NOT EXISTS subtitle_alignment TEXT DEFAULT 'center';

COMMENT ON COLUMN hero_section.subtitle_alignment IS 'Text alignment for subtitle: center, left, or justify';

