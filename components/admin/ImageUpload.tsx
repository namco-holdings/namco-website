'use client'

import { useState } from 'react'
import { uploadImage, deleteImage } from '@/lib/storage'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  bucket?: 'images' | 'content'
  folder?: string
  label?: string
  accept?: string
}

export default function ImageUpload({
  value,
  onChange,
  bucket = 'images',
  folder,
  label = 'Image',
  accept = 'image/*',
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(value || null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB for images, 10MB for content)
    const maxSize = bucket === 'content' ? 10 * 1024 * 1024 : 5 * 1024 * 1024
    if (file.size > maxSize) {
      setError(`File size must be less than ${maxSize / 1024 / 1024}MB`)
      return
    }

    setUploading(true)
    setError(null)

    try {
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Upload to Supabase Storage
      const url = await uploadImage(file, bucket, folder)
      onChange(url)
    } catch (err: any) {
      setError(err.message || 'Failed to upload image')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!value) return

    try {
      // Try to delete from storage if it's a storage URL
      if (value.includes('supabase.co/storage')) {
        await deleteImage(value, bucket)
      }
      onChange('')
      setPreview(null)
    } catch (err) {
      // If deletion fails, just clear the value
      onChange('')
      setPreview(null)
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="max-w-xs max-h-48 rounded-lg border border-gray-300 dark:border-gray-600"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            title="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center gap-4">
        <label className="flex-1 cursor-pointer">
          <input
            type="file"
            accept={accept}
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
          <div className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-center text-sm text-gray-700 dark:text-gray-300">
            {uploading ? 'Uploading...' : preview ? 'Change Image' : 'Upload Image'}
          </div>
        </label>

        {value && !preview && (
          <div className="flex-1">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="Or enter image URL"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {value && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Current: {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </p>
      )}
    </div>
  )
}

