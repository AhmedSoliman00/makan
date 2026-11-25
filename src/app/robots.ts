import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: ['/admin/', '/ar/admin/', '/en/admin/', '/api/', '/_next/'],
      },
    ],
    sitemap: 'https://makanlandscape.sa/sitemap.xml',
    host: 'https://makanlandscape.sa',
  }
}
