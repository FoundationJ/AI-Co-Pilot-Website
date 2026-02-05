import { client, isSanityConfigured } from '@/lib/sanity'
import { allTalksQuery } from '@/lib/queries'
import { EmptyState } from '@/components/EmptyState'
import { formatDate } from '@/lib/utils'
import { ExternalLink, FileText } from 'lucide-react'

interface Talk {
  _id: string
  title: string
  description: string
  date: string
  type: string
  status: string
  venue: string
  location: string
  recordingUrl?: string
  slidesUrl?: string
}

export const revalidate = 60

export default async function TalksPage() {
  if (!isSanityConfigured()) {
    return (
      <EmptyState
        title="Sanity Not Configured"
        description="Please configure your Sanity project credentials in .env.local"
      />
    )
  }

  const talks: Talk[] = await client.fetch(allTalksQuery)

  if (!talks || talks.length === 0) {
    return (
      <EmptyState
        title="No Talks Yet"
        description="Create your first talk in Sanity Studio."
        instructions={[
          'Run: npm run sanity',
          'Click on "Talks" in the sidebar',
          'Click "Create new Talk"',
          'Fill in the details and publish',
        ]}
      />
    )
  }

  return (
    <main className="container mx-auto px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-semibold tracking-tight mb-20">
          Talks
        </h1>

        <div className="space-y-16">
          {talks.map((talk) => (
            <article key={talk._id} className="border-t border-border pt-12">
              <div className="mb-4 flex items-center gap-4 text-sm">
                <span
                  className={`px-2 py-1 rounded-md text-xs font-medium ${
                    talk.status === 'upcoming'
                      ? 'bg-blue-100 text-blue-900'
                      : talk.status === 'past'
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-red-100 text-red-900'
                  }`}
                >
                  {talk.status}
                </span>
                <span className="text-muted-foreground capitalize">
                  {talk.type}
                </span>
                <span className="text-muted-foreground">•</span>
                <time dateTime={talk.date} className="text-muted-foreground">
                  {formatDate(talk.date)}
                </time>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                {talk.title}
              </h2>

              {talk.description && (
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  {talk.description}
                </p>
              )}

              <div className="mb-6 text-sm text-muted-foreground">
                {talk.venue && <span>{talk.venue}</span>}
                {talk.venue && talk.location && <span className="mx-2">•</span>}
                {talk.location && <span>{talk.location}</span>}
              </div>

              {(talk.recordingUrl || talk.slidesUrl) && (
                <div className="flex gap-4">
                  {talk.recordingUrl && (
                    <a
                      href={talk.recordingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Watch Recording
                    </a>
                  )}
                  {talk.slidesUrl && (
                    <a
                      href={talk.slidesUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      View Slides
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
