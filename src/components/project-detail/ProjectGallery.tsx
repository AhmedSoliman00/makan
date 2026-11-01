'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Maximize2, ArrowLeft, ArrowRight, MoveHorizontal } from 'lucide-react'

type ProjectGalleryProps = {
  eyebrow: string
  heading: string
  description: string
  images: string[]
  projectTitle: string
  isRtl?: boolean
  onImageClick: (src: string, alt: string) => void
}

export default function ProjectGallery({
  eyebrow,
  heading,
  description,
  images = [],
  projectTitle,
  isRtl = false,
  onImageClick,
}: ProjectGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDraggingRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const dragDistanceRef = useRef(0)

  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isCursorDown, setIsCursorDown] = useState(false)

  const otherImages = images.slice(3)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return

    const { scrollLeft, scrollWidth, clientWidth } = el
    const maxScroll = scrollWidth - clientWidth

    if (maxScroll <= 0) {
      setCanScrollPrev(false)
      setCanScrollNext(false)
      setScrollProgress(100)
      return
    }

    const currentScroll = Math.abs(scrollLeft)
    const progress = Math.min(100, Math.max(0, (currentScroll / maxScroll) * 100))
    setScrollProgress(progress)

    const buffer = 8
    setCanScrollPrev(currentScroll > buffer)
    setCanScrollNext(currentScroll < maxScroll - buffer)
  }, [])

  useEffect(() => {
    if (otherImages.length === 0) return
    const el = scrollRef.current
    if (!el) return

    updateScrollState()
    const handleScroll = () => {
      requestAnimationFrame(updateScrollState)
    }

    el.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)

    return () => {
      el.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [otherImages.length, updateScrollState])

  const scrollByAmount = (direction: 'next' | 'prev') => {
    const el = scrollRef.current
    if (!el) return

    const scrollDistance = el.clientWidth * 0.7
    const delta = direction === 'next' ? scrollDistance : -scrollDistance
    const factor = isRtl ? -delta : delta

    el.scrollBy({
      left: factor,
      behavior: 'smooth',
    })
  }

  // Mouse Drag to Scroll
  const handleMouseDown = (e: React.MouseEvent) => {
    const el = scrollRef.current
    if (!el) return

    isDraggingRef.current = true
    setIsCursorDown(true)
    startXRef.current = e.pageX - el.offsetLeft
    scrollLeftRef.current = el.scrollLeft
    dragDistanceRef.current = 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const el = scrollRef.current
    if (!el) return

    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startXRef.current) * 1.4
    dragDistanceRef.current = Math.abs(walk)
    el.scrollLeft = scrollLeftRef.current - walk
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    setIsCursorDown(false)
  }

  const handleOtherImageClick = (img: string, idx: number) => {
    if (dragDistanceRef.current < 6) {
      onImageClick(img, `${projectTitle} - ${idx + 4}`)
    }
  }

  if (!images || images.length === 0) return null

  return (
    <section className='w-full bg-[#fffdf8] py-16 sm:py-20 border-t border-[#EAE1D0]/70'>
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[86px]'>
        {/* Section Header */}
        <div className='mb-10 sm:mb-12'>
          <span className='font-cairo text-xs sm:text-sm font-semibold text-[#C29959] block mb-2'>
            {eyebrow}
          </span>
          <h2 className='font-alexandria text-3xl sm:text-4xl lg:text-[44px] font-normal leading-tight text-[#10201D]'>
            {heading}
          </h2>
          <p className='mt-2 font-cairo text-sm sm:text-base text-[#6F746F] max-w-2xl'>
            {description}
          </p>
        </div>

        {/* Primary Photo Layout: Same exact gallery layout that exists (Row 1: 2 photos, Row 2: 1 wide panoramic photo) */}
        <div className='space-y-6'>
          {/* Row 1: 2 Photos (7 cols and 5 cols) */}
          <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
            {images[0] && (
              <div
                onClick={() => onImageClick(images[0], `${projectTitle} - 1`)}
                className='md:col-span-7 group relative h-[300px] sm:h-[380px] w-full overflow-hidden rounded-none bg-zinc-100 cursor-pointer'
              >
                <Image
                  src={images[0]}
                  alt={`${projectTitle} gallery 1`}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 60vw'
                />
                <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <span className='rounded-full bg-black/50 p-3 text-white backdrop-blur-sm'>
                    <Maximize2 className='h-5 w-5' />
                  </span>
                </div>
              </div>
            )}

            {images[1] && (
              <div
                onClick={() => onImageClick(images[1], `${projectTitle} - 2`)}
                className='md:col-span-5 group relative h-[300px] sm:h-[380px] w-full overflow-hidden rounded-none bg-zinc-100 cursor-pointer'
              >
                <Image
                  src={images[1]}
                  alt={`${projectTitle} gallery 2`}
                  fill
                  className='object-cover transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 768px) 100vw, 40vw'
                />
                <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <span className='rounded-full bg-black/50 p-3 text-white backdrop-blur-sm'>
                    <Maximize2 className='h-5 w-5' />
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Panoramic Photo (12 cols) */}
          {images[2] && (
            <div
              onClick={() => onImageClick(images[2], `${projectTitle} - 3`)}
              className='group relative h-[320px] sm:h-[420px] w-full overflow-hidden rounded-none bg-zinc-100 cursor-pointer'
            >
              <Image
                src={images[2]}
                alt={`${projectTitle} panoramic`}
                fill
                className='object-cover transition-transform duration-700 group-hover:scale-105'
                sizes='100vw'
              />
              <div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                <span className='rounded-full bg-black/50 p-3 text-white backdrop-blur-sm'>
                  <Maximize2 className='h-5 w-5' />
                </span>
              </div>
            </div>
          )}
        </div>

        {/* If more than 3 images: The other images are displayed in a smooth horizontal scroll */}
        {otherImages.length > 0 && (
          <div className='mt-12 sm:mt-16 pt-10 sm:pt-12 border-t border-[#EAE1D0]/60'>
            {/* Header & Controls for the horizontal gallery */}
            <div className='flex items-center justify-between gap-4 mb-6 sm:mb-8'>
              <div className='flex items-center gap-3'>
                <div className='w-2 h-2 rounded-full bg-[#C29959]' />
                <h3 className='font-alexandria text-xl sm:text-2xl font-normal text-[#10201D]'>
                  {isRtl ? 'المزيد من لقطات المشروع' : 'More Project Views'}
                </h3>
                <span className='rounded-full bg-[#F4EDE2] px-2.5 py-0.5 font-cairo text-xs font-semibold text-[#C29959]'>
                  +{otherImages.length}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className='flex items-center gap-2' dir='ltr'>
                <button
                  type='button'
                  onClick={() => scrollByAmount(isRtl ? 'next' : 'prev')}
                  disabled={isRtl ? !canScrollNext : !canScrollPrev}
                  aria-label='Previous photo'
                  title='Previous'
                  className='flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#10201D]/20 bg-white text-[#10201D] transition-all hover:bg-[#10201D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#10201D]'
                >
                  <ArrowLeft className='h-4 w-4' />
                </button>
                <button
                  type='button'
                  onClick={() => scrollByAmount(isRtl ? 'prev' : 'next')}
                  disabled={isRtl ? !canScrollPrev : !canScrollNext}
                  aria-label='Next photo'
                  title='Next'
                  className='flex h-10 w-10 items-center justify-center rounded-[2px] border border-[#10201D]/20 bg-white text-[#10201D] transition-all hover:bg-[#10201D] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#10201D]'
                >
                  <ArrowRight className='h-4 w-4' />
                </button>
              </div>
            </div>

            {/* Horizontal Track: System automatically determines fitting width from each image's natural aspect ratio */}
            <div
              ref={scrollRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              dir={isRtl ? 'rtl' : 'ltr'}
              className={`flex items-center gap-5 sm:gap-6 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-[280px] sm:h-[340px] md:h-[380px] ${
                isCursorDown ? 'cursor-grabbing' : 'cursor-grab'
              }`}
              style={{
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {otherImages.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOtherImageClick(img, idx)}
                  className='group relative shrink-0 h-full overflow-hidden rounded-none bg-zinc-100 cursor-pointer select-none transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(8,38,33,0.1)]'
                >
                  {/* Dynamic Image Fit: Locks height to track and allows browser to compute proportional width dynamically from the natural image aspect ratio */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${projectTitle} - extra photo ${idx + 1}`}
                    loading='lazy'
                    draggable={false}
                    className='h-full w-auto max-w-none object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none'
                  />

                  {/* Hover Overlay with Zoom Icon */}
                  <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none'>
                    <div className='flex items-center gap-2 rounded-full bg-black/60 px-3.5 py-1.5 text-white backdrop-blur-md shadow-lg border border-white/20'>
                      <Maximize2 className='h-4 w-4 text-[#C29959]' />
                      <span className='font-cairo text-xs font-medium'>
                        {isRtl ? 'تكبير' : 'Enlarge'}
                      </span>
                    </div>
                  </div>

                  {/* Badge Number */}
                  <div
                    className={`absolute top-2.5 ${
                      isRtl ? 'right-2.5' : 'left-2.5'
                    } rounded-[2px] bg-[#10201D]/75 px-2 py-0.5 text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
                  >
                    <span className='font-alexandria text-[11px] font-light text-[#FAF6F0]'>
                      {String(idx + 4).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Progress Bar & Drag Hint */}
            <div className='flex items-center justify-between gap-4 mt-4'>
              <div className='relative h-1 w-full max-w-xs sm:max-w-sm bg-[#EAE1D0]/70 rounded-full overflow-hidden'>
                <div
                  className='absolute top-0 bottom-0 bg-[#C29959] rounded-full transition-all duration-150 ease-out'
                  style={{
                    width: `${Math.max(12, scrollProgress)}%`,
                    [isRtl ? 'right' : 'left']: 0,
                  }}
                />
              </div>

              <div className='flex items-center gap-1.5 text-[#6F746F] select-none'>
                <MoveHorizontal className='h-3.5 w-3.5 text-[#C29959]' />
                <span className='font-cairo text-xs'>
                  {isRtl ? 'اسحب للتمرير' : 'Drag or scroll'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
