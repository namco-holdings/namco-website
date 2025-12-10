import NavigationClient from './NavigationClient'
import { getNavigationItems, getSiteSettings } from '@/lib/data'

export default async function Navigation() {
  const [navItems, siteSettings] = await Promise.all([
    getNavigationItems(),
    getSiteSettings(),
  ])

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
}
