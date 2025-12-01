import NavigationClient from './NavigationClient'
import { getNavigationItems, getSiteSettings } from '@/lib/data'

export default async function Navigation() {
  const [navItems, siteSettings] = await Promise.all([
    getNavigationItems(),
    getSiteSettings(),
  ])

  // Fallback to default navigation if database is empty
  const defaultNavItems = [
    { id: '1', label: 'Home', section_id: 'hero' },
    { id: '2', label: 'About', section_id: 'about' },
    { id: '3', label: 'Services', section_id: 'services' },
    { id: '4', label: 'Portfolio', section_id: 'portfolio' },
    { id: '5', label: 'Testimonials', section_id: 'testimonials' },
    { id: '6', label: 'Contact', section_id: 'contact' },
  ]

  return (
    <NavigationClient
      companyName={siteSettings.company_name}
      navItems={navItems.length > 0 ? navItems : defaultNavItems}
    />
  )
}
