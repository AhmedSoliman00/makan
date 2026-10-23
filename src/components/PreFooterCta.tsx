'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function PreFooterCta() {
  const t = useTranslations('PreFooter')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  return (
    <section className='isolate relative flex items-center bg-[#FAF6F0] py-16 sm:py-20 lg:py-24 w-full min-h-[420px] lg:min-h-[460px] overflow-hidden'>
      {/* Background Photography: pinned to left in RTL, right in LTR with native 1036/472 aspect ratio */}
      <div
        className={`z-0 absolute top-0 bottom-0 h-full aspect-[1036/472] pointer-events-none select-none ${
          isRtl ? 'left-0' : 'right-0'
        }`}
      >
        <Image
          src='/home/images/home-before-footer.webp'
          alt='Makan Landscape Garden Architecture'
          fill
          priority
          className={`object-cover ${isRtl ? 'object-left' : 'object-right'}`}
          sizes='(max-width: 1024px) 100vw, 1200px'
        />
        {/* Editorial gradient fade: dissolves towards the text side */}
        <div
          className={`absolute inset-0 ${
            isRtl
              ? 'bg-gradient-to-r from-transparent from-20% via-[#FAF6F0]/40 via-65% to-[#FAF6F0] to-100%'
              : 'bg-gradient-to-l from-transparent from-20% via-[#FAF6F0]/40 via-65% to-[#FAF6F0] to-100%'
          }`}
        />
      </div>

      {/* Mobile atmospheric overlay to ensure 100% text contrast on narrow screens */}
      <div className='sm:hidden absolute inset-0 bg-[#FAF6F0]/80 z-[1]' />

      {/* Content Container: Aligned to inline-start (Right in RTL, Left in LTR) */}
      <div className='z-10 relative mx-auto px-6 lg:px-8 w-full max-w-7xl'>
        <div className='flex justify-start'>
          <div className='max-w-xl lg:max-w-2xl text-start'>
            <h2 className='font-alexandria font-normal text-[#082621] text-3xl sm:text-5xl lg:text-6xl leading-[1.2]'>
              {t('heading')}
            </h2>

            <p className='mt-5 max-w-xl font-cairo text-[#082621]/80 text-sm sm:text-base lg:text-lg leading-relaxed'>
              {t('desc')}
            </p>

            <div className='flex justify-start mt-8 sm:mt-10'>
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
      </div>
    </section>
  )
}
