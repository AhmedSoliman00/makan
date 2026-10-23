'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function AboutValues() {
  const t = useTranslations('AboutPage.values')

  const values = [
    {
      key: 'nature',
      icon: '/home/about/icons/leaf.svg',
      title: t('items.nature.title'),
      desc: t('items.nature.desc'),
    },
    {
      key: 'human',
      icon: '/home/about/icons/user.svg',
      title: t('items.human.title'),
      desc: t('items.human.desc'),
    },
    {
      key: 'community',
      icon: '/home/about/icons/community.svg',
      title: t('items.community.title'),
      desc: t('items.community.desc'),
    },
    {
      key: 'sustainability',
      icon: '/home/about/icons/infinity.svg',
      title: t('items.sustainability.title'),
      desc: t('items.sustainability.desc'),
    },
  ]

  return (
    <section className='w-full bg-white py-20 lg:py-28 border-t border-[#EAE4D9]/60'>
      <div className='mx-auto max-w-7xl px-6 lg:px-12'>
        {/* Section Header */}
        <div className='text-center max-w-3xl mx-auto mb-16 sm:mb-20'>
          <h2 className='font-cairo text-3xl sm:text-4xl lg:text-[44px] font-bold text-[#10201D] tracking-tight leading-tight'>
            {t('title')}
          </h2>
          <p className='mt-3.5 font-cairo text-base sm:text-lg text-[#6F746F] leading-relaxed whitespace-pre-line'>
            {t('subtitle')}
          </p>
        </div>

        {/* 2x2 Grid with Elegant Cross Dividers */}
        <div className='grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto'>
          {values.map((item, idx) => {
            const isTopRow = idx < 2
            const isFirstCol = idx % 2 === 0

            return (
              <div
                key={item.key}
                className={`flex flex-col items-center justify-center text-center py-14 sm:py-20 px-6 sm:px-12 transition-all duration-300 hover:bg-[#FAF9F5]/70 group ${
                  isTopRow ? 'md:border-b md:border-[#EAE4D9]' : ''
                } ${
                  isFirstCol ? 'md:border-e md:border-[#EAE4D9]' : ''
                } ${
                  idx > 0 ? 'border-t md:border-t-0 border-[#EAE4D9]/70' : ''
                }`}
              >
                {/* Icon Container */}
                <div className='relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center transition-transform duration-300 group-hover:scale-110'>
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={72}
                    height={72}
                    className='w-full h-full object-contain filter drop-shadow-sm'
                  />
                </div>

                {/* Value Title */}
                <h3 className='font-cairo text-2xl sm:text-[28px] font-bold text-[#10201D] mt-6 tracking-tight'>
                  {item.title}
                </h3>

                {/* Value Subtitle */}
                <p className='font-cairo text-base sm:text-lg text-[#6F746F] mt-2'>
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
