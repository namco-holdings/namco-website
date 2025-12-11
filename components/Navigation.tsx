import NavigationClient from './NavigationClient'
import { getNavigationItems, getSiteSettings } from '@/lib/data'

export default async function Navigation() {
  try {
    const [navItemsResult, siteSettingsResult] = await Promise.allSettled([
      getNavigationItems(),
      getSiteSettings(),
    ])

    const navItems = navItemsResult.status === 'fulfilled' ? navItemsResult.value : []
    const siteSettings = siteSettingsResult.status === 'fulfilled' ? siteSettingsResult.value : null

    if (!siteSettings) {
      // Fallback if site settings fail to load
      return (
        <NavigationClient
          companyName="NAMCO"
          logoUrl={null}
          headerBackgroundColor="#ffffff"
          headerTextColor="#171717"
          navItems={[{ id: 'contact', label: 'Contact', section_id: 'contact' }]}
        />
      )
    }

    // Always add Contact as the last item, right-justified
    const navItemsWithContact = [
      ...navItems,
      { id: 'contact', label: 'Contact', section_id: 'contact' },
    ]

    return (
      <NavigationClient
        companyName={siteSettings.company_name}
        logoUrl={siteSettings.logo_url}
        headerBackgroundColor={siteSettings.header_background_color || '#ffffff'}
        headerTextColor={siteSettings.header_text_color || '#171717'}
        navItems={navItemsWithContact}
      />
    )
  } catch (error) {
    console.error('Error loading navigation:', error)
    // Return minimal navigation on error
    return (
      <NavigationClient
        companyName="NAMCO"
        logoUrl={null}
        headerBackgroundColor="#ffffff"
        headerTextColor="#171717"
        navItems={[{ id: 'contact', label: 'Contact', section_id: 'contact' }]}
      />
    )
  }
}
