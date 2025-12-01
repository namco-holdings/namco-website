import { createClient } from './supabase/server'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const metadata = user.user_metadata
  if (metadata?.role !== 'admin') {
    redirect('/')
  }

  return { user, supabase }
}

export async function isAdmin(): Promise<boolean> {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return false

    const metadata = user.user_metadata
    return metadata?.role === 'admin'
  } catch {
    return false
  }
}

