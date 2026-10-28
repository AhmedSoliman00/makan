import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  Plus,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'

export default async function AdminOverviewPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Admin.overview' })
  const isRtl = locale === 'ar'

  // Fetch counts
  const [
    totalProjects,
    completedProjects,
    inProgressProjects,
    totalTeamMembers,
    recentProjects,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { statusKey: 'completed' } }),
    prisma.project.count({ where: { statusKey: 'inProgress' } }),
    prisma.teamMember.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { order: 'asc' },
      include: { translations: true },
    }),
  ])

  const stats = [
    {
      label: t('totalProjects'),
      value: totalProjects,
      icon: FolderKanban,
      color: 'text-[#C29959]',
      bg: 'bg-[#C29959]/10',
    },
    {
      label: t('completedProjects'),
      value: completedProjects,
      icon: CheckCircle2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
    },
    {
      label: t('inProgressProjects'),
      value: inProgressProjects,
      icon: Clock,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
    },
    {
      label: t('teamMembers'),
      value: totalTeamMembers,
      icon: Users,
      color: 'text-[#082621]',
      bg: 'bg-[#082621]/10',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-alexandria text-2xl sm:text-3xl font-semibold text-[#082621]">
            {t('title')}
          </h1>
          <p className="mt-1 text-sm text-[#6F746F]">
            {t('subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#082621] text-white hover:bg-[#C29959] text-xs sm:text-sm font-medium transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>{t('addNewProject')}</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] flex items-center justify-between"
            >
              <div>
                <p className="text-xs font-medium text-[#6F746F] uppercase tracking-wider">
                  {s.label}
                </p>
                <p className="mt-2 text-3xl font-semibold font-alexandria text-[#082621]">
                  {s.value}
                </p>
              </div>
              <div className={`p-3.5 rounded-xl ${s.bg} ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Projects Table */}
      <div className="bg-white rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] overflow-hidden">
        <div className="p-6 border-b border-[#EAE4D8]/60 flex items-center justify-between">
          <h2 className="font-alexandria text-lg font-semibold text-[#082621]">
            {t('recentProjects')}
          </h2>
          <Link
            href="/admin/projects"
            className="text-xs font-semibold text-[#C29959] hover:underline flex items-center gap-1"
          >
            <span>{t('viewAll')}</span>
            {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-[#FAF8F5] text-xs uppercase text-[#6F746F] border-b border-[#EAE4D8]/60">
              <tr>
                <th className="px-6 py-3.5 font-semibold text-start">Slug</th>
                <th className="px-6 py-3.5 font-semibold text-start">Title</th>
                <th className="px-6 py-3.5 font-semibold text-start">Category</th>
                <th className="px-6 py-3.5 font-semibold text-start">City</th>
                <th className="px-6 py-3.5 font-semibold text-start">Status</th>
                <th className="px-6 py-3.5 font-semibold text-end">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D8]/60">
              {recentProjects.map((p) => {
                const trans =
                  p.translations.find((t) => t.locale === locale) ||
                  p.translations[0]
                const title = trans?.title || p.slug
                return (
                  <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-[#082621]">
                      {p.slug}
                    </td>
                    <td className="px-6 py-4 font-medium text-[#082621]">
                      {title}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      <span className="px-2.5 py-1 rounded-full bg-[#C29959]/10 text-[#C29959] font-medium">
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs capitalize text-[#6F746F]">
                      {p.cityKey}
                    </td>
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
                    <td className="px-6 py-4 text-end">
                      <Link
                        href={`/admin/projects/${p.id}/edit`}
                        className="text-xs font-semibold text-[#082621] hover:text-[#C29959] transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
