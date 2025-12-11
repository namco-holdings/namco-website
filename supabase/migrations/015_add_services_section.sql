-- Create services_section table for section-level settings
CREATE TABLE IF NOT EXISTS services_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT DEFAULT 'Services',
  title TEXT DEFAULT 'Our Services',
  subtitle TEXT DEFAULT NULL,
  title_color TEXT DEFAULT NULL,
  subtitle_color TEXT DEFAULT NULL,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default services section
INSERT INTO services_section (id, section_name, title, subtitle, enabled, display_order)
VALUES (
  gen_random_uuid(),
  'Services',
  'Our Services',
  'Comprehensive solutions tailored to your needs',
  true,
  0
)
ON CONFLICT DO NOTHING;

-- Add RLS policies
ALTER TABLE services_section ENABLE ROW LEVEL SECURITY;

-- Drop policies if they exist, then recreate them
DROP POLICY IF EXISTS "Anyone can view enabled services sections" ON services_section;
DROP POLICY IF EXISTS "Authenticated users can manage services sections" ON services_section;

CREATE POLICY "Anyone can view enabled services sections"
  ON services_section FOR SELECT
  USING (enabled = true);

CREATE POLICY "Authenticated users can manage services sections"
  ON services_section FOR ALL
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE services_section IS 'Section-level settings for the services section, including title and subtitle';

