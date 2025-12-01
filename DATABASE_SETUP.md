# Database Setup Guide

This website is fully database-driven, making it reusable for any company. All content is stored in Supabase and can be managed through the database.

## Database Schema Overview

### Core Tables

1. **site_settings** - Company-wide configuration (single row)
   - Company name, tagline, logo
   - Contact information
   - Social media links
   - Brand colors

2. **hero_section** - Landing/hero section content
   - Title, subtitle
   - Call-to-action buttons
   - Background image

3. **about_section** - About us section
   - Title, subtitle, content
   - Image

4. **services** - Services/features offered
   - Title, description, icon
   - Display order

5. **portfolio_items** - Portfolio/projects showcase
   - Title, description, image
   - Project URL, category

6. **testimonials** - Client testimonials
   - Quote, author info
   - Rating (1-5 stars)

7. **navigation_items** - Navigation menu items
   - Label, section ID
   - Display order

8. **footer_content** - Footer sections
   - About, links, contact sections

9. **blog_posts** - Blog content (for future CMS)
10. **news_articles** - News content (for future CMS)

## Setting Up Your Company

### Step 1: Run Migrations

1. Go to your Supabase project SQL Editor
2. Run migrations in order:
   - `supabase/migrations/001_initial_schema.sql` (blog/news tables)
   - `supabase/migrations/002_site_content_schema.sql` (main content tables)
   - `supabase/migrations/003_seed_default_content.sql` (default content)

### Step 2: Update Site Settings

Update the `site_settings` table (there's only one row):

```sql
UPDATE site_settings
SET 
  company_name = 'Your Company Name',
  company_tagline = 'Your tagline here',
  contact_email = 'info@yourcompany.com',
  contact_phone = '(555) 123-4567',
  contact_address = '123 Main St, City, State 12345',
  primary_color = '#2563eb',
  secondary_color = '#1e40af',
  social_facebook = 'https://facebook.com/yourcompany',
  social_twitter = 'https://twitter.com/yourcompany',
  social_linkedin = 'https://linkedin.com/company/yourcompany',
  social_instagram = 'https://instagram.com/yourcompany'
WHERE id = '00000000-0000-0000-0000-000000000000';
```

### Step 3: Customize Content

#### Update Hero Section

```sql
UPDATE hero_section
SET 
  title = 'Welcome to Your Company',
  subtitle = 'Your compelling tagline here',
  primary_cta_text = 'Get Started',
  primary_cta_link = '#contact',
  secondary_cta_text = 'Learn More',
  secondary_cta_link = '#about'
WHERE enabled = true
LIMIT 1;
```

#### Update About Section

```sql
UPDATE about_section
SET 
  title = 'About Us',
  subtitle = 'Your subtitle',
  content = 'Your company story and mission...',
  image_url = 'https://your-image-url.com/image.jpg'
WHERE enabled = true
LIMIT 1;
```

#### Add/Update Services

```sql
-- Update existing service
UPDATE services
SET 
  title = 'Your Service',
  description = 'Service description',
  icon = '🎯'  -- Emoji or icon identifier
WHERE id = 'service-id';

-- Add new service
INSERT INTO services (title, description, icon, enabled, display_order)
VALUES ('New Service', 'Description', '✨', true, 6);
```

#### Add Portfolio Items

```sql
INSERT INTO portfolio_items (title, description, image_url, project_url, enabled, display_order)
VALUES (
  'Project Name',
  'Project description',
  'https://image-url.com/project.jpg',
  'https://project-url.com',
  true,
  0
);
```

#### Add Testimonials

```sql
INSERT INTO testimonials (quote, author_name, author_role, author_company, rating, enabled, display_order)
VALUES (
  'Great service!',
  'John Doe',
  'CEO',
  'Company Name',
  5,
  true,
  0
);
```

### Step 4: Customize Navigation

```sql
-- Update navigation items
UPDATE navigation_items
SET label = 'Home', section_id = 'hero'
WHERE id = 'nav-item-id';

-- Add custom navigation item
INSERT INTO navigation_items (label, section_id, enabled, display_order)
VALUES ('Blog', 'blog', true, 6);
```

### Step 5: Customize Footer

```sql
-- Update footer content
UPDATE footer_content
SET 
  title = 'Your Company',
  content = 'Your company description'
WHERE section_type = 'about';
```

## Managing Content

### Enable/Disable Sections

You can hide sections by setting `enabled = false`:

```sql
-- Hide a service
UPDATE services SET enabled = false WHERE id = 'service-id';

-- Hide a portfolio item
UPDATE portfolio_items SET enabled = false WHERE id = 'item-id';
```

### Reorder Content

Use `display_order` to control the order:

```sql
-- Reorder services
UPDATE services SET display_order = 0 WHERE id = 'service-1';
UPDATE services SET display_order = 1 WHERE id = 'service-2';
```

## Future: Admin Interface

An admin interface can be built to manage all this content through a UI instead of SQL queries. The database structure is ready for this.

## Tips

1. **Images**: Store images in Supabase Storage or use external URLs
2. **Icons**: Use emojis for quick setup, or implement an icon library later
3. **Content**: Use HTML in text fields for rich formatting
4. **Testing**: Test changes locally before deploying
5. **Backup**: Export your database before major changes

## Default Content

The seed migration (`003_seed_default_content.sql`) provides example content that you can customize. All default content is enabled and ready to use.

