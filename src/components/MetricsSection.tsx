'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function MetricsSection() {
  const t = useTranslations('Metrics');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  return (
    <section className="w-full bg-white border-[#E4DFD7]/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop View: Exact Figma specs: flex, w-[922px], h-[169px], px-[90px], justify-between, items-center, shrink-0 */}
        <div
          dir="ltr"
          className="hidden md:flex w-full max-w-[922px] h-[169px] px-[90px] justify-between items-center shrink-0 mx-auto"
        >
          {stats.map((stat, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && (
                <div
                  className="w-px h-[123px] bg-[#E4DFD7] shrink-0"
                  aria-hidden="true"
                />
              )}
              <div className="flex flex-col items-center justify-center text-center">
                <span
                  dir="auto"
                  className="font-alexandria text-4xl lg:text-[48px] font-medium tracking-tight text-[#10201D] leading-none"
                >
                  {stat.value}
                </span>
                <span
                  dir="auto"
                  className="mt-3 font-cairo text-sm lg:text-base text-[#6F746F] whitespace-nowrap"
                >
                  {stat.label}
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Mobile View: Responsive 2-column grid */}
        <div className="md:hidden grid grid-cols-2 gap-y-8 gap-x-4 py-10">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center px-2"
            >
              <span
                dir="auto"
                className="font-alexandria text-3xl sm:text-4xl font-medium tracking-tight text-[#10201D] leading-none"
              >
                {stat.value}
              </span>
              <span
                dir="auto"
                className="mt-2.5 font-cairo text-xs sm:text-sm text-[#6F746F]"
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
