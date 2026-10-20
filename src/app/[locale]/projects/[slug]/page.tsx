import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { setRequestLocale } from 'next-intl/server'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getProjectBySlug, getProjectSlugs } from '@/lib/project-details'
import { routing, type Locale } from '@/i18n/routing'

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((project) => ({ locale, slug: project.slug })),
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/${locale}/projects/${slug}`,
      languages: {
        ar: `/ar/projects/${slug}`,
        en: `/en/projects/${slug}`,
      },
    },
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!routing.locales.includes(locale as Locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const isRtl = locale === 'ar'

  return (
    <div className='flex min-h-screen flex-col bg-[#fffdf8] text-[#082621]'>
      <Navbar variant='solid' activePath='projects' />

      <main className='flex-1'>
        <section className='mx-auto w-full max-w-[1440px] px-4 pb-12 pt-8 sm:px-6 lg:px-[86px] lg:pb-20 lg:pt-14'>
          <div className='mb-6 flex items-center justify-between gap-4'>
            <Link
              href={`/${locale}/projects`}
              className='inline-flex items-center gap-2 text-sm font-cairo font-semibold text-[#082621] transition-colors hover:text-[#C29959]'
            >
              {isRtl ? (
                <ArrowLeft className='h-4 w-4' />
              ) : (
                <ArrowRight className='h-4 w-4' />
              )}
              Back to projects
            </Link>

            <span className='rounded-full border border-[#DBC9AD] px-3 py-1 text-[11px] font-cairo font-semibold uppercase tracking-[0.12em] text-[#C29959]'>
              {project.category}
            </span>
          </div>

          <div className='overflow-hidden rounded-[20px] bg-white shadow-[0_10px_40px_rgba(8,38,33,0.05)] ring-1 ring-[#EAE1D0]'>
            <div className='relative h-[420px] w-full overflow-hidden sm:h-[540px] lg:h-[620px]'>
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                className='object-cover'
                sizes='100vw'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-[#082621]/60 via-[#082621]/10 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 p-6 sm:p-10 lg:p-14'>
                <div className='max-w-3xl'>
                  <p className='mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-cairo font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm'>
                    <MapPin className='h-3.5 w-3.5' />
                    {project.location}
                  </p>
                  <h1 className='font-alexandria text-3xl font-normal leading-tight text-white sm:text-5xl lg:text-[64px]'>
                    {project.title}
                  </h1>
                </div>
              </div>
            </div>

            <div className='grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-12 lg:py-12'>
              <div>
                <p className='mb-5 font-cairo text-base leading-relaxed text-[#6F746F]'>
                  {project.summary}
                </p>

                <div className='space-y-5'>
                  <h2 className='font-alexandria text-2xl text-[#082621] sm:text-[32px]'>
                    Project Overview
                  </h2>
                  <p className='font-cairo text-base leading-8 text-[#082621]/80'>
                    {project.description}
                  </p>
                </div>

                <div className='mt-8 flex flex-wrap gap-2'>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border border-[#DBC9AD] bg-[#FAF6F0] px-3 py-2 font-cairo text-[13px] text-[#082621]'
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <aside className='rounded-[18px] border border-[#E7E0D2] bg-[#FAF6F0] p-5 sm:p-6'>
                <h3 className='mb-6 font-alexandria text-2xl text-[#082621]'>
                  Project Details
                </h3>

                <dl className='space-y-4'>
                  {[
                    ['Year', project.year],
                    ['Status', project.status],
                    ['Area', project.area],
                    ['Client', project.client],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className='flex items-center justify-between gap-4 border-b border-[#E4DFD7] pb-3 last:border-b-0 last:pb-0'
                    >
                      <dt className='font-cairo text-sm text-[#6F746F]'>
                        {label}
                      </dt>
                      <dd className='font-cairo text-sm font-semibold text-[#082621]'>
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </aside>
            </div>
          </div>

          <div className='mt-12'>
            <div className='mb-6 flex items-end justify-between gap-3'>
              <div>
                <p className='font-cairo text-sm uppercase tracking-[0.18em] text-[#C29959]'>
                  Gallery
                </p>
                <h2 className='font-alexandria text-3xl text-[#082621] sm:text-[40px]'>
                  Project Highlights
                </h2>
              </div>
            </div>

            <div className='grid gap-5 md:grid-cols-2 xl:grid-cols-4'>
              {project.gallery.map((image, index) => (
                <div
                  key={`${project.slug}-${index}`}
                  className='relative h-[260px] overflow-hidden rounded-[16px] bg-zinc-100'
                >
                  <Image
                    src={image}
                    alt={`${project.title} gallery image ${index + 1}`}
                    fill
                    className='object-cover transition-transform duration-500 hover:scale-105'
                    sizes='(max-width: 768px) 100vw, 25vw'
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
