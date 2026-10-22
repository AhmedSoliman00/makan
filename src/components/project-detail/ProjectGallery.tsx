import Image from 'next/image'
import { Maximize2 } from 'lucide-react'

type ProjectGalleryProps = {
  eyebrow: string
  heading: string
  description: string
  images: string[]
  projectTitle: string
  onImageClick: (src: string, alt: string) => void
}

export default function ProjectGallery({
  eyebrow,
  heading,
  description,
  images,
  projectTitle,
  onImageClick,
}: ProjectGalleryProps) {
  return (
    <section className='w-full bg-[#fffdf8] py-16 sm:py-20 border-t border-[#EAE1D0]/70'>
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[86px]'>
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

        {/* Photo Layout: Row 1 has 2 photos, Row 2 has 1 wide panoramic photo - Sharp corners, NO borders */}
        <div className='space-y-6'>
          {/* Row 1 */}
          <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
            {images[0] && (
              <div
                onClick={() =>
                  onImageClick(images[0], `${projectTitle} - 1`)
                }
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
                onClick={() =>
                  onImageClick(images[1], `${projectTitle} - 2`)
                }
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

          {/* Row 2: Panoramic */}
          {images[2] && (
            <div
              onClick={() =>
                onImageClick(images[2], `${projectTitle} - 3`)
              }
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
      </div>
    </section>
  )
}
