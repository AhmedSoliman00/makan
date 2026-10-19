'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function PreFooterCta() {
  const t = useTranslations('PreFooter');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="relative w-full min-h-[480px] flex items-center bg-[#FAF6F0] overflow-hidden py-24 isolate">
      {/* Background Photography with Landscape Olive Tree */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/images/home-before-footer.webp"
          alt="Makan Landscape Garden Architecture"
          fill
          className="object-cover object-start sm:object-center"
          sizes="100vw"
        />
        {/* Editorial gradient fade so text is crisp and readable */}
        <div
          className={`absolute inset-0 ${
            isRtl
              ? 'bg-gradient-to-l from-[#FAF6F0] via-[#FAF6F0]/85 to-transparent'
              : 'bg-gradient-to-r from-[#FAF6F0] via-[#FAF6F0]/85 to-transparent'
          }`}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="max-w-2xl ms-auto text-end">
          <h2 className="font-alexandria text-4xl sm:text-6xl font-normal leading-[1.2] text-[#082621]">
            {t('heading')}
          </h2>

          <p className="mt-5 font-cairo text-base sm:text-lg leading-relaxed text-[#082621]/80 max-w-xl ms-auto">
            {t('desc')}
          </p>

          <div className="mt-10 flex justify-end">
            <a
              href="#projects"
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
