import { requireAdmin } from '@/lib/admin'
import SectionsManager from '@/components/admin/SectionsManager'

export default async function SectionsPage() {
  await requireAdmin()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Section Management
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Manage all sections of your website. Add, edit, remove sections and control navigation visibility.
      </p>
      <SectionsManager />
    </div>
  )
}

