'use client'

import { useMemo, useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, LayoutGrid, List } from 'lucide-react'
import {
  catalogueProjects,
  projectFilterOrder,
  type ProjectFilterId,
} from '@/lib/projects-catalogue'
import { Link } from '@/i18n/navigation'

function ProjectCard({
  categoryLabel,
  title,
  location,
  image,
  projectSlug,
  exploreLabel,
  isRtl,
}: {
  categoryLabel: string
  title: string
  location: string
  image: string
  projectSlug: string
  exploreLabel: string
  isRtl: boolean
}) {
  const href = `/projects/${projectSlug}`

  return (
    <article className='group flex flex-col overflow-hidden bg-white transition-all duration-300'>
      <Link
        href={href}
        className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959]'
      >
        <div className='relative h-[260px] sm:h-[282px] w-full overflow-hidden rounded-t-[5px] bg-zinc-100'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover transition-transform duration-500 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, 33vw'
          />
        </div>

        <div className='flex h-auto min-h-[95px] items-center justify-between gap-[18px] px-4 sm:px-[23px] py-3 sm:py-0'>
          <div
            className={`min-w-0 flex-1 ${isRtl ? 'text-end' : 'text-start'}`}
          >
            <span className='font-cairo text-[13px] font-normal text-[#C29959] block'>
              {categoryLabel}
            </span>
            <h3 className='font-alexandria text-lg sm:text-[20px] font-medium leading-snug text-[#10201D] mt-0.5 group-hover:text-[#C29959] transition-colors'>
              {title}
            </h3>
            <p className='font-cairo text-xs text-[#6F746F] mt-0.5'>
              {location}
            </p>
          </div>

          <div
            className='relative flex h-[47px] w-[50px] shrink-0 items-center justify-center border border-[#C29959] text-[#10201D] transition-colors group-hover:bg-[#C29959] group-hover:text-white'
            aria-label={exploreLabel}
          >
            {isRtl ? (
              <ArrowLeft className='h-4 w-4' />
            ) : (
              <ArrowRight className='h-4 w-4' />
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}

function ProjectListItem({
  title,
  location,
  image,
  projectSlug,
  viewProjectLabel,
  isRtl,
  typeLabel,
  typeValue,
  locationLabel,
  locationValue,
  statusLabel,
  statusValue,
}: {
  title: string
  location: string
  image: string
  projectSlug: string
  viewProjectLabel: string
  isRtl: boolean
  typeLabel: string
  typeValue: string
  locationLabel: string
  locationValue: string
  statusLabel: string
  statusValue: string
}) {
  const href = `/projects/${projectSlug}`

  // Aligned with Figma Proejcts-List (127:571 / 127:598):
  // In RTL: Status is closest to the title/photo (right), Location middle, Type left
  // In LTR: Type left, Location middle, Status right
  const metadataItems = isRtl
    ? [
        { label: statusLabel, value: statusValue },
        { label: locationLabel, value: locationValue },
        { label: typeLabel, value: typeValue },
      ]
    : [
        { label: typeLabel, value: typeValue },
        { label: locationLabel, value: locationValue },
        { label: statusLabel, value: statusValue },
      ]

  return (
    <article className='group relative overflow-hidden rounded-[8px] bg-[#fffdf9] p-4 transition-all duration-300 shadow-[0px_12px_32px_-8px_rgba(8,38,33,0.06)] hover:shadow-[0px_16px_36px_-6px_rgba(8,38,33,0.1)] border border-transparent hover:border-[#C29959]/40'>
      <Link
        href={href}
        className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959] rounded-[6px]'
      >
        <div className='flex flex-col md:flex-row items-stretch md:items-center gap-6 justify-between'>
          {/* Project Photography (On the right in RTL, on the left in LTR) */}
          <div className='relative h-[220px] w-full md:w-[320px] shrink-0 overflow-hidden rounded-[4px] bg-zinc-100'>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, 320px'
            />
          </div>

          {/* Project Details */}
          <div className='flex-1 min-w-0 flex flex-col justify-between py-1'>
            {/* Top row: Title + CTA button */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
              <div className='min-w-0 flex-1'>
                <h3 className='font-alexandria text-2xl sm:text-[28px] font-normal leading-snug text-[#10201D] group-hover:text-[#C29959] transition-colors'>
                  {title}
                </h3>
                <p className='font-cairo text-sm text-[#6F746F] mt-1'>
                  {location}
                </p>
              </div>

              {/* Action Button: Rectangular, #082621 deep green, hover gold */}
              <div className='inline-flex h-[48px] shrink-0 items-center justify-center gap-4 bg-[#082621] px-6 text-white transition-all duration-300 group-hover:bg-[#C29959] self-start sm:self-auto'>
                <span className='font-cairo text-[13px] font-semibold tracking-wide'>
                  {viewProjectLabel}
                </span>
                {isRtl ? (
                  <ArrowLeft className='h-4 w-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1' />
                ) : (
                  <ArrowRight className='h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1' />
                )}
              </div>
            </div>

            {/* Bottom metadata row: 3 columns */}
            <div className='mt-6 pt-5 border-t border-[#EAE4D8]/60 flex items-center justify-between sm:justify-start gap-8 sm:gap-16 lg:gap-24'>
              {metadataItems.map((meta, idx) => (
                <div key={idx} className='flex flex-col gap-1 min-w-[70px]'>
                  <span className='font-cairo text-base font-normal text-[#10201D]'>
                    {meta.value}
                  </span>
                  <span className='font-cairo text-sm font-normal text-[#6F746F]'>
                    {meta.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}

import type { LocalizedProjectSummary } from '@/lib/data/projects'

type ProjectsCatalogueProps = {
  projects?: LocalizedProjectSummary[]
  initialCategory?: string
  initialView?: 'grid' | 'list'
}

export default function ProjectsCatalogue({
  projects = [],
  initialCategory = 'all',
  initialView = 'grid',
}: ProjectsCatalogueProps) {
  const t = useTranslations('ProjectsPage')
  const locale = useLocale()
  const isRtl = locale === 'ar'
  const [activeFilter, setActiveFilter] = useState<ProjectFilterId>(
    (initialCategory as ProjectFilterId) || 'all'
  )
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialView)

  const items = projects.length > 0 ? projects : catalogueProjects

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return items
    return items.filter((p) => p.category === activeFilter)
  }, [activeFilter, items])

  const getProjectCopy = (project: (typeof items)[number]) => {
    const baseKey = project.category
    const cityKey = project.cityKey || 'riyadh'
    const statusKey = project.statusKey || 'completed'
    const typeKey = (project as any).typeKey || baseKey

    return {
      categoryLabel:
        (project as any).categoryLabel || t(`categories.${baseKey}`),
      title: (project as any).title || t(`items.${baseKey}.title`),
      location: (project as any).location || t(`items.${baseKey}.location`),
      cityValue: t(`metadataValues.cities.${cityKey}`),
      typeValue: t(`metadataValues.types.${typeKey}`),
      statusValue: t(`metadataValues.statuses.${statusKey}`),
    }
  }

  return (
    <section className='w-full bg-[#fffdf8] pb-12 pt-6 lg:pb-16'>
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[86px]'>
        {/* Filters & count + View toggle */}
        <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between py-6 lg:py-8 px-0 sm:px-2.5'>
          {/* Category filter pills */}
          <div
            className='flex flex-wrap gap-3 sm:gap-[18px] justify-start order-1 min-w-0 lg:flex-1'
            role='tablist'
            aria-label={t('filterAriaLabel')}
            dir={isRtl ? 'rtl' : 'ltr'}
          >
            {projectFilterOrder.map((filterId) => {
              const isActive = activeFilter === filterId
              return (
                <button
                  key={filterId}
                  type='button'
                  role='tab'
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
              )
            })}
          </div>

          {/* Project count and view mode toggle */}
          <div className='flex items-center gap-3 sm:gap-5 order-2 shrink-0'>
            <p
              className={`font-cairo text-sm text-[#6F746F] ${
                isRtl ? 'text-start' : 'text-end'
              }`}
            >
              {t('projectCount', { count: filteredProjects.length })}
            </p>

            {/* View Mode Toggle: Grid & List */}
            <div
              className='inline-flex items-center rounded-xl border border-[#DBC9AD] bg-white/70 p-1 shadow-xs'
              role='group'
              aria-label={t('viewToggleAriaLabel')}
            >
              <button
                type='button'
                onClick={() => setViewMode('grid')}
                aria-pressed={viewMode === 'grid'}
                aria-label={t('viewGrid')}
                title={t('viewGrid')}
                className={`flex h-[39px] w-[39px] items-center justify-center rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#10201D] text-white shadow-sm'
                    : 'text-[#6F746F] hover:text-[#10201D] hover:bg-[#F5F2EB]'
                }`}
              >
                <LayoutGrid className='h-4 w-4' />
              </button>
              <button
                type='button'
                onClick={() => setViewMode('list')}
                aria-pressed={viewMode === 'list'}
                aria-label={t('viewList')}
                title={t('viewList')}
                className={`flex h-[39px] w-[39px] items-center justify-center rounded-lg transition-all ${
                  viewMode === 'list'
                    ? 'bg-[#10201D] text-white shadow-sm'
                    : 'text-[#6F746F] hover:text-[#10201D] hover:bg-[#F5F2EB]'
                }`}
              >
                <List className='h-4 w-4' />
              </button>
            </div>
          </div>
        </div>

        {/* Catalogue Content: Grid vs List */}
        {filteredProjects.length > 0 ? (
          viewMode === 'grid' ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-[23px]'>
              {filteredProjects.map((project) => {
                const copy = getProjectCopy(project)
                return (
                  <ProjectCard
                    key={project.id}
                    categoryLabel={copy.categoryLabel}
                    title={copy.title}
                    location={copy.location}
                    image={project.image}
                    projectSlug={project.slug}
                    exploreLabel={t('exploreProject')}
                    isRtl={isRtl}
                  />
                )
              })}
            </div>
          ) : (
            <div className='flex flex-col gap-6 lg:gap-[24px]'>
              {filteredProjects.map((project) => {
                const copy = getProjectCopy(project)
                return (
                  <ProjectListItem
                    key={project.id}
                    title={copy.title}
                    location={copy.location}
                    image={project.image}
                    projectSlug={project.slug}
                    viewProjectLabel={t('viewProject')}
                    isRtl={isRtl}
                    typeLabel={t('metadataLabels.type')}
                    typeValue={copy.typeValue}
                    locationLabel={t('metadataLabels.location')}
                    locationValue={copy.cityValue}
                    statusLabel={t('metadataLabels.status')}
                    statusValue={copy.statusValue}
                  />
                )
              })}
            </div>
          )
        ) : (
          <p className='py-16 text-center font-cairo text-[#6F746F]'>
            {t('emptyState')}
          </p>
        )}
      </div>
    </section>
  )
}

