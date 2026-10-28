import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import TeamMemberForm from '@/components/admin/TeamMemberForm'

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params

  const member = await prisma.teamMember.findUnique({
    where: { id },
    include: { translations: true },
  })

  if (!member) {
    notFound()
  }

  const ar = member.translations.find((t) => t.locale === 'ar') || ({} as any)
  const en = member.translations.find((t) => t.locale === 'en') || ({} as any)

  const initialData = {
    ...member,
    ar,
    en,
  }

  return <TeamMemberForm locale={locale} initialData={initialData} memberId={id} />
}
