import type { ProjectMetric } from '@/lib/project-details'
import { Trees, Users, Building2, Sprout, Sparkles } from 'lucide-react'

type ProjectMetricsBarProps = {
  metrics: ProjectMetric[]
}

function MetricIcon({ icon }: { icon: string }) {
  const className = 'h-7 w-7 text-[#C29959]'
  switch (icon) {
    case 'trees':
      return <Trees className={className} />
    case 'users':
      return <Users className={className} />
    case 'building':
      return <Building2 className={className} />
    case 'sprout':
      return <Sprout className={className} />
    default:
      return <Sparkles className={className} />
  }
}

export default function ProjectMetricsBar({ metrics }: ProjectMetricsBarProps) {
  return (
    <section className='w-full border-b border-[#EAE1D0]/70 bg-[#fffdf8] py-10 sm:py-12'>
      <div className='mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-[86px]'>
        {/* Desktop View: 4 columns with fixed vertical dividers */}
        <div className='hidden md:flex items-center justify-between'>
          {metrics.map((metric, idx) => (
            <div key={idx} className='contents'>
              {idx > 0 && (
                <div
                  aria-hidden='true'
                  className='w-px h-24 bg-[#EAE1D0] shrink-0'
                />
              )}
              <div className='flex-1 flex flex-col items-center justify-center text-center px-4'>
                <div className='mb-3 flex items-center justify-center'>
                  <MetricIcon icon={metric.icon} />
                </div>
                <span className='font-alexandria text-4xl lg:text-[52px] font-normal leading-tight text-[#10201D]'>
                  {metric.value}
                </span>
                <span className='mt-2 font-cairo text-xs sm:text-sm text-[#6F746F]'>
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View: 2x2 grid with fixed borders */}
        <div className='grid grid-cols-2 md:hidden'>
          {metrics.map((metric, idx) => {
            const isFirstRow = idx < 2
            const isLeftColumn = idx % 2 === 0
            return (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center text-center p-4 ${
                  isFirstRow ? 'pb-6' : 'pt-6'
                } ${isFirstRow ? 'border-b border-[#EAE1D0]' : ''} ${
                  isLeftColumn ? 'border-e border-[#EAE1D0]' : ''
                }`}
              >
                <div className='mb-2 flex items-center justify-center'>
                  <MetricIcon icon={metric.icon} />
                </div>
                <span className='font-alexandria text-3xl font-normal leading-tight text-[#10201D]'>
                  {metric.value}
                </span>
                <span className='mt-1 font-cairo text-xs text-[#6F746F]'>
                  {metric.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
