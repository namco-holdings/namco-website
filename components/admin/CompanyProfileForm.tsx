'use client'

import { useState, FormEvent } from 'react'
import { Database } from '@/lib/supabase/types'
import ImageUpload from './ImageUpload'

type SiteSettings = Database['public']['Tables']['site_settings']['Row']

interface CompanyProfileFormProps {
  initialData: SiteSettings
}

export default function CompanyProfileForm({ initialData }: CompanyProfileFormProps) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [formData, setFormData] = useState({
    company_name: initialData.company_name || '',
    company_tagline: initialData.company_tagline || '',
    logo_url: initialData.logo_url || '',
    favicon_url: initialData.favicon_url || '',
    primary_color: initialData.primary_color || '#2563eb',
    secondary_color: initialData.secondary_color || '#1e40af',
    background_color: initialData.background_color || '#ffffff',
    background_color_dark: initialData.background_color_dark || '#0a0a0a',
    text_color: initialData.text_color || '#171717',
    text_color_dark: initialData.text_color_dark || '#ededed',
    accent_color: initialData.accent_color || initialData.primary_color || '#2563eb',
    accent_color_hover: initialData.accent_color_hover || initialData.secondary_color || '#1e40af',
    border_color: initialData.border_color || '#e5e7eb',
    border_color_dark: initialData.border_color_dark || '#374151',
    header_background_color: initialData.header_background_color || '#ffffff',
    header_text_color: initialData.header_text_color || '#171717',
    contact_email: initialData.contact_email || '',
    contact_phone: initialData.contact_phone || '',
    contact_address: initialData.contact_address || '',
    social_facebook: initialData.social_facebook || '',
    social_twitter: initialData.social_twitter || '',
    social_linkedin: initialData.social_linkedin || '',
    social_instagram: initialData.social_instagram || '',
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update settings')
      }

      setMessage({ type: 'success', text: 'Settings updated successfully!' })
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update settings' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === 'success'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Basic Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Name *
          </label>
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Company Tagline
          </label>
          <input
            type="text"
            name="company_tagline"
            value={formData.company_tagline}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <ImageUpload
            value={formData.logo_url || ''}
            onChange={(url) => setFormData({ ...formData, logo_url: url })}
            bucket="images"
            folder="logo"
            label="Company Logo"
            accept="image/*"
          />
        </div>

        <div>
          <ImageUpload
            value={formData.favicon_url || ''}
            onChange={(url) => setFormData({ ...formData, favicon_url: url })}
            bucket="images"
            folder="favicon"
            label="Favicon"
            accept="image/x-icon,image/png,image/svg+xml"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Brand Colors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Primary Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Secondary Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="secondary_color"
                value={formData.secondary_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="secondary_color"
                value={formData.secondary_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Accent Color (Buttons, Links)
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="accent_color"
                value={formData.accent_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="accent_color"
                value={formData.accent_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Accent Hover Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="accent_color_hover"
                value={formData.accent_color_hover}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="accent_color_hover"
                value={formData.accent_color_hover}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Background Colors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Light Mode Background
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="background_color"
                value={formData.background_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="background_color"
                value={formData.background_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dark Mode Background
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="background_color_dark"
                value={formData.background_color_dark}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="background_color_dark"
                value={formData.background_color_dark}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Text Colors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Light Mode Text
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="text_color"
                value={formData.text_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="text_color"
                value={formData.text_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dark Mode Text
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="text_color_dark"
                value={formData.text_color_dark}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="text_color_dark"
                value={formData.text_color_dark}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Border Colors
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Light Mode Border
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="border_color"
                value={formData.border_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="border_color"
                value={formData.border_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Dark Mode Border
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="border_color_dark"
                value={formData.border_color_dark}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="border_color_dark"
                value={formData.border_color_dark}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Header Settings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Header Background Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="header_background_color"
                value={formData.header_background_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="header_background_color"
                value={formData.header_background_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Header Text Color
            </label>
            <div className="flex gap-2">
              <input
                type="color"
                name="header_text_color"
                value={formData.header_text_color}
                onChange={handleChange}
                className="w-16 h-10 border border-gray-300 dark:border-gray-600 rounded"
              />
              <input
                type="text"
                name="header_text_color"
                value={formData.header_text_color}
                onChange={handleChange}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Contact Information
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Address
          </label>
          <textarea
            name="contact_address"
            value={formData.contact_address}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Social Media
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Facebook
            </label>
            <input
              type="url"
              name="social_facebook"
              value={formData.social_facebook}
              onChange={handleChange}
              placeholder="https://facebook.com/yourcompany"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Twitter
            </label>
            <input
              type="url"
              name="social_twitter"
              value={formData.social_twitter}
              onChange={handleChange}
              placeholder="https://twitter.com/yourcompany"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              LinkedIn
            </label>
            <input
              type="url"
              name="social_linkedin"
              value={formData.social_linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/company/yourcompany"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Instagram
            </label>
            <input
              type="url"
              name="social_instagram"
              value={formData.social_instagram}
              onChange={handleChange}
              placeholder="https://instagram.com/yourcompany"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  )
}

