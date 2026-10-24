import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import ServicesPageView from '@/components/services/ServicesPageView'

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
  const meta = messagesModule.default.ServicesPage.metadata
  const isRtl = locale === 'ar'

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/services`,
      languages: {
        ar: '/ar/services',
        en: '/en/services',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}/services`,
      locale: isRtl ? 'ar_SA' : 'en_US',
    },
  }
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return <ServicesPageView />
}
