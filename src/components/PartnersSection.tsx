'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function PartnersSection() {
  const t = useTranslations('Partners');

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
      src: '/home/partners/Al-Ramz-Logo 1.png',
    },
    {
      name: 'مشراق',
      src: '/home/partners/logo-color 1.png',
    },
    {
      name: 'يمن للاستثمار',
      src: '/home/partners/Yumn-Logo-Icon-Black-1080 1.png',
    },
  ];

  return (
    <section className="w-full bg-[#FCFBF7] py-20 border-t border-[#E4DFD7]/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Title */}
        <div className="text-start md:text-end mb-16">
          <h2 className="font-alexandria text-3xl sm:text-5xl font-normal text-[#082621] tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-3 font-cairo text-sm sm:text-base text-[#6F746F]">
            {t('desc')}
          </p>
        </div>

        {/* 5 Logos Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 items-center justify-items-center">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={70}
                className="max-h-14 w-auto object-contain grayscale hover:grayscale-0 transition-all opacity-80 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
