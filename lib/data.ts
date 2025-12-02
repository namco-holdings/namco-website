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

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })

    return data || []
  } catch {
    return []
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

export async function getNavigationItems(): Promise<NavigationItem[]> {
  try {
    const supabase = await createClient()
    const { data } = await supabase
      .from('navigation_items')
      .select('*')
      .eq('enabled', true)
      .order('display_order', { ascending: true })

    return data || []
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

