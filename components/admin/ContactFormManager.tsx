'use client'

export default function ContactFormManager() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Contact Form Configuration
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your contact form is configured to use Netlify Forms. All submissions are automatically
          collected and can be viewed in your Netlify dashboard.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
            How to View Submissions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-blue-800 dark:text-blue-300">
            <li>Go to your Netlify dashboard</li>
            <li>Navigate to your site</li>
            <li>Click on "Forms" in the sidebar</li>
            <li>View all submissions for the "contact" form</li>
          </ol>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            Form Configuration
          </h3>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Form Name:</strong> contact
            </p>
            <p>
              <strong>Form Fields:</strong> name, email, subject, message
            </p>
            <p>
              <strong>Submission Method:</strong> Netlify Forms (automatic)
            </p>
            <p>
              <strong>Notifications:</strong> Configure email notifications in Netlify dashboard
            </p>
          </div>
        </div>

        <div className="mt-6">
          <a
            href="https://app.netlify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Netlify Dashboard
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Form Code
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The contact form is already integrated into your website. The form component
          automatically handles Netlify Forms submission.
        </p>
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm">
            {`<form name="contact" method="POST" data-netlify="true">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Form fields -->
</form>`}
          </pre>
        </div>
      </div>
    </div>
  )
}

