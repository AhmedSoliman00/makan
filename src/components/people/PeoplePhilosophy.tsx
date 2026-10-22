import Image from 'next/image'

type PeoplePhilosophyProps = {
  eyebrow?: string
  headingPart1: string
  headingPart2: string
  description: string
  planLabel: string
  designLabel: string
  executeLabel: string
  isRtl?: boolean
}

export default function PeoplePhilosophy({
  eyebrow,
  headingPart1,
  headingPart2,
  description,
  planLabel,
  designLabel,
  executeLabel,
  isRtl = true,
}: PeoplePhilosophyProps) {
  // Sequence: Plan -> Design -> Execute
  const steps = [
    {
      label: planLabel,
      image: '/home/people/isometric-plan.webp',
      alt: 'Plan',
      number: '01',
    },
    {
      label: designLabel,
      image: '/home/people/isometric-design.webp',
      alt: 'Design',
      number: '02',
    },
    {
      label: executeLabel,
      image: '/home/people/isometric-execute.webp',
      alt: 'Execute',
      number: '03',
    },
  ]

  return (
    <section className='w-full bg-white py-16 sm:py-24'>
      <div className='mx-auto max-w-[1440px] px-6 lg:px-[86px]'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center'>
          {/* Philosophy Heading & Description (Column 1 in DOM: start side -> Right in RTL, Left in LTR) */}
          <div className='lg:col-span-6 text-start'>
            {eyebrow && (
              <div className='flex items-center justify-start gap-3 text-xs font-semibold uppercase tracking-wider mb-4 font-cairo'>
                <span className='h-px w-8 bg-[#C29959]' />
                <span className='text-[#6F746F] text-sm'>{eyebrow}</span>
                <span className='h-px w-8 bg-[#C29959]' />
              </div>
            )}

            <h2 className='font-alexandria text-3xl sm:text-4xl lg:text-[46px] font-normal leading-[1.3] tracking-tight'>
              <span className='text-[#082621]'>{headingPart1}</span>{' '}
              <span className='text-[#8E8A82]'>{headingPart2}</span>
            </h2>

            <p className='mt-5 font-cairo text-sm sm:text-[15px] leading-relaxed text-[#6F746F] max-w-xl'>
              {description}
            </p>
          </div>

          {/* 3D Isometric Service Blocks (Column 2 in DOM: end side -> Left in RTL, Right in LTR) */}
          <div className='lg:col-span-6'>
            <div className='flex items-center justify-between sm:justify-around gap-2 sm:gap-4'>
              {steps.map((step, idx) => (
                <div key={idx} className='contents'>
                  {idx > 0 && (
                    <div
                      aria-hidden='true'
                      className='hidden sm:block w-px h-24 bg-[#EAE1D0] shrink-0'
                    />
                  )}
                  <div className='flex flex-col items-center justify-center text-center group px-2 sm:px-4'>
                    <div className='relative h-24 w-24 sm:h-28 sm:w-28 transition-transform duration-500 group-hover:-translate-y-2'>
                      <Image
                        src={step.image}
                        alt={step.alt}
                        fill
                        className='object-contain'
                        sizes='(max-width: 640px) 96px, 112px'
                      />
                    </div>
                    <span className='mt-3 font-cairo text-sm sm:text-base font-semibold text-[#10201D]'>
                      {step.label}
                    </span>
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
