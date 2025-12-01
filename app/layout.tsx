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
  
  return (
    <html lang="en">
      <head>
        {siteSettings.favicon_url && (
          <link rel="icon" href={siteSettings.favicon_url} />
        )}
      </head>
      <body>{children}</body>
    </html>
  )
}

