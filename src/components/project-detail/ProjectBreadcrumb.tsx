import { Link } from '@/i18n/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ProjectBreadcrumbProps = {
  breadcrumbTitle: string
  locale: string
}

export default function ProjectBreadcrumb({
  breadcrumbTitle,
  locale,
}: ProjectBreadcrumbProps) {
  const isRtl = locale === 'ar'

  return (
    <div className='mx-auto w-full max-w-[1440px] px-4 pt-6 pb-4 sm:px-6 lg:px-[86px]'>
      <nav
        aria-label='Breadcrumb'
        className='flex items-center gap-2 font-cairo text-sm text-[#6F746F]'
      >
        <Link
          href='/projects'
          className='transition-colors hover:text-[#C29959] focus:outline-none focus-visible:underline'
        >
          {isRtl ? 'المشاريع' : 'Projects'}
        </Link>
        {isRtl ? (
          <ChevronLeft className='h-4 w-4 text-[#A8A49C]' />
        ) : (
          <ChevronRight className='h-4 w-4 text-[#A8A49C]' />
        )}
        <span className='font-medium text-[#10201D]'>{breadcrumbTitle}</span>
      </nav>
    </div>
  )
}
