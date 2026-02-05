import { client, isSanityConfigured } from '@/lib/sanity'
import { frameworkPageQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { EmptyState } from '@/components/EmptyState'

interface FrameworkData {
  title: string
  description: string
  sections?: Array<{
    _key: string
    heading: string
    content: any[]
    order: number
  }>
}

export const revalidate = 60

export default async function FrameworkPage() {
  if (!isSanityConfigured()) {
    return (
      <EmptyState
        title="Sanity Not Configured"
        description="Please configure your Sanity project credentials in .env.local"
      />
    )
  }

  const data: FrameworkData | null = await client.fetch(frameworkPageQuery)

  if (!data) {
    return (
      <EmptyState
        title="Framework Content Missing"
        description="Create the frameworkPage document in Sanity Studio."
        instructions={[
          'Run: npm run sanity',
          'Click on "Framework Page" in the sidebar',
          'Add title, description, and sections',
          'Publish the document',
        ]}
      />
    )
  }

  const sortedSections = data.sections?.sort((a, b) => a.order - b.order) || []

  return (
    <main className="container mx-auto px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
          {data.title}
        </h1>
        {data.description && (
          <p className="text-xl text-muted-foreground mb-20 leading-relaxed">
            {data.description}
          </p>
        )}

        <div className="space-y-24">
          {sortedSections.map((section) => (
            <section key={section._key} className="border-t border-border pt-12">
              <h2 className="text-3xl font-semibold tracking-tight mb-6">
                {section.heading}
              </h2>
              <div className="prose prose-lg max-w-none">
                <PortableText value={section.content} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
