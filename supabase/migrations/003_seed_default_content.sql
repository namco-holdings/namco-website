-- Seed default content for a new site
-- This provides example content that can be customized

-- Default Hero Section
INSERT INTO hero_section (title, subtitle, primary_cta_text, primary_cta_link, secondary_cta_text, secondary_cta_link, enabled, display_order)
VALUES (
  'Welcome to NAMCO',
  'We create exceptional digital experiences that drive results and inspire innovation.',
  'Get Started',
  '#contact',
  'Learn More',
  '#about',
  true,
  0
) ON CONFLICT DO NOTHING;

-- Default About Section
INSERT INTO about_section (title, subtitle, content, enabled, display_order)
VALUES (
  'About Us',
  'Learn more about who we are and what we stand for',
  'NAMCO was founded with a vision to transform the digital landscape. We combine creativity, technology, and strategic thinking to deliver solutions that exceed expectations. Our team of experts is passionate about creating meaningful experiences that connect brands with their audiences in powerful ways.',
  true,
  0
) ON CONFLICT DO NOTHING;

-- Default Services
INSERT INTO services (title, description, icon, enabled, display_order) VALUES
('Web Development', 'Custom websites built with modern technologies and best practices.', '🌐', true, 0),
('UI/UX Design', 'Beautiful, intuitive designs that users love and engage with.', '🎨', true, 1),
('Digital Strategy', 'Data-driven strategies to grow your online presence and reach.', '📊', true, 2),
('Branding', 'Complete brand identity solutions that tell your unique story.', '✨', true, 3),
('E-commerce', 'Full-featured online stores that convert visitors into customers.', '🛒', true, 4),
('Consulting', 'Expert guidance to help you make the right digital decisions.', '💡', true, 5)
ON CONFLICT DO NOTHING;

-- Default Portfolio Items (placeholder)
INSERT INTO portfolio_items (title, description, enabled, display_order) VALUES
('Project 1', 'Brief description of the project and its impact.', true, 0),
('Project 2', 'Brief description of the project and its impact.', true, 1),
('Project 3', 'Brief description of the project and its impact.', true, 2),
('Project 4', 'Brief description of the project and its impact.', true, 3),
('Project 5', 'Brief description of the project and its impact.', true, 4),
('Project 6', 'Brief description of the project and its impact.', true, 5)
ON CONFLICT DO NOTHING;

-- Default Testimonials
INSERT INTO testimonials (quote, author_name, author_role, author_company, rating, enabled, display_order) VALUES
('NAMCO transformed our online presence completely. The results exceeded our expectations!', 'Jane Smith', 'CEO', 'Company A', 5, true, 0),
('Professional, creative, and reliable. Working with NAMCO was a game-changer for our business.', 'John Doe', 'Founder', 'Company B', 5, true, 1),
('Outstanding service and attention to detail. Highly recommend NAMCO to anyone looking for quality.', 'Sarah Johnson', 'Marketing Director', 'Company C', 5, true, 2)
ON CONFLICT DO NOTHING;

-- Default Navigation Items
INSERT INTO navigation_items (label, section_id, enabled, display_order) VALUES
('Home', 'hero', true, 0),
('About', 'about', true, 1),
('Services', 'services', true, 2),
('Portfolio', 'portfolio', true, 3),
('Testimonials', 'testimonials', true, 4),
('Contact', 'contact', true, 5)
ON CONFLICT DO NOTHING;

-- Default Footer Content
INSERT INTO footer_content (section_type, title, content, enabled, display_order) VALUES
('about', 'NAMCO', 'Building modern, responsive websites that make a difference.', true, 0),
('links', 'Quick Links', NULL, true, 1),
('contact', 'Contact', NULL, true, 2)
ON CONFLICT DO NOTHING;

