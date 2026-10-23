import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import ContactPageView from '@/components/contact/ContactPageView'

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
  const meta = messagesModule.default.ContactPage.metadata
  const isRtl = locale === 'ar'

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}/contact`,
      languages: {
        ar: '/ar/contact',
        en: '/en/contact',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}/contact`,
      locale: isRtl ? 'ar_SA' : 'en_US',
    },
  }
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return <ContactPageView />
}
