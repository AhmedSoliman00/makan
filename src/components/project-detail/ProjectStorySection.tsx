import { Link } from '@/i18n/navigation'
import type {
  ProjectHighlightItem,
  ProjectFact,
} from '@/lib/project-details'
import {
  Users,
  Sprout,
  ShieldCheck,
  MapPin,
  Sparkles,
  Home,
  Calendar,
  Compass,
  Building2,
  Layers,
  Ruler,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'

type ProjectStorySectionProps = {
  highlightsTitle: string
  highlightsCtaText: string
  highlights: ProjectHighlightItem[]
  overviewEyebrow: string
  overviewHeading: string
  overviewDescription: string
  facts: ProjectFact[]
  isRtl: boolean
}

function HighlightIcon({ icon }: { icon: string }) {
  const className = 'h-5 w-5 text-[#C29959]'
  switch (icon) {
    case 'community':
      return <Users className={className} />
    case 'nature':
      return <Sprout className={className} />
    case 'services':
      return <ShieldCheck className={className} />
    case 'location':
      return <MapPin className={className} />
    default:
      return <Sparkles className={className} />
  }
}

function FactOutlineIcon({ icon }: { icon: string }) {
  const className = 'h-6 w-6 text-[#C29959]'
  switch (icon) {
    case 'units':
      return <Home className={className} strokeWidth={1.5} />
    case 'year':
      return <Calendar className={className} strokeWidth={1.5} />
    case 'scope':
      return <Compass className={className} strokeWidth={1.5} />
    case 'location':
      return <MapPin className={className} strokeWidth={1.5} />
    case 'type':
      return <Building2 className={className} strokeWidth={1.5} />
    case 'area':
      return <Layers className={className} strokeWidth={1.5} />
    default:
      return <Ruler className={className} strokeWidth={1.5} />
  }
}

export default function ProjectStorySection({
  highlightsTitle,
  highlightsCtaText,
  highlights,
  overviewEyebrow,
  overviewHeading,
  overviewDescription,
  facts,
  isRtl,
}: ProjectStorySectionProps) {
  // Group facts into 2 rows of 3 items matching Figma specs
  const row1Facts = facts.slice(0, 3)
  const row2Facts = facts.slice(3, 6)

  return (
    <section className='mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-[86px] py-16 sm:py-20'>
      <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start'>
        {/* Left: Highlights Card */}
        <div className='lg:col-span-4 rounded-[16px] border border-[#EAE1D0] bg-[#FCFCF9] p-6 sm:p-7 shadow-[0_4px_24px_rgba(8,38,33,0.02)]'>
          <h2 className='font-alexandria text-xl sm:text-2xl font-normal text-[#10201D] mb-6'>
            {highlightsTitle}
          </h2>

          <div className='space-y-4'>
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className='flex items-start gap-3.5 pb-4 border-b border-[#EAE1D0]/70 last:border-b-0 last:pb-0'
              >
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F4EDE2] text-[#C29959]'>
                  <HighlightIcon icon={item.icon} />
                </div>
                <div>
                  <h3 className='font-cairo text-sm font-semibold text-[#10201D]'>
                    {item.title}
                  </h3>
                  <p className='mt-0.5 font-cairo text-xs text-[#6F746F] leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className='mt-6 pt-4'>
            <Link
              href='/#contact'
              className='group flex w-full items-center justify-center gap-2.5 bg-[#10201D] hover:bg-[#C29959] text-white py-3.5 px-6 font-cairo text-sm font-semibold transition-all duration-300'
            >
              <span>{highlightsCtaText}</span>
              {isRtl ? (
                <ArrowLeft className='h-4 w-4 transition-transform group-hover:-translate-x-1' />
              ) : (
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              )}
            </Link>
          </div>
        </div>

        {/* Right: Narrative & Key Facts Grid */}
        <div className='lg:col-span-8 flex flex-col justify-between'>
          <div>
            {/* Eyebrow with gold accent line */}
            <div
              className={`flex items-center gap-2.5 mb-3 ${
                isRtl ? 'justify-start' : 'justify-start'
              }`}
            >
              {isRtl ? (
                <>
                  <span className='font-cairo text-xs text-[#6F746F]'>
                    {overviewEyebrow}
                  </span>
                  <div className='w-12 h-px bg-[#C29959]' />
                </>
              ) : (
                <>
                  <div className='w-12 h-px bg-[#C29959]' />
                  <span className='font-cairo text-xs text-[#6F746F]'>
                    {overviewEyebrow}
                  </span>
                </>
              )}
            </div>

            <h2 className='font-alexandria text-2xl sm:text-[32px] font-normal leading-snug text-[#10201D] mb-4'>
              {overviewHeading}
            </h2>

            <div className='space-y-3 font-cairo text-xs sm:text-[13px] leading-relaxed text-[#6F746F] mb-10 max-w-3xl'>
              {overviewDescription.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Facts Grid: Exactly as in Figma - NO card box, integrated borders with outline icons */}
          <div className='w-full border-t border-[#EAE1D0]'>
            {/* Desktop / Tablet Grid: 2 rows x 3 columns */}
            <div className='hidden sm:block'>
              {/* Row 1 */}
              <div className='grid grid-cols-3 divide-x divide-x-reverse divide-[#EAE1D0]'>
                {row1Facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-5 px-4 lg:px-6 ${
                      isRtl ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={isRtl ? 'text-end' : 'text-start'}>
                      <span className='font-cairo text-xs text-[#6F746F] block'>
                        {fact.label}
                      </span>
                      <span className='font-cairo text-xs sm:text-sm font-semibold text-[#10201D] block mt-1'>
                        {fact.value}
                      </span>
                    </div>
                    <div className='shrink-0 text-[#C29959]'>
                      <FactOutlineIcon icon={fact.icon} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 2 */}
              <div className='grid grid-cols-3 divide-x divide-x-reverse divide-[#EAE1D0] border-t border-[#EAE1D0]'>
                {row2Facts.map((fact, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center justify-between py-5 px-4 lg:px-6 ${
                      isRtl ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <div className={isRtl ? 'text-end' : 'text-start'}>
                      <span className='font-cairo text-xs text-[#6F746F] block'>
                        {fact.label}
                      </span>
                      <span className='font-cairo text-xs sm:text-sm font-semibold text-[#10201D] block mt-1'>
                        {fact.value}
                      </span>
                    </div>
                    <div className='shrink-0 text-[#C29959]'>
                      <FactOutlineIcon icon={fact.icon} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Grid: 2 columns */}
            <div className='grid grid-cols-1 sm:hidden divide-y divide-[#EAE1D0]'>
              {facts.map((fact, idx) => (
                <div
                  key={idx}
                  className={`flex items-center justify-between py-4 px-2 ${
                    isRtl ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={isRtl ? 'text-end' : 'text-start'}>
                    <span className='font-cairo text-xs text-[#6F746F] block'>
                      {fact.label}
                    </span>
                    <span className='font-cairo text-xs sm:text-sm font-semibold text-[#10201D] block mt-0.5'>
                      {fact.value}
                    </span>
                  </div>
                  <div className='shrink-0 text-[#C29959]'>
                    <FactOutlineIcon icon={fact.icon} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
