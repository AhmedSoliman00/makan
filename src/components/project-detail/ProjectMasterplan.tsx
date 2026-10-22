import Image from 'next/image'
import { Maximize2, ArrowLeft, ArrowRight } from 'lucide-react'

type ProjectMasterplanProps = {
  eyebrow: string
  heading: string
  description: string
  ctaText: string
  image: string
  caption: string
  enlargeText: string
  isRtl: boolean
  onEnlargeClick: () => void
}

export default function ProjectMasterplan({
  eyebrow,
  heading,
  description,
  ctaText,
  image,
  caption,
  enlargeText,
  isRtl,
  onEnlargeClick,
}: ProjectMasterplanProps) {
  return (
    <section className='mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[86px] py-16 sm:py-20'>
      {/* Header with Title & Action Button */}
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8'>
        <div>
          <span className='font-cairo text-xs sm:text-sm font-semibold text-[#C29959] block mb-2'>
            {eyebrow}
          </span>
          <h2 className='font-alexandria text-3xl sm:text-4xl lg:text-[44px] font-normal leading-tight text-[#10201D]'>
            {heading}
          </h2>
          <p className='mt-2 font-cairo text-sm sm:text-base text-[#6F746F] max-w-xl'>
            {description}
          </p>
        </div>

        <button
          type='button'
          onClick={onEnlargeClick}
          className='group inline-flex items-center gap-2.5 bg-[#10201D] hover:bg-[#C29959] text-white px-7 py-3 font-cairo text-sm font-semibold transition-colors duration-300 self-start sm:self-auto cursor-pointer'
        >
          <span>{ctaText}</span>
          {isRtl ? (
            <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
          ) : (
            <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
          )}
        </button>
      </div>

      {/* Masterplan Drawing - Sharp corners, NO borders on image */}
      <div>
        <div
          onClick={onEnlargeClick}
          className='group relative h-[360px] sm:h-[500px] lg:h-[620px] w-full overflow-hidden rounded-none bg-[#FBF9F4] cursor-pointer'
        >
          <Image
            src={image}
            alt={caption}
            fill
            className='object-cover object-center transition-transform duration-700 group-hover:scale-102'
            sizes='100vw'
          />
          <div className='absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
            <span className='rounded-full bg-black/60 px-4 py-2 font-cairo text-xs text-white backdrop-blur-sm flex items-center gap-2'>
              <Maximize2 className='h-4 w-4' />
              {enlargeText}
            </span>
          </div>
        </div>

        {/* Masterplan Bottom Caption Bar */}
        <div className='flex items-center justify-between pt-4 pb-2'>
          <span className='font-cairo text-xs sm:text-sm text-[#6F746F]'>
            {caption}
          </span>
          <button
            type='button'
            onClick={onEnlargeClick}
            className='inline-flex items-center gap-2 font-cairo text-xs sm:text-sm font-semibold text-[#10201D] hover:text-[#C29959] transition-colors cursor-pointer'
          >
            <Maximize2 className='h-4 w-4' />
            <span>{enlargeText}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
