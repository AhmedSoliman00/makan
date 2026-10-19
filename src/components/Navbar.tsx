'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLocale } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/70 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-alexandria text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {t('brand')}
            </span>
            <span className="text-[10px] tracking-widest text-zinc-400 font-medium uppercase font-cairo">
              {t('brandSub')}
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
          <Link
            href="/"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            {t('home')}
          </Link>
          <a
            href="#features"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            {t('features')}
          </a>
          <a
            href="#typography"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            {t('typography')}
          </a>
          <a
            href="#docs"
            className="hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
          >
            {t('documentation')}
          </a>
        </nav>

        {/* Actions & Switcher */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />

          <a
            href="#typography"
            className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-500/25 hover:from-sky-500 hover:to-indigo-500 hover:shadow-md transition-all duration-200 font-alexandria"
          >
            <span>{t('getStarted')}</span>
            {isRtl ? (
              <ArrowLeft className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
          </a>
        </div>
      </div>
    </header>
  );
}
