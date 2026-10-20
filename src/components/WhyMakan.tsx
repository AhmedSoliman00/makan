'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function WhyMakan() {
  const t = useTranslations('WhyMakan');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section
      id="why-makan"
      className="relative w-full bg-[#FAF6F0] overflow-hidden min-h-[520px] lg:h-[551px] flex items-center isolate"
    >
      {/* Background Photography: /home/images/why-makan-bg.webp */}
      <div className="absolute inset-0 z-0 select-none">
        <Image
          src="/home/images/why-makan-bg.webp"
          alt="Makan Architecture"
          fill
          priority={false}
          className="object-cover object-left"
          sizes="100vw"
        />
        {/* Soft directional gradient: text side is warm cream, photo side reveals architecture */}
        <div
          className={`absolute inset-0 ${
            isRtl
              ? 'bg-gradient-to-l from-[#FAF6F0] from-35% via-[#FAF6F0]/85 via-55% to-[#FAF6F0]/20'
              : 'bg-gradient-to-r from-[#FAF6F0] from-35% via-[#FAF6F0]/85 via-55% to-[#FAF6F0]/20'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        {/* Frame 17: Content container */}
        <div className="max-w-[641px] text-start">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-wider mb-5 font-cairo">
            <span className="h-px w-8 bg-[#C29959]" />
            <span className="text-[#6F746F] text-sm">{t('eyebrow')}</span>
            <span className="h-px w-8 bg-[#C29959]" />
          </div>

          {/* Heading (64px in Figma) */}
          <h2 className="font-alexandria text-4xl sm:text-5xl lg:text-[64px] font-normal leading-[1.50] text-[#082621] tracking-tight">
            {t('heading')}
          </h2>

          {/* Paragraph */}
          <p className="mt-5 font-cairo text-sm sm:text-base leading-relaxed text-[#10201D]/80 max-w-xl">
            {t('description')}
          </p>

          {/* Button (177px x 49px in Figma) */}
          <div className="mt-8 sm:mt-9 flex justify-start">
            <a
              href="#services"
              className="group inline-flex h-[49px] w-[177px] items-center justify-center gap-3 bg-[#082621] font-cairo text-[13px] font-semibold text-white shadow-md transition-all hover:bg-[#041a17]"
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


