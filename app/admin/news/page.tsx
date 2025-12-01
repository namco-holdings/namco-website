import { requireAdmin } from '@/lib/admin'
import NewsManager from '@/components/admin/NewsManager'

export default async function NewsPage() {
  await requireAdmin()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        News Management
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Manage news articles for your website. Create, edit, and publish news articles.
      </p>
      <NewsManager />
    </div>
  )
}

