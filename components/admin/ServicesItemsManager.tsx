'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ServiceItem {
  id: string
  title: string
  description: string
  icon: string | null
  title_color: string | null
  description_color: string | null
  enabled: boolean
  display_order: number
  created_at: string
}

export default function ServicesItemsManager() {
  const [items, setItems] = useState<ServiceItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<ServiceItem | null>(null)
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    title: '',
    description: '',
    icon: '',
    title_color: '',
    description_color: '',
    enabled: true,
    display_order: 0,
  })

  useEffect(() => {
    loadItems()
  }, [])

  const loadItems = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setItems(data || [])
    } catch (error) {
      console.error('Error loading service items:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const supabase = createClient()
      
      if (editingItem) {
        const updateData = {
          ...formData,
          updated_at: new Date().toISOString(),
        }
        const { error } = await supabase
          .from('services')
          .update(updateData)
          .eq('id', editingItem.id)
        if (error) throw error
      } else {
        const insertData = {
          ...formData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }
        const { error } = await supabase
          .from('services')
          .insert(insertData)
        if (error) throw error
      }

      resetForm()
      loadItems()
    } catch (error: any) {
      console.error('Error saving service item:', error)
      alert(error.message || 'Failed to save service item')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service item?')) return

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id)
      if (error) throw error
      loadItems()
    } catch (error: any) {
      console.error('Error deleting service item:', error)
      alert(error.message || 'Failed to delete service item')
    }
  }

  const handleEdit = (item: ServiceItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      icon: item.icon || '',
      title_color: item.title_color || '',
      description_color: item.description_color || '',
      enabled: item.enabled,
      display_order: item.display_order,
    })
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: '',
      title_color: '',
      description_color: '',
      enabled: true,
      display_order: 0,
    })
    setEditingItem(null)
    setShowForm(false)
  }

  const toggleEnabled = async (item: ServiceItem) => {
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('services')
        .update({ enabled: !item.enabled })
        .eq('id', item.id)
      if (error) throw error
      loadItems()
    } catch (error: any) {
      console.error('Error toggling enabled:', error)
      alert(error.message || 'Failed to update service item')
    }
  }

  const moveItem = async (item: ServiceItem, direction: 'up' | 'down') => {
    try {
      const supabase = createClient()
      const currentIndex = items.findIndex((i) => i.id === item.id)
      if (currentIndex === -1) return

      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
      if (newIndex < 0 || newIndex >= items.length) return

      const targetItem = items[newIndex]
      const currentOrder = item.display_order
      const targetOrder = targetItem.display_order

      await Promise.all([
        supabase
          .from('services')
          .update({ display_order: targetOrder })
          .eq('id', item.id),
        supabase
          .from('services')
          .update({ display_order: currentOrder })
          .eq('id', targetItem.id),
      ])

      loadItems()
    } catch (error: any) {
      console.error('Error moving item:', error)
      alert(error.message || 'Failed to move service item')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading service items...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Service Items
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage individual service items. The services section settings are managed in Sections.
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add New Service Item
        </button>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            {editingItem ? 'Edit Service Item' : 'New Service Item'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Icon (Emoji or text)
              </label>
              <input
                type="text"
                value={formData.icon || ''}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="🌐 or ✨ or icon name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Use an emoji, icon identifier, or leave empty
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.title_color || '#1f2937'}
                    onChange={(e) => setFormData({ ...formData, title_color: e.target.value })}
                    className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    value={formData.title_color || ''}
                    onChange={(e) => setFormData({ ...formData, title_color: e.target.value })}
                    placeholder="Leave empty for default"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description Color
                </label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={formData.description_color || '#4b5563'}
                    onChange={(e) => setFormData({ ...formData, description_color: e.target.value })}
                    className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
                  />
                  <input
                    type="text"
                    value={formData.description_color || ''}
                    onChange={(e) => setFormData({ ...formData, description_color: e.target.value })}
                    placeholder="Leave empty for default"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.enabled ?? true}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                  className="rounded"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Enabled</span>
              </label>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.display_order || 0}
                  onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                  className="w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingItem ? 'Update' : 'Create'} Service Item
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Service Items ({items.length})
          </h3>
          {items.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No service items yet. Click "Add New Service Item" to create one.
            </p>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          #{item.display_order}
                        </span>
                        {item.icon && (
                          <span className="text-2xl">{item.icon}</span>
                        )}
                        <span className={item.enabled ? 'text-green-600' : 'text-red-600'}>
                          {item.enabled ? '✓ Enabled' : '✗ Disabled'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                        {item.title}
                      </h4>
                      {item.description && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => moveItem(item, 'up')}
                          disabled={index === 0}
                          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move up"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => moveItem(item, 'down')}
                          disabled={index === items.length - 1}
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
                            checked={item.enabled}
                            onChange={() => toggleEnabled(item)}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700 dark:text-gray-300">Enabled</span>
                        </label>
                        <button
                          onClick={() => handleEdit(item)}
                          className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py-1 text-sm bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded hover:bg-red-200 dark:hover:bg-red-800"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

