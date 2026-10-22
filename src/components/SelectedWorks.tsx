'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export default function SelectedWorks() {
  const t = useTranslations('FeaturedProjects');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const projects = [
    {
      slug: '/projects/el-wady-al-akhdar',
      image: '/home/images/elwady.webp',
      category: t('project1.category'),
      title: t('project1.title'),
      location: t('project1.location'),
    },
    {
      slug: '/projects/rafed-project',
      image: '/home/images/rafed.webp',
      category: t('project2.category'),
      title: t('project2.title'),
      location: t('project2.location'),
    },
    {
      slug: '/projects/estraha-retreat',
      image: '/home/images/estraha.webp',
      category: t('project3.category'),
      title: t('project3.title'),
      location: t('project3.location'),
    },
  ];

  return (
    <section id="projects" className="w-full bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[90px]">
        {/* Section Header: Frame 40 */}
        <div className="text-center mb-10 sm:mb-[53px]">
          <h2 className="font-alexandria text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#10201D] tracking-tight leading-tight">
            {t('title')}
          </h2>
          <p className="mt-3 font-cairo text-xs sm:text-sm text-[#6F746F]">
            {t('subtitle')}
          </p>
        </div>

        {/* Projects Collection Grid: 190:921 (195px, 528px, 343px with 47px gap) */}
        <div
          dir="ltr"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-[195px_1fr_343px] gap-8 md:gap-6 lg:gap-[47px] w-full max-w-[1160px] mx-auto items-start"
        >
          {projects.map((proj, idx) => (
            <article
              key={idx}
              dir={isRtl ? 'rtl' : 'ltr'}
              className="group flex flex-col justify-between overflow-hidden bg-white transition-all duration-300 w-full"
            >
              <Link href={proj.slug} className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959]">
                {/* Image Container: 282px height with rounded top */}
                <div className="relative h-[260px] sm:h-[282px] w-full overflow-hidden rounded-t-[5px] bg-zinc-100">
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      idx === 0
                        ? '(max-width: 768px) 100vw, 195px'
                        : idx === 1
                        ? '(max-width: 768px) 100vw, 528px'
                        : '(max-width: 768px) 100vw, 343px'
                    }
                  />
                </div>

                {/* Meta & Title Row: Project Details */}
                <div className="mt-4 sm:mt-5 flex items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="font-cairo text-[13px] font-semibold text-[#C29959] block">
                      {proj.category}
                    </span>
                    <h3 className="font-alexandria text-lg sm:text-xl font-medium text-[#10201D] mt-0.5 truncate group-hover:text-[#C29959] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-cairo text-xs text-[#6F746F] mt-0.5 truncate">
                      {proj.location}
                    </p>
                  </div>

                  {/* Explore Project Button (50px x 47px) */}
                  <div
                    className="relative flex h-[47px] w-[50px] shrink-0 items-center justify-center border border-[#C29959] text-[#10201D] transition-colors group-hover:bg-[#C29959] group-hover:text-white"
                    aria-label={t('exploreProject')}
                  >
                    {isRtl ? (
                      <ArrowLeft className="h-4 w-4" />
                    ) : (
                      <ArrowRight className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* View All Projects Button: 209px x 49px */}
        <div className="mt-10 sm:mt-[53px] flex justify-center">
          <Link
            href="/projects"
            className="group relative inline-flex h-[49px] w-[209px] items-center justify-center gap-3 border border-[#10201D] font-cairo text-[13px] font-semibold text-[#10201D] transition-all hover:bg-[#10201D] hover:text-white"
          >
            <span>{t('ctaAll')}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>
      </div>
    </section>
  );
}

