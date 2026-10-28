'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function HeroSection() {
  const t = useTranslations('Hero')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  return (
    <section className='relative h-full min-h-[820px] lg:min-h-screen w-full flex flex-col justify-between overflow-hidden isolate select-none'>
      {/* Background Image Container with Figma 2.79s Entrance Animation */}
      <div className='absolute inset-0 z-0 overflow-hidden pointer-events-none'>
        <Image
          src='/home/images/hero.webp'
          alt='Makan Landscape Architecture'
          fill
          priority
          className='object-cover object-center animate-hero-entrance'
          sizes='100vw'
        />

        {/* Figma Warm Atmospheric Overlay & Gradient */}
       
      </div>

      {/* Floating Header / Liquid Glass Component (433:5613) placed directly over the hero image */}
      <div className='relative z-50 w-full pt-6 md:pt-8 px-4 sm:px-6 lg:px-8 flex justify-center'>
        <Navbar />
      </div>

      {/* Content Container matching Figma Frame 15 [433:5608] */}
      <div className='relative z-10 my-auto mx-auto max-w-5xl px-6 text-center select-auto py-10'>
        {/* Main H1 Title with Staggered Entrance */}
        <h1 className='animate-hero-title font-alexandria text-4xl sm:text-6xl md:text-[68px] font-normal leading-[1.2] tracking-tight text-[#10201D]'>
          <span className='block'>{t('titleLine1')}</span>
          <span className='block mt-2'>{t('titleLine2')}</span>
        </h1>

        {/* Subtitle / Description matching Figma Body sample [433:5611] */}
        <p className='animate-hero-desc mt-6 md:mt-8 mx-auto max-w-3xl font-cairo text-base sm:text-lg md:text-[20px] font-normal leading-relaxed text-[#10201D]/85'>
          {t('description')}
        </p>

        {/* CTA Button matching Figma Button [433:5612] */}
        <div className='animate-hero-cta mt-8 md:mt-10 flex justify-center'>
          <a
            href='#projects'
            className='group inline-flex items-center gap-3.5 rounded-[6px] bg-[#082621] px-8 py-3.5 text-base font-normal text-white shadow-md transition-all duration-300 hover:bg-[#041a17] hover:shadow-xl font-cairo active:scale-[0.98]'
          >
            <span>{t('cta')}</span>
            {isRtl ? (
              <ArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1.5' />
            ) : (
              <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5' />
            )}
          </a>
        </div>
      </div>

      {/* Balanced bottom spacer */}
      <div className='h-8 md:h-12' />
    </section>
  )
}
