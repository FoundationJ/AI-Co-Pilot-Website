import { client, isSanityConfigured } from '@/lib/sanity'
import { homePageQuery } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EmptyState } from '@/components/EmptyState'

interface HomePageData {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  if (!isSanityConfigured()) {
    return (
      <EmptyState
        title="Sanity Not Configured"
        description="Please configure your Sanity project credentials in .env.local"
        instructions={[
          'Copy .env.local.example to .env.local',
          'Add your NEXT_PUBLIC_SANITY_PROJECT_ID',
          'Add your NEXT_PUBLIC_SANITY_DATASET',
          'Restart the development server',
        ]}
      />
    )
  }

  const data: HomePageData | null = await client.fetch(homePageQuery)

  if (!data) {
    return (
      <EmptyState
        title="Home Page Content Missing"
        description="Create the homePage document in Sanity Studio to see content here."
        instructions={[
          'Run: npm run sanity',
          'Navigate to http://localhost:3333',
          'Click on "Home Page" in the sidebar',
          'Add your headline, subheadline, and CTA',
          'Publish the document',
        ]}
      />
    )
  }

  return (
    <main>
      {/* Hero Section - Linear-inspired */}
      <section className="container mx-auto px-6 py-32 md:py-48">
        <div className="max-w-4xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance mb-8 leading-[1.1]">
            {data.headline}
          </h1>
          {data.subheadline && (
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl leading-relaxed">
              {data.subheadline}
            </p>
          )}
          {data.ctaText && data.ctaLink && (
            <Link href={data.ctaLink}>
              <Button size="lg" className="text-base px-8 py-6 rounded-lg">
                {data.ctaText}
              </Button>
            </Link>
          )}
        </div>
      </section>
    </main>
  )
}
