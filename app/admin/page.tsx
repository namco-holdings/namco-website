import { requireAdmin } from '@/lib/admin'
import { getSiteSettings } from '@/lib/data'
import CompanyProfileForm from '@/components/admin/CompanyProfileForm'

export default async function AdminPage() {
  await requireAdmin()
  const siteSettings = await getSiteSettings()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Company Profile
      </h1>
      <CompanyProfileForm initialData={siteSettings} />
    </div>
  )
}

