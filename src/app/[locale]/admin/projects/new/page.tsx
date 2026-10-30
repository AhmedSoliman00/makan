import { prisma } from '@/lib/prisma'
import ProjectForm from '@/components/admin/ProjectForm'

export default async function NewProjectPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const featuredCount = await prisma.project.count({
    where: { isFeatured: true },
  })

  return <ProjectForm locale={locale} featuredCount={featuredCount} />
}
