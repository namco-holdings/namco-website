# Complete Setup Guide

Step-by-step instructions to set up GitHub, Supabase, and Netlify for your NAMCO website.

## Prerequisites

- Node.js 18+ installed on your computer
- A GitHub account
- A Supabase account (free tier works)
- A Netlify account (free tier works)
- Git installed on your computer

---

## Part 1: GitHub Setup

### Step 1: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Fill in:
   - **Repository name**: `namco` (or your preferred name)
   - **Description**: "Generic reusable website template"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
4. Click **"Create repository"**

### Step 2: Initialize Git and Push Code

Open your terminal in the `namco` project directory and run:

```bash
# Navigate to your project
cd namco

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: NAMCO website with admin console"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/namco.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note:** If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password
- Or set up SSH keys
- GitHub will show you the exact command with your username

---

## Part 2: Supabase Setup

### Step 1: Create Supabase Account and Project

1. Go to [supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign in"**
3. Sign in with GitHub (recommended) or email
4. Click **"New Project"**
5. Fill in:
   - **Name**: `namco` (or your preferred name)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free tier is fine
6. Click **"Create new project"**
7. Wait 2-3 minutes for project to initialize

### Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. You'll see:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon public** key (starts with `eyJ...`)
   - **service_role** key (starts with `eyJ...`) - **KEEP THIS SECRET!**

3. Copy these values - you'll need them later

### Step 3: Run Database Migrations

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click **"New query"**
3. Run each migration file **in order**:

#### Migration 1: Initial Schema (Blog/News)
1. Open `supabase/migrations/001_initial_schema.sql` from your project
2. Copy the entire contents
3. Paste into SQL Editor
4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned"

#### Migration 2: Site Content Schema
1. Open `supabase/migrations/002_site_content_schema.sql`
2. Copy the entire contents
3. Paste into SQL Editor
4. Click **"Run"**
5. Should see "Success. No rows returned"

#### Migration 3: Seed Default Content
1. Open `supabase/migrations/003_seed_default_content.sql`
2. Copy the entire contents
3. Paste into SQL Editor
4. Click **"Run"**
5. Should see "Success. No rows returned"

#### Migration 4: Add Favicon
1. Open `supabase/migrations/004_add_favicon.sql`
2. Copy the entire contents
3. Paste into SQL Editor
4. Click **"Run"**
5. Should see "Success. No rows returned"

### Step 4: Verify Tables Created

1. In Supabase dashboard, go to **Table Editor** (left sidebar)
2. You should see these tables:
   - `site_settings`
   - `hero_section`
   - `about_section`
   - `services`
   - `portfolio_items`
   - `testimonials`
   - `navigation_items`
   - `footer_content`
   - `blog_posts`
   - `news_articles`

### Step 5: Create Admin User

1. Go to **Authentication** → **Users** (left sidebar)
2. Click **"Add user"** → **"Create new user"**
3. Fill in:
   - **Email**: Your admin email (e.g., `admin@yourcompany.com`)
   - **Password**: Create a strong password
   - **Auto Confirm User**: Check this box
4. Click **"Create user"**
5. Click on the newly created user
6. Scroll down to **"User Metadata"**
7. Click **"Add a new key"**
8. Add:
   - **Key**: `role`
   - **Value**: `admin`
9. Click **"Save"**

**Alternative (SQL method):**
1. Go to **SQL Editor**
2. Run this (replace email with your admin email):
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-admin-email@example.com';
```

---

## Part 3: Netlify Setup

### Step 1: Create Netlify Account

1. Go to [netlify.com](https://netlify.com)
2. Click **"Sign up"**
3. Choose **"Sign up with GitHub"** (recommended)
4. Authorize Netlify to access your GitHub

### Step 2: Deploy from GitHub

1. In Netlify dashboard, click **"Add new site"** → **"Import an existing project"**
2. Click **"Deploy with GitHub"**
3. Authorize Netlify (if prompted)
4. Select your `namco` repository
5. Netlify will auto-detect Next.js settings:
   - **Build command**: `npm run build` ✅
   - **Publish directory**: `.next` ✅
   - **Node version**: 20 (or 18+) ✅
6. Click **"Show advanced"** to add environment variables
7. **DON'T deploy yet** - we need to add environment variables first

### Step 3: Add Environment Variables

1. In the deploy settings, scroll to **"Environment variables"**
2. Click **"New variable"** and add each:

   **Variable 1:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase Project URL (from Part 2, Step 2)

   **Variable 2:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key (from Part 2, Step 2)

   **Variable 3 (Optional - for admin features):**
   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: Your Supabase service_role key (from Part 2, Step 2)
   - ⚠️ **Keep this secret!** Only needed for admin functions

3. Click **"Deploy site"**

### Step 4: Wait for Deployment

1. Netlify will start building your site
2. This takes 2-5 minutes
3. You can watch the build logs in real-time
4. When complete, you'll see **"Site is live"**
5. Your site URL will be: `https://random-name-123.netlify.app`

### Step 5: Configure Custom Domain (Optional)

1. In Netlify dashboard → **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions

---

## Part 4: Local Development Setup

### Step 1: Install Dependencies

```bash
cd namco
npm install
```

### Step 2: Create Environment File

1. Copy the example file:
```bash
cp env.example .env.local
```

2. Edit `.env.local` and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Note:** `.env.local` is already in `.gitignore` - it won't be committed to GitHub.

### Step 3: Run Development Server

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Step 4: Test Admin Login

1. Go to [http://localhost:3000/login](http://localhost:3000/login)
2. Sign in with your admin credentials (from Part 2, Step 5)
3. You should be redirected to `/admin`

---

## Part 5: Verify Everything Works

### ✅ Checklist

- [ ] GitHub repository created and code pushed
- [ ] Supabase project created
- [ ] All 4 migrations run successfully
- [ ] Admin user created with `role: 'admin'`
- [ ] Netlify site deployed
- [ ] Environment variables added to Netlify
- [ ] Site is live on Netlify
- [ ] Can access admin console at `/admin`
- [ ] Can view public site

### Test Admin Console

1. Go to your Netlify site URL: `https://your-site.netlify.app/admin`
2. Sign in with admin credentials
3. Test each section:
   - ✅ Company Profile - Update company name
   - ✅ Sections - View sections
   - ✅ News - Create a test article
   - ✅ Contact - View form info

### Test Public Site

1. Go to your Netlify site URL: `https://your-site.netlify.app`
2. Verify all sections display
3. Test contact form submission
4. Check navigation works

---

## Troubleshooting

### Build Fails on Netlify

- Check build logs in Netlify dashboard
- Verify all environment variables are set
- Ensure Node.js version is 18+
- Check that all dependencies are in `package.json`

### Can't Login to Admin

- Verify admin user has `role: 'admin'` in user_metadata
- Check Supabase credentials in environment variables
- Try creating a new admin user

### Database Errors

- Verify all migrations ran successfully
- Check Supabase dashboard → Table Editor
- Re-run migrations if needed

### Environment Variables Not Working

- In Netlify: Site settings → Environment variables
- Verify variable names match exactly (case-sensitive)
- Redeploy after adding variables

### Contact Form Not Working

- Verify form has `name="contact"` and `data-netlify="true"`
- Check Netlify dashboard → Forms
- Ensure site is deployed (not just preview)

---

## Next Steps

1. **Customize Content**: Use admin console to update company info
2. **Add Content**: Create services, portfolio items, testimonials
3. **Configure Contact Form**: Set up email notifications in Netlify
4. **Add Custom Domain**: Point your domain to Netlify
5. **Set Up Blog/News**: Start publishing content

---

## Quick Reference

### Supabase Dashboard
- **URL**: https://app.supabase.com
- **Tables**: Table Editor → View all tables
- **SQL**: SQL Editor → Run queries
- **Auth**: Authentication → Users → Manage users
- **API Keys**: Settings → API

### Netlify Dashboard
- **URL**: https://app.netlify.com
- **Sites**: View all sites
- **Forms**: Site → Forms → View submissions
- **Deploys**: Site → Deploys → View build history
- **Environment**: Site settings → Environment variables

### GitHub
- **Repository**: https://github.com/YOUR_USERNAME/namco
- **Commits**: View commit history
- **Settings**: Repository settings

---

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review Netlify build logs
3. Check Supabase logs
4. Verify all environment variables are correct
5. Ensure all migrations ran successfully

Good luck with your setup! 🚀

