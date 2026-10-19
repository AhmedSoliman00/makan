'use client';

import { useTranslations } from 'next-intl';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  return (
    <footer className="border-t border-zinc-200/80 bg-white/50 dark:border-zinc-800/80 dark:bg-zinc-950/50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-xs">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <span className="font-alexandria text-base font-bold text-zinc-900 dark:text-white">
              {tNav('brand')}
            </span>
            <p className="text-xs text-zinc-500 font-cairo">
              {t('tagline')}
            </p>
          </div>
        </div>

        <div className="text-center md:text-end text-xs text-zinc-500 dark:text-zinc-400 font-cairo">
          <p>{t('copyright')}</p>
          <p className="mt-1 text-zinc-400 dark:text-zinc-500 flex items-center justify-center md:justify-end gap-1">
            <span>{t('builtWith')}</span>
            <Heart className="h-3 w-3 text-red-500 inline fill-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
