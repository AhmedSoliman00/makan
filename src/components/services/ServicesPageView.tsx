'use client'

import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import PreFooterCta from '@/components/PreFooterCta'
import Footer from '@/components/Footer'
import ServicesHero from './ServicesHero'
import ServicesEcosystem from './ServicesEcosystem'
import ServicesPillars from './ServicesPillars'

export default function ServicesPageView() {
  const t = useTranslations('ServicesPage')

  return (
    <div className='flex min-h-screen flex-col bg-[#FFFDF8]'>
      {/* 1. Pre-made Navigation Header (active: services) */}
      <Navbar variant='solid' activePath='services' />

      <main className='flex-1 bg-[#FFFDF8]'>
        {/* 2. Hero Section */}
        <ServicesHero
          titleLine1={t('hero.titleLine1')}
          titleLine2={t('hero.titleLine2')}
          imageSrc='/home/services/services-hero.webp'
        />

        {/* 3. Six Services Alternating Ecosystem Showcase */}
        <ServicesEcosystem />

        {/* 4. Three Approach / Philosophy Pillars */}
        <ServicesPillars />

        {/* 5. Pre-Footer Call to Action ("لنصنع معاً ما يدوم") */}
        <PreFooterCta />
      </main>

      {/* 6. Pre-made Footer */}
      <Footer />
    </div>
  )
}
