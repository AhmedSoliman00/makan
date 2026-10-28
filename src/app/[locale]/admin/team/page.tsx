import { Link } from '@/i18n/navigation'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/prisma'
import { Plus, Edit3 } from 'lucide-react'
import TeamDeleteButton from '@/components/admin/TeamDeleteButton'

export default async function AdminTeamPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'Admin.team' })
  const isRtl = locale === 'ar'

  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
    include: { translations: true },
  })

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
          href="/admin/team/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#082621] text-white hover:bg-[#C29959] text-sm font-medium transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t('addNew')}</span>
        </Link>
      </div>

      {/* Team Members Table / Cards */}
      <div className="bg-white rounded-2xl border border-[#EAE4D8]/80 shadow-[0_4px_20px_rgba(8,38,33,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start text-sm">
            <thead className="bg-[#FAF8F5] text-xs uppercase text-[#6F746F] border-b border-[#EAE4D8]/60">
              <tr>
                <th className="px-6 py-4 font-semibold text-start">{t('table.avatar')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.name')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.description')}</th>
                <th className="px-6 py-4 font-semibold text-start">{t('table.order')}</th>
                <th className="px-6 py-4 font-semibold text-end">{t('table.actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D8]/60">
              {members.map((m) => {
                const ar = m.translations.find((t) => t.locale === 'ar')
                const en = m.translations.find((t) => t.locale === 'en')
                const active = isRtl ? ar : en
                const other = isRtl ? en : ar

                return (
                  <tr key={m.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                    {/* Portrait */}
                    <td className="px-6 py-4">
                      <div className="w-12 h-14 rounded-lg bg-zinc-100 overflow-hidden relative border border-[#EAE4D8]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={m.image || '/home/people/team-member.webp'}
                          alt={active?.name || 'Member'}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-[#082621]">
                          {active?.name}
                        </span>
                        {other?.name && (
                          <span className="text-xs text-[#6F746F] mt-0.5">
                            {other.name}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Description excerpt */}
                    <td className="px-6 py-4 text-xs text-[#6F746F] max-w-sm truncate">
                      {active?.description || other?.description || '—'}
                    </td>

                    {/* Order */}
                    <td className="px-6 py-4 text-xs text-[#6F746F]">
                      {m.order}
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 text-end">
                      <div className="flex items-center justify-end gap-1.5">
                        <Link
                          href={`/admin/team/${m.id}/edit`}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-[#C29959] hover:bg-[#C29959]/10 transition-colors"
                          title="Edit Member"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Link>

                        <TeamDeleteButton
                          id={m.id}
                          name={active?.name || 'Member'}
                          confirmMessage={t('form.deleteConfirm')}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}

              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-[#6F746F]">
                    No team members found. Click "Add Team Member" to create one.
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
