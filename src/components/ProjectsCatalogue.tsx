'use client';

import { useMemo, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import {
  catalogueProjects,
  projectFilterOrder,
  type ProjectFilterId,
} from '@/lib/projects-catalogue';

function ProjectCard({
  categoryLabel,
  title,
  location,
  image,
  exploreLabel,
  isRtl,
}: {
  categoryLabel: string;
  title: string;
  location: string;
  image: string;
  exploreLabel: string;
  isRtl: boolean;
}) {
  return (
    <article className="group flex flex-col overflow-hidden bg-white transition-all duration-300">
      <div className="relative h-[260px] sm:h-[282px] w-full overflow-hidden rounded-t-[5px] bg-zinc-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <div className="flex h-auto min-h-[95px] items-center justify-between gap-[18px] px-4 sm:px-[23px] py-3 sm:py-0">
        <div
          className={`min-w-0 flex-1 ${isRtl ? 'text-end' : 'text-start'}`}
        >
          <span className="font-cairo text-[13px] font-normal text-[#C29959] block">
            {categoryLabel}
          </span>
          <h3 className="font-alexandria text-lg sm:text-[20px] font-medium leading-snug text-[#10201D] mt-0.5 group-hover:text-[#C29959] transition-colors">
            {title}
          </h3>
          <p className="font-cairo text-xs text-[#6F746F] mt-0.5">{location}</p>
        </div>

        <div
          className="relative flex h-[47px] w-[50px] shrink-0 items-center justify-center border border-[#C29959] text-[#10201D] transition-colors group-hover:bg-[#C29959] group-hover:text-white"
          aria-label={exploreLabel}
        >
          {isRtl ? (
            <ArrowLeft className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </div>
      </div>
    </article>
  );
}

export default function ProjectsCatalogue() {
  const t = useTranslations('ProjectsPage');
  const locale = useLocale();
  const isRtl = locale === 'ar';
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>('all');

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return catalogueProjects;
    return catalogueProjects.filter((p) => p.category === activeFilter);
  }, [activeFilter]);

  const getProjectCopy = (project: (typeof catalogueProjects)[number]) => {
    const baseKey = project.category;
    return {
      categoryLabel: t(`categories.${baseKey}`),
      title: t(`items.${baseKey}.title`),
      location: t(`items.${baseKey}.location`),
    };
  };

  return (
    <section className="w-full bg-[#fffdf8] pb-8 pt-6 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[86px]">
        {/* Filters & count */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between py-6 lg:py-8 px-0 sm:px-2.5">
          <div
            className="flex flex-wrap gap-3 sm:gap-[18px] justify-start order-1 min-w-0 lg:flex-1"
            role="tablist"
            aria-label={t('filterAriaLabel')}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {projectFilterOrder.map((filterId) => {
              const isActive = activeFilter === filterId;
              return (
                <button
                  key={filterId}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filterId)}
                  className={`inline-flex h-[49px] min-w-[90px] items-center justify-center rounded-xl px-4 font-cairo text-[13px] font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#10201D] text-white'
                      : 'border border-[#DBC9AD] text-[#10201D] hover:border-[#C29959]'
                  }`}
                >
                  {t(`filters.${filterId}`)}
                </button>
              );
            })}
          </div>

          <p
            className={`font-cairo text-sm text-[#6F746F] order-2 shrink-0 ${
              isRtl ? 'lg:text-start' : 'lg:text-end'
            }`}
          >
            {t('projectCount', { count: filteredProjects.length })}
          </p>
        </div>

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[23px]">
            {filteredProjects.map((project) => {
              const copy = getProjectCopy(project);
              return (
                <ProjectCard
                  key={project.id}
                  categoryLabel={copy.categoryLabel}
                  title={copy.title}
                  location={copy.location}
                  image={project.image}
                  exploreLabel={t('exploreProject')}
                  isRtl={isRtl}
                />
              );
            })}
          </div>
        ) : (
          <p className="py-16 text-center font-cairo text-[#6F746F]">
            {t('emptyState')}
          </p>
        )}
      </div>
    </section>
  );
}
