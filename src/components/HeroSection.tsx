'use client';

import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowLeft, Star, Layers, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background radial glow */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 -z-10 h-[500px] w-full max-w-5xl opacity-40 blur-3xl pointer-events-none">
        <div className="h-full w-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-purple-500 opacity-20 dark:opacity-30 rounded-full" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Release / Tech Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-sky-200/60 bg-sky-50/80 px-4 py-1.5 text-xs font-semibold text-sky-700 backdrop-blur-sm dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-300 mb-8 animate-fade-in shadow-xs">
          <Sparkles className="h-3.5 w-3.5 text-sky-500" />
          <span className="font-alexandria">{t('badge')}</span>
        </div>

        {/* Main Heading with Alexandria font */}
        <h1 className="font-alexandria text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white max-w-4xl mx-auto leading-[1.18] sm:leading-[1.15]">
          <span>{t('titlePrefix')} </span>
          <span className="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {t('titleHighlight')}
          </span>{' '}
          <span>{t('titleSuffix')}</span>
        </h1>

        {/* Description with Cairo font for peak legibility */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto font-cairo leading-relaxed font-normal">
          {t('description')}
        </p>

        {/* Call to Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#features"
            className="inline-flex items-center gap-2.5 rounded-xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-zinc-900/20 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 transition-all duration-200 font-alexandria"
          >
            <span>{t('primaryCta')}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </a>

          <a
            href="#typography"
            className="inline-flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white/80 px-6 py-3.5 text-sm font-semibold text-zinc-700 shadow-xs hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-800/80 transition-all duration-200 font-cairo"
          >
            <Layers className="h-4 w-4 text-sky-600 dark:text-sky-400" />
            <span>{t('secondaryCta')}</span>
          </a>
        </div>

        {/* Social Proof / Features Checklist */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-cairo">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Zero Layout Shift (next/font)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Next-intl Server & Client Components</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Tailwind CSS v4 Modern Theme</span>
          </div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-amber-400" />
            <span className="font-semibold text-zinc-700 dark:text-zinc-200">
              {t('stars')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
