'use client'

import Image from 'next/image'

type ContactHeroProps = {
  line1: string
  line2: string
  imageSrc?: string
}

export default function ContactHero({
  line1,
  line2,
  imageSrc = '/home/contact/contact-hero.webp',
}: ContactHeroProps) {
  return (
    <section className='relative w-full h-[380px] sm:h-[440px] md:h-[475px] flex items-center justify-center overflow-hidden'>
      {/* Background Photography */}
      <Image
        src={imageSrc}
        alt='Makan Landscape Architecture'
        fill
        priority
        className='object-cover object-center scale-[1.02]'
        sizes='100vw'
      />

      {/* Cinematic Dark Scrim Overlay */}
      <div className='absolute inset-0 bg-[#120E08]/40' />
      <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30' />

      {/* Hero Headline */}
      <div className='relative z-10 mx-auto px-6 max-w-5xl text-center'>
        <h1 className='font-cairo text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold text-white text-center leading-[1.25] tracking-tight drop-shadow-md select-none'>
          <span>{line1}</span>
          <br />
          <span>{line2}</span>
        </h1>
      </div>
    </section>
  )
}
