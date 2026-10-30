import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

// Public pages only: landing, auth entry points and CMS pages (legal etc.) from the backend
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers()
  const origin = `${h.get('x-forwarded-proto') ?? 'https'}://${h.get('host')}`
  const api = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

  let pages: { slug: string }[] = []
  try {
    const res = await fetch(`${api}/page/public`, { next: { revalidate: 3600 } })
    if (res.ok) pages = (await res.json()).pages ?? []
  } catch {
    // Backend down: still serve the static entries rather than a 500
  }

  return [
    { url: `${origin}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${origin}/login`, priority: 0.5 },
    { url: `${origin}/register`, priority: 0.5 },
    ...pages.map((p) => ({ url: `${origin}/p/${p.slug.replace(/^\//, '')}`, priority: 0.3 })),
  ]
}
