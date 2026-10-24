'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'

type ServiceItem = {
  key: string
  image: string
  alt: string
}

export default function ServicesEcosystem() {
  const t = useTranslations('ServicesPage.ecosystem')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const services: ServiceItem[] = [
    {
      key: 's1',
      image: '/home/services/service-01-masterplanning.webp',
      alt: 'Makan Landscape Master Planning',
    },
    {
      key: 's2',
      image: '/home/services/service-02-landscape-architecture.webp',
      alt: 'Makan Landscape Architecture',
    },
    {
      key: 's3',
      image: '/home/services/service-03-placemaking.webp',
      alt: 'Makan Placemaking',
    },
    {
      key: 's4',
      image: '/home/services/service-04-design-build.webp',
      alt: 'Makan Design and Build',
    },
    {
      key: 's5',
      image: '/home/services/service-05-project-management.webp',
      alt: 'Makan Project Management',
    },
    {
      key: 's6',
      image: '/home/services/service-06-operation-maintenance.webp',
      alt: 'Makan Operation and Maintenance',
    },
  ]

  return (
    <section className='w-full bg-[#FFFDF8] pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden'>
      {/* Section Header on #FFFDF8 */}
      <div className='mx-auto max-w-4xl px-6 text-center mb-16 sm:mb-20'>
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

        <p className='mt-4 sm:mt-5 font-cairo text-sm sm:text-base md:text-lg text-[#6F746F] leading-relaxed max-w-2xl mx-auto'>
          {t('description')}
        </p>
      </div>

      {/* 6 Services Full-Width Bands on #FFF7E8 with alternating Left/Right image placement */}
      <div className='w-full space-y-16 sm:space-y-20 lg:space-y-24'>
        {services.map((item, index) => {
          const number = t(`items.${item.key}.number`)
          const title = t(`items.${item.key}.title`)
          const subtitle = t(`items.${item.key}.subtitle`)
          const description = t(`items.${item.key}.description`)

          // Alternating pattern: Row 1 = Left, Row 2 = Right, Row 3 = Left, Row 4 = Right, ...
          const imageOnLeft = index % 2 === 0

          // In RTL flex-row, start is physical RIGHT, end is physical LEFT.
          // In LTR flex-row, start is physical LEFT, end is physical RIGHT.
          const imageOrderClass = isRtl
            ? imageOnLeft
              ? 'order-1 lg:order-2' // Placed at end (LEFT)
              : 'order-1 lg:order-1' // Placed at start (RIGHT)
            : imageOnLeft
              ? 'order-1 lg:order-1' // Placed at start (LEFT)
              : 'order-1 lg:order-2' // Placed at end (RIGHT)

          const textOrderClass = isRtl
            ? imageOnLeft
              ? 'order-2 lg:order-1' // Placed at start (RIGHT)
              : 'order-2 lg:order-2' // Placed at end (LEFT)
            : imageOnLeft
              ? 'order-2 lg:order-2' // Placed at end (RIGHT)
              : 'order-2 lg:order-1' // Placed at start (LEFT)

          return (
            <div
              key={item.key}
              className='w-full bg-[#FFF7E8] transition-colors duration-300'
            >
              <div className='max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 xl:px-20 py-10 lg:py-12'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16'>
                  {/* Arched Architectural Photography Column */}
                  <div
                    className={`w-full sm:w-auto flex justify-center shrink-0 ${imageOrderClass}`}
                  >
                    <div className='relative w-[280px] sm:w-[330px] lg:w-[360px] xl:w-[391px] h-[340px] sm:h-[400px] lg:h-[440px] xl:h-[473px] lg:-mt-14 xl:-mt-16 select-none'>
                      <div className='relative w-full h-full arch-top rounded-t-[999px] rounded-b-none overflow-hidden shadow-xl ring-1 ring-black/5'>
                        <Image
                          src={item.image}
                          alt={title}
                          fill
                          className='object-cover object-center transition-transform duration-700 ease-out hover:scale-105'
                          sizes='(max-width: 640px) 280px, (max-width: 1024px) 360px, 391px'
                          priority={index < 2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Text Content Column */}
                  <div
                    className={`w-full lg:max-w-xl text-center lg:text-start ${textOrderClass}`}
                  >
                    {/* Big decorative number */}
                    <span className='block font-alexandria font-normal text-6xl sm:text-7xl lg:text-[88px] xl:text-[96px] text-[#DBC9AD] leading-none select-none tracking-tight mb-2 sm:mb-4'>
                      {number}
                    </span>

                    {/* Service Title */}
                    <h3 className='font-alexandria text-2xl sm:text-3xl lg:text-4xl xl:text-[44px] font-normal text-[#10201D] leading-[1.25] tracking-tight mb-3 sm:mb-4'>
                      {title}
                    </h3>

                    {/* Subtitle / Focus */}
                    <p className='font-cairo text-base sm:text-lg lg:text-xl font-medium text-[#10201D] mb-3 leading-snug'>
                      {subtitle}
                    </p>

                    {/* Body Story / Detail */}
                    <p className='font-cairo text-sm sm:text-base text-[#6F746F] leading-relaxed max-w-lg mx-auto lg:mx-0'>
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
