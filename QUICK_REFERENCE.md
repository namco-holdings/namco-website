# Quick Reference Card

## 🚀 Initial Setup Checklist

- [ ] Create GitHub repository
- [ ] Push code to GitHub
- [ ] Create Supabase project
- [ ] Run 4 migrations in SQL Editor
- [ ] Create admin user with `role: 'admin'`
- [ ] Deploy to Netlify from GitHub
- [ ] Add environment variables to Netlify
- [ ] Test admin login

## 📋 Environment Variables

### Local (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Netlify (Site Settings → Environment Variables)
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional)

## 🔑 Supabase Credentials Location

1. Supabase Dashboard
2. Settings → API
3. Copy:
   - Project URL
   - anon public key
   - service_role key (secret!)

## 🗄️ Database Migrations (Run in Order)

1. `001_initial_schema.sql` - Blog/News tables
2. `002_site_content_schema.sql` - Main content tables
3. `003_seed_default_content.sql` - Default content
4. `004_add_favicon.sql` - Favicon support

**Location:** Supabase Dashboard → SQL Editor

## 👤 Create Admin User

### Method 1: Dashboard
1. Authentication → Users
2. Create user
3. User Metadata → Add `role: 'admin'`

### Method 2: SQL
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```

## 🌐 Important URLs

- **Local Dev**: http://localhost:3000
- **Admin Login**: http://localhost:3000/login
- **Admin Console**: http://localhost:3000/admin
- **Netlify Site**: https://your-site.netlify.app
- **Supabase Dashboard**: https://app.supabase.com
- **Netlify Dashboard**: https://app.netlify.com

## 📁 Key Files

- `SETUP_GUIDE.md` - Complete setup instructions
- `ADMIN_CONSOLE.md` - Admin console guide
- `DATABASE_SETUP.md` - Database customization guide
- `env.example` - Environment variables template
- `netlify.toml` - Netlify configuration

## 🛠️ Common Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🔍 Troubleshooting Quick Fixes

**Build fails on Netlify:**
- Check environment variables are set
- Verify Node.js version (18+)
- Check build logs

**Can't login to admin:**
- Verify user has `role: 'admin'`
- Check Supabase credentials
- Clear browser cache

**Database errors:**
- Re-run migrations
- Check Table Editor for tables
- Verify RLS policies

**Contact form not working:**
- Check Netlify Forms is enabled
- Verify form name is `contact`
- Check Netlify dashboard → Forms

## 📞 Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Netlify Docs**: https://docs.netlify.com
- **Next.js Docs**: https://nextjs.org/docs
- **Project README**: See README.md

## ✅ Post-Setup Tasks

1. Update company profile in admin console
2. Customize sections and content
3. Add your logo and favicon
4. Configure contact form notifications
5. Set up custom domain (optional)
6. Start adding content!

---

**Need detailed instructions?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

