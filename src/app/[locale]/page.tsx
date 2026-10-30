import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { getFeaturedProjects } from '@/lib/data/projects'
import HeroSection from '@/components/HeroSection'
import MetricsSection from '@/components/MetricsSection'
import SelectedWorks from '@/components/SelectedWorks'
import WhyMakan from '@/components/WhyMakan'
import ServicesSection from '@/components/ServicesSection'
import FeaturedVilla from '@/components/FeaturedVilla'
import PartnersSection from '@/components/PartnersSection'
import PreFooterCta from '@/components/PreFooterCta'
import Footer from '@/components/Footer'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// SSG with ISR: Home page pre-rendered at build time, revalidated every hour or on-demand via revalidatePath
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

  const messagesModule = await import(`../../../messages/${locale}.json`)
  const meta = messagesModule.default.Metadata
  const isRtl = locale === 'ar'
  const siteName = isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      siteName,
      locale: isRtl ? 'ar_SA' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/home/images/hero.webp',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/home/images/hero.webp'],
    },
  }
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Fetch up to 3 featured projects dynamically from the database
  const featuredProjects = await getFeaturedProjects({ locale, limit: 3 })

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      <main className='flex-1'>
        {/* Pinned Hero Scroll Interaction (Figma design specification) */}
        <div className='relative'>
          {/* Sticky Pinned Hero: stays in place during scroll interval */}
          <div className='sticky top-0 h-screen min-h-[820px] w-full z-10 overflow-hidden'>
            <HeroSection />
          </div>

          {/* Incoming sections: move upward progressively overlapping the hero */}
          <div className='relative z-20 bg-white shadow-[0_-24px_48px_rgba(0,0,0,0.06)]'>
            {/* Metrics Bar */}
            <MetricsSection />

            {/* Selected Works Grid */}
            <SelectedWorks projects={featuredProjects} />

            {/* Why Makan / Philosophy Section */}
            <WhyMakan />

            {/* Services 6-item Grid */}
            <ServicesSection />

            {/* Featured Villa (Mountain Garden Arch) */}
            <FeaturedVilla />

            {/* Partners Section */}
            <PartnersSection />

            {/* Pre-Footer Landscape Banner */}
            <PreFooterCta />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
