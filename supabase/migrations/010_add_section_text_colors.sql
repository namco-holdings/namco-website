-- Add text color fields to hero_section
ALTER TABLE hero_section 
ADD COLUMN IF NOT EXISTS title_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS subtitle_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS primary_cta_text_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS primary_cta_bg_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS secondary_cta_text_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS secondary_cta_bg_color TEXT DEFAULT NULL;

-- Add text color fields to about_section
ALTER TABLE about_section 
ADD COLUMN IF NOT EXISTS title_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS subtitle_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS content_color TEXT DEFAULT NULL;

-- Add text color fields to services
ALTER TABLE services 
ADD COLUMN IF NOT EXISTS title_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_color TEXT DEFAULT NULL;

-- Add text color fields to portfolio_items
ALTER TABLE portfolio_items 
ADD COLUMN IF NOT EXISTS title_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS description_color TEXT DEFAULT NULL;

-- Add text color fields to testimonials
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS quote_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS author_name_color TEXT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS author_role_color TEXT DEFAULT NULL;



