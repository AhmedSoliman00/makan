'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Save, User, AlertCircle } from 'lucide-react'
import { createTeamMemberAction, updateTeamMemberAction, type TeamMemberInput } from '@/actions/team'
import ImageUpload from '@/components/admin/ImageUpload'

type TeamMemberFormProps = {
  locale: string
  initialData?: any
  memberId?: string
}

export default function TeamMemberForm({ locale, initialData, memberId }: TeamMemberFormProps) {
  const t = useTranslations('Admin.team.form')
  const router = useRouter()
  const isEditing = Boolean(memberId)
  const [isPending, startTransition] = useTransition()
  const [activeTab, setActiveTab] = useState<'ar' | 'en'>(locale === 'en' ? 'en' : 'ar')
  const [error, setError] = useState<string | null>(null)

  // Fields
  const [image, setImage] = useState(initialData?.image || '/home/people/team-member.webp')
  const [order, setOrder] = useState(initialData?.order ?? 0)

  // Arabic
  const [arName, setArName] = useState(initialData?.ar?.name || '')
  const [arDescription, setArDescription] = useState(initialData?.ar?.description || '')

  // English
  const [enName, setEnName] = useState(initialData?.en?.name || '')
  const [enDescription, setEnDescription] = useState(initialData?.en?.description || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!arName.trim() || !enName.trim()) {
      setError('Both Arabic and English names are required.')
      return
    }

    const payload: TeamMemberInput = {
      image: image.trim(),
      order: Number(order) || 0,
      ar: {
        name: arName.trim(),
        description: arDescription.trim(),
      },
      en: {
        name: enName.trim(),
        description: enDescription.trim(),
      },
    }

    startTransition(async () => {
      let res
      if (isEditing && memberId) {
        res = await updateTeamMemberAction(memberId, payload)
      } else {
        res = await createTeamMemberAction(payload)
      }

      if (res.success) {
        router.push(`/${locale}/admin/team`)
        router.refresh()
      } else {
        setError(res.error || 'Failed to save team member.')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-[#EAE4D8]/80">
        <div>
          <h1 className="font-alexandria text-2xl font-semibold text-[#082621]">
            {isEditing ? t('editMember') : t('createMember')}
          </h1>
          <p className="mt-1 text-sm text-[#6F746F]">
            {enName || arName || 'New Team Member'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/team"
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

      {/* Form Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Portrait & Order */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] space-y-4">
            <h3 className="font-alexandria font-semibold text-base text-[#082621] flex items-center gap-2">
              <User className="w-4 h-4 text-[#C29959]" />
              <span>Portrait & Position</span>
            </h3>

            {/* Portrait Image Upload */}
            <ImageUpload
              label={t('image')}
              value={image}
              onChange={setImage}
              type="portrait"
              aspectRatio="portrait"
              hint="Portrait photo (auto-optimized & converted to WebP with Sharp)"
            />

            {/* Display Order */}
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
          </div>
        </div>

        {/* Right Column: Bilingual Profiles */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-[#EAE4D8]/80 bg-[#FAF8F5]/60">
              <button
                type="button"
                onClick={() => setActiveTab('ar')}
                className={`flex-1 py-3.5 px-6 font-cairo text-sm font-semibold transition-all border-b-2 ${
                  activeTab === 'ar'
                    ? 'border-[#C29959] text-[#082621] bg-white'
                    : 'border-transparent text-[#6F746F] hover:text-[#082621]'
                }`}
              >
                🇸🇦 {t('arabicTab')}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`flex-1 py-3.5 px-6 font-cairo text-sm font-semibold transition-all border-b-2 ${
                  activeTab === 'en'
                    ? 'border-[#C29959] text-[#082621] bg-white'
                    : 'border-transparent text-[#6F746F] hover:text-[#082621]'
                }`}
              >
                🇬🇧 {t('englishTab')}
              </button>
            </div>

            {/* Arabic Tab */}
            <div className={`p-6 space-y-5 ${activeTab === 'ar' ? 'block' : 'hidden'}`} dir="rtl">
              <div>
                <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                  الاسم الكامل بالعربية *
                </label>
                <input
                  type="text"
                  value={arName}
                  onChange={(e) => setArName(e.target.value)}
                  placeholder="مثال: المهندس محمد عبدالله"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                  السيرة الذاتية والوصف الفردي (Description / Bio)
                </label>
                <textarea
                  rows={5}
                  value={arDescription}
                  onChange={(e) => setArDescription(e.target.value)}
                  placeholder="نبذة عن خبرة العضو، مجالات عمله، وأثره في مشاريع مكان..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                />
              </div>
            </div>

            {/* English Tab */}
            <div className={`p-6 space-y-5 ${activeTab === 'en' ? 'block' : 'hidden'}`} dir="ltr">
              <div>
                <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                  Full Name (English) *
                </label>
                <input
                  type="text"
                  value={enName}
                  onChange={(e) => setEnName(e.target.value)}
                  placeholder="e.g. Eng. Mohammed Abdullah"
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-1.5">
                  Personal Bio & Description
                </label>
                <textarea
                  rows={5}
                  value={enDescription}
                  onChange={(e) => setEnDescription(e.target.value)}
                  placeholder="Summary of experience, expertise, and contribution to Makan..."
                  className="w-full px-3.5 py-2.5 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
