import { client, isSanityConfigured } from '@/lib/sanity'
import { homePageQuery } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { EmptyState } from '@/components/EmptyState'
import { WorkflowVisual } from '@/components/WorkflowVisual'

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
      {/* Hero Section - Linear-inspired first fold */}
      <section className="relative min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Left Column - Content */}
            <div className="max-w-2xl">
              {/* Headline - Strong typography */}
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] font-semibold tracking-tight text-balance leading-[1.05] mb-8">
                {data.headline}
              </h1>
              
              {/* Subheadline - Softer contrast, constrained width */}
              {data.subheadline && (
                <p className="text-lg md:text-xl text-muted-foreground/80 mb-12 max-w-xl leading-[1.7] font-normal">
                  {data.subheadline}
                </p>
              )}
              
              {/* CTA - Clean minimal style */}
              {data.ctaText && data.ctaLink && (
                <div>
                  <Link href={data.ctaLink}>
                    <Button 
                      size="lg" 
                      className="text-[15px] px-8 py-6 h-auto rounded-lg font-medium hover:bg-primary/90 transition-all duration-200"
                    >
                      {data.ctaText}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column - Subtle System Visual */}
            <div className="hidden lg:block relative h-[500px]">
              <WorkflowVisual />
            </div>

            {/* Mobile Visual - Smaller, less prominent */}
            <div className="lg:hidden relative h-[300px] opacity-30">
              <WorkflowVisual />
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator - optional detail */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-40 transition-opacity">
            <span className="text-xs tracking-wide uppercase text-muted-foreground">Scroll</span>
            <svg
              className="w-4 h-4 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              style={{ animationDuration: '2s' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>
    </main>
  )
}
