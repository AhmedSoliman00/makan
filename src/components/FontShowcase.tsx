'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Type } from 'lucide-react';

export default function FontShowcase() {
  const t = useTranslations('TypographyShowcase');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const defaultSampleAr = 'الخط العربي هو هندسة روحانية ظهرت بآلة جسمانية 2026';
  const defaultSampleEn = 'The quick brown fox jumps over the lazy dog 2026';

  const [sampleText, setSampleText] = useState(isRtl ? defaultSampleAr : defaultSampleEn);
  const [selectedWeight, setSelectedWeight] = useState<'300' | '400' | '600' | '700' | '900'>('700');
  const [fontSize, setFontSize] = useState<number>(28);

  const weightClasses: Record<'300' | '400' | '600' | '700' | '900', string> = {
    '300': 'font-light',
    '400': 'font-normal',
    '600': 'font-semibold',
    '700': 'font-bold',
    '900': 'font-black',
  };

  return (
    <section id="typography" className="py-20 bg-zinc-50/70 dark:bg-zinc-900/30 border-y border-zinc-200/60 dark:border-zinc-800/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-3.5 py-1 text-xs font-semibold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/50 dark:text-indigo-300 mb-3 shadow-xs">
            <Type className="h-3.5 w-3.5" />
            <span className="font-alexandria">{t('badge')}</span>
          </div>
          <h2 className="font-alexandria text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-cairo">
            {t('subtitle')}
          </p>
        </div>

        {/* Interactive Playground Controls */}
        <div className="mb-12 rounded-2xl bg-white p-6 shadow-md border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Input preview text */}
            <div className="w-full md:w-1/2">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 font-alexandria">
                {isRtl ? 'نص التجربة المباشرة' : 'Live Preview Text'}
              </label>
              <input
                type="text"
                value={sampleText}
                onChange={(e) => setSampleText(e.target.value)}
                placeholder={isRtl ? 'اكتب أي نص للتجربة...' : 'Type text to test...'}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm text-zinc-900 focus:border-sky-500 focus:bg-white focus:outline-hidden dark:border-zinc-700 dark:bg-zinc-800 dark:text-white transition-all font-cairo"
              />
            </div>

            {/* Weight selector */}
            <div className="w-full md:w-auto flex flex-col">
              <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 font-alexandria">
                {isRtl ? 'وزن الخط' : 'Font Weight'}
              </label>
              <div className="flex items-center gap-1.5 bg-zinc-100 p-1 rounded-xl dark:bg-zinc-800">
                {(['300', '400', '600', '700', '900'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-3 py-1.5 text-xs rounded-lg transition-all font-alexandria ${
                      selectedWeight === w
                        ? 'bg-white text-sky-600 shadow-xs dark:bg-zinc-900 dark:text-sky-400 font-bold'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Slider */}
            <div className="w-full md:w-48 flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider font-alexandria">
                  {isRtl ? 'حجم الخط' : 'Font Size'}
                </label>
                <span className="text-xs font-bold text-sky-600 dark:text-sky-400 font-mono">
                  {fontSize}px
                </span>
              </div>
              <input
                type="range"
                min="18"
                max="48"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Side-by-Side Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cairo Card */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-lg shadow-zinc-200/50 border border-zinc-200 dark:bg-zinc-900/90 dark:border-zinc-800 dark:shadow-none hover:border-sky-500/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400 font-alexandria">
                    UI & Body Typeface
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1 font-alexandria">
                    {t('cairoTitle')}
                  </h3>
                </div>
                <div className="rounded-xl bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-950 dark:text-sky-300 font-mono">
                  font-cairo
                </div>
              </div>

              {/* Live Preview Text Area */}
              <div className="my-8 min-h-[140px] flex items-center justify-center p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/80">
                <p
                  className={`font-cairo text-zinc-900 dark:text-white break-words w-full text-center leading-snug transition-all ${weightClasses[selectedWeight]}`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {sampleText}
                </p>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-cairo leading-relaxed">
                {t('cairoSubtitle')}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-cairo">
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                Subsets: Arabic + Latin
              </span>
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                Weights: 200 - 1000
              </span>
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                Best For: Long text, UI, Buttons
              </span>
            </div>
          </div>

          {/* Alexandria Card */}
          <div className="relative flex flex-col justify-between rounded-3xl bg-white p-8 shadow-lg shadow-zinc-200/50 border border-zinc-200 dark:bg-zinc-900/90 dark:border-zinc-800 dark:shadow-none hover:border-indigo-500/40 transition-all duration-300">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 font-alexandria">
                    Headings & Display
                  </span>
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mt-1 font-alexandria">
                    {t('alexandriaTitle')}
                  </h3>
                </div>
                <div className="rounded-xl bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-mono">
                  font-alexandria
                </div>
              </div>

              {/* Live Preview Text Area */}
              <div className="my-8 min-h-[140px] flex items-center justify-center p-6 rounded-2xl bg-zinc-50/70 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/80">
                <p
                  className={`font-alexandria text-zinc-900 dark:text-white break-words w-full text-center leading-snug transition-all ${weightClasses[selectedWeight]}`}
                  style={{ fontSize: `${fontSize}px` }}
                >
                  {sampleText}
                </p>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-400 font-cairo leading-relaxed">
                {t('alexandriaSubtitle')}
              </p>
            </div>

            {/* Quick Specs */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-cairo">
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                Subsets: Arabic + Latin
              </span>
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                Weights: 100 - 900
              </span>
              <span className="rounded-md bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1">
                Best For: Headings, Logos, Numbers
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
