import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import MarkdownRenderer from '@/components/MarkdownRenderer'
import {
  getSiteSettings,
  getAllSectionsOrdered,
  getServices,
  getPortfolioItems,
  getTestimonials,
} from '@/lib/data'

// Section rendering components
function HeroSection({ section }: { section: any }) {
  return (
    <section
      id="hero"
      className={`min-h-screen flex items-center justify-center relative w-full ${
        section.background_image_url
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
        ...(section.background_image_url
          ? {
              backgroundImage: `url(${section.background_image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'scroll',
            }
          : {}),
      }}
    >
      {/* Background Overlay */}
      {(() => {
        const opacityValue = section.background_overlay_opacity
        const opacityNum = opacityValue == null ? 0 : Number(opacityValue)
        
        const shouldRenderOverlay = 
          Boolean(section.background_image_url) &&
          opacityValue !== null &&
          opacityValue !== undefined &&
          !isNaN(opacityNum) &&
          opacityNum > 0 &&
          opacityNum <= 1
        
        if (!shouldRenderOverlay) {
          return null
        }
        
        return (
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundColor: section.background_overlay_color || '#000000',
              opacity: opacityNum,
            }}
            aria-hidden="true"
          />
        )
      })()}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10" style={{ position: 'relative' }}>
        <div 
          className="text-5xl md:text-7xl font-bold mb-6"
          style={{ color: section.title_color || undefined }}
        >
          <MarkdownRenderer content={section.title} />
        </div>
        {section.subtitle && (
          <div 
            className={`text-xl md:text-2xl mb-8 max-w-3xl ${
              section.subtitle_alignment === 'left' ? '' : 'mx-auto'
            }`}
            style={{ 
              color: section.subtitle_color || undefined,
              textAlign: section.subtitle_alignment === 'left' ? 'left' :
                         section.subtitle_alignment === 'justify' ? 'justify' :
                         'center'
            }}
          >
            <MarkdownRenderer content={section.subtitle} />
          </div>
        )}
        {(section.primary_cta_text || section.secondary_cta_text) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {section.primary_cta_text && (
              <a
                href={section.primary_cta_link || '#contact'}
                className="px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                style={{
                  backgroundColor: section.primary_cta_bg_color || 'var(--accent-color)',
                  color: section.primary_cta_text_color || '#ffffff',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = '0.9'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = '1'
                }}
              >
                {section.primary_cta_text}
              </a>
            )}
            {section.secondary_cta_text && (
              <a
                href={section.secondary_cta_link || '#about'}
                className="px-8 py-3 rounded-lg font-semibold transition-colors border-2"
                style={{
                  backgroundColor: section.secondary_cta_bg_color || 'var(--background-color)',
                  color: section.secondary_cta_text_color || 'var(--accent-color)',
                  borderColor: section.secondary_cta_text_color || 'var(--accent-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = section.secondary_cta_bg_color || 'var(--background-color)'
                }}
              >
                {section.secondary_cta_text}
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  )
}

function AboutSection({ section }: { section: any }) {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16 md:scroll-mt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(section.title && section.title.trim()) && (
          <div className="text-center mb-16">
            <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              <MarkdownRenderer content={section.title} />
            </div>
            {section.subtitle && (
              <div className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                <MarkdownRenderer content={section.subtitle} />
              </div>
            )}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div style={{ 
            color: section.content_color || undefined,
            fontSize: section.content_font_size || undefined
          }}>
            <MarkdownRenderer content={section.content} />
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 flex items-center justify-center">
            {section.image_url ? (
              <img
                src={section.image_url}
                alt={section.title || 'About section image'}
                className="max-w-full w-full h-auto object-contain"
              />
            ) : (
              <p className="text-gray-500 dark:text-gray-400">[Image Placeholder]</p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServicesSection({ services }: { services: any[] }) {
  if (services.length === 0) return null
  
  return (
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
  )
}

function PortfolioSection({ section, portfolioItems }: { section: any; portfolioItems: any[] }) {
  if (portfolioItems.length === 0) return null
  
  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-gray-900 scroll-mt-16 md:scroll-mt-20 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {section?.title && (
            <div 
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ color: section.title_color || undefined }}
            >
              <MarkdownRenderer content={section.title} />
            </div>
          )}
          {!section?.title && (
            <div className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Our Portfolio
            </div>
          )}
          {section?.subtitle && (
            <div 
              className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              style={{ color: section.subtitle_color || undefined }}
            >
              <MarkdownRenderer content={section.subtitle} />
            </div>
          )}
          {!section?.subtitle && (
            <div className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Showcasing our best work and successful projects
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
            >
              {item.image_url && (
                <div className="aspect-video w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {item.category && (
                  <span className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 block">
                    {item.category}
                  </span>
                )}
                <h3 
                  className="text-xl font-semibold text-gray-900 dark:text-white mb-3"
                  style={{ color: item.title_color || undefined }}
                >
                  <MarkdownRenderer content={item.title} />
                </h3>
                {item.description && (
                  <div 
                    className="text-gray-600 dark:text-gray-400 mb-4"
                    style={{ color: item.description_color || undefined }}
                  >
                    <MarkdownRenderer content={item.description} />
                  </div>
                )}
                {item.project_url && (
                  <a
                    href={item.project_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
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
  )
}

function TestimonialsSection({ testimonials }: { testimonials: any[] }) {
  if (testimonials.length === 0) return null
  
  return (
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
  )
}

export default async function Home() {
  const [
    siteSettings,
    orderedSections,
    services,
    portfolioItems,
    testimonials,
  ] = await Promise.all([
    getSiteSettings(),
    getAllSectionsOrdered(),
    getServices(),
    getPortfolioItems(),
    getTestimonials(),
  ])

  // Create a map of section types to their data for easy lookup
  const sectionMap = new Map()
  orderedSections.forEach((s) => {
    sectionMap.set(s.type, s.data)
  })

  // Get portfolio section separately since it's needed for the portfolio section component
  const portfolioSection = sectionMap.get('portfolio')

  return (
    <>
      <Navigation />

      {/* Render sections in order */}
      {orderedSections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <HeroSection key={`hero-${section.data.id}`} section={section.data} />
          case 'about':
            return <AboutSection key={`about-${section.data.id}`} section={section.data} />
          case 'services':
            // Services section needs the services array, not just the section data
            return <ServicesSection key={`services-${section.data.id}`} services={services} />
          case 'portfolio':
            return (
              <PortfolioSection
                key={`portfolio-${section.data.id}`}
                section={portfolioSection}
                portfolioItems={portfolioItems}
              />
            )
          case 'testimonials':
            // Testimonials section needs the testimonials array
            return (
              <TestimonialsSection
                key={`testimonials-${section.data.id}`}
                testimonials={testimonials}
              />
            )
          default:
            return null
        }
      })}

      {/* Contact Section - Always at the end */}
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
