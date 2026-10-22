import Image from 'next/image'

export type TeamMember = {
  name: string
  role: string
  image?: string
}

type PeopleTeamGridProps = {
  members: TeamMember[]
}

export default function PeopleTeamGrid({ members }: PeopleTeamGridProps) {
  return (
    <section className='w-full bg-white pb-24 sm:pb-32'>
      <div className='mx-auto max-w-[1440px] px-6 lg:px-[86px]'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-14'>
          {members.map((member, idx) => (
            <article
              key={idx}
              className='group flex flex-col items-center text-center'
            >
              {/* Borderless image container with exact aspect ratio */}
              <div className='relative w-full aspect-[386/496] overflow-hidden bg-[#FAF8F5]'>
                <Image
                  src={member.image || '/home/people/team-member.webp'}
                  alt={member.name}
                  fill
                  className='object-cover object-top transition-transform duration-700 group-hover:scale-105'
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 386px'
                />
              </div>

              {/* Member Details */}
              <div className='mt-5 sm:mt-6 flex flex-col items-center text-center'>
                <h3 className='font-cairo text-xl sm:text-[20px] font-medium text-[#10201D] leading-tight'>
                  {member.name}
                </h3>
                <p className='mt-1 font-cairo text-sm sm:text-base text-[#6F746F] leading-normal'>
                  {member.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
