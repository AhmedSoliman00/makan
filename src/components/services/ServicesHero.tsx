'use client'

import Image from 'next/image'

type ServicesHeroProps = {
  titleLine1: string
  titleLine2: string
  imageSrc?: string
}

export default function ServicesHero({
  titleLine1,
  titleLine2,
  imageSrc = '/home/services/services-hero.webp',
}: ServicesHeroProps) {
  return (
    <section className='relative w-full h-[380px] sm:h-[430px] md:h-[475px] flex items-center justify-center overflow-hidden'>
      {/* Background Architectural Photography */}
      <Image
        src={imageSrc}
        alt='Makan Landscape Services'
        fill
        priority
        className='object-cover object-center scale-[1.02]'
        sizes='100vw'
      />

      {/* Atmospheric Brand Color Overlay (#1F1507 at 32% + soft gradient) */}
      <div className='absolute inset-0 bg-[#1F1507]/35' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20' />

      {/* Hero Headline */}
      <div className='relative z-10 mx-auto px-6 max-w-4xl text-center select-none'>
        <h1 className='font-alexandria font-medium text-white text-center leading-[1.18] tracking-tight drop-shadow-md text-3xl sm:text-5xl md:text-6xl lg:text-[76px]'>
          <span className='block'>{titleLine1}</span>
          <span className='block mt-1 sm:mt-2'>{titleLine2}</span>
        </h1>
      </div>
    </section>
  )
}
