'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Info, X } from 'lucide-react'

export type TeamMember = {
  id?: string
  name: string
  role?: string
  description?: string
  image?: string
}

type PeopleTeamGridProps = {
  members: TeamMember[]
}

export default function PeopleTeamGrid({ members }: PeopleTeamGridProps) {
  const [selectedBio, setSelectedBio] = useState<TeamMember | null>(null)

  return (
    <section className="w-full bg-white pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-[86px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-12 gap-y-12 sm:gap-y-16">
          {members.map((member, idx) => (
            <article
              key={member.id || idx}
              className="group flex flex-col items-center text-center transition-all duration-300"
            >
              {/* Borderless image container with exact aspect ratio */}
              <div className="relative w-full aspect-[386/496] overflow-hidden bg-[#FAF8F5] rounded-[4px]">
                <Image
                  src={member.image || '/home/people/team-member.webp'}
                  alt={member.name}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 386px"
                />
              </div>

              {/* Member Details */}
              <div className="mt-5 sm:mt-6 flex flex-col items-center text-center max-w-[360px]">
                <h3 className="font-alexandria text-xl sm:text-[20px] font-medium text-[#10201D] leading-tight group-hover:text-[#C29959] transition-colors">
                  {member.name}
                </h3>

                {/* Individual Description / Bio */}
                {member.description && (
                  <p className="mt-2.5 font-cairo text-xs sm:text-[13px] text-[#6F746F] leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-300">
                    {member.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
