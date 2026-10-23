'use client'

import { useTranslations } from 'next-intl'
import MetricsSection from '@/components/MetricsSection'

export default function AboutIntroMetrics() {
  const t = useTranslations('AboutPage')

  return (
    <section className='w-full bg-white pt-20 pb-12 sm:pt-24 sm:pb-16'>
      <div className='mx-auto max-w-5xl px-6 text-center'>
        {/* Intro Statement */}
        <h2 className='font-cairo text-2xl sm:text-3xl lg:text-[34px] font-bold text-[#10201D] leading-snug tracking-tight'>
          {t('intro.line1')}
        </h2>
        <p className='mt-2.5 font-cairo text-xl sm:text-2xl lg:text-[28px] font-normal text-[#8B8983] leading-snug'>
          {t('intro.line2')}
        </p>
      </div>

      {/* Metrics Section (reused) */}
      <div className='mt-12 sm:mt-16'>
        <MetricsSection />
      </div>
    </section>
  )
}
