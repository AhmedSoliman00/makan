'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PreFooterCta() {
  const t = useTranslations('PreFooter')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  return (
    <section className='isolate relative flex items-center bg-[#FAF6F0] py-24 w-full min-h-[480px] overflow-hidden'>
      {/* Background Photography with Landscape Olive Tree */}
      <div className='z-0 absolute inset-0'>
        <Image
          src='/home/images/home-before-footer.webp'
          alt='Makan Landscape Garden Architecture'
          fill
          className='object-cover object-start sm:object-center'
          sizes='100vw'
        />
        {/* Editorial gradient fade so text is crisp and readable */}
        <div
          className={`absolute inset-0 ${
            isRtl
              ? 'bg-gradient-to-l from-[#FAF6F0] via-[#FAF6F0]/85 to-transparent'
              : 'bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/85 to-transparent'
          }`}
        />
      </div>

      <div className='z-10 relative mx-auto px-6 lg:px-8 w-full max-w-7xl'>
        <div className='max-w-2xl text-start'>
          <h2 className='font-alexandria font-normal text-[#082621] text-4xl sm:text-6xl leading-[1.2]'>
            {t('heading')}
          </h2>

          <p className='mt-5 max-w-xl font-cairo text-[#082621]/80 text-base sm:text-lg leading-relaxed'>
            {t('desc')}
          </p>

          <div className='flex justify-start mt-10'>
            <a
              href='#projects'
              className='group inline-flex items-center gap-3 bg-[#082621] hover:bg-[#041a17] shadow-md px-8 py-3.5 rounded-md font-cairo font-semibold text-white text-sm transition-all'
            >
              <span>{t('cta')}</span>
              {isRtl ? (
                <ArrowLeft className='w-4 h-4 transition-transform group-hover:-translate-x-1' />
              ) : (
                <ArrowRight className='w-4 h-4 transition-transform group-hover:translate-x-1' />
              )}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
