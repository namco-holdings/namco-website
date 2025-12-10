import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import {
  getSiteSettings,
  getHeroSection,
  getAboutSection,
  getServices,
  getTestimonials,
} from '@/lib/data'

export default async function Home() {
  const [
    siteSettings,
    heroSection,
    aboutSection,
    services,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroSection(),
    getAboutSection(),
    getServices(),
    getTestimonials(),
  ])

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      {heroSection && (
        <section
          id="hero"
          className={`min-h-screen flex items-center justify-center relative w-full ${
            heroSection.background_image_url
              ? ''
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'
          }`}
          style={{
            marginTop: '80px',
            scrollMarginTop: '80px',
            width: '100%',
            maxWidth: '100%',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: 0,
            paddingRight: 0,
            position: 'relative',
            left: 0,
            right: 0,
            ...(heroSection.background_image_url
              ? {
                  backgroundImage: `url(${heroSection.background_image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundAttachment: 'scroll',
                }
              : {}),
          }}
        >
          {/* Background Overlay - Completely removed from DOM when opacity is 0 */}
          {(() => {
            // Convert to number and validate
            const opacityValue = heroSection.background_overlay_opacity
            const opacityNum = opacityValue == null ? 0 : Number(opacityValue)
            
            // Strict validation: only render if we have image, valid number, and > 0
            const shouldRenderOverlay = 
              Boolean(heroSection.background_image_url) &&
              opacityValue !== null &&
              opacityValue !== undefined &&
              !isNaN(opacityNum) &&
              opacityNum > 0 &&
              opacityNum <= 1
            
            // Return null to completely remove from DOM if overlay shouldn't render
            if (!shouldRenderOverlay) {
              return null
            }
            
            // Render overlay only when explicitly needed
            return (
              <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  backgroundColor: heroSection.background_overlay_color || '#000000',
                  opacity: opacityNum,
                }}
                aria-hidden="true"
              />
            )
          })()}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10" style={{ position: 'relative' }}>
            <div 
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ color: heroSection.title_color || undefined }}
            >
              <MarkdownRenderer content={heroSection.title} />
            </div>
            {heroSection.subtitle && (
              <div 
                className={`text-xl md:text-2xl mb-8 max-w-3xl ${
                  heroSection.subtitle_alignment === 'left' ? '' : 'mx-auto'
                }`}
                style={{ 
                  color: heroSection.subtitle_color || undefined,
                  textAlign: heroSection.subtitle_alignment === 'left' ? 'left' :
                             heroSection.subtitle_alignment === 'justify' ? 'justify' :
                             'center'
                }}
              >
                <MarkdownRenderer content={heroSection.subtitle} />
              </div>
            )}
            {(heroSection.primary_cta_text || heroSection.secondary_cta_text) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {heroSection.primary_cta_text && (
                  <a
                    href={heroSection.primary_cta_link || '#contact'}
                    className="px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                    style={{
                      backgroundColor: heroSection.primary_cta_bg_color || 'var(--accent-color)',
                      color: heroSection.primary_cta_text_color || '#ffffff',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                  >
                    {heroSection.primary_cta_text}
                  </a>
                )}
                {heroSection.secondary_cta_text && (
                  <a
                    href={heroSection.secondary_cta_link || '#about'}
                    className="px-8 py-3 rounded-lg font-semibold transition-colors border-2"
                    style={{
                      backgroundColor: heroSection.secondary_cta_bg_color || 'var(--background-color)',
                      color: heroSection.secondary_cta_text_color || 'var(--accent-color)',
                      borderColor: heroSection.secondary_cta_text_color || 'var(--accent-color)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = heroSection.secondary_cta_bg_color || 'var(--background-color)'
                    }}
                  >
                    {heroSection.secondary_cta_text}
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* About Section */}
      {aboutSection && (
        <section id="about" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16 md:scroll-mt-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {(aboutSection.title && aboutSection.title.trim()) && (
              <div className="text-center mb-16">
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  <MarkdownRenderer content={aboutSection.title} />
                </div>
                {aboutSection.subtitle && (
                  <div className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    <MarkdownRenderer content={aboutSection.subtitle} />
                  </div>
                )}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div style={{ 
                color: aboutSection.content_color || undefined,
                fontSize: aboutSection.content_font_size || undefined
              }}>
                <MarkdownRenderer content={aboutSection.content} />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center">
                {aboutSection.image_url ? (
                  <img
                    src={aboutSection.image_url}
                    alt={aboutSection.title || 'About section image'}
                    className="max-w-full w-full h-auto object-contain"
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">[Image Placeholder]</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Services Section */}
      {services.length > 0 && (
        <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-16 md:scroll-mt-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Our Services
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Comprehensive solutions tailored to your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow"
                >
                  {service.icon && (
                    <div className="text-4xl mb-4">{service.icon}</div>
                  )}
                  <div className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    <MarkdownRenderer content={service.title} />
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    <MarkdownRenderer content={service.description} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-16 md:scroll-mt-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                What Our Clients Say
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Trusted by businesses worldwide
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md"
                >
                  {testimonial.rating && (
                    <div className="text-yellow-400 text-2xl mb-4">
                      {'★'.repeat(testimonial.rating)}
                      {'☆'.repeat(5 - testimonial.rating)}
                    </div>
                  )}
                  <div className="text-gray-600 dark:text-gray-400 mb-6 italic">
                    <MarkdownRenderer content={`"${testimonial.quote}"`} />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      <MarkdownRenderer content={testimonial.author_name} />
                    </div>
                    {(testimonial.author_role || testimonial.author_company) && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {[testimonial.author_role, testimonial.author_company]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16 md:scroll-mt-20 w-full">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Ready to start your project? Let's talk!
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </>
  )
}
