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
        <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 xl:gap-32 items-center">
            {/* Left Column - Content */}
            <div className="max-w-2xl">
              {/* Headline - Strong typography with precise spacing */}
              <h1 className="text-[3.25rem] sm:text-[4rem] md:text-[4.75rem] lg:text-[5.25rem] xl:text-[5.75rem] font-semibold tracking-tight text-balance leading-[1.05] mb-6 md:mb-8">
                {data.headline}
              </h1>
              
              {/* Subheadline - Softer contrast, constrained width, refined line height */}
              {data.subheadline && (
                <p className="text-[1.0625rem] md:text-[1.1875rem] text-muted-foreground/75 mb-10 md:mb-14 max-w-[34rem] leading-[1.65] font-normal tracking-[-0.006em]">
                  {data.subheadline}
                </p>
              )}
              
              {/* CTA - Clean minimal style with refined hover */}
              {data.ctaText && data.ctaLink && (
                <div className="flex items-center gap-6">
                  <Link href={data.ctaLink}>
                    <Button 
                      size="lg" 
                      className="text-[0.9375rem] px-7 py-[1.375rem] h-auto rounded-[0.625rem] font-medium hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      {data.ctaText}
                    </Button>
                  </Link>
                  {/* Subtle visual hint */}
                  <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground/40 font-normal">
                    <div className="w-8 h-[1px] bg-muted-foreground/20"></div>
                    <span className="tracking-wide">Free download</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Subtle System Visual with refined opacity */}
            <div className="hidden lg:block relative h-[550px] opacity-[0.65] hover:opacity-[0.8] transition-opacity duration-700">
              <WorkflowVisual />
            </div>

            {/* Mobile Visual - Smaller, less prominent */}
            <div className="lg:hidden relative h-[280px] opacity-[0.35] mt-8">
              <WorkflowVisual />
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator with refined animation */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 opacity-[0.15] hover:opacity-30 transition-opacity duration-500 group">
            <span className="text-[0.6875rem] tracking-[0.1em] uppercase text-muted-foreground font-medium">Explore</span>
            <svg
              className="w-3.5 h-3.5 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              style={{ animationDuration: '2.5s' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>
    </main>
  )
}
