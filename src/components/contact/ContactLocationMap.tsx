'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { MapPin, ArrowLeft, ArrowRight } from 'lucide-react'

export default function ContactLocationMap() {
  const t = useTranslations('ContactPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight

  return (
    <section className='relative w-full min-h-[500px] lg:min-h-[540px] flex items-center overflow-hidden mb-35 bg-[#EFE9DF]'>
      {/* Background Architectural Map Graphic */}
      <div className='absolute inset-0 z-0'>
        <Image
          src='/home/contact/contact-map.webp'
          alt='Makan Headquarters Map'
          fill
          className='object-cover object-center scale-[1.01]'
          sizes='100vw'
        />
        {/* Subtle warm wash over map for premium tone */}
        <div className='absolute inset-0 bg-[#FFFDF9]/10' />
      </div>

      {/* Floating Pin On The Map (Centered-offset to match Figma 58% x, 36% y) */}
      <div className='hidden sm:flex absolute left-[58%] top-[38%] -translate-x-1/2 -translate-y-1/2 z-10 flex-col items-center pointer-events-none select-none animate-fade-in'>
        <div className='relative flex items-center justify-center filter drop-shadow-md'>
          <svg
            className='w-11 h-14 text-[#C29959]'
            viewBox='0 0 48 60'
            fill='none'
            stroke='currentColor'
            strokeWidth='3.5'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='M24 2C13.5 2 5 10.5 5 21c0 14 19 36 19 36s19-22 19-36c0-10.5-8.5-19-19-19z' />
            <circle cx='24' cy='21' r='7' stroke='currentColor' strokeWidth='3.5' />
          </svg>
        </div>
        <span className='mt-1 font-cairo font-bold text-sm sm:text-base text-[#10201D] bg-[#FFFDF9]/90 px-2.5 py-0.5 rounded shadow-sm'>
          مكان
        </span>
      </div>

      {/* Floating Office Card Container */}
      <div className='relative z-20 mx-auto max-w-7xl px-6 lg:px-12 w-full py-12 lg:py-16'>
        <div className='w-full sm:max-w-[430px] bg-[#FFFDF9] border border-[#F2EDE3] shadow-[0_16px_36px_rgba(0,0,0,0.07)] p-7 sm:p-9 rounded-none'>
          {/* Card Header */}
          <h3 className='font-cairo text-2xl sm:text-[26px] font-bold text-[#10201D] tracking-tight'>
            {t('officeSection.title')}
          </h3>
          <p className='mt-2.5 font-cairo text-sm sm:text-[15px] text-[#6F746F] leading-relaxed'>
            {t('officeSection.subtitle')}
          </p>

          {/* Divider */}
          <div className='my-6 h-[1px] bg-[#F2EDE3]' />

          {/* Office Address with Badge */}
          <div className='flex items-start gap-4'>
            <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F2EDE3] text-[#C29959]'>
              <MapPin className='h-5 w-5' />
            </div>
            <div>
              <p className='font-cairo text-[15px] font-medium text-[#10201D] leading-snug'>
                {t('officeSection.addressLine1')}
              </p>
              <p className='mt-1 font-cairo text-sm text-[#6F746F] leading-snug'>
                {t('officeSection.addressLine2')}
              </p>
            </div>
          </div>

          {/* Directions Link */}
          <div className='mt-7 pt-4 border-t border-[#F2EDE3]/70'>
            <a
              href='https://maps.google.com/?q=King+Fahd+Rd,+Al+Olaya,+Riyadh'
              target='_blank'
              rel='noreferrer'
              className='inline-flex items-center gap-2.5 font-cairo font-semibold text-[15px] text-[#C29959] hover:text-[#9F7A3E] transition-colors group'
            >
              <span>{t('officeSection.directions')}</span>
              <ArrowIcon className='h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1 rtl:group-hover:-translate-x-1 ltr:group-hover:translate-x-1' />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
