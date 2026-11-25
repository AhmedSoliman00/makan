'use client'

import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { useRef, useState, useEffect, MouseEvent as ReactMouseEvent } from 'react'
import type { LocalizedProjectSummary } from '@/lib/data/projects'
import { isDirectUploadSrc, normalizeImageSrc } from '@/lib/image'

type SelectedWorksProps = {
  projects?: LocalizedProjectSummary[]
}

export default function SelectedWorks({
  projects: initialProjects,
}: SelectedWorksProps) {
  const t = useTranslations('FeaturedProjects')
  const locale = useLocale()
  const isRtl = locale === 'ar'

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const hasDraggedRef = useRef(false)

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const defaultProjects = [
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
  ]

  let projects =
    initialProjects && initialProjects.length > 0
      ? initialProjects.map((p) => ({
          slug: `/projects/${p.slug}`,
          image: p.image,
          category: p.categoryLabel,
          title: p.title,
          location: p.location,
        }))
      : defaultProjects

  if (projects.length < 3) {
    const existingSlugs = new Set(projects.map((p) => p.slug))
    const complements = defaultProjects.filter(
      (d) => !existingSlugs.has(d.slug),
    )
    projects = [...projects, ...complements]
  }

  const updateScrollState = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth
    if (maxScroll <= 0) {
      setCanScrollPrev(false)
      setCanScrollNext(false)
      return
    }
    const current = Math.abs(scrollLeft)
    setCanScrollPrev(current > 8)
    setCanScrollNext(current < maxScroll - 8)
  }

  useEffect(() => {
    updateScrollState()
    const el = scrollContainerRef.current
    if (!el) return
    el.addEventListener('scroll', updateScrollState, { passive: true })
    window.addEventListener('resize', updateScrollState)
    return () => {
      el.removeEventListener('scroll', updateScrollState)
      window.removeEventListener('resize', updateScrollState)
    }
  }, [projects])

  const scrollByDirection = (direction: 'prev' | 'next') => {
    const el = scrollContainerRef.current
    if (!el) return
    const cardStep = 440
    const scrollDelta =
      direction === 'next'
        ? isRtl
          ? -cardStep
          : cardStep
        : isRtl
          ? cardStep
          : -cardStep
    el.scrollBy({ left: scrollDelta, behavior: 'smooth' })
  }

  // Mouse Drag to Scroll
  const handleMouseDown = (e: ReactMouseEvent) => {
    const el = scrollContainerRef.current
    if (!el) return
    isDraggingRef.current = true
    hasDraggedRef.current = false
    startXRef.current = e.pageX - el.offsetLeft
    scrollLeftRef.current = el.scrollLeft
  }

  const handleMouseMove = (e: ReactMouseEvent) => {
    if (!isDraggingRef.current) return
    const el = scrollContainerRef.current
    if (!el) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startXRef.current) * 1.4
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true
    }
    el.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUpOrLeave = () => {
    isDraggingRef.current = false
  }

  const handleLinkClick = (e: ReactMouseEvent) => {
    if (hasDraggedRef.current) {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <section id='projects' className='w-full bg-white py-20 lg:py-24 select-none'>
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[90px]'>
        {/* Section Header: Centered title and subtitle */}
        <div className='flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12'>
          <h2 className='font-alexandria text-3xl sm:text-4xl lg:text-[48px] font-normal text-[#10201D] tracking-tight leading-tight'>
            {t('title')}
          </h2>
          <p className='mt-2.5 font-cairo text-xs sm:text-sm text-[#6F746F]'>
            {t('subtitle')}
          </p>

          {/* Navigation Controls: Primary Dark Green background with hover stretch */}
          <div className='flex items-center gap-3 mt-6'>
            <button
              type='button'
              onClick={() => scrollByDirection('prev')}
              disabled={!canScrollPrev}
              aria-label={isRtl ? 'التالي' : 'Previous'}
              className='group relative flex h-11 w-11 hover:w-14 shrink-0 items-center justify-center bg-[#082621] hover:bg-[#C29959] text-white rounded-none border border-[#082621] hover:border-[#C29959] transition-all duration-300 disabled:opacity-30 disabled:hover:w-11 disabled:hover:bg-[#082621] disabled:cursor-not-allowed cursor-pointer'
            >
              {isRtl ? (
                <ChevronRight className='h-5 w-5 transition-transform duration-300 group-hover:scale-115' />
              ) : (
                <ChevronLeft className='h-5 w-5 transition-transform duration-300 group-hover:scale-115' />
              )}
            </button>

            <button
              type='button'
              onClick={() => scrollByDirection('next')}
              disabled={!canScrollNext}
              aria-label={isRtl ? 'السابق' : 'Next'}
              className='group relative flex h-11 w-11 hover:w-14 shrink-0 items-center justify-center bg-[#082621] hover:bg-[#C29959] text-white rounded-none border border-[#082621] hover:border-[#C29959] transition-all duration-300 disabled:opacity-30 disabled:hover:w-11 disabled:hover:bg-[#082621] disabled:cursor-not-allowed cursor-pointer'
            >
              {isRtl ? (
                <ChevronLeft className='h-5 w-5 transition-transform duration-300 group-hover:scale-115' />
              ) : (
                <ChevronRight className='h-5 w-5 transition-transform duration-300 group-hover:scale-115' />
              )}
            </button>
          </div>
        </div>

        {/* Horizontally Scrollable Featured Works Track (Revealing the uncompleted thumbnail) */}
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          dir={isRtl ? 'rtl' : 'ltr'}
          className='flex overflow-x-auto gap-6 sm:gap-8 pb-4 pt-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth snap-x snap-mandatory cursor-grab active:cursor-grabbing w-full'
        >
          {projects.map((proj, idx) => {
            const projectHref = proj.slug.startsWith('/projects/')
              ? proj.slug
              : `/projects/${proj.slug}`

            return (
              <article
                key={idx}
                className='flex flex-col overflow-hidden bg-transparent shrink-0 snap-start w-[290px] sm:w-[350px] md:w-[390px] lg:w-[430px]'
              >
                {/* 1. Image: Hovering here scales ONLY the image */}
                <Link
                  href={projectHref}
                  onClick={handleLinkClick}
                  className='group/img block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959]'
                  aria-label={proj.title}
                >
                  <div className='relative h-[250px] sm:h-[282px] w-full overflow-hidden rounded-none bg-zinc-100'>
                    <Image
                      src={normalizeImageSrc(proj.image)}
                      alt={proj.title}
                      fill
                      unoptimized={isDirectUploadSrc(proj.image)}
                      className='object-cover transition-transform duration-500 ease-out group-hover/img:scale-105 pointer-events-none'
                      sizes='(max-width: 768px) 100vw, 430px'
                    />
                  </div>
                </Link>

                {/* 2. Text & Button together: Hovering here turns title gold, expands button width, scales icon */}
                <Link
                  href={projectHref}
                  onClick={handleLinkClick}
                  className='group/btn mt-4 sm:mt-5 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959]'
                >
                  <div className='min-w-0 flex-1 text-start'>
                    <span className='font-cairo text-xs sm:text-[13px] font-normal text-[#C29959] block'>
                      {proj.category}
                    </span>
                    <h3 className='font-alexandria text-lg sm:text-xl font-medium text-[#10201D] mt-0.5 truncate transition-colors duration-300 group-hover/btn:text-[#C29959]'>
                      {proj.title}
                    </h3>
                    <p className='font-cairo text-xs text-[#6F746F] mt-0.5 truncate'>
                      {proj.location}
                    </p>
                  </div>

                  {/* Button: expands width smoothly on hover, scales icon, rounded-none */}
                  <div
                    className='relative flex h-[46px] w-[46px] sm:h-[48px] sm:w-[48px] group-hover/btn:w-[68px] shrink-0 items-center justify-center border border-[#C29959] text-[#C29959] rounded-none transition-all duration-300 group-hover/btn:bg-[#C29959] group-hover/btn:text-white'
                    aria-label={t('exploreProject')}
                  >
                    {isRtl ? (
                      <ArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover/btn:scale-115 group-hover/btn:-translate-x-0.5' />
                    ) : (
                      <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover/btn:scale-115 group-hover/btn:translate-x-0.5' />
                    )}
                  </div>
                </Link>
              </article>
            )
          })}
        </div>

        {/* View All Projects Button: with width stretch on hover */}
        <div className='mt-10 sm:mt-[53px] flex justify-center'>
          <Link
            href='/projects'
            className='group relative inline-flex h-[49px] w-[209px] hover:w-[235px] items-center justify-center gap-3 border border-[#10201D] font-cairo text-[13px] font-semibold text-[#10201D] rounded-none transition-all duration-300 hover:bg-[#10201D] hover:text-white'
          >
            <span>{t('ctaAll')}</span>
            {isRtl ? (
              <ArrowLeft className='h-4 w-4 transition-transform duration-300 group-hover:scale-115 group-hover:-translate-x-1' />
            ) : (
              <ArrowRight className='h-4 w-4 transition-transform duration-300 group-hover:scale-115 group-hover:translate-x-1' />
            )}
          </Link>
        </div>
      </div>
    </section>
  )
}
