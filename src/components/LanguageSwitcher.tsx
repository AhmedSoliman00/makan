'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { useTransition } from 'react';
import { Globe, Check } from 'lucide-react';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: 'ar' | 'en') => {
    if (newLocale === currentLocale) return;

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <div className="relative inline-flex items-center rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 shadow-xs">
      <span className="sr-only">{t('switchPrompt')}</span>
      <div className="flex items-center gap-1.5 px-2 text-zinc-400 dark:text-zinc-500">
        <Globe className="h-4 w-4" />
      </div>

      <button
        type="button"
        onClick={() => handleLanguageChange('ar')}
        disabled={isPending}
        className={`relative flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
          currentLocale === 'ar'
            ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white font-alexandria'
            : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white font-cairo'
        }`}
      >
        <span>{t('ar')}</span>
        {currentLocale === 'ar' && (
          <Check className="h-3 w-3 text-sky-600 dark:text-sky-400 inline" />
        )}
      </button>

      <button
        type="button"
        onClick={() => handleLanguageChange('en')}
        disabled={isPending}
        className={`relative flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg transition-all duration-200 ${
          currentLocale === 'en'
            ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-900 dark:text-white font-alexandria'
            : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white font-cairo'
        }`}
      >
        <span>{t('en')}</span>
        {currentLocale === 'en' && (
          <Check className="h-3 w-3 text-sky-600 dark:text-sky-400 inline" />
        )}
      </button>
    </div>
  );
}
