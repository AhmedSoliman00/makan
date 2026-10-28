'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export type TeamMemberInput = {
  image?: string
  order?: number
  ar: {
    name: string
    role?: string
    description: string
  }
  en: {
    name: string
    role?: string
    description: string
  }
}

export async function createTeamMemberAction(data: TeamMemberInput) {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const created = await prisma.teamMember.create({
      data: {
        image: data.image || '/home/people/team-member.webp',
        order: Number(data.order) || 0,
        translations: {
          create: [
            {
              locale: 'ar',
              name: data.ar.name,
              role: data.ar.role || '',
              description: data.ar.description,
            },
            {
              locale: 'en',
              name: data.en.name,
              role: data.en.role || '',
              description: data.en.description,
            },
          ],
        },
      },
    })

    revalidatePath('/[locale]/team', 'page')
    revalidatePath('/[locale]', 'page')
    return { success: true, id: created.id }
  } catch (err: any) {
    console.error('Error creating team member:', err)
    return { success: false, error: err.message || 'serverError' }
  }
}

export async function updateTeamMemberAction(id: string, data: TeamMemberInput) {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    await prisma.teamMember.update({
      where: { id },
      data: {
        image: data.image || '/home/people/team-member.webp',
        order: Number(data.order) || 0,
      },
    })

    // Upsert AR
    await prisma.teamMemberTranslation.upsert({
      where: {
        teamMemberId_locale: { teamMemberId: id, locale: 'ar' },
      },
      create: {
        teamMemberId: id,
        locale: 'ar',
        name: data.ar.name,
        role: data.ar.role || '',
        description: data.ar.description,
      },
      update: {
        name: data.ar.name,
        role: data.ar.role || '',
        description: data.ar.description,
      },
    })

    // Upsert EN
    await prisma.teamMemberTranslation.upsert({
      where: {
        teamMemberId_locale: { teamMemberId: id, locale: 'en' },
      },
      create: {
        teamMemberId: id,
        locale: 'en',
        name: data.en.name,
        role: data.en.role || '',
        description: data.en.description,
      },
      update: {
        name: data.en.name,
        role: data.en.role || '',
        description: data.en.description,
      },
    })

    revalidatePath('/[locale]/team', 'page')
    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (err: any) {
    console.error('Error updating team member:', err)
    return { success: false, error: err.message || 'serverError' }
  }
}

export async function deleteTeamMemberAction(id: string) {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    await prisma.teamMember.delete({
      where: { id },
    })

    revalidatePath('/[locale]/team', 'page')
    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (err: any) {
    console.error('Error deleting team member:', err)
    return { success: false, error: err.message || 'serverError' }
  }
}
