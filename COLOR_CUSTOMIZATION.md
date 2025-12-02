# Color Customization Guide

Your website now supports full color customization through the admin console. All colors are stored in the database and applied dynamically.

## New Color Fields Added

### Brand Colors
- **Primary Color** - Main brand color
- **Secondary Color** - Secondary brand color
- **Accent Color** - Used for buttons, links, and interactive elements
- **Accent Hover Color** - Color when hovering over buttons/links

### Background Colors
- **Light Mode Background** - Background color for light mode
- **Dark Mode Background** - Background color for dark mode

### Text Colors
- **Light Mode Text** - Text color for light mode
- **Dark Mode Text** - Text color for dark mode

### Border Colors
- **Light Mode Border** - Border color for light mode
- **Dark Mode Border** - Border color for dark mode

## How to Customize Colors

### Step 1: Run Migration

1. Go to Supabase Dashboard → **SQL Editor**
2. Open `supabase/migrations/006_add_color_fields.sql`
3. Copy all contents and paste into SQL Editor
4. Click **"Run"**

### Step 2: Update Colors in Admin Console

1. Go to `/admin` → **Company Profile**
2. Scroll to **Brand Colors** section
3. Use color pickers or enter hex codes
4. Update **Background Colors**, **Text Colors**, and **Border Colors** sections
5. Click **"Save Changes"**

### Step 3: See Changes

- Colors are applied immediately via CSS variables
- Refresh your website to see changes
- No rebuild needed - changes are live!

## How It Works

### CSS Variables
Colors are injected as CSS variables in the `<head>`:
```css
:root {
  --primary-color: #your-color;
  --accent-color: #your-color;
  --background-color: #your-color;
  /* etc. */
}
```

### Dynamic Application
Components use these CSS variables via inline styles or CSS classes, so colors update automatically when you change them in the admin console.

## Color Usage

- **Accent Color**: Buttons, links, call-to-action elements
- **Accent Hover**: Hover states for interactive elements
- **Background Colors**: Page backgrounds (light/dark mode)
- **Text Colors**: All text content (light/dark mode)
- **Border Colors**: Borders and dividers (light/dark mode)

## Tips

1. **Test Both Modes**: Check light and dark mode after changing colors
2. **Contrast**: Ensure text is readable on backgrounds
3. **Accessibility**: Use tools to check color contrast ratios
4. **Preview**: Changes appear immediately after saving

## Troubleshooting

### Colors Not Updating
- Refresh the page (hard refresh: Cmd/Ctrl + Shift + R)
- Check that migration `006_add_color_fields.sql` was run
- Verify colors are saved in Company Profile
- Check browser console for errors

### Colors Look Wrong
- Verify hex codes are correct (include #)
- Check light/dark mode settings
- Clear browser cache

### Some Elements Not Changing
- Some elements may still use Tailwind classes
- These will be updated in future versions
- Most interactive elements (buttons, links) use CSS variables

---

**After running the migration, go to Company Profile and customize your colors!**

