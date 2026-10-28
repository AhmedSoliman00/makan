'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import {
  Save,
  Layers,
  Image as ImageIcon,
  Check,
  AlertCircle,
  BarChart3,
  Sparkles,
  FileText,
} from 'lucide-react'
import { createProjectAction, updateProjectAction, type ProjectInput } from '@/actions/projects'
import ImageUpload from '@/components/admin/ImageUpload'
import GalleryUpload from '@/components/admin/GalleryUpload'

type ProjectFormProps = {
  locale: string
  initialData?: any
  projectId?: string
}

const parseJsonField = (val: any, fallback: any) => {
  if (!val) return fallback
  if (Array.isArray(val) || (typeof val === 'object' && val !== null)) return val
  try {
    const res = JSON.parse(val)
    return res ?? fallback
  } catch {
    return fallback
  }
}

const defaultArMetrics = [
  { value: '3', label: 'ساحات مجتمعية', icon: 'sprout' },
  { value: '9,600', label: 'م² مساحة مطورة', icon: 'building' },
  { value: '+45%', label: 'زيادة تدفق المشاة', icon: 'users' },
  { value: '+50%', label: 'مساحات مظللة طبيعياً', icon: 'trees' },
]

const defaultEnMetrics = [
  { value: '3', label: 'Civic Plazas', icon: 'sprout' },
  { value: '9,600', label: 'm² Developed Realm', icon: 'building' },
  { value: '+45%', label: 'Pedestrian Flow Increase', icon: 'users' },
  { value: '+50%', label: 'Natural Shaded Areas', icon: 'trees' },
]

const defaultArHighlights = [
  {
    title: 'المجال العام المفتوح',
    description: 'سهولة فائقة في الحركة والاتصال للمشاة',
    icon: 'community',
  },
  {
    title: 'نباتات محلية متكيفة',
    description: 'نباتات مقاومة للجفاف تعزز التنوع الحيوي المحلي',
    icon: 'nature',
  },
  {
    title: 'ممرات مشاة مظللة',
    description: 'تشجيع أسلوب حياة يومي نشط وصحي',
    icon: 'services',
  },
  {
    title: 'عقدة حضرية استراتيجية',
    description: 'ربط المحاور والشرايين الحيوية للمدينة',
    icon: 'location',
  },
]

const defaultEnHighlights = [
  {
    title: 'Open Public Realm',
    description: 'Maximum ease of movement and pedestrian connectivity',
    icon: 'community',
  },
  {
    title: 'Resilient Native Planting',
    description: 'Drought-tolerant flora enriching local biodiversity',
    icon: 'nature',
  },
  {
    title: 'Shaded Pedestrian Corridors',
    description: 'Encouraging active daily lifestyle and wellness',
    icon: 'services',
  },
  {
    title: 'Strategic Urban Node',
    description: 'Connecting key waterfront and municipal arteries',
    icon: 'location',
  },
]

const defaultArFacts = [
  { label: 'المساحة الإجمالية', value: '9,600 م²', icon: 'area' },
  { label: 'سنة التطوير', value: '2024', icon: 'year' },
  { label: 'نطاق العمل', value: 'تخطيط المجال العام وهندسة اللاندسكيب', icon: 'scope' },
  { label: 'الموقع', value: 'الرياض، المملكة العربية السعودية', icon: 'location' },
  { label: 'نوع المشروع', value: 'مجتمع سكني متكامل', icon: 'type' },
  { label: 'حالة المشروع', value: 'مكتمل', icon: 'units' },
]

const defaultEnFacts = [
  { label: 'Total Area', value: '9,600 m²', icon: 'area' },
  { label: 'Development Year', value: '2024', icon: 'year' },
  { label: 'Scope of Services', value: 'Public Realm Planning & Landscape Architecture', icon: 'scope' },
  { label: 'Location', value: 'Riyadh, Kingdom of Saudi Arabia', icon: 'location' },
  { label: 'Project Type', value: 'Integrated Residential Community', icon: 'type' },
  { label: 'Status', value: 'Completed', icon: 'units' },
]

export default function ProjectForm({ locale, initialData, projectId }: ProjectFormProps) {
  const t = useTranslations('Admin.projects.form')
  const router = useRouter()
  const isEditing = Boolean(projectId)
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>(locale === 'en' ? 'en' : 'ar')
  const [error, setError] = useState<string | null>(null)

  // 1. General Configuration
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [category, setCategory] = useState(initialData?.category || 'residential')
  const [cityKey, setCityKey] = useState(initialData?.cityKey || 'riyadh')
  const [statusKey, setStatusKey] = useState(initialData?.statusKey || 'completed')
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '/home/images/hero.webp')
  const [order, setOrder] = useState(initialData?.order ?? 0)
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured ?? false)

  // 2. Arabic Basic Content
  const [arTitle, setArTitle] = useState(initialData?.ar?.title || '')
  const [arBreadcrumb, setArBreadcrumb] = useState(initialData?.ar?.breadcrumbTitle || '')
  const [arCategoryBadge, setArCategoryBadge] = useState(initialData?.ar?.categoryBadge || '')
  const [arHeroCaption, setArHeroCaption] = useState(initialData?.ar?.heroCaption || '')
  const [arSummary, setArSummary] = useState(initialData?.ar?.summary || '')
  const [arDescription, setArDescription] = useState(initialData?.ar?.description || '')

  // 3. Arabic Metrics, Highlights, Story & Facts
  const [arMetrics, setArMetrics] = useState<Array<{ value: string; label: string; icon: string }>>(() => {
    const p = parseJsonField(initialData?.ar?.metrics, null)
    return Array.isArray(p) && p.length > 0 ? p : defaultArMetrics
  })
  const [arHighlightsTitle, setArHighlightsTitle] = useState(initialData?.ar?.highlightsTitle || 'أبرز معالم المشروع')
  const [arHighlightsCtaText, setArHighlightsCtaText] = useState(initialData?.ar?.highlightsCtaText || 'تواصل معنا')
  const [arHighlights, setArHighlights] = useState<Array<{ title: string; description: string; icon: string }>>(() => {
    const p = parseJsonField(initialData?.ar?.highlights, null)
    return Array.isArray(p) && p.length > 0 ? p : defaultArHighlights
  })
  const [arOverviewEyebrow, setArOverviewEyebrow] = useState(initialData?.ar?.overviewEyebrow || 'نظرة عامة على المشروع')
  const [arOverviewHeading, setArOverviewHeading] = useState(initialData?.ar?.overviewHeading || 'إعادة صياغة المساحات الحضرية للمجتمعات')
  const [arOverviewDescription, setArOverviewDescription] = useState(
    initialData?.ar?.overviewDescription ||
    'معيار للتجديد الحضري يجمع بين البيئة، والمقياس الإنساني، والهندسة المناخية لتوفير بيئة حيوية ومستدامة.'
  )
  const [arFacts, setArFacts] = useState<Array<{ label: string; value: string; icon: string }>>(() => {
    const p = parseJsonField(initialData?.ar?.facts, null)
    return Array.isArray(p) && p.length > 0 ? p : defaultArFacts
  })

  // 4. English Basic Content
  const [enTitle, setEnTitle] = useState(initialData?.en?.title || '')
  const [enBreadcrumb, setEnBreadcrumb] = useState(initialData?.en?.breadcrumbTitle || '')
  const [enCategoryBadge, setEnCategoryBadge] = useState(initialData?.en?.categoryBadge || '')
  const [enHeroCaption, setEnHeroCaption] = useState(initialData?.en?.heroCaption || '')
  const [enSummary, setEnSummary] = useState(initialData?.en?.summary || '')
  const [enDescription, setEnDescription] = useState(initialData?.en?.description || '')

  // 5. English Metrics, Highlights, Story & Facts
  const [enMetrics, setEnMetrics] = useState<Array<{ value: string; label: string; icon: string }>>(() => {
    const p = parseJsonField(initialData?.en?.metrics, null)
    return Array.isArray(p) && p.length > 0 ? p : defaultEnMetrics
  })
  const [enHighlightsTitle, setEnHighlightsTitle] = useState(initialData?.en?.highlightsTitle || 'Project Highlights')
  const [enHighlightsCtaText, setEnHighlightsCtaText] = useState(initialData?.en?.highlightsCtaText || 'Contact Us')
  const [enHighlights, setEnHighlights] = useState<Array<{ title: string; description: string; icon: string }>>(() => {
    const p = parseJsonField(initialData?.en?.highlights, null)
    return Array.isArray(p) && p.length > 0 ? p : defaultEnHighlights
  })
  const [enOverviewEyebrow, setEnOverviewEyebrow] = useState(initialData?.en?.overviewEyebrow || 'Project Overview')
  const [enOverviewHeading, setEnOverviewHeading] = useState(initialData?.en?.overviewHeading || 'Redefining Public Space for Communities')
  const [enOverviewDescription, setEnOverviewDescription] = useState(
    initialData?.en?.overviewDescription ||
    'An urban revitalization benchmark uniting ecology, human scale, and microclimate engineering into a restorative civic landscape.'
  )
  const [enFacts, setEnFacts] = useState<Array<{ label: string; value: string; icon: string }>>(() => {
    const p = parseJsonField(initialData?.en?.facts, null)
    return Array.isArray(p) && p.length > 0 ? p : defaultEnFacts
  })

  // 6. Media
  const [galleryImages, setGalleryImages] = useState<string[]>(() => {
    const raw = initialData?.ar?.galleryImages || initialData?.en?.galleryImages
    if (Array.isArray(raw)) return raw
    if (typeof raw === 'string') {
      try {
        const parsed = JSON.parse(raw)
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return raw.split('\n').map((s: string) => s.trim()).filter(Boolean)
      }
    }
    return []
  })
  const [masterplanImage, setMasterplanImage] = useState(
    initialData?.ar?.masterplanImage || initialData?.en?.masterplanImage || ''
  )

  // Handlers for dynamic list items
  const updateMetric = (
    lang: 'ar' | 'en',
    idx: number,
    field: 'value' | 'label' | 'icon',
    val: string
  ) => {
    if (lang === 'ar') {
      const updated = [...arMetrics]
      updated[idx] = { ...updated[idx], [field]: val }
      setArMetrics(updated)
    } else {
      const updated = [...enMetrics]
      updated[idx] = { ...updated[idx], [field]: val }
      setEnMetrics(updated)
    }
  }

  const updateHighlight = (
    lang: 'ar' | 'en',
    idx: number,
    field: 'title' | 'description' | 'icon',
    val: string
  ) => {
    if (lang === 'ar') {
      const updated = [...arHighlights]
      updated[idx] = { ...updated[idx], [field]: val }
      setArHighlights(updated)
    } else {
      const updated = [...enHighlights]
      updated[idx] = { ...updated[idx], [field]: val }
      setEnHighlights(updated)
    }
  }

  const updateFact = (
    lang: 'ar' | 'en',
    idx: number,
    field: 'label' | 'value' | 'icon',
    val: string
  ) => {
    if (lang === 'ar') {
      const updated = [...arFacts]
      updated[idx] = { ...updated[idx], [field]: val }
      setArFacts(updated)
    } else {
      const updated = [...enFacts]
      updated[idx] = { ...updated[idx], [field]: val }
      setEnFacts(updated)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!slug.trim()) {
      setError('Please provide a project slug.')
      return
    }
    if (!arTitle.trim() || !enTitle.trim()) {
      setError('Both Arabic and English titles are required.')
      return
    }

    const payload: ProjectInput = {
      slug: slug.trim().toLowerCase(),
      category,
      cityKey,
      statusKey,
      heroImage: heroImage.trim(),
      order: Number(order) || 0,
      isFeatured,
      ar: {
        title: arTitle.trim(),
        breadcrumbTitle: arBreadcrumb.trim() || arTitle.trim(),
        categoryBadge: arCategoryBadge.trim() || category,
        heroCaption: arHeroCaption.trim(),
        summary: arSummary.trim(),
        description: arDescription.trim(),
        metrics: arMetrics,
        highlightsTitle: arHighlightsTitle.trim(),
        highlightsCtaText: arHighlightsCtaText.trim(),
        highlights: arHighlights,
        overviewEyebrow: arOverviewEyebrow.trim(),
        overviewHeading: arOverviewHeading.trim(),
        overviewDescription: arOverviewDescription.trim(),
        facts: arFacts,
        galleryImages,
        masterplanImage,
      },
      en: {
        title: enTitle.trim(),
        breadcrumbTitle: enBreadcrumb.trim() || enTitle.trim(),
        categoryBadge: enCategoryBadge.trim() || category,
        heroCaption: enHeroCaption.trim(),
        summary: enSummary.trim(),
        description: enDescription.trim(),
        metrics: enMetrics,
        highlightsTitle: enHighlightsTitle.trim(),
        highlightsCtaText: enHighlightsCtaText.trim(),
        highlights: enHighlights,
        overviewEyebrow: enOverviewEyebrow.trim(),
        overviewHeading: enOverviewHeading.trim(),
        overviewDescription: enOverviewDescription.trim(),
        facts: enFacts,
        galleryImages,
        masterplanImage,
      },
    }

    startTransition(async () => {
      let res
      if (isEditing && projectId) {
        res = await updateProjectAction(projectId, payload)
      } else {
        res = await createProjectAction(payload)
      }

      if (res.success) {
        router.push(`/${locale}/admin/projects`)
        router.refresh()
      } else {
        setError(res.error || 'Failed to save project.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#EAE4D8]/80">
        <div>
          <h1 className="font-alexandria text-2xl font-semibold text-[#082621]">
            {isEditing ? t('editProject') : t('createProject')}
          </h1>
          <p className="mt-1 text-sm text-[#6F746F]">
            {slug ? `/${slug}` : t('slugHint')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl border border-[#DBC9AD] text-[#10201D] hover:bg-zinc-50 text-sm font-medium transition-colors"
          >
            {t('cancel')}
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#082621] text-white hover:bg-[#C29959] text-sm font-medium transition-all shadow-sm cursor-pointer disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            <span>{isPending ? t('saving') : t('save')}</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid: Left Settings & Media, Right Bilingual Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Metadata & Settings */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] space-y-4">
            <h3 className="font-alexandria font-semibold text-base text-[#082621] flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#C29959]" />
              <span>Project Configuration</span>
            </h3>

            {/* Slug */}
            <div>
              <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                {t('slug')} *
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="e.g. king-khalid"
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
              />
              <span className="text-[11px] text-[#6F746F] mt-1 block">
                {t('slugHint')}
              </span>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                {t('category')}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
              >
                <option value="residential">Residential (سكني)</option>
                <option value="publicSpaces">Public Spaces (مساحات عامة)</option>
                <option value="mixedUse">Mixed-Use (متعدد الاستخدام)</option>
                <option value="hospitality">Hospitality (ضيافة وفندقة)</option>
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                {t('city')}
              </label>
              <select
                value={cityKey}
                onChange={(e) => setCityKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
              >
                <option value="riyadh">Riyadh (الرياض)</option>
                <option value="khobar">Khobar (الخبر)</option>
                <option value="jeddah">Jeddah (جدة)</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                {t('status')}
              </label>
              <select
                value={statusKey}
                onChange={(e) => setStatusKey(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
              >
                <option value="completed">Completed (مكتمل)</option>
                <option value="inProgress">In Progress (قيد التنفيذ)</option>
              </select>
            </div>

            {/* Order & Featured */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                  {t('order')}
                </label>
                <input
                  type="number"
                  value={order}
                  onChange={(e) => setOrder(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  checked={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#C29959] rounded border-zinc-300 focus:ring-[#C29959]"
                />
                <label htmlFor="featured" className="text-xs font-medium text-[#10201D] cursor-pointer">
                  {t('featured')}
                </label>
              </div>
            </div>
          </div>

          {/* Media Links & Uploads */}
          <div className="bg-white p-6 rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] space-y-6">
            <h3 className="font-alexandria font-semibold text-base text-[#082621] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#C29959]" />
              <span>Photography & Assets</span>
            </h3>

            {/* Hero Image */}
            <ImageUpload
              label={`${t('heroImage')} *`}
              value={heroImage}
              onChange={setHeroImage}
              type="hero"
              aspectRatio="landscape"
              hint="Optimized with Sharp to 1920px WebP, 80% quality"
            />

            {/* Masterplan Image */}
            <ImageUpload
              label={t('masterplanImage')}
              value={masterplanImage}
              onChange={setMasterplanImage}
              type="general"
              aspectRatio="landscape"
              hint="Optional masterplan / site layout diagram"
            />

            {/* Gallery Images */}
            <GalleryUpload
              images={galleryImages}
              onChange={setGalleryImages}
            />
          </div>
        </div>

        {/* Right Column: Bilingual Content Tabs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] overflow-hidden">
            {/* Tabs Header */}
            <div className="flex border-b border-[#EAE4D8]/80 bg-[#FAF8F5]/60">
              <button
                type="button"
                onClick={() => setActiveTab('ar')}
                className={`flex-1 py-3.5 px-6 font-cairo text-sm font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === 'ar'
                    ? 'border-[#C29959] text-[#082621] bg-white'
                    : 'border-transparent text-[#6F746F] hover:text-[#082621]'
                }`}
              >
                <span>🇸🇦 {t('arabicTab')}</span>
                {arTitle && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`flex-1 py-3.5 px-6 font-cairo text-sm font-semibold transition-all border-b-2 flex items-center justify-center gap-2 ${
                  activeTab === 'en'
                    ? 'border-[#C29959] text-[#082621] bg-white'
                    : 'border-transparent text-[#6F746F] hover:text-[#082621]'
                }`}
              >
                <span>🇬🇧 {t('englishTab')}</span>
                {enTitle && <Check className="w-3.5 h-3.5 text-emerald-600" />}
              </button>
            </div>

            {/* Arabic Tab Content */}
            <div className={`p-6 space-y-7 ${activeTab === 'ar' ? 'block' : 'hidden'}`} dir="rtl">
              {/* Section 1: Basic Info */}
              <div className="space-y-4">
                <h4 className="font-alexandria font-semibold text-sm text-[#082621] pb-2 border-b border-[#EAE4D8]">
                  المعلومات الأساسية للمشروع
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    عنوان المشروع بالعربية *
                  </label>
                  <input
                    type="text"
                    value={arTitle}
                    onChange={(e) => setArTitle(e.target.value)}
                    placeholder="مثال: ربوة الرمز"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                      عنوان المسار (Breadcrumb)
                    </label>
                    <input
                      type="text"
                      value={arBreadcrumb}
                      onChange={(e) => setArBreadcrumb(e.target.value)}
                      placeholder="مثال: ربوة الرمز"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                      شارة التصنيف بالعربية
                    </label>
                    <input
                      type="text"
                      value={arCategoryBadge}
                      onChange={(e) => setArCategoryBadge(e.target.value)}
                      placeholder="مثال: مجتمع سكني متكامل"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    النص التوضيحي للغلاف (Hero Caption)
                  </label>
                  <input
                    type="text"
                    value={arHeroCaption}
                    onChange={(e) => setArHeroCaption(e.target.value)}
                    placeholder="مثال: ربوة الرمز — رؤية للمكان"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    ملخص المشروع بالعربية (Summary)
                  </label>
                  <textarea
                    rows={2}
                    value={arSummary}
                    onChange={(e) => setArSummary(e.target.value)}
                    placeholder="نبذة موجزة تظهر في بطاقات المعرض وشبكة المشاريع..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    الوصف التفصيلي للمشروع (Full Description)
                  </label>
                  <textarea
                    rows={4}
                    value={arDescription}
                    onChange={(e) => setArDescription(e.target.value)}
                    placeholder="الوصف الكامل الذي يظهر في صفحة تفاصيل المشروع..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>
              </div>

              {/* Section 2: Key Metrics Bar (4 Stats) */}
              <div className="pt-6 border-t border-[#EAE4D8]/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-alexandria font-semibold text-sm text-[#082621] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#C29959]" />
                    <span>الإحصائيات والأرقام الأربعة (Key Metrics)</span>
                  </h4>
                  <span className="text-[11px] text-[#6F746F]">تظهر في شريط الأرقام أعلى الصفحة</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {arMetrics.map((metric, idx) => (
                    <div key={idx} className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#DBC9AD]/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#10201D]">
                        <span>رقم #{idx + 1}</span>
                        <select
                          value={metric.icon}
                          onChange={(e) => updateMetric('ar', idx, 'icon', e.target.value)}
                          className="text-xs bg-white border border-[#DBC9AD]/60 rounded-md px-2 py-1"
                        >
                          <option value="sprout">Sprout / نبات ومجتمع</option>
                          <option value="building">Building / مساحة ومبنى</option>
                          <option value="users">Users / حركة ومشاة</option>
                          <option value="trees">Trees / أشجار وظلال</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-[#6F746F] mb-1">القيمة (مثال: +45%)</label>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) => updateMetric('ar', idx, 'value', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#6F746F] mb-1">الوصف / التسمية</label>
                          <input
                            type="text"
                            value={metric.label}
                            onChange={(e) => updateMetric('ar', idx, 'label', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Highlights Card (4 Items) */}
              <div className="pt-6 border-t border-[#EAE4D8]/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-alexandria font-semibold text-sm text-[#082621] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C29959]" />
                    <span>أبرز معالم المشروع (Project Highlights)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">عنوان بطاقة المعالم</label>
                    <input
                      type="text"
                      value={arHighlightsTitle}
                      onChange={(e) => setArHighlightsTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">نص زر التواصل (CTA)</label>
                    <input
                      type="text"
                      value={arHighlightsCtaText}
                      onChange={(e) => setArHighlightsCtaText(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {arHighlights.map((hl, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DBC9AD]/60 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <select
                          value={hl.icon}
                          onChange={(e) => updateHighlight('ar', idx, 'icon', e.target.value)}
                          className="w-full text-xs bg-white border border-[#DBC9AD]/60 rounded-lg px-2 py-1.5"
                        >
                          <option value="community">Community / مجتمع</option>
                          <option value="nature">Nature / بيئة وطبيعة</option>
                          <option value="services">Services / خدمات ومسارات</option>
                          <option value="location">Location / موقع ومحور</option>
                        </select>
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={hl.title}
                          onChange={(e) => updateHighlight('ar', idx, 'title', e.target.value)}
                          placeholder="عنوان الميزة"
                          className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={hl.description}
                          onChange={(e) => updateHighlight('ar', idx, 'description', e.target.value)}
                          placeholder="وصف تفصيلي للميزة"
                          className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Story Overview & 6 Facts */}
              <div className="pt-6 border-t border-[#EAE4D8]/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-alexandria font-semibold text-sm text-[#082621] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C29959]" />
                    <span>القصة المعمارية والمواصفات الستة (Overview & Facts)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">السطر التمهيدي (Eyebrow)</label>
                    <input
                      type="text"
                      value={arOverviewEyebrow}
                      onChange={(e) => setArOverviewEyebrow(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">العنوان الرئيسي للقصة (Heading)</label>
                    <input
                      type="text"
                      value={arOverviewHeading}
                      onChange={(e) => setArOverviewHeading(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] mb-1.5">الوصف السردي للقصة (Overview Narrative)</label>
                  <textarea
                    rows={3}
                    value={arOverviewDescription}
                    onChange={(e) => setArOverviewDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] mb-2">المواصفات والبيانات الستة (Facts Grid)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {arFacts.map((fact, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DBC9AD]/60 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#6F746F]">
                          <input
                            type="text"
                            value={fact.label}
                            onChange={(e) => updateFact('ar', idx, 'label', e.target.value)}
                            className="w-3/4 font-semibold text-[#10201D] bg-transparent border-b border-[#DBC9AD]/40 focus:outline-none"
                          />
                          <span className="text-[10px] text-zinc-400">#{idx + 1}</span>
                        </div>
                        <input
                          type="text"
                          value={fact.value}
                          onChange={(e) => updateFact('ar', idx, 'value', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-[#DBC9AD]/60 rounded-md text-xs font-medium"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* English Tab Content */}
            <div className={`p-6 space-y-7 ${activeTab === 'en' ? 'block' : 'hidden'}`} dir="ltr">
              {/* Section 1: Basic Info */}
              <div className="space-y-4">
                <h4 className="font-alexandria font-semibold text-sm text-[#082621] pb-2 border-b border-[#EAE4D8]">
                  Basic Project Information
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    Project Title (English) *
                  </label>
                  <input
                    type="text"
                    value={enTitle}
                    onChange={(e) => setEnTitle(e.target.value)}
                    placeholder="e.g. Rabwat Al Ramez"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                      Breadcrumb Title
                    </label>
                    <input
                      type="text"
                      value={enBreadcrumb}
                      onChange={(e) => setEnBreadcrumb(e.target.value)}
                      placeholder="e.g. Rabwat Al Ramez"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                      Category Badge Label
                    </label>
                    <input
                      type="text"
                      value={enCategoryBadge}
                      onChange={(e) => setEnCategoryBadge(e.target.value)}
                      placeholder="e.g. Integrated Residential Community"
                      className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    Hero Caption
                  </label>
                  <input
                    type="text"
                    value={enHeroCaption}
                    onChange={(e) => setEnHeroCaption(e.target.value)}
                    placeholder="e.g. Rabwat Al Ramez — A Vision for Place"
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    Short Summary
                  </label>
                  <textarea
                    rows={2}
                    value={enSummary}
                    onChange={(e) => setEnSummary(e.target.value)}
                    placeholder="Short summary displayed on project cards and catalogue..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                    Full Project Description
                  </label>
                  <textarea
                    rows={4}
                    value={enDescription}
                    onChange={(e) => setEnDescription(e.target.value)}
                    placeholder="In-depth narrative of the project displayed on details page..."
                    className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                  />
                </div>
              </div>

              {/* Section 2: Key Metrics Bar (4 Stats) */}
              <div className="pt-6 border-t border-[#EAE4D8]/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-alexandria font-semibold text-sm text-[#082621] flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#C29959]" />
                    <span>Key Metrics (4 Stats)</span>
                  </h4>
                  <span className="text-[11px] text-[#6F746F]">Displayed in the metrics bar</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {enMetrics.map((metric, idx) => (
                    <div key={idx} className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#DBC9AD]/60 space-y-2">
                      <div className="flex items-center justify-between text-xs font-semibold text-[#10201D]">
                        <span>Metric #{idx + 1}</span>
                        <select
                          value={metric.icon}
                          onChange={(e) => updateMetric('en', idx, 'icon', e.target.value)}
                          className="text-xs bg-white border border-[#DBC9AD]/60 rounded-md px-2 py-1"
                        >
                          <option value="sprout">Sprout / Plant</option>
                          <option value="building">Building / Area</option>
                          <option value="users">Users / Flow</option>
                          <option value="trees">Trees / Shade</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-[#6F746F] mb-1">Value (e.g. +45%)</label>
                          <input
                            type="text"
                            value={metric.value}
                            onChange={(e) => updateMetric('en', idx, 'value', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-[#6F746F] mb-1">Label</label>
                          <input
                            type="text"
                            value={metric.label}
                            onChange={(e) => updateMetric('en', idx, 'label', e.target.value)}
                            className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 3: Highlights Card (4 Items) */}
              <div className="pt-6 border-t border-[#EAE4D8]/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-alexandria font-semibold text-sm text-[#082621] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#C29959]" />
                    <span>Project Highlights (4 Key Items)</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">Card Title</label>
                    <input
                      type="text"
                      value={enHighlightsTitle}
                      onChange={(e) => setEnHighlightsTitle(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">CTA Button Text</label>
                    <input
                      type="text"
                      value={enHighlightsCtaText}
                      onChange={(e) => setEnHighlightsCtaText(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {enHighlights.map((hl, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DBC9AD]/60 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <select
                          value={hl.icon}
                          onChange={(e) => updateHighlight('en', idx, 'icon', e.target.value)}
                          className="w-full text-xs bg-white border border-[#DBC9AD]/60 rounded-lg px-2 py-1.5"
                        >
                          <option value="community">Community</option>
                          <option value="nature">Nature</option>
                          <option value="services">Services</option>
                          <option value="location">Location</option>
                        </select>
                      </div>
                      <div className="sm:col-span-4">
                        <input
                          type="text"
                          value={hl.title}
                          onChange={(e) => updateHighlight('en', idx, 'title', e.target.value)}
                          placeholder="Feature title"
                          className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                        />
                      </div>
                      <div className="sm:col-span-5">
                        <input
                          type="text"
                          value={hl.description}
                          onChange={(e) => updateHighlight('en', idx, 'description', e.target.value)}
                          placeholder="Feature description"
                          className="w-full px-2.5 py-1.5 bg-white border border-[#DBC9AD]/60 rounded-lg text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: Story Overview & 6 Facts */}
              <div className="pt-6 border-t border-[#EAE4D8]/80 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-alexandria font-semibold text-sm text-[#082621] flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#C29959]" />
                    <span>Project Story & 6 Key Facts</span>
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">Section Eyebrow</label>
                    <input
                      type="text"
                      value={enOverviewEyebrow}
                      onChange={(e) => setEnOverviewEyebrow(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#10201D] mb-1.5">Story Heading</label>
                    <input
                      type="text"
                      value={enOverviewHeading}
                      onChange={(e) => setEnOverviewHeading(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] mb-1.5">Detailed Narrative Story</label>
                  <textarea
                    rows={3}
                    value={enOverviewDescription}
                    onChange={(e) => setEnOverviewDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#10201D] mb-2">Key Specifications (6 Facts Grid)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {enFacts.map((fact, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF8F5] rounded-xl border border-[#DBC9AD]/60 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] text-[#6F746F]">
                          <input
                            type="text"
                            value={fact.label}
                            onChange={(e) => updateFact('en', idx, 'label', e.target.value)}
                            className="w-3/4 font-semibold text-[#10201D] bg-transparent border-b border-[#DBC9AD]/40 focus:outline-none"
                          />
                          <span className="text-[10px] text-zinc-400">#{idx + 1}</span>
                        </div>
                        <input
                          type="text"
                          value={fact.value}
                          onChange={(e) => updateFact('en', idx, 'value', e.target.value)}
                          className="w-full px-2 py-1 bg-white border border-[#DBC9AD]/60 rounded-md text-xs font-medium"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
