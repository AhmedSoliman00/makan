import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PreFooterCta from '@/components/PreFooterCta'
import ProjectDetailView from '@/components/ProjectDetailView'
import { getProjectBySlug as getDbProjectBySlug } from '@/lib/data/projects'
import { getProjectBySlug as getStaticProjectBySlug } from '@/lib/project-details'
import { routing, type Locale } from '@/i18n/routing'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // Try DB first, fallback to static
  const dbProject = await getDbProjectBySlug(slug, locale)
  const isRtl = locale === 'ar'

  if (dbProject) {
    return {
      title: `${dbProject.title} | ${isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'}`,
      description: dbProject.summary,
      alternates: {
        canonical: `/${locale}/projects/${slug}`,
        languages: {
          ar: `/ar/projects/${slug}`,
          en: `/en/projects/${slug}`,
        },
      },
      openGraph: {
        title: `${dbProject.title} | ${isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'}`,
        description: dbProject.summary,
        url: `/${locale}/projects/${slug}`,
        locale: isRtl ? 'ar_SA' : 'en_US',
        images: [
          {
            url: dbProject.heroImage,
            alt: dbProject.title,
          },
        ],
      },
    }
  }

  const staticProj = getStaticProjectBySlug(slug)
  if (!staticProj) notFound()

  const localized = locale === 'ar' ? staticProj.ar : staticProj.en
  return {
    title: `${localized.title} | ${isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'}`,
    description: localized.summary,
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
