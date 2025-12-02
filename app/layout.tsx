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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const siteSettings = await getSiteSettings()
  
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
    }
  `
  
  return (
    <html lang="en">
      <head>
        {siteSettings.favicon_url && (
          <link rel="icon" href={siteSettings.favicon_url} />
        )}
        <style dangerouslySetInnerHTML={{ __html: cssVariables }} />
      </head>
      <body style={{ 
        backgroundColor: 'var(--background-color)',
        color: 'var(--text-color)'
      }}>{children}</body>
    </html>
  )
}

