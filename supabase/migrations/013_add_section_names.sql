-- Add section_name field to all section tables
ALTER TABLE hero_section 
ADD COLUMN IF NOT EXISTS section_name TEXT DEFAULT NULL;

ALTER TABLE about_section 
ADD COLUMN IF NOT EXISTS section_name TEXT DEFAULT NULL;

ALTER TABLE services 
ADD COLUMN IF NOT EXISTS section_name TEXT DEFAULT NULL;

ALTER TABLE portfolio_items 
ADD COLUMN IF NOT EXISTS section_name TEXT DEFAULT NULL;

ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS section_name TEXT DEFAULT NULL;

-- Update navigation_items to use section_name from the actual section
-- We'll handle this in the application layer, but add a comment
COMMENT ON COLUMN hero_section.section_name IS 'Custom name for this section (e.g., "Welcome", "Introduction"). Used in navigation if section is included.';
COMMENT ON COLUMN about_section.section_name IS 'Custom name for this section (e.g., "About Us", "Our Story"). Used in navigation if section is included.';
COMMENT ON COLUMN services.section_name IS 'Custom name for this section (e.g., "Services", "What We Offer"). Used in navigation if section is included.';
COMMENT ON COLUMN portfolio_items.section_name IS 'Custom name for this section (e.g., "Portfolio", "Our Work"). Used in navigation if section is included.';
COMMENT ON COLUMN testimonials.section_name IS 'Custom name for this section (e.g., "Testimonials", "What Clients Say"). Used in navigation if section is included.';

-- Set default section names based on type if they're null
UPDATE hero_section SET section_name = 'Home' WHERE section_name IS NULL;
UPDATE about_section SET section_name = 'About' WHERE section_name IS NULL;
UPDATE services SET section_name = 'Services' WHERE section_name IS NULL;
UPDATE portfolio_items SET section_name = 'Portfolio' WHERE section_name IS NULL;
UPDATE testimonials SET section_name = 'Testimonials' WHERE section_name IS NULL;

