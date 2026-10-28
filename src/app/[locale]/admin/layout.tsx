import { Suspense } from 'react'
import { getAdminSession } from '@/lib/auth'
import AdminNav from '@/components/admin/AdminNav'

async function AdminNavWrapper({ locale }: { locale: string }) {
  const session = await getAdminSession()
  if (!session) return null
  return <AdminNav locale={locale} />
}

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col font-cairo text-[#10201D]">
      <Suspense fallback={null}>
        <AdminNavWrapper locale={locale} />
      </Suspense>
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        {children}
      </main>
    </div>
  )
}
