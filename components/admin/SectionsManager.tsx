'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Section {
  id: string
  type: 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials'
  title: string
  enabled: boolean
  inNavigation: boolean
  display_order: number
}

export default function SectionsManager() {
  const [sections, setSections] = useState<Section[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'services' | 'portfolio' | 'testimonials'>('hero')
  const [editingSection, setEditingSection] = useState<string | null>(null)

  useEffect(() => {
    loadSections()
  }, [activeTab])

  const loadSections = async () => {
    try {
      const supabase = createClient()
      let data: any[] = []

      switch (activeTab) {
        case 'hero':
          const { data: heroData } = await supabase
            .from('hero_section')
            .select('*')
            .order('display_order')
          data = heroData || []
          break
        case 'about':
          const { data: aboutData } = await supabase
            .from('about_section')
            .select('*')
            .order('display_order')
          data = aboutData || []
          break
        case 'services':
          const { data: servicesData } = await supabase
            .from('services')
            .select('*')
            .order('display_order')
          data = servicesData || []
          break
        case 'portfolio':
          const { data: portfolioData } = await supabase
            .from('portfolio_items')
            .select('*')
            .order('display_order')
          data = portfolioData || []
          break
        case 'testimonials':
          const { data: testimonialsData } = await supabase
            .from('testimonials')
            .select('*')
            .order('display_order')
          data = testimonialsData || []
          break
      }

      // Check navigation items
      const { data: navItems } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('enabled', true)

      const sectionsWithNav: Section[] = data.map((item) => ({
        id: item.id,
        type: activeTab,
        title: item.title,
        enabled: item.enabled,
        inNavigation: navItems?.some((nav) => nav.section_id === activeTab) || false,
        display_order: item.display_order,
        ...item,
      }))

      setSections(sectionsWithNav)
    } catch (error) {
      console.error('Error loading sections:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleNavigation = async (sectionId: string, sectionType: string) => {
    try {
      const supabase = createClient()
      const section = sections.find((s) => s.id === sectionId)
      const inNav = section?.inNavigation || false

      if (inNav) {
        // Remove from navigation
        await supabase
          .from('navigation_items')
          .delete()
          .eq('section_id', sectionType)
      } else {
        // Add to navigation
        const maxOrder = sections.length > 0 ? Math.max(...sections.map((s) => s.display_order)) : 0
        await supabase
          .from('navigation_items')
          .insert({
            label: sectionType.charAt(0).toUpperCase() + sectionType.slice(1),
            section_id: sectionType,
            enabled: true,
            display_order: maxOrder + 1,
          })
      }

      loadSections()
    } catch (error) {
      console.error('Error toggling navigation:', error)
    }
  }

  const getTableName = () => {
    switch (activeTab) {
      case 'hero':
        return 'hero_section'
      case 'about':
        return 'about_section'
      case 'services':
        return 'services'
      case 'portfolio':
        return 'portfolio_items'
      case 'testimonials':
        return 'testimonials'
      default:
        return 'hero_section'
    }
  }

  const toggleEnabled = async (sectionId: string) => {
    try {
      const supabase = createClient()
      const section = sections.find((s) => s.id === sectionId)

      await supabase
        .from(getTableName())
        .update({ enabled: !section?.enabled })
        .eq('id', sectionId)

      loadSections()
    } catch (error) {
      console.error('Error toggling enabled:', error)
    }
  }

  const deleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) return

    try {
      const supabase = createClient()

      await supabase
        .from(getTableName())
        .delete()
        .eq('id', sectionId)

      loadSections()
    } catch (error) {
      console.error('Error deleting section:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8">
          {(['hero', 'about', 'services', 'portfolio', 'testimonials'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab)
                setLoading(true)
              }}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Sections List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Sections
            </h2>
            <button
              onClick={() => setEditingSection('new')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New
            </button>
          </div>

          <div className="space-y-4">
            {sections.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No sections found. Click "Add New" to create one.
              </p>
            ) : (
              sections.map((section) => (
                <div
                  key={section.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      {section.title}
                    </h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>Order: {section.display_order}</span>
                      <span className={section.enabled ? 'text-green-600' : 'text-red-600'}>
                        {section.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={section.inNavigation}
                        onChange={() => toggleNavigation(section.id, activeTab)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">In Nav</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={section.enabled}
                        onChange={() => toggleEnabled(section.id)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Enabled</span>
                    </label>
                    <button
                      onClick={() => setEditingSection(section.id)}
                      className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteSection(section.id)}
                      className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editingSection && (
        <SectionEditModal
          sectionId={editingSection}
          sectionType={activeTab}
          onClose={() => {
            setEditingSection(null)
            loadSections()
          }}
        />
      )}
    </div>
  )
}

function SectionEditModal({
  sectionId,
  sectionType,
  onClose,
}: {
  sectionId: string
  sectionType: string
  onClose: () => void
}) {
  // This would be a full edit form - simplified for now
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Edit Section</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Full edit form would go here for {sectionType} section (ID: {sectionId})
        </p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    </div>
  )
}

