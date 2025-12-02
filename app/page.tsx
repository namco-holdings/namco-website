import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import {
  getSiteSettings,
  getHeroSection,
  getAboutSection,
  getServices,
  getPortfolioItems,
  getTestimonials,
} from '@/lib/data'

export default async function Home() {
  const [
    siteSettings,
    heroSection,
    aboutSection,
    services,
    portfolioItems,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getHeroSection(),
    getAboutSection(),
    getServices(),
    getPortfolioItems(),
    getTestimonials(),
  ])

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      {heroSection && (
        <section
          id="hero"
          className={`min-h-screen flex items-center justify-center relative ${
            heroSection.background_image_url
              ? ''
              : 'bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800'
          }`}
          style={{
            paddingTop: '80px',
            scrollMarginTop: '80px',
            ...(heroSection.background_image_url
              ? {
                  backgroundImage: `url(${heroSection.background_image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}),
          }}
        >
          {/* Background Overlay - Only show if opacity > 0 */}
          {heroSection.background_image_url && 
           heroSection.background_overlay_opacity !== null && 
           heroSection.background_overlay_opacity !== undefined &&
           Number(heroSection.background_overlay_opacity) > 0 && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundColor: heroSection.background_overlay_color || '#000000',
                opacity: Number(heroSection.background_overlay_opacity),
              }}
            />
          )}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              {heroSection.title}
            </h1>
            {heroSection.subtitle && (
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                {heroSection.subtitle}
              </p>
            )}
            {(heroSection.primary_cta_text || heroSection.secondary_cta_text) && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {heroSection.primary_cta_text && (
                  <a
                    href={heroSection.primary_cta_link || '#contact'}
                    className="px-8 py-3 text-white rounded-lg font-semibold transition-colors shadow-lg"
                    style={{
                      backgroundColor: 'var(--accent-color)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-color-hover)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--accent-color)'
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
                      backgroundColor: 'var(--background-color)',
                      color: 'var(--accent-color)',
                      borderColor: 'var(--accent-color)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--background-color)'
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
        <section id="about" className="py-20 bg-white dark:bg-gray-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {aboutSection.title}
              </h2>
              {aboutSection.subtitle && (
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  {aboutSection.subtitle}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="text-gray-600 dark:text-gray-400 whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: aboutSection.content }}
                />
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 h-64 flex items-center justify-center">
                {aboutSection.image_url ? (
                  <img
                    src={aboutSection.image_url}
                    alt={aboutSection.title}
                    className="max-w-full max-h-full object-contain"
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
        <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
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
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Portfolio Section */}
      {portfolioItems.length > 0 && (
        <section id="portfolio" className="py-20 bg-white dark:bg-gray-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Our Portfolio
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Showcasing our best work and successful projects
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <p className="text-white text-lg font-semibold">{item.title}</p>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.description}
                      </p>
                    )}
                    {item.project_url && (
                      <a
                        href={item.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800 scroll-mt-20">
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
                  <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                    "{testimonial.quote}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author_name}
                    </p>
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
      <section id="contact" className="py-20 bg-white dark:bg-gray-900 scroll-mt-20">
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
