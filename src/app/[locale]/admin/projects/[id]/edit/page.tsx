import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProjectForm from '@/components/admin/ProjectForm'

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params

  const project = await prisma.project.findUnique({
    where: { id },
    include: { translations: true },
  })

  if (!project) {
    notFound()
  }

  const ar = project.translations.find((t) => t.locale === 'ar') || ({} as any)
  const en = project.translations.find((t) => t.locale === 'en') || ({} as any)

  const initialData = {
    ...project,
    ar,
    en,
  }

  return <ProjectForm locale={locale} initialData={initialData} projectId={id} />
}
