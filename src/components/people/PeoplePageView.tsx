'use client'

import { useTranslations, useLocale } from 'next-intl'
import Navbar from '@/components/Navbar'
import PartnersSection from '@/components/PartnersSection'
import PreFooterCta from '@/components/PreFooterCta'
import Footer from '@/components/Footer'
import PeopleHero from './PeopleHero'
import PeoplePhilosophy from './PeoplePhilosophy'
import PeopleTeamGrid, { type TeamMember } from './PeopleTeamGrid'

export default function PeoplePageView() {
  const t = useTranslations('TeamPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  // Extract team members from translations
  const members = t.raw('team.members') as TeamMember[]

  return (
    <div className='flex min-h-screen flex-col bg-white'>
      {/* 1. Header with active team path */}
      <Navbar variant='solid' activePath='team' />

      <main className='flex-1'>
        {/* 2. Hero Section */}
        <PeopleHero
          line1={t('hero.line1')}
          line2={t('hero.line2')}
          imageSrc='/home/people/people-hero.webp'
        />

        {/* 3. Philosophy & 3D Isometric Service Blocks */}
        <PeoplePhilosophy
          eyebrow={t('philosophy.eyebrow')}
          headingPart1={t('philosophy.headingPart1')}
          headingPart2={t('philosophy.headingPart2')}
          description={t('philosophy.description')}
          planLabel={t('philosophy.plan')}
          designLabel={t('philosophy.design')}
          executeLabel={t('philosophy.execute')}
          isRtl={isRtl}
        />

        {/* 4. Team Members 6-Card Grid */}
        <PeopleTeamGrid members={members} />

        {/* 5. Partners Section ("شركاؤنا في صناعة الأثر") */}
        <PartnersSection />

        {/* 6. Pre-Footer CTA */}
        <PreFooterCta />
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  )
}
