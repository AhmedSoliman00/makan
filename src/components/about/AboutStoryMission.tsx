'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function AboutStoryMission() {
  const t = useTranslations('AboutPage')

  return (
    <div className='w-full'>
      {/* 1. Our Story Section (عن مكان) - Warm Sand Background */}
      <section className='w-full bg-[#FAF6F0] py-20 lg:py-28 overflow-hidden'>
        <div className='mx-auto max-w-7xl px-6 lg:px-12'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
            {/* Arched Architectural Image Column */}
            <div className='w-full lg:w-1/2 flex justify-center lg:justify-start order-2 lg:order-1'>
              <div className='relative w-full max-w-[420px] aspect-[452/562] rounded-t-full overflow-hidden shadow-lg border border-[#EAE4D9]/80'>
                <Image
                  src='/home/about/Mountain-garden.webp'
                  alt='قصتنا | Makan Landscape'
                  fill
                  sizes='(max-width: 640px) calc(100vw - 2rem), (max-width: 1024px) 50vw, 420px'
                  quality={90}
                  className='object-cover object-center transition-transform duration-700 hover:scale-105'
                />
              </div>
            </div>

            {/* Story Copy Column */}
            <div className='w-full lg:w-1/2 order-1 lg:order-2 text-start max-w-xl'>
              {/* Heading */}
              <h2 className='font-cairo text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10201D] tracking-tight leading-tight'>
                {t('story.title')}
              </h2>

              {/* Subheading */}
              <p className='mt-4 font-cairo text-lg sm:text-xl font-semibold text-[#10201D] leading-snug'>
                {t('story.subtitle')}
              </p>

              {/* Description */}
              <p className='mt-4 font-cairo text-base sm:text-[17px] text-[#6F746F] leading-relaxed'>
                {t('story.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Our Mission Section (رسالتنا) - Clean White Background */}
      <section className='w-full bg-white py-20 lg:py-28 overflow-hidden'>
        <div className='mx-auto max-w-7xl px-6 lg:px-12'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
            {/* Mission Copy Column */}
            <div className='w-full lg:w-1/2 text-start max-w-xl'>
              {/* Eyebrow */}
              <div className='inline-flex items-center gap-2 mb-3'>
                <span className='h-[1px] w-6 bg-[#C29959]' />
                <span className='font-cairo text-sm font-semibold text-[#C29959] tracking-wider uppercase'>
                  {t('mission.eyebrow')}
                </span>
                <span className='h-[1px] w-6 bg-[#C29959]' />
              </div>

              {/* Heading */}
              <h2 className='font-cairo text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10201D] tracking-tight leading-tight'>
                {t('mission.title')}
              </h2>

              {/* Subheading */}
              <p className='mt-4 font-cairo text-lg sm:text-xl font-semibold text-[#10201D] leading-snug'>
                {t('mission.subtitle')}
              </p>

              {/* Description */}
              <p className='mt-4 font-cairo text-base sm:text-[17px] text-[#6F746F] leading-relaxed'>
                {t('mission.description')}
              </p>
            </div>

            {/* Framed Rectangular Image Column */}
            <div className='w-full lg:w-1/2 flex justify-center lg:justify-end'>
              <div className='p-3 sm:p-4 bg-[#F5EFE6] shadow-md max-w-[620px] w-full border border-[#EAE4D9]/80'>
                <div className='relative w-full aspect-[645/363] overflow-hidden'>
                  <Image
                    src='/home/about/about-mission.webp'
                    alt='رسالتنا | Makan Landscape'
                    fill
                    className='object-cover object-center transition-transform duration-700 hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 620px'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
