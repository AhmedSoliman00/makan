'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

type PillarItem = {
  key: string
  image: string
}

export default function ServicesPillars() {
  const t = useTranslations('ServicesPage.philosophy')

  const pillars: PillarItem[] = [
    {
      key: 'p1',
      image: '/home/services/pillar-01-context.webp',
    },
    {
      key: 'p2',
      image: '/home/services/pillar-02-integration.webp',
    },
    {
      key: 'p3',
      image: '/home/services/pillar-03-sustainability.webp',
    },
  ]

  return (
    <section className='w-full bg-[#FFFDF8] py-20 sm:py-24 lg:py-28 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        {/* Section Header */}
        <div className='mx-auto max-w-3xl text-center mb-16 sm:mb-20'>
          {/* Eyebrow badge with gold accent bars */}
          <div className='inline-flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-wider mb-4'>
            <span className='h-px w-10 bg-[#C29959]' />
            <span className='font-cairo text-sm font-medium text-[#6F746F]'>
              {t('eyebrow')}
            </span>
            <span className='h-px w-10 bg-[#C29959]' />
          </div>

          <h2 className='font-alexandria text-3xl sm:text-4xl md:text-5xl font-normal text-[#082621] tracking-tight leading-[1.2]'>
            {t('title')}
          </h2>

          <p className='mt-4 font-cairo text-sm sm:text-base text-[#6F746F] leading-relaxed max-w-2xl mx-auto'>
            {t('description')}
          </p>
        </div>

        {/* 3 Pillars - Clean columns without card backgrounds, divided by subtle vertical borders */}
        <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0'>
          {pillars.map((item, idx) => {
            const title = t(`items.${item.key}.title`)
            const description = t(`items.${item.key}.description`)
            const isLast = idx === pillars.length - 1

            return (
              <div
                key={item.key}
                className={`group flex flex-col items-center text-center px-6 py-8 md:py-6 ${
                  !isLast ? 'md:border-e md:border-[#E4DFD7]/80' : ''
                }`}
              >
                {/* 3D Illustration directly on #FFFDF8 without card background */}
                <div className='relative w-[130px] h-[130px] sm:w-[149px] sm:h-[149px] mb-6 flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105 select-none'>
                  <Image
                    src={item.image}
                    alt={title}
                    width={149}
                    height={149}
                    className='object-contain w-full h-full'
                  />
                </div>

                {/* Content */}
                <div className='w-full'>
                  <h3 className='font-alexandria text-lg sm:text-xl font-medium text-[#082621] mb-2 leading-snug'>
                    {title}
                  </h3>
                  <p className='font-cairo text-sm text-[#6F746F] leading-relaxed max-w-xs mx-auto'>
                    {description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
