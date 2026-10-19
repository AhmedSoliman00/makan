'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const t = useTranslations('Hero')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  return (
    <section className='relative min-h-[820px] w-full flex items-center justify-center overflow-hidden pt-28 pb-20 isolate'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0 select-none'>
        <Image
          src='/home/images/hero.webp'
          alt='Makan Landscape Architecture'
          fill
          priority
          className='object-cover object-center'
          sizes='100vw'
        />
        {/* Soft atmospheric gradient overlay */}
        <div className='absolute inset-0  from-white/20 via-transparent to-white/70 pointer-events-none' />
      </div>

      {/* Content Container */}
      <div className='relative z-10 mx-auto max-w-5xl px-6 text-center'>
        {/* Main H1 Title */}
        <h1 className='font-alexandria text-4xl sm:text-6xl md:text-[68px] font-normal leading-[1.2] tracking-tight text-[#10201D]'>
          <span className='block'>{t('titleLine1')}</span>
          <span className='block mt-1'>{t('titleLine2')}</span>
        </h1>

        {/* Subtitle / Description */}
        <p className='mt-8 mx-auto max-w-3xl font-cairo text-base sm:text-lg md:text-[20px] font-normal leading-relaxed text-[#10201D]/85'>
          {t('description')}
        </p>

        {/* CTA Button */}
        <div className='mt-10 flex justify-center'>
          <a
            href='#projects'
            className='group inline-flex items-center gap-3 rounded-md bg-[#082621] px-8 py-3.5 text-sm md:text-base font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#041a17] hover:shadow-lg font-cairo'
          >
            <span>{t('cta')}</span>
            {isRtl ? (
              <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
            ) : (
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            )}
          </a>
        </div>
      </div>
    </section>
  )
}
