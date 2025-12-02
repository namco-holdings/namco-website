'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface MarkdownRendererProps {
  content: string
  className?: string
}

export default function MarkdownRenderer({ content, className = '' }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Customize heading styles - render as span to inherit parent styles
          h1: ({ node, ...props }) => <span {...props} />,
          h2: ({ node, ...props }) => <span {...props} />,
          h3: ({ node, ...props }) => <span {...props} />,
          h4: ({ node, ...props }) => <span {...props} />,
          h5: ({ node, ...props }) => <span {...props} />,
          h6: ({ node, ...props }) => <span {...props} />,
          // Customize paragraph
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
          // Customize lists
          ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
          li: ({ node, ...props }) => <li className="ml-4" {...props} />,
          // Customize links
          a: ({ node, ...props }) => (
            <a
              className="hover:underline"
              style={{ color: 'var(--accent-color)' }}
              {...props}
            />
          ),
          // Customize code blocks
          code: ({ node, className: codeClassName, ...props }: any) => {
            const isInline = !codeClassName
            return isInline ? (
              <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
            ) : (
              <code className={codeClassName} {...props} />
            )
          },
          // Customize blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4" {...props} />
          ),
          // Customize images
          img: ({ node, ...props }) => (
            <img className="max-w-full h-auto rounded-lg my-4" {...props} />
          ),
          // For plain text (no markdown), render as-is
          text: ({ node, ...props }: any) => <span {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

