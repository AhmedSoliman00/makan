'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

export default function PartnersSection() {
  const t = useTranslations('Partners')

  const partners = [
    {
      name: 'مينا للتطوير والاستثمار العقاري',
      src: '/home/partners/01K4K051R18Q14C6T5WTK0XS2V 1.png',
    },
    {
      name: 'مؤسسة عبد الله الراجحي الخيرية',
      src: '/home/partners/99-2048x836-1-e1729408671310 1.png',
    },
    {
      name: 'شركة الرمز',
      src: '/home/svg/Al-Ramz-Logo 1.svg',
    },
    {
      name: 'مشراق',
      src: '/home/partners/logo-color 1.png',
    },
    {
      name: 'يمن للاستثمار',
      src: '/home/partners/Yumn-Logo-Icon-Black-1080 1.png',
    },
  ]

  return (
    <section className='bg-[##FFFDF8] py-20 border-[#E4DFD7]/60 border-t w-full'>
      <div className='mx-auto px-6 lg:px-8 max-w-7xl'>
        {/* Title: starts on the right in Arabic (RTL) and on the left in English (LTR) */}
        <div className='mb-16 text-center'>
          <h2 className='font-alexandria font-normal text-[#082621] text-3xl sm:text-5xl leading-[1.3] tracking-tight'>
            {t('title')}
          </h2>
          <p className='mt-3 font-cairo text-[#6F746F] text-sm sm:text-base'>
            {t('desc')}
          </p>
        </div>

        {/* 5 Logos Row */}
        <div className='justify-items-center items-center gap-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5'>
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className='flex justify-center items-center p-2 sm:p-4'
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={175}
                height={70}
                className='w-auto h-12 sm:h-14 md:h-16 object-contain hover:scale-105 transition-transform duration-300'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
