import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PreFooterCta from '@/components/PreFooterCta'
import ProjectDetailView from '@/components/ProjectDetailView'
import { getProjectBySlug, getProjectSlugs } from '@/lib/project-details'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((project) => ({ locale, slug: project.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const localized = locale === 'ar' ? project.ar : project.en
  const isRtl = locale === 'ar'

  return {
    title: `${localized.title} | ${isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'}`,
    description: localized.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        ar: `/ar/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
    openGraph: {
      title: `${localized.title} | ${isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'}`,
      description: localized.summary,
      url: `/${locale}/projects/${slug}`,
      locale: isRtl ? 'ar_SA' : 'en_US',
      images: [
        {
          url: project.heroImage,
          alt: localized.title,
        },
      ],
    },
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

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const localized = locale === 'ar' ? project.ar : project.en

  return (
    <div className='flex min-h-screen flex-col bg-[#fffdf8]'>
      <Navbar variant='solid' activePath='projects' />

      <main className='flex-1'>
        <ProjectDetailView
          project={localized}
          heroImage={project.heroImage}
          locale={locale}
        />
        <PreFooterCta />
      </main>

      <Footer />
    </div>
  )
}
