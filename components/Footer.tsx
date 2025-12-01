import { getSiteSettings, getFooterContent, getNavigationItems } from '@/lib/data'

export default async function Footer() {
  const currentYear = new Date().getFullYear()
  const [siteSettings, footerContent, navItems] = await Promise.all([
    getSiteSettings(),
    getFooterContent(),
    getNavigationItems(),
  ])

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
            <h3 className="text-2xl font-bold text-white mb-4">
              {aboutSection?.title || siteSettings.company_name}
            </h3>
            <p className="text-sm">
              {aboutSection?.content || siteSettings.company_tagline || 'Building modern, responsive websites that make a difference.'}
            </p>
          </div>

          {/* Quick Links Section */}
          {linksSection && (
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">
                {linksSection.title || 'Quick Links'}
              </h4>
              <ul className="space-y-2 text-sm">
                {navItems.slice(1, 5).map((item) => (
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
            <h4 className="text-lg font-semibold text-white mb-4">
              {contactSection?.title || 'Contact'}
            </h4>
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
}
