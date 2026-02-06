import { createClient, type SanityClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Memoized client instance
let clientInstance: SanityClient | null = null

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

// Lazy client getter - only creates client if properly configured
export function getSanityClient(): SanityClient | null {
  // Return null if not configured
  if (!isSanityConfigured()) {
    return null
  }
  
  // Return memoized instance if already created
  if (clientInstance) {
    return clientInstance
  }
  
  // Create and memoize client
  try {
    clientInstance = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
      useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true',
    })
    return clientInstance
  } catch (error) {
    console.error('Failed to create Sanity client:', error)
    return null
  }
}

// Image URL builder - returns null if client not available
export function urlFor(source: SanityImageSource) {
  const client = getSanityClient()
  if (!client) return null
  
  const builder = imageUrlBuilder(client)
  return builder.image(source)
}

// Safe fetch wrapper that prevents network calls when Sanity isn't configured
export async function safeFetch<T>(
  query: string,
  params?: Record<string, any>
): Promise<T | null> {
  // Get client (returns null if not configured)
  const client = getSanityClient()
  
  if (!client) {
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
