import type { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma'
import { getProjectSlugs } from '@/lib/project-details'

const SITE = 'https://makanlandscape.sa'

const staticRoutes = [
  { path: '',          freq: 'yearly'  as const, priority: 1.0 },
  { path: '/about',   freq: 'monthly' as const, priority: 0.8 },
  { path: '/services',freq: 'monthly' as const, priority: 0.8 },
  { path: '/projects',freq: 'weekly'  as const, priority: 0.9 },
  { path: '/contact', freq: 'yearly'  as const, priority: 0.6 },
  { path: '/team',    freq: 'monthly' as const, priority: 0.5 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages — both ar + en locales with hreflang alternates
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map(
    ({ path, freq, priority }) => ({
      url: `${SITE}/en${path}`,
      lastModified: new Date(),
      changeFrequency: freq,
      priority,
      alternates: {
        languages: {
          ar: `${SITE}/ar${path}`,
          en: `${SITE}/en${path}`,
        },
      },
    })
  )

  // Merge static project slugs and DB project slugs
  const slugMap = new Map<string, Date>()

  // 1. Static project details fallback slugs
  for (const item of getProjectSlugs()) {
    slugMap.set(item.slug, new Date())
  }

  // 2. Dynamic DB projects
  try {
    const projects = await prisma.project.findMany({
      select: { slug: true, updatedAt: true },
    })
    for (const p of projects) {
      slugMap.set(p.slug, p.updatedAt)
    }
  } catch (e) {
    console.warn('[sitemap] Could not fetch projects from DB:', e)
  }

  const projectEntries: MetadataRoute.Sitemap = Array.from(slugMap.entries()).map(([slug, lastModified]) => ({
    url: `${SITE}/en/projects/${slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    alternates: {
      languages: {
        ar: `${SITE}/ar/projects/${slug}`,
        en: `${SITE}/en/projects/${slug}`,
      },
    },
  }))

  return [...staticEntries, ...projectEntries]
}
