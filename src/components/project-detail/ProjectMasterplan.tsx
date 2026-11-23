'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Maximize2, ArrowLeft, ArrowRight, Layers } from 'lucide-react'

type ProjectMasterplanProps = {
  eyebrow: string
  heading: string
  description: string
  ctaText: string
  image?: string
  images?: string[]
  caption: string
  enlargeText: string
  isRtl: boolean
  onEnlargeClick: (src: string) => void
}

export default function ProjectMasterplan({
  eyebrow,
  heading,
  description,
  ctaText,
  image,
  images = [],
  caption,
  enlargeText,
  isRtl,
  onEnlargeClick,
}: ProjectMasterplanProps) {
  const masterplans = images && images.length > 0 ? images : image ? [image] : []
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const total = masterplans.length

  // Synchronize scroll position with active index
  const scrollToIndex = useCallback(
    (index: number) => {
      const el = scrollRef.current
      if (!el) return
      const target = Math.max(0, Math.min(index, total - 1))
      const slideWidth = el.clientWidth
      el.scrollTo({
        left: isRtl ? -target * slideWidth : target * slideWidth,
        behavior: 'smooth',
      })
      setCurrentIndex(target)
    },
    [isRtl, total]
  )

  // Track scroll position on mobile swiping
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el || total <= 1) return

    const slideWidth = el.clientWidth
    if (slideWidth === 0) return

    const currentScroll = Math.abs(el.scrollLeft)
    const newIdx = Math.round(currentScroll / slideWidth)
    if (newIdx !== currentIndex && newIdx >= 0 && newIdx < total) {
      setCurrentIndex(newIdx)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onScrollDebounced = () => {
      requestAnimationFrame(handleScroll)
    }

    el.addEventListener('scroll', onScrollDebounced, { passive: true })
    return () => el.removeEventListener('scroll', onScrollDebounced)
  }, [currentIndex, total])

  const handlePrev = () => {
    if (currentIndex > 0) {
      scrollToIndex(currentIndex - 1)
    } else {
      // Loop to last
      scrollToIndex(total - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < total - 1) {
      scrollToIndex(currentIndex + 1)
    } else {
      // Loop to first
      scrollToIndex(0)
    }
  }

  if (total === 0) return null

  const activeImage = masterplans[currentIndex] || masterplans[0]

  return (
    <section className='mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[86px] py-16 sm:py-24 border-t border-[#EAE1D0]/70'>
      {/* Header with Title & Action Button */}
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8'>
        <div>
          <div className='flex items-center gap-2.5 mb-2'>
            <div className='w-6 h-px bg-[#C29959]' />
            <span className='font-cairo text-xs sm:text-sm font-semibold text-[#C29959] uppercase tracking-wider'>
              {eyebrow}
            </span>
          </div>
          <h2 className='font-alexandria text-3xl sm:text-4xl lg:text-[44px] font-normal leading-tight text-[#10201D]'>
            {heading}
          </h2>
          <p className='mt-2 font-cairo text-sm sm:text-base text-[#6F746F] max-w-xl'>
            {description}
          </p>
        </div>

        <div className='flex items-center gap-4 self-start sm:self-auto'>
          {total > 1 && (
            <div className='font-alexandria text-sm font-light text-[#10201D] tracking-wider select-none px-3 py-1.5 rounded-[2px] bg-[#FAF8F5] border border-[#EAE4D8]'>
              <span className='text-[#C29959] font-normal'>
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className='mx-1.5 text-[#EAE1D0]'>/</span>
              <span className='text-[#6F746F]'>
                {String(total).padStart(2, '0')}
              </span>
            </div>
          )}

          <button
            type='button'
            onClick={() => onEnlargeClick(activeImage)}
            className='group inline-flex items-center gap-2.5 bg-[#10201D] hover:bg-[#C29959] text-white px-7 py-3 font-cairo text-sm font-semibold transition-colors duration-300 cursor-pointer shadow-sm'
          >
            <span>{ctaText}</span>
            {isRtl ? (
              <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
            ) : (
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            )}
          </button>
        </div>
      </div>

      {/* Masterplan Drawing Carousel Container */}
      <div className='relative w-full overflow-hidden rounded-none bg-[#FBF9F4] shadow-[0_4px_24px_rgba(8,38,33,0.02)]'>
        {/* Horizontal scroll track: Responsive on mobile with touch swiping & snap */}
        <div
          ref={scrollRef}
          dir={isRtl ? 'rtl' : 'ltr'}
          className='flex w-full h-[360px] sm:h-[500px] lg:h-[640px] overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {masterplans.map((mpUrl, idx) => (
            <div
              key={idx}
              onClick={() => onEnlargeClick(mpUrl)}
              className='snap-center shrink-0 w-full h-full relative group cursor-pointer flex items-center justify-center bg-[#FBF9F4]'
            >
              <Image
                src={mpUrl}
                alt={`${caption} - ${idx + 1}`}
                fill
                priority={idx === 0}
                className='object-contain object-center transition-transform duration-700 group-hover:scale-102 p-2 sm:p-4'
                sizes='100vw'
              />

              {/* Hover overlay with zoom button */}
              <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none'>
                <span className='rounded-full bg-black/70 px-4 py-2 font-cairo text-xs text-white backdrop-blur-md flex items-center gap-2 shadow-lg border border-white/20'>
                  <Maximize2 className='h-4 w-4 text-[#C29959]' />
                  <span>{enlargeText}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 2 Navigation Buttons on the Left and the Right with Arrows (Visible when multiple masterplans) */}
        {total > 1 && (
          <>
            {/* Left Button with Dark Green background and hover stretch */}
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation()
                if (isRtl) {
                  handleNext()
                } else {
                  handlePrev()
                }
              }}
              aria-label={isRtl ? 'Next masterplan' : 'Previous masterplan'}
              title={isRtl ? 'التالي' : 'Previous'}
              className='group absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 hover:w-14 sm:hover:w-16 items-center justify-center rounded-none bg-[#082621] hover:bg-[#C29959] text-white border border-[#082621] hover:border-[#C29959] shadow-lg backdrop-blur-sm transition-all duration-300 cursor-pointer'
            >
              <ArrowLeft className='h-5 w-5 transition-transform duration-300 group-hover:scale-115' />
            </button>

            {/* Right Button with Dark Green background and hover stretch */}
            <button
              type='button'
              onClick={(e) => {
                e.stopPropagation()
                if (isRtl) {
                  handlePrev()
                } else {
                  handleNext()
                }
              }}
              aria-label={isRtl ? 'Previous masterplan' : 'Next masterplan'}
              title={isRtl ? 'السابق' : 'Next'}
              className='group absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 hover:w-14 sm:hover:w-16 items-center justify-center rounded-none bg-[#082621] hover:bg-[#C29959] text-white border border-[#082621] hover:border-[#C29959] shadow-lg backdrop-blur-sm transition-all duration-300 cursor-pointer'
            >
              <ArrowRight className='h-5 w-5 transition-transform duration-300 group-hover:scale-115' />
            </button>
          </>
        )}
      </div>

      {/* Bottom Caption & Pagination Bar */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 pb-2 border-b border-[#EAE1D0]/50'>
        {/* Caption */}
        <div className='flex items-center gap-2'>
          {total > 1 && <Layers className='h-4 w-4 text-[#C29959] shrink-0' />}
          <span className='font-cairo text-xs sm:text-sm text-[#6F746F]'>
            {caption}
            {total > 1 ? ` (${currentIndex + 1} / ${total})` : ''}
          </span>
        </div>

        {/* Dots Pagination (if multiple) */}
        {total > 1 && (
          <div className='flex items-center gap-2 self-center sm:self-auto'>
            {masterplans.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type='button'
                onClick={() => scrollToIndex(dotIdx)}
                aria-label={`Go to masterplan ${dotIdx + 1}`}
                className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === dotIdx
                    ? 'w-8 bg-[#C29959]'
                    : 'w-2 bg-[#EAE1D0] hover:bg-[#C29959]/50'
                }`}
              />
            ))}
          </div>
        )}

        {/* Enlarge CTA */}
        <button
          type='button'
          onClick={() => onEnlargeClick(activeImage)}
          className='inline-flex items-center gap-2 font-cairo text-xs sm:text-sm font-semibold text-[#10201D] hover:text-[#C29959] transition-colors cursor-pointer self-end sm:self-auto'
        >
          <Maximize2 className='h-4 w-4 text-[#C29959]' />
          <span>{enlargeText}</span>
        </button>
      </div>
    </section>
  )
}
