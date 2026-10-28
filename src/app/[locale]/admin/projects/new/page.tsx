import ProjectForm from '@/components/admin/ProjectForm'

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return <ProjectForm locale={locale} />
}
