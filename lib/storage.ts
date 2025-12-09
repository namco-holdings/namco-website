import { createClient } from './supabase/client'

export async function uploadImage(
  file: File,
  bucket: 'images' | 'content' = 'images',
  folder?: string
): Promise<string> {
  const supabase = createClient()
  
  // Generate unique filename
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = folder ? `${folder}/${fileName}` : fileName

  // Upload file
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}

export async function deleteImage(
  filePath: string,
  bucket: 'images' | 'content' = 'images'
): Promise<void> {
  const supabase = createClient()
  
  // Extract path from full URL if needed
  const path = filePath.includes('/storage/v1/object/public/') 
    ? filePath.split('/storage/v1/object/public/')[1]?.split('/').slice(1).join('/')
    : filePath

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`)
  }
}

export function getStorageUrl(filePath: string, bucket: 'images' | 'content' = 'images'): string {
  const supabase = createClient()
  
  // If it's already a full URL, return it
  if (filePath.startsWith('http')) {
    return filePath
  }

  // Otherwise, get public URL from storage
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath)

  return publicUrl
}



