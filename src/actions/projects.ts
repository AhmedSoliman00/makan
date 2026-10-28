'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'
import { getAdminSession } from '@/lib/auth'

export type ProjectInput = {
  slug: string
  category: string
  cityKey: string
  statusKey: string
  heroImage: string
  order?: number
  isFeatured?: boolean
  ar: {
    breadcrumbTitle: string
    title: string
    categoryBadge: string
    heroCaption: string
    summary: string
    description: string
    metrics?: any[]
    highlightsTitle?: string
    highlightsCtaText?: string
    highlights?: any[]
    overviewEyebrow?: string
    overviewHeading?: string
    overviewDescription?: string
    facts?: any[]
    galleryEyebrow?: string
    galleryHeading?: string
    galleryDescription?: string
    galleryImages?: string[]
    masterplanEyebrow?: string
    masterplanHeading?: string
    masterplanDescription?: string
    masterplanCtaText?: string
    masterplanCaption?: string
    masterplanEnlargeText?: string
    masterplanImage?: string
    similarTitle?: string
    similarSubtitle?: string
    similarCtaText?: string
    similarProjects?: any[]
  }
  en: {
    breadcrumbTitle: string
    title: string
    categoryBadge: string
    heroCaption: string
    summary: string
    description: string
    metrics?: any[]
    highlightsTitle?: string
    highlightsCtaText?: string
    highlights?: any[]
    overviewEyebrow?: string
    overviewHeading?: string
    overviewDescription?: string
    facts?: any[]
    galleryEyebrow?: string
    galleryHeading?: string
    galleryDescription?: string
    galleryImages?: string[]
    masterplanEyebrow?: string
    masterplanHeading?: string
    masterplanDescription?: string
    masterplanCtaText?: string
    masterplanCaption?: string
    masterplanEnlargeText?: string
    masterplanImage?: string
    similarTitle?: string
    similarSubtitle?: string
    similarCtaText?: string
    similarProjects?: any[]
  }
}

export async function createProjectAction(data: ProjectInput) {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const existing = await prisma.project.findUnique({
      where: { slug: data.slug.trim().toLowerCase() },
    })

    if (existing) {
      return { success: false, error: 'slugAlreadyExists' }
    }

    const created = await prisma.project.create({
      data: {
        slug: data.slug.trim().toLowerCase(),
        category: data.category,
        cityKey: data.cityKey || 'riyadh',
        statusKey: data.statusKey || 'completed',
        heroImage: data.heroImage || '/home/images/hero.webp',
        order: Number(data.order) || 0,
        isFeatured: Boolean(data.isFeatured),
        translations: {
          create: [
            {
              locale: 'ar',
              breadcrumbTitle: data.ar.breadcrumbTitle || data.ar.title,
              title: data.ar.title,
              categoryBadge: data.ar.categoryBadge || data.category,
              heroCaption: data.ar.heroCaption || '',
              summary: data.ar.summary || '',
              description: data.ar.description || '',
              metrics: JSON.stringify(data.ar.metrics || []),
              highlightsTitle: data.ar.highlightsTitle || '',
              highlightsCtaText: data.ar.highlightsCtaText || '',
              highlights: JSON.stringify(data.ar.highlights || []),
              overviewEyebrow: data.ar.overviewEyebrow || '',
              overviewHeading: data.ar.overviewHeading || '',
              overviewDescription: data.ar.overviewDescription || '',
              facts: JSON.stringify(data.ar.facts || []),
              galleryEyebrow: data.ar.galleryEyebrow || '',
              galleryHeading: data.ar.galleryHeading || '',
              galleryDescription: data.ar.galleryDescription || '',
              galleryImages: JSON.stringify(data.ar.galleryImages || []),
              masterplanEyebrow: data.ar.masterplanEyebrow || '',
              masterplanHeading: data.ar.masterplanHeading || '',
              masterplanDescription: data.ar.masterplanDescription || '',
              masterplanCtaText: data.ar.masterplanCtaText || '',
              masterplanCaption: data.ar.masterplanCaption || '',
              masterplanEnlargeText: data.ar.masterplanEnlargeText || '',
              masterplanImage: data.ar.masterplanImage || '',
              similarTitle: data.ar.similarTitle || '',
              similarSubtitle: data.ar.similarSubtitle || '',
              similarCtaText: data.ar.similarCtaText || '',
              similarProjects: JSON.stringify(data.ar.similarProjects || []),
            },
            {
              locale: 'en',
              breadcrumbTitle: data.en.breadcrumbTitle || data.en.title,
              title: data.en.title,
              categoryBadge: data.en.categoryBadge || data.category,
              heroCaption: data.en.heroCaption || '',
              summary: data.en.summary || '',
              description: data.en.description || '',
              metrics: JSON.stringify(data.en.metrics || []),
              highlightsTitle: data.en.highlightsTitle || '',
              highlightsCtaText: data.en.highlightsCtaText || '',
              highlights: JSON.stringify(data.en.highlights || []),
              overviewEyebrow: data.en.overviewEyebrow || '',
              overviewHeading: data.en.overviewHeading || '',
              overviewDescription: data.en.overviewDescription || '',
              facts: JSON.stringify(data.en.facts || []),
              galleryEyebrow: data.en.galleryEyebrow || '',
              galleryHeading: data.en.galleryHeading || '',
              galleryDescription: data.en.galleryDescription || '',
              galleryImages: JSON.stringify(data.en.galleryImages || []),
              masterplanEyebrow: data.en.masterplanEyebrow || '',
              masterplanHeading: data.en.masterplanHeading || '',
              masterplanDescription: data.en.masterplanDescription || '',
              masterplanCtaText: data.en.masterplanCtaText || '',
              masterplanCaption: data.en.masterplanCaption || '',
              masterplanEnlargeText: data.en.masterplanEnlargeText || '',
              masterplanImage: data.en.masterplanImage || '',
              similarTitle: data.en.similarTitle || '',
              similarSubtitle: data.en.similarSubtitle || '',
              similarCtaText: data.en.similarCtaText || '',
              similarProjects: JSON.stringify(data.en.similarProjects || []),
            },
          ],
        },
      },
    })

    revalidatePath('/[locale]/projects', 'page')
    revalidatePath('/[locale]', 'page')
    return { success: true, id: created.id, slug: created.slug }
  } catch (err: any) {
    console.error('Error creating project:', err)
    return { success: false, error: err.message || 'serverError' }
  }
}

export async function updateProjectAction(id: string, data: ProjectInput) {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    await prisma.project.update({
      where: { id },
      data: {
        slug: data.slug.trim().toLowerCase(),
        category: data.category,
        cityKey: data.cityKey || 'riyadh',
        statusKey: data.statusKey || 'completed',
        heroImage: data.heroImage,
        order: Number(data.order) || 0,
        isFeatured: Boolean(data.isFeatured),
      },
    })

    // Upsert AR translation
    await prisma.projectTranslation.upsert({
      where: {
        projectId_locale: { projectId: id, locale: 'ar' },
      },
      create: {
        projectId: id,
        locale: 'ar',
        breadcrumbTitle: data.ar.breadcrumbTitle || data.ar.title,
        title: data.ar.title,
        categoryBadge: data.ar.categoryBadge || data.category,
        heroCaption: data.ar.heroCaption || '',
        summary: data.ar.summary || '',
        description: data.ar.description || '',
        metrics: JSON.stringify(data.ar.metrics || []),
        highlightsTitle: data.ar.highlightsTitle || '',
        highlightsCtaText: data.ar.highlightsCtaText || '',
        highlights: JSON.stringify(data.ar.highlights || []),
        overviewEyebrow: data.ar.overviewEyebrow || '',
        overviewHeading: data.ar.overviewHeading || '',
        overviewDescription: data.ar.overviewDescription || '',
        facts: JSON.stringify(data.ar.facts || []),
        galleryEyebrow: data.ar.galleryEyebrow || '',
        galleryHeading: data.ar.galleryHeading || '',
        galleryDescription: data.ar.galleryDescription || '',
        galleryImages: JSON.stringify(data.ar.galleryImages || []),
        masterplanEyebrow: data.ar.masterplanEyebrow || '',
        masterplanHeading: data.ar.masterplanHeading || '',
        masterplanDescription: data.ar.masterplanDescription || '',
        masterplanCtaText: data.ar.masterplanCtaText || '',
        masterplanCaption: data.ar.masterplanCaption || '',
        masterplanEnlargeText: data.ar.masterplanEnlargeText || '',
        masterplanImage: data.ar.masterplanImage || '',
        similarTitle: data.ar.similarTitle || '',
        similarSubtitle: data.ar.similarSubtitle || '',
        similarCtaText: data.ar.similarCtaText || '',
        similarProjects: JSON.stringify(data.ar.similarProjects || []),
      },
      update: {
        breadcrumbTitle: data.ar.breadcrumbTitle || data.ar.title,
        title: data.ar.title,
        categoryBadge: data.ar.categoryBadge || data.category,
        heroCaption: data.ar.heroCaption || '',
        summary: data.ar.summary || '',
        description: data.ar.description || '',
        metrics: JSON.stringify(data.ar.metrics || []),
        highlightsTitle: data.ar.highlightsTitle || '',
        highlightsCtaText: data.ar.highlightsCtaText || '',
        highlights: JSON.stringify(data.ar.highlights || []),
        overviewEyebrow: data.ar.overviewEyebrow || '',
        overviewHeading: data.ar.overviewHeading || '',
        overviewDescription: data.ar.overviewDescription || '',
        facts: JSON.stringify(data.ar.facts || []),
        galleryEyebrow: data.ar.galleryEyebrow || '',
        galleryHeading: data.ar.galleryHeading || '',
        galleryDescription: data.ar.galleryDescription || '',
        galleryImages: JSON.stringify(data.ar.galleryImages || []),
        masterplanEyebrow: data.ar.masterplanEyebrow || '',
        masterplanHeading: data.ar.masterplanHeading || '',
        masterplanDescription: data.ar.masterplanDescription || '',
        masterplanCtaText: data.ar.masterplanCtaText || '',
        masterplanCaption: data.ar.masterplanCaption || '',
        masterplanEnlargeText: data.ar.masterplanEnlargeText || '',
        masterplanImage: data.ar.masterplanImage || '',
        similarTitle: data.ar.similarTitle || '',
        similarSubtitle: data.ar.similarSubtitle || '',
        similarCtaText: data.ar.similarCtaText || '',
        similarProjects: JSON.stringify(data.ar.similarProjects || []),
      },
    })

    // Upsert EN translation
    await prisma.projectTranslation.upsert({
      where: {
        projectId_locale: { projectId: id, locale: 'en' },
      },
      create: {
        projectId: id,
        locale: 'en',
        breadcrumbTitle: data.en.breadcrumbTitle || data.en.title,
        title: data.en.title,
        categoryBadge: data.en.categoryBadge || data.category,
        heroCaption: data.en.heroCaption || '',
        summary: data.en.summary || '',
        description: data.en.description || '',
        metrics: JSON.stringify(data.en.metrics || []),
        highlightsTitle: data.en.highlightsTitle || '',
        highlightsCtaText: data.en.highlightsCtaText || '',
        highlights: JSON.stringify(data.en.highlights || []),
        overviewEyebrow: data.en.overviewEyebrow || '',
        overviewHeading: data.en.overviewHeading || '',
        overviewDescription: data.en.overviewDescription || '',
        facts: JSON.stringify(data.en.facts || []),
        galleryEyebrow: data.en.galleryEyebrow || '',
        galleryHeading: data.en.galleryHeading || '',
        galleryDescription: data.en.galleryDescription || '',
        galleryImages: JSON.stringify(data.en.galleryImages || []),
        masterplanEyebrow: data.en.masterplanEyebrow || '',
        masterplanHeading: data.en.masterplanHeading || '',
        masterplanDescription: data.en.masterplanDescription || '',
        masterplanCtaText: data.en.masterplanCtaText || '',
        masterplanCaption: data.en.masterplanCaption || '',
        masterplanEnlargeText: data.en.masterplanEnlargeText || '',
        masterplanImage: data.en.masterplanImage || '',
        similarTitle: data.en.similarTitle || '',
        similarSubtitle: data.en.similarSubtitle || '',
        similarCtaText: data.en.similarCtaText || '',
        similarProjects: JSON.stringify(data.en.similarProjects || []),
      },
      update: {
        breadcrumbTitle: data.en.breadcrumbTitle || data.en.title,
        title: data.en.title,
        categoryBadge: data.en.categoryBadge || data.category,
        heroCaption: data.en.heroCaption || '',
        summary: data.en.summary || '',
        description: data.en.description || '',
        metrics: JSON.stringify(data.en.metrics || []),
        highlightsTitle: data.en.highlightsTitle || '',
        highlightsCtaText: data.en.highlightsCtaText || '',
        highlights: JSON.stringify(data.en.highlights || []),
        overviewEyebrow: data.en.overviewEyebrow || '',
        overviewHeading: data.en.overviewHeading || '',
        overviewDescription: data.en.overviewDescription || '',
        facts: JSON.stringify(data.en.facts || []),
        galleryEyebrow: data.en.galleryEyebrow || '',
        galleryHeading: data.en.galleryHeading || '',
        galleryDescription: data.en.galleryDescription || '',
        galleryImages: JSON.stringify(data.en.galleryImages || []),
        masterplanEyebrow: data.en.masterplanEyebrow || '',
        masterplanHeading: data.en.masterplanHeading || '',
        masterplanDescription: data.en.masterplanDescription || '',
        masterplanCtaText: data.en.masterplanCtaText || '',
        masterplanCaption: data.en.masterplanCaption || '',
        masterplanEnlargeText: data.en.masterplanEnlargeText || '',
        masterplanImage: data.en.masterplanImage || '',
        similarTitle: data.en.similarTitle || '',
        similarSubtitle: data.en.similarSubtitle || '',
        similarCtaText: data.en.similarCtaText || '',
        similarProjects: JSON.stringify(data.en.similarProjects || []),
      },
    })

    revalidatePath('/[locale]/projects', 'page')
    revalidatePath(`/[locale]/projects/${data.slug}`, 'page')
    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (err: any) {
    console.error('Error updating project:', err)
    return { success: false, error: err.message || 'serverError' }
  }
}

export async function deleteProjectAction(id: string) {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    await prisma.project.delete({
      where: { id },
    })

    revalidatePath('/[locale]/projects', 'page')
    revalidatePath('/[locale]', 'page')
    return { success: true }
  } catch (err: any) {
    console.error('Error deleting project:', err)
    return { success: false, error: err.message || 'serverError' }
  }
}
