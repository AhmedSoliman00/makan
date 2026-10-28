import { prisma } from '@/lib/prisma'

export type LocalizedTeamMember = {
  id: string
  name: string
  role?: string
  description: string
  image: string
  order: number
}

/**
 * Fetch all team members with localized name and description
 */
export async function getTeamMembers(locale: string): Promise<LocalizedTeamMember[]> {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
    include: {
      translations: true,
    },
  })

  return members.map((m) => {
    const trans = m.translations.find((t) => t.locale === locale)
    const fallback = m.translations[0]
    const active = trans || fallback

    return {
      id: m.id,
      name: active?.name || '',
      role: active?.role || '',
      description: active?.description || '',
      image: m.image || '/home/people/team-member.webp',
      order: m.order,
    }
  })
}
