'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

export default function WhyMakan() {
  const t = useTranslations('WhyMakan');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const pillars = [
    { title: t('pillar1Title'), desc: t('pillar1Desc') },
    { title: t('pillar2Title'), desc: t('pillar2Desc') },
    { title: t('pillar3Title'), desc: t('pillar3Desc') },
  ];

  return (
    <section id="why-makan" className="relative w-full bg-[#FAF6F0] py-28 overflow-hidden isolate">
      {/* Background with soft luxury texture/gradient fade */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <Image
          src="/home/images/hero.webp"
          alt="Luxury Landscape"
          fill
          className="object-cover object-center filter blur-xs"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/90 to-[#FAF6F0]/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-3xl ms-auto text-end">
          {/* Eyebrow */}
          <div className="flex items-center justify-end gap-3 text-xs font-semibold text-[#C29959] uppercase tracking-wider mb-4 font-cairo">
            <span className="h-px w-8 bg-[#C29959]" />
            <span>{t('eyebrow')}</span>
            <span className="h-px w-8 bg-[#C29959]" />
          </div>

          {/* Heading */}
          <h2 className="font-alexandria text-4xl sm:text-6xl font-normal leading-[1.2] text-[#082621]">
            {t('heading')}
          </h2>

          {/* Paragraph */}
          <p className="mt-6 font-cairo text-sm sm:text-base leading-relaxed text-[#082621]/80 max-w-2xl ms-auto">
            {t('description')}
          </p>

          {/* Value Pillars */}
          <div className="mt-10 grid grid-cols-3 gap-6 pt-8 border-t border-[#E4DFD7]/80">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="flex flex-col items-center sm:items-end text-end">
                <Sparkles className="h-4 w-4 text-[#C29959] mb-2" />
                <h3 className="font-cairo text-sm font-bold text-[#082621]">
                  {pillar.title}
                </h3>
                <p className="font-cairo text-xs text-[#6F746F] mt-1">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Button */}
          <div className="mt-12 flex justify-end">
            <a
              href="#services"
              className="group inline-flex items-center gap-3 rounded-md bg-[#082621] px-8 py-3.5 font-cairo text-sm font-semibold text-white shadow-md transition-all hover:bg-[#041a17]"
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
    </section>
  );
}
