# Supabase Storage Setup Guide

This guide will help you set up Supabase Storage so you can upload images and files directly to your database instead of using external URLs.

## Step 1: Run Storage Migration

1. Go to Supabase Dashboard → **SQL Editor**
2. Click **"New query"**
3. Open `supabase/migrations/005_setup_storage.sql` from your project
4. Copy **ALL** the contents
5. Paste into SQL Editor
6. Click **"Run"**
7. Should see: "Success. No rows returned"

This creates:
- `images` bucket (for logos, favicons, portfolio, etc.)
- `content` bucket (for blog/news images)
- Storage policies (who can upload/download)

## Step 2: Verify Storage Buckets

1. Go to Supabase Dashboard → **Storage** (left sidebar)
2. You should see two buckets:
   - ✅ `images`
   - ✅ `content`

## Step 3: Test File Upload

1. Go to your admin console: `/admin`
2. Try uploading an image:
   - Company Profile → Upload Logo or Favicon
   - Sections → Edit any section → Upload Image
3. The image should upload and display automatically

## How It Works

### Image Upload Component
- Click "Upload Image" button
- Select a file from your computer
- File uploads to Supabase Storage
- URL is automatically saved to database
- Image displays immediately

### Storage Structure
```
images/
  ├── logo/          (company logos)
  ├── favicon/       (favicons)
  ├── hero/          (hero section backgrounds)
  ├── about/         (about section images)
  ├── portfolio/     (portfolio project images)
  └── testimonials/  (testimonial author images)

content/
  ├── blog/          (blog post images)
  └── news/          (news article images)
```

### File Limits
- **Images bucket**: 5MB max per file
- **Content bucket**: 10MB max per file
- **Allowed types**: JPEG, PNG, GIF, WebP, SVG, ICO

## Features

✅ **Direct Upload**: Upload files directly from admin console
✅ **Automatic URLs**: URLs are generated and saved automatically
✅ **Image Preview**: See images before saving
✅ **Delete Support**: Remove images with one click
✅ **Fallback to URL**: Can still enter URLs manually if needed
✅ **Organized Folders**: Files organized by type

## Troubleshooting

### "Bucket not found" error
- Run migration `005_setup_storage.sql`
- Verify buckets exist in Storage dashboard

### "Permission denied" error
- Check storage policies were created
- Verify you're logged in as admin
- Re-run migration if needed

### Upload fails
- Check file size (must be under limit)
- Check file type (must be image)
- Check browser console for errors
- Verify Supabase credentials are correct

### Images not displaying
- Check image URL is saved in database
- Verify storage bucket is public
- Check browser console for CORS errors
- Verify image file exists in Storage dashboard

## Manual File Management

You can also manage files directly in Supabase:

1. Go to **Storage** → Select bucket
2. Click **"Upload file"** or **"New folder"**
3. Files uploaded here can be referenced by path

## Storage URLs

Files uploaded to Supabase Storage get URLs like:
```
https://[project-id].supabase.co/storage/v1/object/public/images/hero/1234567890-abc123.jpg
```

These URLs are:
- ✅ Publicly accessible
- ✅ CDN-backed (fast)
- ✅ Automatically generated
- ✅ Stored securely

## Best Practices

1. **Organize by folder**: Use folders to keep files organized
2. **Optimize images**: Compress images before uploading
3. **Use appropriate buckets**: Use `images` for general, `content` for blog/news
4. **Clean up**: Delete unused images to save space
5. **Backup**: Export important files periodically

## Storage Limits (Free Tier)

- **Storage**: 1GB total
- **Bandwidth**: 2GB/month
- **File size**: Up to 50MB per file (we set lower limits for images)

For more storage, upgrade your Supabase plan.

---

**After running the migration, refresh your admin console and try uploading an image!**

