# How to Run Database Migrations

You're seeing this error because the database tables haven't been created yet. Follow these steps to set up your database.

## Quick Steps

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **SQL Editor** in the left sidebar
4. Click **"New query"**
5. Run each migration file **in order** (copy and paste the contents)

## Migration Files (Run in This Order)

### 1. Initial Schema (Blog/News)
- File: `supabase/migrations/001_initial_schema.sql`
- Creates: `blog_posts` and `news_articles` tables

### 2. Site Content Schema (Main Tables) ⭐ **YOU NEED THIS**
- File: `supabase/migrations/002_site_content_schema.sql`
- Creates: All the main content tables including `hero_section`, `about_section`, `services`, `portfolio_items`, `testimonials`, `navigation_items`, `footer_content`, and `site_settings`

### 3. Seed Default Content ⭐ **YOU NEED THIS**
- File: `supabase/migrations/003_seed_default_content.sql`
- Creates: Default content so you have something to start with

### 4. Add Favicon Support
- File: `supabase/migrations/004_add_favicon.sql`
- Adds: `favicon_url` column to `site_settings`

## Step-by-Step Instructions

### Step 1: Open SQL Editor
1. Go to Supabase Dashboard
2. Click **SQL Editor** (left sidebar)
3. Click **"New query"** button

### Step 2: Run Migration 1
1. Open `supabase/migrations/001_initial_schema.sql` from your project
2. Copy **ALL** the contents
3. Paste into SQL Editor
4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. Should see: "Success. No rows returned"

### Step 3: Run Migration 2 (IMPORTANT!)
1. Open `supabase/migrations/002_site_content_schema.sql`
2. Copy **ALL** the contents
3. Paste into SQL Editor
4. Click **"Run"**
5. Should see: "Success. No rows returned"

### Step 4: Run Migration 3 (IMPORTANT!)
1. Open `supabase/migrations/003_seed_default_content.sql`
2. Copy **ALL** the contents
3. Paste into SQL Editor
4. Click **"Run"**
5. Should see: "Success. No rows returned"

### Step 5: Run Migration 4
1. Open `supabase/migrations/004_add_favicon.sql`
2. Copy **ALL** the contents
3. Paste into SQL Editor
4. Click **"Run"**
5. Should see: "Success. No rows returned"

## Verify Tables Were Created

1. Go to **Table Editor** (left sidebar)
2. You should see these tables:
   - ✅ `site_settings`
   - ✅ `hero_section`
   - ✅ `about_section`
   - ✅ `services`
   - ✅ `portfolio_items`
   - ✅ `testimonials`
   - ✅ `navigation_items`
   - ✅ `footer_content`
   - ✅ `blog_posts`
   - ✅ `news_articles`

## After Running Migrations

1. **Refresh your admin console** (the page where you got the error)
2. You should now see default sections
3. You can now add/edit sections without errors

## Troubleshooting

### "relation already exists" error
- The table already exists - this is fine, skip that migration

### "permission denied" error
- Make sure you're using the SQL Editor (not trying to run via API)
- You should have full access in the SQL Editor

### Still seeing "table not found" after running migrations
- Check you ran migration 002 (creates the tables)
- Verify in Table Editor that tables exist
- Try refreshing the admin console page
- Check browser console for other errors

## Quick SQL to Check

Run this to verify tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'hero_section', 
  'about_section', 
  'services', 
  'portfolio_items', 
  'testimonials',
  'site_settings'
)
ORDER BY table_name;
```

You should see all 6 tables listed.

---

**Once migrations are run, refresh your admin console and try adding a section again!**



