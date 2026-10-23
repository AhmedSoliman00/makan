'use client'

import Image from 'next/image'

type AboutHeroProps = {
  title: string
  subtitle: string
  imageSrc?: string
}

export default function AboutHero({
  title,
  subtitle,
  imageSrc = '/home/about/about-hero.webp',
}: AboutHeroProps) {
  return (
    <section className='relative w-full h-[400px] sm:h-[460px] md:h-[500px] flex items-center justify-center overflow-hidden'>
      {/* Background Photography */}
      <Image
        src={imageSrc}
        alt='About Makan Landscape'
        fill
        priority
        className='object-cover object-center scale-[1.02]'
        sizes='100vw'
      />

      {/* Cinematic Dark Scrim Overlay */}
      <div className='absolute inset-0 bg-[#120E08]/40' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30' />

      {/* Hero Headline & Subtitle */}
      <div className='relative z-10 mx-auto px-6 max-w-4xl text-center select-none'>
        <h1 className='font-cairo text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white text-center leading-tight tracking-tight drop-shadow-md'>
          {title}
        </h1>
        <p className='mt-4 font-cairo text-base sm:text-lg md:text-xl text-white/90 text-center max-w-2xl mx-auto leading-relaxed drop-shadow-sm font-normal'>
          {subtitle}
        </p>
      </div>
    </section>
  )
}
