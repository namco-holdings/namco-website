'use client'

import { useState, useEffect } from 'react'

interface NavigationItem {
  id: string
  label: string
  section_id: string
}

interface NavigationProps {
  companyName: string
  logoUrl: string | null
  headerBackgroundColor: string
  headerTextColor: string
  navItems: NavigationItem[]
}

export default function NavigationClient({ 
  companyName, 
  logoUrl,
  headerBackgroundColor,
  headerTextColor,
  navItems 
}: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 shadow-md"
      style={{
        backgroundColor: headerBackgroundColor,
        color: headerTextColor,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center transition-opacity hover:opacity-80"
            >
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={companyName}
                  className="h-10 md:h-12 w-auto"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const img = e.currentTarget
                    const parent = img.parentElement
                    if (parent) {
                      img.style.display = 'none'
                      const textFallback = parent.querySelector('span') as HTMLElement
                      if (textFallback) textFallback.style.display = 'block'
                    }
                  }}
                />
              ) : null}
              <span
                className={`text-2xl md:text-3xl font-bold ${logoUrl ? 'hidden' : 'block'}`}
                style={{ color: headerTextColor }}
              >
                {companyName}
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section_id)}
                className="transition-colors font-medium hover:opacity-70"
                style={{
                  color: headerTextColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--accent-color)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = headerTextColor
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden focus:outline-none"
            style={{ color: headerTextColor }}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t" style={{ borderColor: 'rgba(0,0,0,0.1)' }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.section_id)}
                className="block w-full text-left px-4 py-2 rounded-md transition-colors hover:opacity-70"
                style={{ color: headerTextColor }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

