import { prisma } from '@/lib/prisma'
import type { ProjectCategory, CityKey, StatusKey } from '@/lib/projects-catalogue'

export type LocalizedProjectSummary = {
  id: string
  slug: string
  category: ProjectCategory
  image: string
  cityKey: CityKey
  statusKey: StatusKey
  title: string
  categoryLabel: string
  location: string
  summary: string
}

export type LocalizedFullProject = {
  id: string
  slug: string
  category: ProjectCategory
  heroImage: string
  cityKey: CityKey
  statusKey: StatusKey
  breadcrumbTitle: string
  title: string
  categoryBadge: string
  heroCaption: string
  summary: string
  description: string
  metrics: Array<{ value: string; label: string; icon: string }>
  highlightsTitle: string
  highlightsCtaText: string
  highlights: Array<{ title: string; description: string; icon: string }>
  overviewEyebrow: string
  overviewHeading: string
  overviewDescription: string
  facts: Array<{ label: string; value: string; icon: string }>
  galleryEyebrow: string
  galleryHeading: string
  galleryDescription: string
  galleryImages: string[]
  masterplanEyebrow: string
  masterplanHeading: string
  masterplanDescription: string
  masterplanCtaText: string
  masterplanCaption: string
  masterplanEnlargeText: string
  masterplanImage: string
  similarTitle: string
  similarSubtitle: string
  similarCtaText: string
  similarProjects: Array<{
    slug: string
    category: string
    title: string
    location: string
    image: string
  }>
}

/**
 * Fetch projects for catalogue listing with dynamic filters
 */
export async function getProjects(params: {
  locale: string
  category?: string
  city?: string
  status?: string
  query?: string
}): Promise<LocalizedProjectSummary[]> {
  const { locale, category, city, status, query } = params

  const whereClause: any = {}

  if (category && category !== 'all') {
    whereClause.category = category
  }

  if (city && city !== 'all') {
    whereClause.cityKey = city
  }

  if (status && status !== 'all') {
    whereClause.statusKey = status
  }

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: { order: 'asc' },
    include: {
      translations: true,
    },
  })

  const isAr = locale === 'ar'

  const formatted = projects.map((p) => {
    const translation = p.translations.find((t) => t.locale === locale)
    const fallback = p.translations[0]
    const activeTrans = translation || fallback

    return {
      id: p.id,
      slug: p.slug,
      category: p.category as ProjectCategory,
      image: p.heroImage,
      cityKey: p.cityKey as CityKey,
      statusKey: p.statusKey as StatusKey,
      title: activeTrans?.title || p.slug,
      categoryLabel: activeTrans?.categoryBadge || p.category,
      location:
        p.cityKey === 'riyadh'
          ? isAr
            ? 'الرياض، المملكة العربية السعودية'
            : 'Riyadh, Saudi Arabia'
          : p.cityKey === 'khobar'
          ? isAr
            ? 'الخبر، المملكة العربية السعودية'
            : 'Khobar, Saudi Arabia'
          : isAr
          ? 'جدة، المملكة العربية السعودية'
          : 'Jeddah, Saudi Arabia',
      summary: activeTrans?.summary || '',
    }
  })

  if (query && query.trim() !== '') {
    const q = query.toLowerCase()
    return formatted.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q)
    )
  }

  return formatted
}

/**
 * Fetch single project by slug for project detail page
 */
export async function getProjectBySlug(
  slug: string,
  locale: string
): Promise<LocalizedFullProject | null> {
  const project = await prisma.project.findUnique({
    where: { slug },
    include: {
      translations: true,
    },
  })

  if (!project) return null

  const isAr = locale === 'ar'
  const trans = project.translations.find((t) => t.locale === locale)
  const activeTrans = trans || project.translations[0]

  if (!activeTrans) return null

  // Safely parse JSON strings
  const parseJson = (val: string, fallback: any = []) => {
    try {
      return val ? JSON.parse(val) : fallback
    } catch {
      return fallback
    }
  }

  // 1. DYNAMIC SIMILAR PROJECTS: Fetch projects in the SAME category
  const sameCategoryProjects = await prisma.project.findMany({
    where: {
      category: project.category,
      slug: { not: project.slug },
    },
    take: 3,
    orderBy: { order: 'asc' },
    include: {
      translations: true,
    },
  })

  // If fewer than 3 in the same category, supplement with other projects
  let similarPool = [...sameCategoryProjects]
  if (similarPool.length < 3) {
    const existingSlugs = [project.slug, ...similarPool.map((p) => p.slug)]
    const additionalProjects = await prisma.project.findMany({
      where: {
        slug: { notIn: existingSlugs },
      },
      take: 3 - similarPool.length,
      orderBy: { order: 'asc' },
      include: {
        translations: true,
      },
    })
    similarPool = [...similarPool, ...additionalProjects]
  }

  const formatLocation = (cityKey: string) => {
    switch (cityKey) {
      case 'riyadh':
        return isAr ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'
      case 'khobar':
        return isAr ? 'الخبر، المملكة العربية السعودية' : 'Khobar, Saudi Arabia'
      case 'jeddah':
        return isAr ? 'جدة، المملكة العربية السعودية' : 'Jeddah, Saudi Arabia'
      default:
        return isAr ? 'المملكة العربية السعودية' : 'Kingdom of Saudi Arabia'
    }
  }

  const formatCategoryBadge = (cat: string, customBadge?: string) => {
    if (customBadge && customBadge.trim() !== '') return customBadge
    switch (cat) {
      case 'residential':
        return isAr ? 'مجتمع سكني متكامل' : 'Residential Community'
      case 'publicSpaces':
        return isAr ? 'مساحات عامة وتجديد حضري' : 'Public Realm & Urban Spaces'
      case 'mixedUse':
        return isAr ? 'متعدد الاستخدام' : 'Mixed-Use Development'
      case 'hospitality':
        return isAr ? 'ضيافة وفندقة' : 'Hospitality & Leisure'
      default:
        return cat
    }
  }

  const dynamicSimilarProjects = similarPool.map((p) => {
    const pTrans = p.translations.find((t) => t.locale === locale) || p.translations[0]
    return {
      slug: p.slug,
      category: formatCategoryBadge(p.category, pTrans?.categoryBadge),
      title: pTrans?.title || p.slug,
      location: formatLocation(p.cityKey),
      image: p.heroImage || '/home/images/hero.webp',
    }
  })

  // 2. METRICS: Use stored or provide sensible defaults
  const parsedMetrics = parseJson(activeTrans.metrics, [])
  const metrics =
    Array.isArray(parsedMetrics) && parsedMetrics.length > 0
      ? parsedMetrics
      : [
          {
            value: '3',
            label: isAr ? 'ساحات مجتمعية' : 'Civic Plazas',
            icon: 'sprout',
          },
          {
            value: '9,600',
            label: isAr ? 'م² مساحة مطورة' : 'm² Developed Realm',
            icon: 'building',
          },
          {
            value: '+45%',
            label: isAr ? 'زيادة تدفق المشاة' : 'Pedestrian Flow Increase',
            icon: 'users',
          },
          {
            value: '+50%',
            label: isAr ? 'مساحات مظللة طبيعياً' : 'Natural Shaded Areas',
            icon: 'trees',
          },
        ]

  // 3. HIGHLIGHTS: Use stored or provide sensible defaults
  const parsedHighlights = parseJson(activeTrans.highlights, [])
  const highlights =
    Array.isArray(parsedHighlights) && parsedHighlights.length > 0
      ? parsedHighlights
      : [
          {
            title: isAr ? 'المجال العام المفتوح' : 'Open Public Realm',
            description: isAr
              ? 'سهولة فائقة في الحركة والاتصال للمشاة'
              : 'Maximum ease of movement and pedestrian connectivity',
            icon: 'community',
          },
          {
            title: isAr ? 'نباتات محلية متكيفة' : 'Resilient Native Planting',
            description: isAr
              ? 'نباتات مقاومة للجفاف تعزز التنوع الحيوي المحلي'
              : 'Drought-tolerant flora enriching local biodiversity',
            icon: 'nature',
          },
          {
            title: isAr ? 'ممرات مشاة مظللة' : 'Shaded Pedestrian Corridors',
            description: isAr
              ? 'تشجيع أسلوب حياة يومي نشط وصحي'
              : 'Encouraging active daily lifestyle and wellness',
            icon: 'services',
          },
          {
            title: isAr ? 'عقدة حضرية استراتيجية' : 'Strategic Urban Node',
            description: isAr
              ? 'ربط المحاور والشرايين الحيوية للمدينة'
              : 'Connecting key waterfront and municipal arteries',
            icon: 'location',
          },
        ]

  // 4. FACTS: Build complete 6 key facts
  const parsedFacts = parseJson(activeTrans.facts, [])
  const defaultFacts = [
    {
      label: isAr ? 'المساحة الإجمالية' : 'Total Area',
      value: '9,600 m²',
      icon: 'area',
    },
    {
      label: isAr ? 'سنة التطوير' : 'Development Year',
      value: '2024',
      icon: 'year',
    },
    {
      label: isAr ? 'نطاق العمل' : 'Scope of Services',
      value: isAr
        ? 'تخطيط المجال العام وهندسة اللاندسكيب'
        : 'Public Realm Planning & Landscape Architecture',
      icon: 'scope',
    },
    {
      label: isAr ? 'الموقع' : 'Location',
      value: formatLocation(project.cityKey),
      icon: 'location',
    },
    {
      label: isAr ? 'نوع المشروع' : 'Project Type',
      value: formatCategoryBadge(project.category, activeTrans.categoryBadge),
      icon: 'type',
    },
    {
      label: isAr ? 'حالة المشروع' : 'Status',
      value:
        project.statusKey === 'completed'
          ? isAr
            ? 'مكتمل'
            : 'Completed'
          : isAr
          ? 'قيد التنفيذ'
          : 'In Progress',
      icon: 'units',
    },
  ]
  const facts =
    Array.isArray(parsedFacts) && parsedFacts.length >= 6
      ? parsedFacts
      : defaultFacts

  // 5. GALLERY: Ensure at least hero image if gallery is empty
  const parsedGallery = parseJson(activeTrans.galleryImages, [])
  const galleryImages =
    Array.isArray(parsedGallery) && parsedGallery.length > 0
      ? parsedGallery
      : project.heroImage
      ? [project.heroImage]
      : []

  return {
    id: project.id,
    slug: project.slug,
    category: project.category as ProjectCategory,
    heroImage: project.heroImage,
    cityKey: project.cityKey as CityKey,
    statusKey: project.statusKey as StatusKey,
    breadcrumbTitle: activeTrans.breadcrumbTitle || activeTrans.title,
    title: activeTrans.title,
    categoryBadge: formatCategoryBadge(project.category, activeTrans.categoryBadge),
    heroCaption:
      activeTrans.heroCaption ||
      `${activeTrans.title} — ${isAr ? 'رؤية للمكان' : 'A Vision for Place'}`,
    summary: activeTrans.summary,
    description: activeTrans.description,
    metrics,
    highlightsTitle:
      activeTrans.highlightsTitle || (isAr ? 'أبرز معالم المشروع' : 'Project Highlights'),
    highlightsCtaText:
      activeTrans.highlightsCtaText || (isAr ? 'تواصل معنا' : 'Contact Us'),
    highlights,
    overviewEyebrow:
      activeTrans.overviewEyebrow || (isAr ? 'نظرة عامة على المشروع' : 'Project Overview'),
    overviewHeading:
      activeTrans.overviewHeading ||
      (isAr ? 'إعادة صياغة المساحات الحضرية للمجتمعات' : 'Redefining Public Space for Communities'),
    overviewDescription:
      activeTrans.overviewDescription || activeTrans.description || activeTrans.summary,
    facts,
    galleryEyebrow:
      activeTrans.galleryEyebrow || (isAr ? 'معرض الصور' : 'Visual Exploration'),
    galleryHeading:
      activeTrans.galleryHeading ||
      (isAr ? 'توثيق بصري لتفاصيل المكان' : 'Architecture & Landscape Imagery'),
    galleryDescription:
      activeTrans.galleryDescription ||
      (isAr
        ? 'مجموعة مختارة من الصور تجسد تفاصيل المشروع والبيئة المعمارية'
        : 'Curated photography capturing spatial harmony, material craftsmanship, and greenery'),
    galleryImages,
    masterplanEyebrow:
      activeTrans.masterplanEyebrow || (isAr ? 'المخطط العام' : 'Master Planning'),
    masterplanHeading:
      activeTrans.masterplanHeading ||
      (isAr ? 'المخطط العام والتوزيع المكاني' : 'Spatial Strategy & Master Layout'),
    masterplanDescription:
      activeTrans.masterplanDescription ||
      (isAr
        ? 'رؤية تخطيطية شاملة توازن بين الحركة والمساحات المفتوحة'
        : 'Comprehensive spatial layout balancing circulation, human scale, and open green corridors'),
    masterplanCtaText:
      activeTrans.masterplanCtaText || (isAr ? 'تكبير المخطط' : 'Enlarge Drawing'),
    masterplanCaption:
      activeTrans.masterplanCaption ||
      `${activeTrans.title} · ${isAr ? 'المخطط التوجيهي وهندسة الموقع' : 'Master Circulation & Landscape Layout'}`,
    masterplanEnlargeText:
      activeTrans.masterplanEnlargeText || (isAr ? 'تكبير المخطط' : 'Click to enlarge'),
    masterplanImage: activeTrans.masterplanImage || '',
    similarTitle:
      activeTrans.similarTitle || (isAr ? 'مشاريع مشابهة' : 'Similar Projects'),
    similarSubtitle:
      activeTrans.similarSubtitle ||
      (isAr
        ? 'استكشف المزيد من أعمالنا في نفس المجال المعماري والبيئي'
        : 'Explore more of our architectural and environmental work in this domain'),
    similarCtaText:
      activeTrans.similarCtaText || (isAr ? 'عرض جميع المشاريع' : 'View All Projects'),
    similarProjects: dynamicSimilarProjects,
  }
}

/**
 * Get all project slugs for static params
 */
export async function getAllProjectSlugs(): Promise<string[]> {
  const projects = await prisma.project.findMany({
    select: { slug: true },
  })
  return projects.map((p) => p.slug)
}
