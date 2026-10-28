import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import PeoplePageView from '@/components/people/PeoplePageView'
import { getTeamMembers } from '@/lib/data/team'

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
      title: meta.title,
      description: meta.description,
      url: `/${locale}/team`,
      locale: isRtl ? 'ar_SA' : 'en_US',
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
