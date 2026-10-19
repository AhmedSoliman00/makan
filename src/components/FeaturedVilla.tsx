'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function FeaturedVilla() {
  const t = useTranslations('FeaturedVilla');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="w-full bg-[#FAF6F0] py-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Arched Architectural Photo */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md aspect-[3/4] overflow-hidden rounded-t-[180px] shadow-xl">
              <Image
                src="/home/images/Mountain garden.webp"
                alt="Mountain Garden Villa Patio"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Villa Details */}
          <div className="flex flex-col text-start lg:text-end items-start lg:items-end">
            {/* Eyebrow */}
            <div className="flex items-center gap-3 text-xs font-semibold text-[#C29959] uppercase tracking-wider mb-4 font-cairo">
              <span className="h-px w-8 bg-[#C29959]" />
              <span>{t('eyebrow')}</span>
            </div>

            {/* Giant Title */}
            <h2 className="font-alexandria text-5xl sm:text-7xl lg:text-[76px] font-normal leading-[1.1] text-[#082621]">
              {t('title')}
            </h2>

            {/* Location & Type Metadata */}
            <div className="mt-4 flex items-center gap-3 font-cairo text-base sm:text-lg text-[#6F746F]">
              <span>{t('location')}</span>
              <span className="text-[#C29959]">|</span>
              <span>{t('type')}</span>
            </div>

            {/* Description */}
            <p className="mt-6 font-cairo text-base leading-relaxed text-[#082621]/80 max-w-lg">
              {t('desc')}
            </p>

            {/* Gold Button */}
            <div className="mt-10">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 bg-[#B98E4B] hover:bg-[#a67d3d] px-8 py-3.5 font-cairo text-sm font-semibold text-white shadow-md transition-all rounded-sm"
              >
                <span>{t('cta')}</span>
                {isRtl ? (
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
