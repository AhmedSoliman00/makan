import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { FileQuestion, Home } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('Navigation');

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 mb-6 border border-sky-100 dark:border-sky-900/40">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="font-alexandria text-4xl font-extrabold text-zinc-900 dark:text-white sm:text-5xl">
        404
      </h1>
      <p className="mt-3 max-w-md font-cairo text-base text-zinc-600 dark:text-zinc-400">
        Page not found / الصفحة غير موجودة
      </p>
      <div className="mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-500 transition-all font-alexandria"
        >
          <Home className="h-4 w-4" />
          <span>{t('home')}</span>
        </Link>
      </div>
    </div>
  );
}
