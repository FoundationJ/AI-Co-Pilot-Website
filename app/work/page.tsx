import { client, isSanityConfigured } from '@/lib/sanity'
import { allCaseStudiesQuery } from '@/lib/queries'
import { EmptyState } from '@/components/EmptyState'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

interface CaseStudy {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  client: string
  industry: string
  publishedAt: string
  tags: string[]
}

export const revalidate = 60

export default async function WorkPage() {
  if (!isSanityConfigured()) {
    return (
      <EmptyState
        title="Sanity Not Configured"
        description="Please configure your Sanity project credentials in .env.local"
      />
    )
  }

  const caseStudies: CaseStudy[] = await client.fetch(allCaseStudiesQuery)

  if (!caseStudies || caseStudies.length === 0) {
    return (
      <EmptyState
        title="No Case Studies Yet"
        description="Create your first case study in Sanity Studio."
        instructions={[
          'Run: npm run sanity',
          'Click on "Case Studies" in the sidebar',
          'Click "Create new Case Study"',
          'Fill in the details and publish',
        ]}
      />
    )
  }

  return (
    <main className="container mx-auto px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-20">
          Work
        </h1>

        <div className="space-y-24">
          {caseStudies.map((study) => (
            <Link
              key={study._id}
              href={`/work/${study.slug.current}`}
              className="block group"
            >
              <article className="border-t border-border pt-12 pb-8">
                <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
                  {study.client && <span>{study.client}</span>}
                  {study.industry && (
                    <>
                      <span>•</span>
                      <span>{study.industry}</span>
                    </>
                  )}
                  <span>•</span>
                  <time dateTime={study.publishedAt}>
                    {formatDate(study.publishedAt)}
                  </time>
                </div>
                <h2 className="text-3xl font-semibold tracking-tight mb-4 group-hover:text-muted-foreground transition-colors">
                  {study.title}
                </h2>
                {study.excerpt && (
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    {study.excerpt}
                  </p>
                )}
                {study.tags && study.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
