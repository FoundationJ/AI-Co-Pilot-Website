import { safeFetch } from '@/lib/sanity'
import { playbookQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/button'
import { EmptyState } from '@/components/EmptyState'
import { Download } from 'lucide-react'

interface PlaybookData {
  title: string
  description: string
  content: any[]
  pdfFile?: {
    asset: {
      url: string
      originalFilename: string
    }
  }
}

export const revalidate = 60

export default async function PlaybookPage() {
  const data = await safeFetch<PlaybookData>(playbookQuery)

  if (!data) {
    return (
      <EmptyState
        title="Content Not Yet Configured"
        description="Add playbook content in Sanity Studio to see it here."
        instructions={[
          'Configure Sanity credentials in .env.local',
          'Run: npm run sanity',
          'Click on "Playbook" in the sidebar',
          'Add title, description, and content',
          'Upload a PDF file (optional)',
          'Publish the document',
        ]}
      />
    )
  }

  return (
    <main className="container mx-auto px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
            {data.description}
          </p>
        )}

        {data.pdfFile?.asset?.url && (
          <div className="mb-16">
            <a
              href={data.pdfFile.asset.url}
              download={data.pdfFile.asset.originalFilename}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="gap-2">
                <Download className="w-4 h-4" />
                Download Playbook
              </Button>
            </a>
          </div>
        )}

        {data.content && (
          <div className="prose prose-lg max-w-none">
            <PortableText value={data.content} />
          </div>
        )}
      </div>
    </main>
  )
}
