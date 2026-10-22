import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import type { ProjectSimilar } from '@/lib/project-details'
import { ArrowLeft, ArrowRight } from 'lucide-react'

type ProjectSimilarWorksProps = {
  title: string
  subtitle: string
  ctaText: string
  similarProjects: ProjectSimilar[]
  isRtl: boolean
}

export default function ProjectSimilarWorks({
  title,
  subtitle,
  ctaText,
  similarProjects,
  isRtl,
}: ProjectSimilarWorksProps) {
  return (
    <section className='w-full border-t border-[#EAE1D0]/70 bg-[#fffdf8] py-16 sm:py-24'>
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[86px]'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12'>
          <div>
            <h2 className='font-alexandria text-3xl sm:text-4xl lg:text-[44px] font-normal leading-tight text-[#10201D]'>
              {title}
            </h2>
            <p className='mt-2 font-cairo text-sm sm:text-base text-[#6F746F]'>
              {subtitle}
            </p>
          </div>

          <Link
            href='/projects'
            className='group inline-flex items-center gap-3 border border-[#10201D] px-6 py-3 font-cairo text-[13px] font-semibold text-[#10201D] transition-all hover:bg-[#10201D] hover:text-white self-start sm:self-auto'
          >
            <span>{ctaText}</span>
            {isRtl ? (
              <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
            ) : (
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            )}
          </Link>
        </div>

        {/* 3 Similar Project Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
          {similarProjects.map((similar, idx) => (
            <article
              key={idx}
              className='group flex flex-col overflow-hidden bg-[#fffdf8] transition-all duration-300'
            >
              <Link
                href={`/projects/${similar.slug}`}
                className='block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959]'
              >
                <div className='relative h-[260px] sm:h-[280px] w-full overflow-hidden rounded-none bg-zinc-100'>
                  <Image
                    src={similar.image}
                    alt={similar.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 33vw'
                  />
                </div>

                <div className='flex items-center justify-between gap-4 pt-4 sm:pt-5'>
                  <div className='min-w-0 flex-1'>
                    <span className='font-cairo text-[13px] font-semibold text-[#C29959] block'>
                      {similar.category}
                    </span>
                    <h3 className='font-alexandria text-lg sm:text-xl font-medium text-[#10201D] mt-0.5 truncate group-hover:text-[#C29959] transition-colors'>
                      {similar.title}
                    </h3>
                    <p className='font-cairo text-xs text-[#6F746F] mt-0.5 truncate'>
                      {similar.location}
                    </p>
                  </div>

                  <div
                    className='relative flex h-[47px] w-[50px] shrink-0 items-center justify-center border border-[#C29959] text-[#10201D] transition-colors group-hover:bg-[#C29959] group-hover:text-white'
                    aria-label={similar.title}
                  >
                    {isRtl ? (
                      <ArrowLeft className='h-4 w-4' />
                    ) : (
                      <ArrowRight className='h-4 w-4' />
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
