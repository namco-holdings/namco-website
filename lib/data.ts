import { createClient } from './supabase/server'
import { Database } from './supabase/types'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']
type HeroSection = Database['public']['Tables']['hero_section']['Row']
type AboutSection = Database['public']['Tables']['about_section']['Row']
type Service = Database['public']['Tables']['services']['Row']
type PortfolioItem = Database['public']['Tables']['portfolio_items']['Row']
type Testimonial = Database['public']['Tables']['testimonials']['Row']
type NavigationItem = Database['public']['Tables']['navigation_items']['Row']
type FooterContent = Database['public']['Tables']['footer_content']['Row']

// Default fallback values if database is not configured
const DEFAULT_SITE_SETTINGS: SiteSettings = {
  id: 'default',
  company_name: 'Your Company',
  company_tagline: null,
  logo_url: null,
  favicon_url: null,
  primary_color: '#2563eb',
  secondary_color: '#1e40af',
  background_color: '#ffffff',
  background_color_dark: '#0a0a0a',
  text_color: '#171717',
  text_color_dark: '#ededed',
  accent_color: '#2563eb',
  accent_color_hover: '#1e40af',
  border_color: '#e5e7eb',
  border_color_dark: '#374151',
  header_background_color: '#ffffff',
  header_text_color: '#171717',
  font_family: 'Inter',
  contact_email: null,
  contact_phone: null,
  contact_address: null,
  social_facebook: null,
  social_twitter: null,
  social_linkedin: null,
  social_instagram: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
}

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .single()

    if (error || !data) {
      return DEFAULT_SITE_SETTINGS
    }

    return data
  } catch {
    return DEFAULT_SITE_SETTINGS
  }
}

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('hero_section')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    return data
  } catch {
    return null
  }
}

export async function getAboutSection(): Promise<AboutSection | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('about_section')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    return data
  } catch {
    return null
  }
}

export async function getServicesSection(): Promise<{
  id: string
  section_name: string | null
  title: string | null
  subtitle: string | null
  title_color: string | null
  subtitle_color: string | null
  enabled: boolean
  display_order: number
} | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('services_section')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    return data
  } catch {
    // Fallback: try to get section info from first service item
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from('services')
        .select('section_name, display_order')
        .eq('enabled', true)
        .order('display_order', { ascending: true })
        .limit(1)
        .single()

      if (data) {
        return {
          id: 'fallback',
          section_name: data.section_name || 'Services',
          title: 'Our Services',
          subtitle: 'Comprehensive solutions tailored to your needs',
          title_color: null,
          subtitle_color: null,
          enabled: true,
          display_order: data.display_order || 0,
        }
      }
    } catch {
      // Return default if nothing found
      return {
        id: 'default',
        section_name: 'Services',
        title: 'Our Services',
        subtitle: 'Comprehensive solutions tailored to your needs',
        title_color: null,
        subtitle_color: null,
        enabled: true,
        display_order: 0,
      }
    }
    return null
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true })

    return data || []
  } catch {
    return []
  }
}

export async function getPortfolioSection(): Promise<{
  id: string
  section_name: string | null
  title: string | null
  subtitle: string | null
  title_color: string | null
  subtitle_color: string | null
  enabled: boolean
  display_order: number
} | null> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('portfolio_section')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })
      .limit(1)
      .single()

    return data
  } catch {
    // Fallback: try to get section info from first portfolio item
    try {
      const supabase = await createClient()
      const { data } = await supabase
        .from('portfolio_items')
        .select('section_name, display_order')
        .eq('enabled', true)
        .order('display_order', { ascending: true })
        .limit(1)
        .single()

      if (data) {
        return {
          id: 'fallback',
          section_name: data.section_name || 'Portfolio',
          title: 'Our Portfolio',
          subtitle: 'Showcasing our best work and successful projects',
          title_color: null,
          subtitle_color: null,
          enabled: true,
          display_order: data.display_order || 0,
        }
      }
    } catch {
      // Return default if nothing found
      return {
        id: 'default',
        section_name: 'Portfolio',
        title: 'Our Portfolio',
        subtitle: 'Showcasing our best work and successful projects',
        title_color: null,
        subtitle_color: null,
        enabled: true,
        display_order: 0,
      }
    }
    return null
  }
}

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })

    return data || []
  } catch {
    return []
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })

    return data || []
  } catch {
    return []
  }
}

// Get all sections ordered by display_order for page rendering
export async function getAllSectionsOrdered() {
  try {
    const supabase = await createClient()
    
    const [heroData, aboutData, servicesSectionData, portfolioSectionData, testimonialsData] = await Promise.all([
      supabase.from('hero_section').select('*').eq('enabled', true).order('display_order'),
      supabase.from('about_section').select('*').eq('enabled', true).order('display_order'),
      supabase.from('services_section').select('*').eq('enabled', true).order('display_order'),
      supabase.from('portfolio_section').select('*').eq('enabled', true).order('display_order'),
      supabase.from('testimonials').select('*').eq('enabled', true).order('display_order'),
    ])

    const allSections: Array<{ type: string; display_order: number; data: any }> = []
    
    // Hero sections - one per item
    heroData.data?.forEach((item) => {
      allSections.push({ type: 'hero', display_order: item.display_order, data: item })
    })
    
    // About sections - one per item
    aboutData.data?.forEach((item) => {
      allSections.push({ type: 'about', display_order: item.display_order, data: item })
    })
    
    // Services sections - one per item
    servicesSectionData.data?.forEach((item) => {
      allSections.push({ type: 'services', display_order: item.display_order, data: item })
    })
    
    // Portfolio sections - one per item
    portfolioSectionData.data?.forEach((item) => {
      allSections.push({ type: 'portfolio', display_order: item.display_order, data: item })
    })
    
    // Testimonials - only add one section if there are any testimonials
    // Use the first testimonial's display_order as the section order
    if (testimonialsData.data && testimonialsData.data.length > 0) {
      const firstTestimonial = testimonialsData.data[0]
      allSections.push({ 
        type: 'testimonials', 
        display_order: firstTestimonial.display_order, 
        data: { id: 'testimonials-section', section_name: firstTestimonial.section_name || 'Testimonials' }
      })
    }

    // Sort by display_order
    allSections.sort((a, b) => a.display_order - b.display_order)

    return allSections
  } catch {
    return []
  }
}

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    const supabase = await createClient()
    
    // Get all enabled sections from all tables, ordered by display_order
    const [heroData, aboutData, servicesData, portfolioSectionData, testimonialsData] = await Promise.all([
      supabase.from('hero_section').select('id, section_name, display_order, enabled').eq('enabled', true).order('display_order'),
      supabase.from('about_section').select('id, section_name, display_order, enabled').eq('enabled', true).order('display_order'),
      supabase.from('services_section').select('id, section_name, display_order, enabled').eq('enabled', true).order('display_order'),
      supabase.from('portfolio_section').select('id, section_name, display_order, enabled').eq('enabled', true).order('display_order'),
      supabase.from('testimonials').select('id, section_name, display_order, enabled').eq('enabled', true).order('display_order'),
    ])

    // Combine all sections
    const allSections: Array<{ id: string; section_name: string | null; display_order: number; type: string }> = []
    
    const addSections = (data: any[] | null, type: string) => {
      if (!data) return
      data.forEach((item) => {
        allSections.push({
          id: item.id,
          section_name: item.section_name,
          display_order: item.display_order,
          type,
        })
      })
    }

    addSections(heroData.data, 'hero')
    addSections(aboutData.data, 'about')
    addSections(servicesData.data, 'services')
    addSections(portfolioSectionData.data, 'portfolio')
    addSections(testimonialsData.data, 'testimonials')

    // Sort by display_order
    allSections.sort((a, b) => a.display_order - b.display_order)

    // Get navigation items to check which sections are in navigation
    const { data: navItems } = await supabase
      .from('navigation_items')
      .select('section_id')
      .eq('enabled', true)

    const navSectionTypes = new Set(navItems?.map((item) => item.section_id) || [])

    // Build navigation items from sections that are in navigation, maintaining section order
    // Group by section type to ensure only one nav item per section type
    const sectionTypeMap = new Map<string, { id: string; section_name: string | null; display_order: number; type: string }>()
    
    allSections.forEach((section) => {
      if (navSectionTypes.has(section.type)) {
        // Only keep the first section of each type (or the one with the lowest display_order)
        const existing = sectionTypeMap.get(section.type)
        if (!existing || section.display_order < existing.display_order) {
          sectionTypeMap.set(section.type, section)
        }
      }
    })

    const navigationItems: NavigationItem[] = Array.from(sectionTypeMap.values())
      .sort((a, b) => a.display_order - b.display_order)
      .map((section) => ({
        id: `nav-${section.type}`,
        label: section.section_name || section.type,
        section_id: section.type,
        enabled: true,
        display_order: section.display_order,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }))

    return navigationItems
  } catch {
    return []
  }
}

export async function getFooterContent(): Promise<FooterContent[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('footer_content')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })

    return data || []
  } catch {
    return []
  }
}
