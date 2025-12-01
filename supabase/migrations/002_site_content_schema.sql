-- Site Settings Table - Company-wide configuration
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL DEFAULT 'Your Company',
  company_tagline TEXT,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#2563eb',
  secondary_color TEXT DEFAULT '#1e40af',
  contact_email TEXT,
  contact_phone TEXT,
  contact_address TEXT,
  social_facebook TEXT,
  social_twitter TEXT,
  social_linkedin TEXT,
  social_instagram TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = '00000000-0000-0000-0000-000000000000'::uuid)
);

-- Insert default settings (using a fixed UUID to ensure only one row)
INSERT INTO site_settings (id, company_name) 
VALUES ('00000000-0000-0000-0000-000000000000'::uuid, 'NAMCO')
ON CONFLICT (id) DO NOTHING;

-- Hero Section Table
CREATE TABLE IF NOT EXISTS hero_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  primary_cta_text TEXT,
  primary_cta_link TEXT,
  secondary_cta_text TEXT,
  secondary_cta_link TEXT,
  background_image_url TEXT,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- About Section Table
CREATE TABLE IF NOT EXISTS about_section (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  image_url TEXT,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services Table
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT, -- Can be emoji, icon name, or image URL
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Portfolio Items Table
CREATE TABLE IF NOT EXISTS portfolio_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  project_url TEXT,
  category TEXT,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote TEXT NOT NULL,
  author_name TEXT NOT NULL,
  author_role TEXT,
  author_company TEXT,
  author_image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Navigation Items Table
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  section_id TEXT NOT NULL, -- e.g., 'hero', 'about', 'services'
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Footer Content Table
CREATE TABLE IF NOT EXISTS footer_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  section_type TEXT NOT NULL, -- 'about', 'links', 'contact'
  title TEXT,
  content TEXT,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_hero_section_enabled ON hero_section(enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_about_section_enabled ON about_section(enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_services_enabled ON services(enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_enabled ON portfolio_items(enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_testimonials_enabled ON testimonials(enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_navigation_items_enabled ON navigation_items(enabled, display_order);
CREATE INDEX IF NOT EXISTS idx_footer_content_enabled ON footer_content(enabled, display_order);

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_section_updated_at
  BEFORE UPDATE ON hero_section
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_section_updated_at
  BEFORE UPDATE ON about_section
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_navigation_items_updated_at
  BEFORE UPDATE ON navigation_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_footer_content_updated_at
  BEFORE UPDATE ON footer_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE about_section ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Anyone can read enabled/public content
CREATE POLICY "Anyone can read site settings"
  ON site_settings FOR SELECT USING (true);

CREATE POLICY "Anyone can read enabled hero sections"
  ON hero_section FOR SELECT USING (enabled = true);

CREATE POLICY "Anyone can read enabled about sections"
  ON about_section FOR SELECT USING (enabled = true);

CREATE POLICY "Anyone can read enabled services"
  ON services FOR SELECT USING (enabled = true);

CREATE POLICY "Anyone can read enabled portfolio items"
  ON portfolio_items FOR SELECT USING (enabled = true);

CREATE POLICY "Anyone can read enabled testimonials"
  ON testimonials FOR SELECT USING (enabled = true);

CREATE POLICY "Anyone can read enabled navigation items"
  ON navigation_items FOR SELECT USING (enabled = true);

CREATE POLICY "Anyone can read enabled footer content"
  ON footer_content FOR SELECT USING (enabled = true);

-- Authenticated users can manage content (for admin interface later)
CREATE POLICY "Authenticated users can manage site settings"
  ON site_settings FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage hero sections"
  ON hero_section FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage about sections"
  ON about_section FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage services"
  ON services FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage portfolio items"
  ON portfolio_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage navigation items"
  ON navigation_items FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage footer content"
  ON footer_content FOR ALL USING (auth.role() = 'authenticated');

