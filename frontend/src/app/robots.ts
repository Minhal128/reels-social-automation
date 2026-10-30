import type { MetadataRoute } from 'next'
import { headers } from 'next/headers'

// Built from the request host so it is correct on any domain without extra config
export default async function robots(): Promise<MetadataRoute.Robots> {
  const h = await headers()
  const origin = `${h.get('x-forwarded-proto') ?? 'https'}://${h.get('host')}`

  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard'] },
    sitemap: `${origin}/sitemap.xml`,
  }
}
