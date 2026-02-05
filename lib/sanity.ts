import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Check if Sanity is configured with real credentials
export function isSanityConfigured(): boolean {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  
  // Return false if missing, empty, or placeholder values
  if (!projectId || !dataset) return false
  
  const placeholderValues = ['placeholder', 'your-project-id', 'your_project_id', 'undefined', 'null']
  
  if (placeholderValues.includes(projectId.toLowerCase())) return false
  if (placeholderValues.includes(dataset.toLowerCase())) return false
  
  return true
}

// Safe fetch wrapper that prevents network calls when Sanity isn't configured
export async function safeFetch<T>(
  query: string,
  params?: Record<string, any>
): Promise<T | null> {
  // Don't make network calls if Sanity isn't properly configured
  if (!isSanityConfigured()) {
    return null
  }
  
  try {
    const data = await client.fetch<T>(query, params)
    return data
  } catch (error) {
    console.error('Sanity fetch failed:', error)
    return null
  }
}
