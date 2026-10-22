import Image from 'next/image'

type PeopleHeroProps = {
  line1: string
  line2: string
  imageSrc?: string
}

export default function PeopleHero({
  line1,
  line2,
  imageSrc = '/home/people/people-hero.webp',
}: PeopleHeroProps) {
  return (
    <section className='relative bg-[#082621] w-full h-[420px] sm:h-[460px] lg:h-[490px] overflow-hidden'>
      {/* Full width hero background photography */}
      <Image
        src={imageSrc}
        alt={`${line1} ${line2}`}
        fill
        priority
        className='object-center object-cover'
        sizes='100vw'
      />

      {/* Dark warm scrim overlay for contrast */}
      <div className='absolute inset-0 bg-black/40 sm:bg-[#121814]/45' />

      {/* Centered Typography */}
      <div className='z-10 relative flex flex-col justify-center items-center mx-auto px-6 w-full max-w-5xl h-full text-center'>
        <h1 className='drop-shadow-md font-alexandria font-medium text-white lg:text-[76px] text-4xl sm:text-6xl leading-[1.5] tracking-tight'>
          <span className='block'>{line1}</span>
          <span className='block mt-1 sm:mt-2'>{line2}</span>
        </h1>
      </div>
    </section>
  )
}
