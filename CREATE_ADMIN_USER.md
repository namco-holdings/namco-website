# How to Create Your First Admin User

Follow these steps to create an admin user who can access the admin console.

## Method 1: Using Supabase Dashboard (Easiest)

### Step 1: Create the User

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Authentication** in the left sidebar
4. Click **Users** tab
5. Click **"Add user"** button (top right)
6. Select **"Create new user"**

### Step 2: Fill in User Details

Fill in the form:
- **Email**: Your admin email (e.g., `admin@yourcompany.com`)
- **Password**: Create a strong password
- **Auto Confirm User**: ✅ **Check this box** (important!)
- **Send invitation email**: Optional (uncheck if you want to set password manually)

7. Click **"Create user"**

### Step 3: Set Admin Role

**Option A: Using SQL Editor (Recommended if metadata section not visible)**

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Run this SQL (replace with your email):

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-admin-email@example.com';
```

4. Click **"Run"** (or press Cmd/Ctrl + Enter)
5. You should see "Success. No rows returned" or "UPDATE 1"

**Option B: Find User Metadata in Dashboard**

The metadata section might be in a different location:
- Look for **"Raw App Meta Data"** or **"Raw User Meta Data"** sections
- Or check if there's an **"Edit"** button on the user page
- Some Supabase versions have metadata under a **"Metadata"** tab

**Option C: Use the API directly**

If the UI doesn't show metadata, use SQL (Option A) - it's the most reliable method.

**Done!** You can now log in with this user at `/login`

---

## Method 2: Create User and Set Admin Role in One SQL Command

If you prefer to do everything in SQL:

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Run this SQL (replace email and password):

```sql
-- First, create the user (you'll need to use Supabase Auth API or Dashboard for this)
-- Then immediately set admin role:

UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'admin@yourcompany.com';
```

**Note:** You still need to create the user first via Dashboard (Step 1-2), then use SQL to set the role.

---

## Method 3: Verify Admin Role is Set

After setting the admin role, verify it worked:

1. Go to **SQL Editor**
2. Run this query:

```sql
SELECT 
  email,
  raw_user_meta_data->>'role' as role,
  email_confirmed_at
FROM auth.users
WHERE email = 'your-admin-email@example.com';
```

You should see:
- `email`: Your admin email
- `role`: `admin`
- `email_confirmed_at`: A timestamp (not null)

---

## Troubleshooting: "No User Metadata Section"

If you don't see a User Metadata section in the Supabase dashboard:

### Solution 1: Use SQL Editor (Easiest)
- Go to **SQL Editor**
- Run the UPDATE query shown in Step 3, Option A above
- This always works regardless of UI changes

### Solution 2: Check Different Locations
- Look for **"Raw User Meta Data"** field (might be read-only)
- Check if there's an **"Edit"** or **"Update"** button
- Try clicking on different tabs/sections of the user page

### Solution 3: Use Supabase CLI (Advanced)
If you have Supabase CLI installed:
```bash
supabase db execute "UPDATE auth.users SET raw_user_meta_data = jsonb_build_object('role', 'admin') WHERE email = 'your-email@example.com';"
```

---

## Verify Admin User Works

### Step 1: Test Login Locally

1. Make sure your `.env.local` has Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. Start dev server: `npm run dev`
3. Go to http://localhost:3000/login
4. Sign in with your admin credentials
5. You should be redirected to `/admin`

### Step 2: Test on Production

1. Make sure Netlify has environment variables set
2. Go to your Netlify site: `https://your-site.netlify.app/login`
3. Sign in with admin credentials
4. Should redirect to `/admin`

---

## Common Issues

### "Can't access /admin after login"

**Check:**
- User has `role: 'admin'` in raw_user_meta_data (verify with SQL query above)
- Supabase credentials are correct in `.env.local` or Netlify
- Try logging out and back in
- Clear browser cache/cookies

### "User not found" or "Invalid credentials"

**Check:**
- Email is correct (case-sensitive)
- Password is correct
- User was created successfully
- "Auto Confirm User" was checked when creating

### "Forbidden" error

**Check:**
- User metadata has `role: 'admin'` (verify with SQL)
- JSON format is correct: `{"role":"admin"}`
- User is confirmed (email_confirmed_at is not null)

### Reset Admin Role

If you need to reset the admin role:

```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
  COALESCE(raw_user_meta_data, '{}'::jsonb),
  '{role}',
  '"admin"'
)
WHERE email = 'your-email@example.com';
```

---

## Quick SQL Reference

**Set admin role:**
```sql
UPDATE auth.users
SET raw_user_meta_data = jsonb_build_object('role', 'admin')
WHERE email = 'your-email@example.com';
```

**Check if user is admin:**
```sql
SELECT email, raw_user_meta_data->>'role' as role
FROM auth.users
WHERE email = 'your-email@example.com';
```

**Remove admin role:**
```sql
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'role'
WHERE email = 'your-email@example.com';
```

---

## Security Best Practices

1. **Use strong passwords** - At least 12 characters, mix of letters, numbers, symbols
2. **Limit admin users** - Only create admin users for trusted team members
3. **Use 2FA** - Enable two-factor authentication in Supabase if available
4. **Monitor access** - Check Authentication → Users regularly
5. **Rotate passwords** - Change admin passwords periodically

---

## Quick Reference

**Dashboard Path:**
- Supabase → Authentication → Users → Add user
- Then: SQL Editor → Run UPDATE query to set role

**SQL Path (Recommended):**
- Supabase → SQL Editor → Run UPDATE query

**Login URL:**
- Local: http://localhost:3000/login
- Production: https://your-site.netlify.app/login

**Admin Console:**
- Local: http://localhost:3000/admin
- Production: https://your-site.netlify.app/admin

---

**Note:** If the dashboard UI doesn't show metadata options, always use the SQL Editor method - it's the most reliable way to set the admin role.
