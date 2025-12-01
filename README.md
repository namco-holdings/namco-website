# NAMCO

A modern, responsive website built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Getting Started

### Quick Start

**New to this project?** See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete step-by-step instructions to set up GitHub, Supabase, and Netlify.

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (for CMS features - blog and news)
- Netlify account (for hosting)
- GitHub account (for version control)

### Installation

1. Navigate to the project directory:
   ```bash
   cd namco
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Supabase (optional but recommended):
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to SQL Editor and run the migration: `supabase/migrations/001_initial_schema.sql`
   - Get your project URL and anon key from Settings > API

4. Configure environment variables:
   ```bash
   cp env.example .env.local
   ```
   Then edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

**Note:** The website will work without Supabase for now, but you'll need it when you're ready to add the blog and news CMS features.

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the project for production
- `npm run start` - Start the production server (after building)
- `npm run lint` - Run ESLint to check for code issues

## Project Structure

```
namco/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/             # React components
│   ├── Navigation.tsx     # Navigation component
│   ├── Footer.tsx         # Footer component
│   └── ContactForm.tsx    # Contact form component
├── lib/
│   └── supabase/          # Supabase client utilities
│       ├── client.ts      # Browser client
│       ├── server.ts      # Server client
│       └── types.ts       # TypeScript types
├── supabase/
│   └── migrations/        # Database migrations
│       └── 001_initial_schema.sql  # Blog and news tables
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── next.config.ts         # Next.js configuration
├── netlify.toml           # Netlify deployment configuration
└── env.example            # Environment variables template
```

## Supabase Setup

### Initial Setup

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. In the SQL Editor, run the migration files **in order**:
   - `supabase/migrations/001_initial_schema.sql` (blog/news tables)
   - `supabase/migrations/002_site_content_schema.sql` (main content tables)
   - `supabase/migrations/003_seed_default_content.sql` (default content)

### Database-Driven Architecture

**This website is fully database-driven and reusable for any company!**

All content is stored in Supabase:
- **site_settings**: Company name, contact info, branding
- **hero_section**: Landing page content
- **about_section**: About us content
- **services**: Services/features offered
- **portfolio_items**: Portfolio projects
- **testimonials**: Client testimonials
- **navigation_items**: Menu items
- **footer_content**: Footer sections
- **blog_posts** & **news_articles**: For future CMS

### Customizing for Your Company

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions on:
- Setting up your company information
- Customizing all sections
- Managing content through the database
- Adding/updating services, portfolio items, testimonials

**Key Benefits:**
- ✅ Fully reusable - just update the database
- ✅ No code changes needed for content updates
- ✅ Easy to manage through Supabase dashboard
- ✅ Ready for admin interface later

## Deployment to Netlify

### Option 1: Deploy via Netlify Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [Netlify](https://netlify.com) and click "New site from Git"
3. Connect your repository
4. Build settings (auto-detected):
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Add environment variables in Site settings > Environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
6. Deploy!

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy --prod
```

### Contact Form

The contact form uses **Netlify Forms** (no backend required). Form submissions will appear in your Netlify dashboard under Forms.

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Supabase** - Backend as a Service (database, auth, storage)
- **Netlify** - Hosting and deployment
- **ESLint** - Code linting

## Future Enhancements

- ✅ Supabase database ready for CMS
- ✅ Blog and news table schemas created
- 🔄 CMS admin interface for blog/news management
- 🔄 Blog and news display pages
- 🔄 Additional pages and components
- 🔄 Custom styling and branding

