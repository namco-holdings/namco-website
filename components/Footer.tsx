import { getSiteSettings, getFooterContent, getNavigationItems } from '@/lib/data'
import MarkdownRenderer from './MarkdownRenderer'

export default async function Footer() {
  try {
    const currentYear = new Date().getFullYear()
    const [siteSettingsResult, footerContentResult, navItemsResult] = await Promise.allSettled([
      getSiteSettings(),
      getFooterContent(),
      getNavigationItems(),
    ])

    const siteSettings = siteSettingsResult.status === 'fulfilled' ? siteSettingsResult.value : null
    const footerContent = footerContentResult.status === 'fulfilled' ? footerContentResult.value : []
    const navItems = navItemsResult.status === 'fulfilled' ? navItemsResult.value : []

    if (!siteSettings) {
      // Return minimal footer if site settings fail
      return (
        <footer className="bg-gray-900 text-gray-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
              <p>&copy; {currentYear} NAMCO. All rights reserved.</p>
            </div>
          </div>
        </footer>
      )
    }

  // Organize footer content by section type
  const aboutSection = footerContent.find((f) => f.section_type === 'about')
  const linksSection = footerContent.find((f) => f.section_type === 'links')
  const contactSection = footerContent.find((f) => f.section_type === 'contact')

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="text-2xl font-bold text-white mb-4">
              <MarkdownRenderer content={aboutSection?.title || siteSettings.company_name} />
            </div>
            <div className="text-sm">
              <MarkdownRenderer content={aboutSection?.content || siteSettings.company_tagline || 'Value for All.'} />
            </div>
          </div>

          {/* Quick Links Section */}
          {linksSection && (
            <div>
              <div className="text-lg font-semibold text-white mb-4">
                <MarkdownRenderer content={linksSection.title || 'Quick Links'} />
              </div>
              <ul className="space-y-2 text-sm">
                {navItems
                  .filter((item) => {
                    // Exclude Home and Contact from footer links
                    const label = item.label?.toLowerCase() || ''
                    const sectionId = item.section_id?.toLowerCase() || ''
                    return label !== 'home' && sectionId !== 'contact' && sectionId !== 'hero'
                  })
                  .map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.section_id}`}
                        className="hover:text-white transition-colors"
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {/* Contact Section */}
          <div>
            <div className="text-lg font-semibold text-white mb-4">
              <MarkdownRenderer content={contactSection?.title || 'Contact'} />
            </div>
            <ul className="space-y-2 text-sm">
              {siteSettings.contact_email && (
                <li>Email: {siteSettings.contact_email}</li>
              )}
              {siteSettings.contact_phone && (
                <li>Phone: {siteSettings.contact_phone}</li>
              )}
              {siteSettings.contact_address && (
                <li>Address: {siteSettings.contact_address}</li>
              )}
              {!siteSettings.contact_email &&
                !siteSettings.contact_phone &&
                !siteSettings.contact_address && (
                  <li className="text-gray-500">Contact information coming soon</li>
                )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; {currentYear} {siteSettings.company_name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    )
  } catch (error) {
    console.error('Error loading footer:', error)
    const currentYear = new Date().getFullYear()
    // Return minimal footer on error
    return (
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
            <p>&copy; {currentYear} NAMCO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }
}
