'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  const t = useTranslations('Services');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const services = [
    {
      icon: '/home/svg/service-01-map.svg',
      number: t('s1.number'),
      title: t('s1.title'),
      desc: t('s1.desc'),
    },
    {
      icon: '/home/svg/service-02-palm.svg',
      number: t('s2.number'),
      title: t('s2.title'),
      desc: t('s2.desc'),
    },
    {
      icon: '/home/svg/service-03-community.svg',
      number: t('s3.number'),
      title: t('s3.title'),
      desc: t('s3.desc'),
    },
    {
      icon: '/home/svg/service-04-blocks.svg',
      number: t('s4.number'),
      title: t('s4.title'),
      desc: t('s4.desc'),
    },
    {
      icon: '/home/svg/service-05-projects.svg',
      number: t('s5.number'),
      title: t('s5.title'),
      desc: t('s5.desc'),
    },
    {
      icon: '/home/svg/service-06-cog.svg',
      number: t('s6.number'),
      title: t('s6.title'),
      desc: t('s6.desc'),
    },
  ];

  return (
    <section id="services" className="w-full bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Top Header Row with Title at start (right in RTL, left in LTR) and Button at end */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-16 sm:mb-20">
          {/* Heading */}
          <div className="text-start">
            <div className="flex items-center justify-start gap-3 text-xs font-semibold text-[#C29959] uppercase tracking-wider mb-3 font-cairo">
              <span className="h-px w-8 bg-[#C29959]" />
              <span className="text-[#6F746F] text-sm">{t('eyebrow')}</span>
              <span className="h-px w-8 bg-[#C29959]" />
            </div>
            <h2 className="font-alexandria text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#082621] tracking-tight leading-tight">
              {t('heading')}
            </h2>
            <p className="mt-3 font-cairo text-sm sm:text-base text-[#6F746F]">
              {t('subtitle')}
            </p>
          </div>

          {/* Button on opposite side */}
          <div className="shrink-0">
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 border border-[#10201D] px-6 py-3 font-cairo text-sm font-semibold text-[#10201D] transition-colors hover:bg-[#10201D] hover:text-white"
            >
              {isRtl ? (
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              )}
              <span>{t('ctaAll')}</span>
            </a>
          </div>
        </div>

        {/* 6 Services Grid with clean dividing borders */}
        <div className="grid grid-cols-1 md:grid-cols-3  border-[#E4DFD7]">
          {services.map((item, idx) => {
            const isLastInRow = (idx + 1) % 3 === 0;
            const isFirstRow = idx < 3;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center text-center p-8 lg:p-12 transition-all duration-300 hover:bg-[#FAF6F0]/50 ${
                  !isLastInRow ? 'md:border-e border-[#E4DFD7]' : ''
                } ${
                  isFirstRow ? 'border-b md:border-b border-[#E4DFD7]' : 'border-b md:border-b-0 border-[#E4DFD7]'
                }`}
              >
                <div className="relative h-16 w-16 mb-6 flex items-center justify-center">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
                <span className="font-cairo text-xs font-semibold text-[#C29959]">
                  {item.number}
                </span>
                <h3 className="font-alexandria text-xl font-medium text-[#10201D] mt-2 mb-2">
                  {item.title}
                </h3>
                <p className="font-cairo text-sm text-[#6F746F] max-w-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

