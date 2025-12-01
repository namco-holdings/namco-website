# Supabase Keys Setup Guide

## Keys You Need from Supabase

You need **3 keys** from your Supabase project:

### 1. Project URL (Required)
- **Variable Name**: `NEXT_PUBLIC_SUPABASE_URL`
- **Example**: `https://xxxxxxxxxxxxx.supabase.co`
- **Where to find**: Supabase Dashboard → Settings → API → Project URL

### 2. Anon/Public Key (Required)
- **Variable Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...`
- **Where to find**: Supabase Dashboard → Settings → API → Project API keys → `anon` `public`
- **Note**: This key is safe to expose in the browser (it's public)

### 3. Service Role Key (Optional but Recommended)
- **Variable Name**: `SUPABASE_SERVICE_ROLE_KEY`
- **Example**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6...`
- **Where to find**: Supabase Dashboard → Settings → API → Project API keys → `service_role` `secret`
- **⚠️ WARNING**: This key has admin privileges - **KEEP IT SECRET!**
- **Use**: Only needed for admin functions and server-side operations

---

## How to Find Your Keys

### Step-by-Step:

1. Go to [app.supabase.com](https://app.supabase.com)
2. Select your project
3. Click **Settings** (gear icon) in the left sidebar
4. Click **API** under Project Settings
5. You'll see:
   - **Project URL** - Copy this for `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API keys** section:
     - **`anon` `public`** - Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - **`service_role` `secret`** - Copy this for `SUPABASE_SERVICE_ROLE_KEY` (click "Reveal" to see it)

---

## Where to Add These Keys

### 1. Local Development (.env.local)

Create a file called `.env.local` in your project root:

```bash
cd ~/Documents/github/namco-website
cp env.example .env.local
```

Then edit `.env.local` and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important**: `.env.local` is already in `.gitignore` - it won't be committed to GitHub.

### 2. Netlify (Production)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable** and add each:

   **Variable 1:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Project URL
   - **Scopes**: All scopes (Production, Deploy previews, Branch deploys)

   **Variable 2:**
   - **Key**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your anon key
   - **Scopes**: All scopes

   **Variable 3:**
   - **Key**: `SUPABASE_SERVICE_ROLE_KEY`
   - **Value**: Your service_role key
   - **Scopes**: All scopes
   - **⚠️ Mark as sensitive** (Netlify will hide it)

5. After adding variables, **redeploy** your site:
   - Go to **Deploys** tab
   - Click **Trigger deploy** → **Deploy site**

---

## Quick Copy Template

Once you have your keys, use this template:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.YOUR_SERVICE_ROLE_KEY
```

Replace:
- `YOUR_PROJECT_ID` with your actual project ID
- `YOUR_ANON_KEY` with your actual anon key
- `YOUR_SERVICE_ROLE_KEY` with your actual service_role key

---

## Verify Setup

### Local:
1. Create `.env.local` with your keys
2. Run `npm run dev`
3. Visit http://localhost:3000
4. Try logging in to admin: http://localhost:3000/login

### Netlify:
1. Add environment variables in Netlify dashboard
2. Trigger a new deploy
3. Visit your Netlify site
4. Try logging in to admin

---

## Security Notes

✅ **Safe to expose** (public):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

🔒 **Keep secret** (never commit):
- `SUPABASE_SERVICE_ROLE_KEY`
- `.env.local` file

The `NEXT_PUBLIC_*` prefix means these variables are exposed to the browser, which is safe for the URL and anon key. The service_role key should never be exposed.

---

## Troubleshooting

**"Missing Supabase environment variables" error:**
- Check that all variables are set correctly
- Verify no extra spaces or quotes
- Restart dev server after adding `.env.local`

**Can't login to admin:**
- Verify admin user has `role: 'admin'` in Supabase
- Check that `SUPABASE_SERVICE_ROLE_KEY` is set (needed for admin functions)

**Netlify build fails:**
- Verify all environment variables are added
- Check variable names match exactly (case-sensitive)
- Redeploy after adding variables

