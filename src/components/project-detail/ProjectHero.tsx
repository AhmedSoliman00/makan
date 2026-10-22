import Image from 'next/image'

type ProjectHeroProps = {
  title: string
  categoryBadge: string
  heroCaption: string
  heroImage: string
  isRtl: boolean
}

export default function ProjectHero({
  title,
  categoryBadge,
  heroCaption,
  heroImage,
  isRtl,
}: ProjectHeroProps) {
  return (
    <section className='relative w-full h-[520px] sm:h-[600px] lg:h-[660px] overflow-hidden bg-[#082621]'>
      {/* 1. Full-width Hero background photography */}
      <Image
        src={heroImage}
        alt={title}
        fill
        priority
        className='object-cover object-center'
        sizes='100vw'
      />

      {/* 2. Directional green atmospheric gradient from the text side */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
          isRtl
            ? 'bg-gradient-to-l from-[#082621]/95 via-[#082621]/60 via-40% to-transparent'
            : 'bg-gradient-to-r from-[#082621]/95 via-[#082621]/60 via-40% to-transparent'
        }`}
      />

      {/* 3. Subtle bottom & top scrim for contrast */}
      <div className='absolute inset-0 pointer-events-none bg-gradient-to-t from-black/55 via-transparent to-black/20' />

      {/* 4. Text container aligned to main grid */}
      <div className='relative z-10 mx-auto flex h-full w-full max-w-[1440px] flex-col justify-between px-6 sm:px-10 lg:px-[86px] py-12 sm:py-16'>
        {/* Top/Upper section: Category badge & Title */}
        <div
          dir={isRtl ? 'rtl' : 'ltr'}
          className={`flex flex-col mt-4 sm:mt-8 max-w-2xl ${
            isRtl ? 'items-start text-start' : 'items-start text-start'
          }`}
        >
          <span className='font-cairo text-sm sm:text-base font-normal text-white/90 mb-1 sm:mb-2 tracking-wide'>
            {categoryBadge}
          </span>
          <h1 className='font-alexandria text-4xl sm:text-6xl lg:text-[76px] font-medium leading-[1.15] text-white tracking-tight drop-shadow-sm'>
            {title}
          </h1>
        </div>

        {/* Bottom section: Caption */}
        {heroCaption && (
          <div
            dir={isRtl ? 'rtl' : 'ltr'}
            className='flex justify-start text-start'
          >
            <p className='font-cairo text-xs sm:text-sm text-white/85 drop-shadow-sm'>
              {heroCaption}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
