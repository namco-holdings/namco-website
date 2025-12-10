'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import SectionEditModal from './SectionEditModal'

interface UnifiedSection {
  id: string
  section_number: number
  section_name: string
  section_type: 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials'
  title: string
  enabled: boolean
  inNavigation: boolean
  display_order: number
  table_name: string
}

export default function SectionsManager() {
  const [sections, setSections] = useState<UnifiedSection[]>([])
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<{ id: string; type: string } | null>(null)

  useEffect(() => {
    loadAllSections()
  }, [])

  const loadAllSections = async () => {
    try {
      const supabase = createClient()
      
      // Load all sections from all tables
      const [heroData, aboutData, servicesSectionData, portfolioSectionData, testimonialsData, navItems] = await Promise.all([
        supabase.from('hero_section').select('*').order('display_order'),
        supabase.from('about_section').select('*').order('display_order'),
        supabase.from('services_section').select('*').order('display_order'),
        supabase.from('portfolio_section').select('*').order('display_order'),
        supabase.from('testimonials').select('*').order('display_order'),
        supabase.from('navigation_items').select('*').eq('enabled', true),
      ])

      // Combine all sections into one array
      const allSections: UnifiedSection[] = []
      
      // Helper to add sections
      const addSections = (
        data: any[] | null,
        type: 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials',
        tableName: string
      ) => {
        if (!data) return
        data.forEach((item) => {
          // Check if this section type is in navigation (section_id stores section type)
          const navItem = navItems.data?.find((nav) => nav.section_id === type)
          allSections.push({
            id: item.id,
            section_number: item.display_order,
            section_name: item.section_name || item.title || type.charAt(0).toUpperCase() + type.slice(1),
            section_type: type,
            title: item.title || item.quote || 'Untitled',
            enabled: item.enabled,
            inNavigation: !!navItem,
            display_order: item.display_order,
            table_name: tableName,
          })
        })
      }

      addSections(heroData.data, 'hero', 'hero_section')
      addSections(aboutData.data, 'about', 'about_section')
      addSections(servicesSectionData.data, 'services', 'services_section')
      addSections(portfolioSectionData.data, 'portfolio', 'portfolio_section')
      addSections(testimonialsData.data, 'testimonials', 'testimonials')

      // Sort by display_order
      allSections.sort((a, b) => a.display_order - b.display_order)

      setSections(allSections)
    } catch (error) {
      console.error('Error loading sections:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleNavigation = async (section: UnifiedSection) => {
    try {
      const supabase = createClient()
      
      if (section.inNavigation) {
        // Remove from navigation - find by section_id matching the section type
        await supabase
          .from('navigation_items')
          .delete()
          .eq('section_id', section.section_type)
      } else {
        // Add to navigation - use section_name as label, section_type as section_id for scrolling
        // Get max display_order from existing nav items
        const { data: existingNav } = await supabase
          .from('navigation_items')
          .select('display_order')
          .order('display_order', { ascending: false })
          .limit(1)
        
        const maxOrder = existingNav && existingNav.length > 0 ? existingNav[0].display_order : 0
        
        await supabase
          .from('navigation_items')
          .insert({
            label: section.section_name,
            section_id: section.section_type, // Use section type for scrolling compatibility
            enabled: true,
            display_order: maxOrder + 1,
          })
      }

      loadAllSections()
    } catch (error) {
      console.error('Error toggling navigation:', error)
    }
  }

  const toggleEnabled = async (section: UnifiedSection) => {
    try {
      const supabase = createClient()

      await supabase
        .from(section.table_name)
        .update({ enabled: !section.enabled })
        .eq('id', section.id)

      loadAllSections()
    } catch (error) {
      console.error('Error toggling enabled:', error)
    }
  }

  const deleteSection = async (section: UnifiedSection) => {
    if (!confirm(`Are you sure you want to delete section ${section.section_number} (${section.section_name})?`)) return

    try {
      const supabase = createClient()

      // Remove from navigation first
      await supabase
        .from('navigation_items')
        .delete()
        .eq('section_id', section.section_type)

      // Delete the section
      await supabase
        .from(section.table_name)
        .delete()
        .eq('id', section.id)

      loadAllSections()
    } catch (error) {
      console.error('Error deleting section:', error)
    }
  }

  const moveSection = async (section: UnifiedSection, direction: 'up' | 'down') => {
    try {
      const supabase = createClient()
      const currentIndex = sections.findIndex((s) => s.id === section.id)
      if (currentIndex === -1) return

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      if (newIndex < 0 || newIndex >= sections.length) return

      // Create a new array with the section moved
      const newSections = [...sections]
      const [movedSection] = newSections.splice(currentIndex, 1)
      newSections.splice(newIndex, 0, movedSection)

      // Reassign display_order values based on new positions (starting from 0)
      // Group updates by table to batch them efficiently
      const updatesByTable = new Map<string, Array<{ id: string; display_order: number }>>()

      newSections.forEach((s, index) => {
        if (!updatesByTable.has(s.table_name)) {
          updatesByTable.set(s.table_name, [])
        }
        updatesByTable.get(s.table_name)!.push({
          id: s.id,
          display_order: index,
        })
      })

      // Execute all updates
      await Promise.all(
        Array.from(updatesByTable.entries()).map(([tableName, updates]) =>
          Promise.all(
            updates.map((update) =>
              supabase
                .from(tableName)
                .update({ display_order: update.display_order })
                .eq('id', update.id)
            )
          )
        )
      )

      // Update navigation order to match section order (using the new order)
      await updateNavigationOrder(newSections)

      loadAllSections()
    } catch (error) {
      console.error('Error moving section:', error)
      alert('Failed to move section. Please try again.')
    }
  }

  const updateNavigationOrder = async (updatedSections?: UnifiedSection[]) => {
    try {
      const supabase = createClient()
      
      // Use provided sections or current state
      const sectionsToUse = updatedSections || sections
      
      // Get all enabled sections in order
      const enabledSections = sectionsToUse
        .filter((s) => s.enabled && s.inNavigation)
        .sort((a, b) => a.display_order - b.display_order)

      // Update navigation items to match section order
      for (let i = 0; i < enabledSections.length; i++) {
        const section = enabledSections[i]
        await supabase
          .from('navigation_items')
          .update({ display_order: section.display_order })
          .eq('section_id', section.section_type)
      }
    } catch (error) {
      console.error('Error updating navigation order:', error)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Sections List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Website Sections
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Manage all sections. Sections are numbered by their display order. Custom names appear in navigation.
              </p>
            </div>
            <button
              onClick={() => {
                // Show a dialog to select section type
                const type = prompt('Enter section type (hero, about, services, portfolio, testimonials):')
                if (type && ['hero', 'about', 'services', 'portfolio', 'testimonials'].includes(type)) {
                  setEditingSection({ id: 'new', type })
                }
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add New Section
            </button>
          </div>

          <div className="space-y-4">
            {sections.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No sections found. Click "Add New Section" to create one.
              </p>
            ) : (
              sections.map((section, index) => (
                <div
                  key={section.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          Section {section.display_order}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          {section.section_type}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {section.section_name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {section.title}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className={section.enabled ? 'text-green-600' : 'text-red-600'}>
                          {section.enabled ? '✓ Enabled' : '✗ Disabled'}
                        </span>
                        {section.inNavigation && (
                          <span className="text-blue-600">📍 In Navigation</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      {/* Move Up/Down Buttons */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveSection(section, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveSection(section, 'down')}
                          disabled={index === sections.length - 1}
                          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move down"
                        >
                          ↓
                        </button>
                      </div>
                      <div className="flex items-center gap-4 border-l border-gray-300 dark:border-gray-600 pl-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={section.inNavigation}
                            onChange={() => toggleNavigation(section)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Nav</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={section.enabled}
                            onChange={() => toggleEnabled(section)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Enabled</span>
                        </label>
                        <button
                          onClick={() => setEditingSection({ id: section.id, type: section.section_type })}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteSection(section)}
                          className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
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
          sectionId={editingSection.id}
          sectionType={editingSection.type as 'hero' | 'about' | 'services' | 'portfolio' | 'testimonials'}
          onClose={() => {
            setEditingSection(null)
            loadAllSections()
          }}
        />
      )}
    </div>
  )
}
