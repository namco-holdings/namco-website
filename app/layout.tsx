import type { Metadata } from 'next'
import './globals.css'
import { getSiteSettings } from '@/lib/data'

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings()
  
  return {
    title: siteSettings.company_name,
    description: siteSettings.company_tagline || 'Modern responsive website',
    icons: siteSettings.favicon_url ? {
      icon: siteSettings.favicon_url,
    } : undefined,
  }
}

// Font mapping to Google Fonts
const getFontUrl = (fontFamily: string | null): string | null => {
  const fontMap: Record<string, string> = {
    'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'Roboto': 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
    'Open Sans': 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap',
    'Lato': 'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap',
    'Montserrat': 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap',
    'Poppins': 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap',
    'Raleway': 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;600;700&display=swap',
    'Playfair Display': 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap',
    'Merriweather': 'https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap',
    'Source Sans Pro': 'https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap',
    'Nunito': 'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap',
    'Ubuntu': 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap',
    'Crimson Text': 'https://fonts.googleapis.com/css2?family=Crimson+Text:wght@400;600&display=swap',
    'Lora': 'https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap',
    'PT Sans': 'https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap',
  }
  return fontMap[fontFamily || 'Inter'] || fontMap['Inter']
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()
  const fontFamily = siteSettings.font_family || 'Inter'
  const fontUrl = getFontUrl(fontFamily)
  
  // Generate CSS variables from site settings
  const cssVariables = `
    :root {
      --primary-color: ${siteSettings.primary_color || '#2563eb'};
      --secondary-color: ${siteSettings.secondary_color || '#1e40af'};
      --background-color: ${siteSettings.background_color || '#ffffff'};
      --background-color-dark: ${siteSettings.background_color_dark || '#0a0a0a'};
      --text-color: ${siteSettings.text_color || '#171717'};
      --text-color-dark: ${siteSettings.text_color_dark || '#ededed'};
      --accent-color: ${siteSettings.accent_color || siteSettings.primary_color || '#2563eb'};
      --accent-color-hover: ${siteSettings.accent_color_hover || siteSettings.secondary_color || '#1e40af'};
      --border-color: ${siteSettings.border_color || '#e5e7eb'};
      --border-color-dark: ${siteSettings.border_color_dark || '#374151'};
      --font-family: '${fontFamily}', sans-serif;
    }
    body {
      font-family: var(--font-family);
    }
  `
  
  return (
    <html lang="en">
      <head>
        {siteSettings.favicon_url && (
          <link rel="icon" href={siteSettings.favicon_url} />
        )}
        {fontUrl && (
          <link rel="stylesheet" href={fontUrl} />
        )}
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body style={{ 
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)',
        fontFamily: `'${fontFamily}', sans-serif`
      }}>{children}</body>
    </html>
  )
}

