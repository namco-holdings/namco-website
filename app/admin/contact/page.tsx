import { requireAdmin } from '@/lib/admin'
import ContactFormManager from '@/components/admin/ContactFormManager'

export default async function ContactPage() {
  await requireAdmin()

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Contact Form Management
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        View and manage contact form submissions. The form uses Netlify Forms and submissions appear in your Netlify dashboard.
      </p>
      <ContactFormManager />
    </div>
  )
}

