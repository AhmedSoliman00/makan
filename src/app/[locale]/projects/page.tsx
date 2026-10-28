import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import Navbar from '@/components/Navbar'
import ProjectsCatalogue from '@/components/ProjectsCatalogue'
import PreFooterCta from '@/components/PreFooterCta'
import Footer from '@/components/Footer'
import { getProjects } from '@/lib/data/projects'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const messagesModule = await import(`../../../../messages/${locale}.json`)
  const meta = messagesModule.default.ProjectsPage.metadata
  const isRtl = locale === 'ar'

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/projects`,
      languages: {
        ar: '/ar/projects',
        en: '/en/projects',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}/projects`,
      locale: isRtl ? 'ar_SA' : 'en_US',
    },
  }
}

export default async function ProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; city?: string; view?: 'grid' | 'list' }>
}) {
  const { locale } = await params
  const { category, city, view } = await searchParams

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // Dynamic SSR Query from database
  const projects = await getProjects({
    locale,
    category,
    city,
  })

  return (
    <div className="flex min-h-screen flex-col bg-[#fffdf8]">
      <Navbar variant="solid" activePath="projects" />

      <main className="flex-1 pt-2">
        <ProjectsCatalogue
          projects={projects}
          initialCategory={category || 'all'}
          initialView={view || 'grid'}
        />
        <PreFooterCta />
      </main>

      <Footer />
    </div>
  )
}
