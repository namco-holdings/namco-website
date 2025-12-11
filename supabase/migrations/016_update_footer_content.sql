-- Update existing footer content to change the about section content
UPDATE footer_content 
SET content = 'Value for All.',
    updated_at = NOW()
WHERE section_type = 'about' 
  AND content = 'Building modern, responsive websites that make a difference.';

-- If no footer content exists, insert it
INSERT INTO footer_content (section_type, title, content, enabled, display_order)
VALUES ('about', 'NAMCO', 'Value for All.', true, 0)
ON CONFLICT DO NOTHING;

