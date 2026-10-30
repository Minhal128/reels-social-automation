import type { NextConfig } from 'next'

// ponytail: no HSTS preload and no CSP — preload is hard to undo and a CSP needs auditing every third-party script
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

// Common legal URLs → CMS pages seeded by backend/seeders/14-legalPageSeeder.js (not permanent: admins can rename slugs)
const legalRedirects = [
  ['/privacy', 'privacy-policy'],
  ['/privacy-policy', 'privacy-policy'],
  ['/terms', 'terms-of-service'],
  ['/terms-of-service', 'terms-of-service'],
  ['/cookies', 'cookie-policy'],
  ['/cookie-policy', 'cookie-policy'],
  ['/refund-policy', 'refund-policy'],
].map(([source, slug]) => ({ source, destination: `/p/${slug}`, permanent: false }))

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }]
  },
  async redirects() {
    return legalRedirects
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '::1',
        port: '3000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    localPatterns: [
      {
        pathname: '/api/uploads/**',
        search: '',
      },
      {
        pathname: '/images/**',
        search: '',
      },
      {
        pathname: '/uploads/**',
        search: '',
      }
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '100mb',
    },
    proxyClientMaxBodySize: '100mb',
  },
}

export default nextConfig
