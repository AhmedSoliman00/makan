'use client'

import { useTranslations } from 'next-intl'
import Navbar from '@/components/Navbar'
import PreFooterCta from '@/components/PreFooterCta'
import Footer from '@/components/Footer'
import ContactHero from './ContactHero'
import ContactFormSection from './ContactFormSection'
import ContactLocationMap from './ContactLocationMap'

export default function ContactPageView() {
  const t = useTranslations('ContactPage')

  return (
    <div className='flex min-h-screen flex-col bg-[#FFFDF8]'>
      {/* 1. Header with active contact state */}
      <Navbar variant='solid' activePath='contact' />

      <main className='flex-1'>
        {/* 2. Hero Section */}
        <ContactHero
          line1={t('hero.line1')}
          line2={t('hero.line2')}
          imageSrc='/home/contact/contact-hero.webp'
        />

        {/* 3. Inquiry Form + Contact Details */}
        <ContactFormSection />

        {/* 4. Office Location Map Card */}
        <ContactLocationMap />

        {/* 5. Pre-Footer Call to Action */}
        <PreFooterCta />
      </main>

      {/* 6. Main Footer */}
      <Footer />
    </div>
  )
}
