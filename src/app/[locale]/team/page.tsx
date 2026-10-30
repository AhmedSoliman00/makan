import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import PeoplePageView from '@/components/people/PeoplePageView'
import { getTeamMembers } from '@/lib/data/team'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// SSG with ISR: static HTML pre-rendered at build time, revalidated every hour or on-demand via revalidatePath
export const revalidate = 3600

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
  const meta = messagesModule.default.TeamPage.metadata
  const isRtl = locale === 'ar'
  const siteName = isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/team`,
      languages: {
        ar: '/ar/team',
        en: '/en/team',
      },
    },
    openGraph: {
      title: `${meta.title} | ${siteName}`,
      description: meta.description,
      url: `/${locale}/team`,
      siteName,
      locale: isRtl ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/home/people/people-hero.webp',
          width: 1200,
          height: 630,
          alt: `${meta.title} - ${siteName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${meta.title} | ${siteName}`,
      description: meta.description,
      images: ['/home/people/people-hero.webp'],
    },
  }
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  // Fetch dynamic team members with individual descriptions from database
  const members = await getTeamMembers(locale)

  return <PeoplePageView members={members} />
}
