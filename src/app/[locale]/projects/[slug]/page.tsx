import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PreFooterCta from '@/components/PreFooterCta'
import ProjectDetailView from '@/components/ProjectDetailView'
import { getProjectBySlug as getDbProjectBySlug } from '@/lib/data/projects'
import { getProjectBySlug as getStaticProjectBySlug, getProjectSlugs } from '@/lib/project-details'
import { routing, type Locale } from '@/i18n/routing'
import { prisma } from '@/lib/prisma'
import { buildSocialMetadata } from '@/lib/og'

export async function generateStaticParams() {
  const staticSlugs = getProjectSlugs().map((s) => s.slug)
  let dbSlugs: string[] = []

  try {
    const dbProjects = await prisma.project.findMany({
      select: { slug: true },
    })
    dbSlugs = dbProjects.map((p) => p.slug)
  } catch (error) {
    // Database might not be reachable at build time; fallback to static slugs
    console.warn('[projects/[slug]] Could not fetch DB slugs for static pre-rendering:', error)
  }

  const uniqueSlugs = Array.from(new Set([...staticSlugs, ...dbSlugs]))

  return routing.locales.flatMap((locale) =>
    uniqueSlugs.map((slug) => ({
      locale,
      slug,
    }))
  )
}

// Allow new projects added in Admin to be generated on demand (ISR)
export const dynamicParams = true

// Revalidate static project pages every hour or on-demand via revalidatePath
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const isRtl = locale === 'ar'
  const siteName = isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'

  // Try DB first, fallback to static
  const dbProject = await getDbProjectBySlug(slug, locale)

  if (dbProject) {
    return {
      title: dbProject.title,
      description: dbProject.summary,
      alternates: {
        canonical: `/${locale}/projects/${slug}`,
        languages: {
          ar: `/ar/projects/${slug}`,
          en: `/en/projects/${slug}`,
        },
      },
      ...buildSocialMetadata({
        title: `${dbProject.title} | ${siteName}`,
        description: dbProject.summary,
        url: `/${locale}/projects/${slug}`,
        locale,
        siteName,
        image: dbProject.heroImage,
        alt: `${dbProject.title} - ${siteName}`,
        type: 'article',
      }),
    }
  }

  const staticProj = getStaticProjectBySlug(slug)
  if (!staticProj) notFound()

  const localized = locale === 'ar' ? staticProj.ar : staticProj.en
  const heroImage = staticProj.heroImage || '/home/images/Mountain garden.webp'

  return {
    title: localized.title,
    description: localized.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        ar: `/ar/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    ...buildSocialMetadata({
      title: `${localized.title} | ${siteName}`,
      description: localized.summary,
      url: `/${locale}/projects/${slug}`,
      locale,
      siteName,
      image: heroImage,
      alt: `${localized.title} - ${siteName}`,
      type: 'article',
    }),
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // 1. Fetch dynamic project from DB
  const project = await getDbProjectBySlug(slug, locale)

  if (project) {
    return (
      <div className="flex min-h-screen flex-col bg-[#fffdf8]">
        <Navbar variant="solid" activePath="projects" />

        <main className="flex-1">
          <ProjectDetailView
            project={project as any}
            heroImage={project.heroImage}
            locale={locale}
          />
          <PreFooterCta />
        </main>

        <Footer />
      </div>
    )
  }

  // 2. Fallback to static if DB doesn't have it
  const staticProject = getStaticProjectBySlug(slug)
  if (!staticProject) {
    notFound()
  }

  const localized = locale === 'ar' ? staticProject.ar : staticProject.en

  return (
    <div className="flex min-h-screen flex-col bg-[#fffdf8]">
      <Navbar variant="solid" activePath="projects" />

      <main className="flex-1">
        <ProjectDetailView
          project={localized}
          heroImage={staticProject.heroImage}
          locale={locale}
        />
        <PreFooterCta />
      </main>

      <Footer />
    </div>
  )
}
