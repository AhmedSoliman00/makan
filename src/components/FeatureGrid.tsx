'use client';

import { useTranslations } from 'next-intl';
import { Globe2, Wind, Type, ArrowLeftRight } from 'lucide-react';

export default function FeatureGrid() {
  const t = useTranslations('Features');

  const features = [
    {
      icon: Globe2,
      color: 'from-blue-500 to-sky-500',
      title: t('i18nTitle'),
      description: t('i18nDesc'),
    },
    {
      icon: Wind,
      color: 'from-cyan-500 to-teal-500',
      title: t('tailwindTitle'),
      description: t('tailwindDesc'),
    },
    {
      icon: Type,
      color: 'from-indigo-500 to-violet-500',
      title: t('fontsTitle'),
      description: t('fontsDesc'),
    },
    {
      icon: ArrowLeftRight,
      color: 'from-emerald-500 to-teal-500',
      title: t('rtlTitle'),
      description: t('rtlDesc'),
    },
  ];

  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-sky-50 px-3.5 py-1 text-xs font-semibold text-sky-700 dark:border-sky-900/60 dark:bg-sky-950/50 dark:text-sky-300 mb-3 shadow-xs">
            <span className="font-alexandria">{t('badge')}</span>
          </div>
          <h2 className="font-alexandria text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-300 font-cairo">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-2xl bg-white p-6 shadow-sm border border-zinc-200/80 dark:bg-zinc-900/60 dark:border-zinc-800/80 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300"
              >
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr ${feature.color} text-white shadow-md mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-alexandria text-lg font-bold text-zinc-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="font-cairo text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
