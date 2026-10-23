'use client'

import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import PartnersSection from '@/components/PartnersSection'
import PreFooterCta from '@/components/PreFooterCta'
import Footer from '@/components/Footer'
import AboutHero from './AboutHero'
import AboutIntroMetrics from './AboutIntroMetrics'
import AboutStoryMission from './AboutStoryMission'
import AboutValues from './AboutValues'

export default function AboutPageView() {
  const t = useTranslations('AboutPage')

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 1. Header with active about / makan state */}
      <Navbar variant='solid' activePath='about' />

      <main className='flex-1'>
        {/* 2. Hero Section */}
        <AboutHero
          title={t('hero.title')}
          subtitle={t('hero.subtitle')}
          imageSrc='/home/about/about-hero.webp'
        />

        {/* 3. Intro Statement & 4 Metrics Bar */}
        <AboutIntroMetrics />

        {/* 4. Story & Mission Editorial Alternating Sections */}
        <AboutStoryMission />

        {/* 5. What We Believe In (2x2 Values Grid) */}
        <AboutValues />

        {/* 6. Partners Section ("شركاؤنا في صناعة الأثر") */}
        <PartnersSection />

        {/* 7. Pre-Footer Call to Action ("لنصنع معاً ما يدوم") */}
        <PreFooterCta />
      </main>

      {/* 8. Main Footer */}
      <Footer />
    </div>
  )
}
