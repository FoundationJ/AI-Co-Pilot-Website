import { safeFetch, isSanityConfigured } from '@/lib/sanity'
import { homePageQuery } from '@/lib/queries'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { WorkflowVisual } from '@/components/WorkflowVisual'

interface HomePageData {
  headline: string
  subheadline: string
  ctaText: string
  ctaLink: string
}

// Default preview content when Sanity is not configured
const PREVIEW_CONTENT = {
  headline: 'Intelligent systems that augment human capability',
  subheadline: 'We build AI co-pilots that empower teams to work faster, smarter, and more creatively.',
  ctaText: 'View Playbook',
  ctaLink: '/playbook',
}

export const revalidate = 60

export default async function HomePage() {
  // Use safe fetch that won't make network calls if not configured
  const data = await safeFetch<HomePageData>(homePageQuery)
  
  // Use preview content if no data
  const content = data || PREVIEW_CONTENT
  const isPreview = !data

  return (
    <main>
      {/* Dark Hero Section - First Fold */}
      <section className="relative min-h-[calc(100vh-4rem)] hero-dark text-white">
        <div className="container mx-auto px-6 py-24 md:py-32 lg:py-40">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-20 xl:gap-32 items-center">
            {/* Left Column - Content */}
            <div className="max-w-[40rem]">
              {/* Preview indicator - subtle */}
              {isPreview && (
                <div className="mb-6 opacity-40">
                  <span className="text-xs tracking-wider uppercase text-gray-400">
                    Preview Mode
                  </span>
                </div>
              )}
              
              {/* Headline - Strong typography with off-white */}
              <h1 className="text-[3.25rem] sm:text-[4rem] md:text-[4.75rem] lg:text-[5.25rem] xl:text-[5.75rem] font-semibold tracking-tight text-balance leading-[1.05] mb-6 md:mb-8 text-hero-light">
                {content.headline}
              </h1>
              
              {/* Subheadline - Muted gray */}
              {content.subheadline && (
                <p className="text-[1.0625rem] md:text-[1.1875rem] text-hero-muted mb-10 md:mb-14 max-w-[34rem] leading-[1.65] font-normal tracking-[-0.006em]">
                  {content.subheadline}
                </p>
              )}
              
              {/* CTA - Outlined style for dark background */}
              {content.ctaText && content.ctaLink && (
                <div className="flex items-center gap-6">
                  <Link href={data.ctaLink}>
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="text-[0.9375rem] px-7 py-[1.375rem] h-auto rounded-[0.625rem] font-medium border-white/20 text-hero-light hover:bg-white/5 hover:border-white/30 transition-colors duration-200 bg-transparent"
                    >
                      {data.ctaText}
                    </Button>
                  </Link>
                  {/* Subtle visual hint */}
                  <div className="hidden md:flex items-center gap-2 text-sm text-gray-500 font-normal">
                    <div className="w-8 h-[1px] bg-gray-700"></div>
                    <span className="tracking-wide">Free download</span>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Workflow Visual for Dark Background */}
            <div className="hidden lg:block relative h-[550px] opacity-70 hover:opacity-90 transition-opacity duration-700">
              <WorkflowVisual isDark />
            </div>

            {/* Mobile Visual */}
            <div className="lg:hidden relative h-[280px] opacity-40 mt-8">
              <WorkflowVisual isDark />
            </div>
          </div>
        </div>

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden md:block">
          <div className="flex flex-col items-center gap-2 opacity-20 hover:opacity-40 transition-opacity duration-500 group">
            <span className="text-[0.6875rem] tracking-[0.1em] uppercase text-gray-500 font-medium">Explore</span>
            <svg
              className="w-3.5 h-3.5 animate-bounce text-gray-500"
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

      {/* Below the fold - remains light background */}
      {/* Future sections would go here with default light bg-background */}
    </main>
  )
}
