export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      site_settings: {
        Row: {
          id: string
          company_name: string
          company_tagline: string | null
          logo_url: string | null
          favicon_url: string | null
          primary_color: string
          secondary_color: string
          background_color: string | null
          background_color_dark: string | null
          text_color: string | null
          text_color_dark: string | null
          accent_color: string | null
          accent_color_hover: string | null
          border_color: string | null
          border_color_dark: string | null
          header_background_color: string | null
          header_text_color: string | null
          font_family: string | null
          contact_email: string | null
          contact_phone: string | null
          contact_address: string | null
          social_facebook: string | null
          social_twitter: string | null
          social_linkedin: string | null
          social_instagram: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_name?: string
          company_tagline?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          primary_color?: string
          secondary_color?: string
          background_color?: string | null
          background_color_dark?: string | null
          text_color?: string | null
          text_color_dark?: string | null
          accent_color?: string | null
          accent_color_hover?: string | null
          border_color?: string | null
          border_color_dark?: string | null
          header_background_color?: string | null
          header_text_color?: string | null
          font_family?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_address?: string | null
          social_facebook?: string | null
          social_twitter?: string | null
          social_linkedin?: string | null
          social_instagram?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_name?: string
          company_tagline?: string | null
          logo_url?: string | null
          favicon_url?: string | null
          primary_color?: string
          secondary_color?: string
          background_color?: string | null
          background_color_dark?: string | null
          text_color?: string | null
          text_color_dark?: string | null
          accent_color?: string | null
          accent_color_hover?: string | null
          border_color?: string | null
          border_color_dark?: string | null
          header_background_color?: string | null
          header_text_color?: string | null
          font_family?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          contact_address?: string | null
          social_facebook?: string | null
          social_twitter?: string | null
          social_linkedin?: string | null
          social_instagram?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hero_section: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          primary_cta_text: string | null
          primary_cta_link: string | null
          secondary_cta_text: string | null
          secondary_cta_link: string | null
          background_image_url: string | null
          background_overlay_color: string | null
          background_overlay_opacity: number | null
          title_color: string | null
          subtitle_color: string | null
          subtitle_alignment: string | null
          primary_cta_text_color: string | null
          primary_cta_bg_color: string | null
          secondary_cta_text_color: string | null
          secondary_cta_bg_color: string | null
          section_name: string | null
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          primary_cta_text?: string | null
          primary_cta_link?: string | null
          secondary_cta_text?: string | null
          secondary_cta_link?: string | null
          background_image_url?: string | null
          background_overlay_color?: string | null
          background_overlay_opacity?: number | null
          title_color?: string | null
          subtitle_color?: string | null
          subtitle_alignment?: string | null
          primary_cta_text_color?: string | null
          primary_cta_bg_color?: string | null
          secondary_cta_text_color?: string | null
          secondary_cta_bg_color?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          primary_cta_text?: string | null
          primary_cta_link?: string | null
          secondary_cta_text?: string | null
          secondary_cta_link?: string | null
          background_image_url?: string | null
          background_overlay_color?: string | null
          background_overlay_opacity?: number | null
          title_color?: string | null
          subtitle_color?: string | null
          subtitle_alignment?: string | null
          primary_cta_text_color?: string | null
          primary_cta_bg_color?: string | null
          secondary_cta_text_color?: string | null
          secondary_cta_bg_color?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      about_section: {
        Row: {
          id: string
          title: string
          subtitle: string | null
          content: string
          image_url: string | null
          title_color: string | null
          subtitle_color: string | null
          content_color: string | null
          content_font_size: string | null
          section_name: string | null
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          content: string
          image_url?: string | null
          title_color?: string | null
          subtitle_color?: string | null
          content_color?: string | null
          content_font_size?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          content?: string
          image_url?: string | null
          title_color?: string | null
          subtitle_color?: string | null
          content_color?: string | null
          content_font_size?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          title_color: string | null
          description_color: string | null
          section_name: string | null
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          title_color?: string | null
          description_color?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      portfolio_items: {
        Row: {
          id: string
          title: string
          description: string | null
          image_url: string | null
          project_url: string | null
          category: string | null
          title_color: string | null
          description_color: string | null
          section_name: string | null
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image_url?: string | null
          project_url?: string | null
          category?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          project_url?: string | null
          category?: string | null
          title_color?: string | null
          description_color?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          author_name: string
          author_role: string | null
          author_company: string | null
          author_image_url: string | null
          rating: number | null
          quote_color: string | null
          author_name_color: string | null
          author_role_color: string | null
          section_name: string | null
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          quote: string
          author_name: string
          author_role?: string | null
          author_company?: string | null
          author_image_url?: string | null
          rating?: number | null
          quote_color?: string | null
          author_name_color?: string | null
          author_role_color?: string | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          quote?: string
          author_name?: string
          author_role?: string | null
          author_company?: string | null
          author_image_url?: string | null
          rating?: number | null
          section_name?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      navigation_items: {
        Row: {
          id: string
          label: string
          section_id: string
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          section_id: string
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          section_id?: string
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      footer_content: {
        Row: {
          id: string
          section_type: string
          title: string | null
          content: string | null
          enabled: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section_type: string
          title?: string | null
          content?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section_type?: string
          title?: string | null
          content?: string | null
          enabled?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          author_id: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      news_articles: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          featured_image: string | null
          author_id: string | null
          published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          featured_image?: string | null
          author_id?: string | null
          published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
