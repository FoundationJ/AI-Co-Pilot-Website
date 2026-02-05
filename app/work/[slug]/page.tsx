import { safeFetch } from '@/lib/sanity'
import { caseStudyBySlugQuery } from '@/lib/queries'
import { PortableText } from '@portabletext/react'
import { EmptyState } from '@/components/EmptyState'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'

interface CaseStudyData {
  title: string
  excerpt: string
  client: string
  industry: string
  publishedAt: string
  tags: string[]
  sections?: Array<{
    _key: string
    sectionType: string
    heading: string
    content: any[]
    stats?: Array<{
      label: string
      value: string
    }>
  }>
}

export const revalidate = 60

export default async function CaseStudyPage({
  params,
}: {
  params: { slug: string }
}) {
  const data = await safeFetch<CaseStudyData>(caseStudyBySlugQuery, {
    slug: params.slug,
  })

  if (!data) {
    notFound()
  }

  return (
    <main className="container mx-auto px-6 py-24">
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
            {data.client && <span>{data.client}</span>}
            {data.industry && (
              <>
                <span>•</span>
                <span>{data.industry}</span>
              </>
            )}
            <span>•</span>
            <time dateTime={data.publishedAt}>
              {formatDate(data.publishedAt)}
            </time>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-6">
            {data.title}
          </h1>
          {data.excerpt && (
            <p className="text-xl text-muted-foreground leading-relaxed">
              {data.excerpt}
            </p>
          )}
        </header>

        {/* Content Sections */}
        {data.sections && data.sections.length > 0 && (
          <div className="space-y-20">
            {data.sections.map((section) => (
              <section key={section._key} className="border-t border-border pt-12">
                {section.heading && (
                  <h2 className="text-3xl font-semibold tracking-tight mb-6">
                    {section.heading}
                  </h2>
                )}

                {section.sectionType === 'stats' && section.stats ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-8 py-8">
                    {section.stats.map((stat, idx) => (
                      <div key={idx}>
                        <div className="text-4xl font-semibold mb-2">
                          {stat.value}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : section.content ? (
                  <div className="prose prose-lg max-w-none">
                    <PortableText value={section.content} />
                  </div>
                ) : null}
              </section>
            ))}
          </div>
        )}

        {/* Tags */}
        {data.tags && data.tags.length > 0 && (
          <footer className="mt-20 pt-12 border-t border-border">
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>
    </main>
  )
}
