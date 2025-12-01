# Admin Console Guide

The admin console provides a complete interface for managing your website content without needing to edit the database directly.

## Accessing the Admin Console

1. Navigate to `/login`
2. Sign in with an admin account
3. You'll be redirected to `/admin`

**Note:** To create an admin user, set the user's `user_metadata.role` to `'admin'` in Supabase.

## Admin Sections

### 1. Company Profile (`/admin`)

Manage all company-wide settings:

- **Basic Information**
  - Company name
  - Company tagline
  - Logo URL
  - Favicon URL (with preview)

- **Brand Colors**
  - Primary color (with color picker)
  - Secondary color (with color picker)

- **Contact Information**
  - Email
  - Phone
  - Address

- **Social Media**
  - Facebook
  - Twitter
  - LinkedIn
  - Instagram

All changes are saved immediately and reflected on the website.

### 2. Section Management (`/admin/sections`)

Manage all website sections with tabs for:

- **Hero Section** - Landing page content
- **About Section** - About us content
- **Services** - Services/features offered
- **Portfolio** - Portfolio items
- **Testimonials** - Client testimonials

For each section, you can:

- **Add New** - Create new sections
- **Edit** - Modify existing sections
- **Toggle Navigation** - Add/remove from top navigation
- **Toggle Enabled** - Show/hide on website
- **Delete** - Remove sections

**Navigation Control:**
- Check "In Nav" to add a section to the top navigation
- Uncheck to remove from navigation
- Navigation items are automatically created/removed

### 3. News Management (`/admin/news`)

Manage news articles:

- **Create New Article**
  - Title (required)
  - Slug (URL-friendly identifier)
  - Excerpt (optional summary)
  - Content (full article content)
  - Published status

- **Edit Articles**
  - Update any article fields
  - Change published status

- **Publish/Unpublish**
  - Toggle published status
  - Published articles appear on the website
  - Drafts are hidden

- **Delete Articles**
  - Remove articles permanently

**Note:** News articles can be linked to navigation items in the Section Management page.

### 4. Contact Form Management (`/admin/contact`)

View and manage contact form configuration:

- **Form Information**
  - Form name: `contact`
  - Fields: name, email, subject, message
  - Submission method: Netlify Forms

- **Viewing Submissions**
  - All submissions are collected in Netlify
  - Access via Netlify Dashboard → Forms
  - Configure email notifications in Netlify

- **Quick Links**
  - Direct link to Netlify Dashboard
  - Form code reference

## Setting Up Admin Access

### Create Admin User

1. Go to Supabase Dashboard → Authentication → Users
2. Create a new user or select existing user
3. Click on the user
4. Under "User Metadata", add:
   ```json
   {
     "role": "admin"
   }
   ```

Alternatively, use SQL:
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-admin-email@example.com';
```

### First Login

1. Go to `/login`
2. Sign in with your admin credentials
3. You'll be redirected to `/admin`

## Features

### Real-time Updates
- Changes are saved immediately
- Website updates automatically
- No need to rebuild or redeploy

### Navigation Management
- Easily add/remove sections from navigation
- Automatic navigation item creation
- Control section visibility

### Content Management
- Full CRUD operations for all content
- Rich text support (HTML in content fields)
- Image URL support for all sections
- Display order control

### Publishing Workflow
- Draft/Published status for news articles
- Enable/disable sections without deleting
- Preview changes before publishing

## Best Practices

1. **Backup First** - Export your database before major changes
2. **Test Changes** - Preview on staging before production
3. **Use Descriptive Slugs** - For news articles and portfolio items
4. **Optimize Images** - Use optimized image URLs for better performance
5. **Regular Updates** - Keep content fresh and relevant

## Troubleshooting

### Can't Access Admin
- Verify user has `role: 'admin'` in user_metadata
- Check Supabase authentication is working
- Ensure environment variables are set

### Changes Not Appearing
- Clear browser cache
- Check if section is enabled
- Verify navigation item is enabled
- Check published status for news articles

### Form Submissions Not Appearing
- Verify Netlify Forms is enabled
- Check Netlify dashboard for submissions
- Ensure form name matches (`contact`)

## Security

- Admin routes are protected by authentication
- Only users with `role: 'admin'` can access
- All API routes verify admin status
- Row Level Security (RLS) policies protect data

## Future Enhancements

- Rich text editor for content fields
- Image upload to Supabase Storage
- Bulk operations for sections
- Content versioning
- Scheduled publishing for news
- Analytics integration

