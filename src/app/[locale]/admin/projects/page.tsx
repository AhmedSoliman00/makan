import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Plus, Edit3, ExternalLink, Image as ImageIcon } from 'lucide-react'
import ProjectDeleteButton from '@/components/admin/ProjectDeleteButton'

export default async function AdminProjectsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; query?: string }>
}) {
  const { locale } = await params
  const { category, query } = await searchParams
  const t = await getTranslations({ locale, namespace: 'Admin.projects' })
  const isRtl = locale === 'ar'

  const whereClause: any = {}
  if (category && category !== 'all') {
    whereClause.category = category
  }

  const projects = await prisma.project.findMany({
    where: whereClause,
    orderBy: { order: 'asc' },
    include: { translations: true },
  })

  const filteredProjects = projects.filter((p) => {
    if (!query || !query.trim()) return true
    const q = query.toLowerCase()
    const arTitle = p.translations.find((t) => t.locale === 'ar')?.title || ''
    const enTitle = p.translations.find((t) => t.locale === 'en')?.title || ''
    return (
      p.slug.toLowerCase().includes(q) ||
      arTitle.toLowerCase().includes(q) ||
      enTitle.toLowerCase().includes(q)
    )
  })

  const categories = [
    { id: 'all', label: isRtl ? 'الكل' : 'All' },
    { id: 'residential', label: isRtl ? 'سكني' : 'Residential' },
    { id: 'publicSpaces', label: isRtl ? 'مساحات عامة' : 'Public Spaces' },
    { id: 'mixedUse', label: isRtl ? 'متعدد الاستخدام' : 'Mixed-Use' },
    { id: 'hospitality', label: isRtl ? 'ضيافة' : 'Hospitality' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-alexandria text-2xl font-semibold text-[#082621]">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-[#6F746F]">
            {t('subtitle')}
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#082621] text-white hover:bg-[#C29959] text-sm font-medium transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addNew')}</span>
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {categories.map((cat) => {
          const isActive = (category || 'all') === cat.id
          return (
            <Link
              key={cat.id}
              href={cat.id === 'all' ? '/admin/projects' : `/admin/projects?category=${cat.id}`}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                isActive
                  ? 'bg-[#10201D] text-white'
                  : 'bg-white border border-[#DBC9AD]/60 text-[#10201D] hover:border-[#C29959]'
              }`}
            >
              {cat.label}
            </Link>
          )
        })}
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-[#FAF8F5] text-xs uppercase text-[#6F746F] border-b border-[#EAE4D8]/60">
              <tr>
                <th className="px-6 py-4 font-semibold text-start">{t('table.thumbnail')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.title')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.category')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.city')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.status')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.order')}</th>
                <th className="px-6 py-4 font-semibold text-end">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D8]/60">
              {filteredProjects.map((p) => {
                const ar = p.translations.find((t) => t.locale === 'ar')
                const en = p.translations.find((t) => t.locale === 'en')
                const displayTitle = (isRtl ? ar?.title : en?.title) || p.slug
                const subtitle = isRtl ? en?.title : ar?.title

                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-6 py-4">
                      <div className="w-16 h-12 rounded-lg bg-zinc-100 overflow-hidden relative border border-[#EAE4D8]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.heroImage}
                          alt={displayTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Title */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#082621]">
                          {displayTitle}
                        </span>
                        {subtitle && (
                          <span className="text-xs text-[#6F746F] mt-0.5">
                            {subtitle}
                          </span>
                        )}
                        <span className="font-mono text-[11px] text-[#C29959] mt-0.5">
                          /{p.slug}
                        </span>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-[#C29959]/10 text-[#C29959] font-medium">
                        {p.category}
                      </span>
                    </td>

                    {/* City */}
                    <td className="px-6 py-4 text-xs capitalize text-[#6F746F]">
                      {p.cityKey}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 text-xs">
                      <span
                        className={`px-2.5 py-1 rounded-full font-medium ${
                          p.statusKey === 'completed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-amber-50 text-amber-700'
                        }`}
                      >
                        {p.statusKey}
                      </span>
                    </td>

                    {/* Order */}
                    <td className="px-6 py-4 text-xs text-[#6F746F]">
                      {p.order}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        {/* View on live site */}
                        <Link
                          href={`/projects/${p.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#082621] hover:bg-zinc-100 transition-colors"
                          title="View on site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>

                        {/* Edit */}
                        <Link
                          href={`/admin/projects/${p.id}/edit`}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#C29959] hover:bg-[#C29959]/10 transition-colors"
                          title="Edit Project"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        {/* Delete */}
                        <ProjectDeleteButton
                          id={p.id}
                          title={displayTitle}
                          confirmMessage={t('form.deleteConfirm')}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}

              {filteredProjects.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-[#6F746F]">
                    No projects found for the selected filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
