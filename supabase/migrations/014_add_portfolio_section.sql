-- Create portfolio_section table for section-level settings
CREATE TABLE IF NOT EXISTS portfolio_section (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_name TEXT DEFAULT 'Portfolio',
  title TEXT DEFAULT 'Our Portfolio',
  subtitle TEXT DEFAULT NULL,
  title_color TEXT DEFAULT NULL,
  subtitle_color TEXT DEFAULT NULL,
  enabled BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default portfolio section
INSERT INTO portfolio_section (id, section_name, title, subtitle, enabled, display_order)
VALUES (
  gen_random_uuid(),
  'Portfolio',
  'Our Portfolio',
  'Showcasing our best work and successful projects',
  true,
  0
)
ON CONFLICT DO NOTHING;

-- Add RLS policies
ALTER TABLE portfolio_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view enabled portfolio sections"
  ON portfolio_section FOR SELECT
  USING (enabled = true);

CREATE POLICY "Authenticated users can manage portfolio sections"
  ON portfolio_section FOR ALL
  USING (auth.role() = 'authenticated');

COMMENT ON TABLE portfolio_section IS 'Section-level settings for the portfolio section, including title and subtitle';

