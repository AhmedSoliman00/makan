import TeamMemberForm from '@/components/admin/TeamMemberForm'

export default async function NewTeamMemberPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <TeamMemberForm locale={locale} />
}
