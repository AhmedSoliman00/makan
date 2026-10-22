'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { Menu, X } from 'lucide-react'

type NavbarProps = {
  variant?: 'overlay' | 'solid'
  activePath?: 'home' | 'projects' | 'team'
}

export default function Navbar({
  variant = 'overlay',
  activePath,
}: NavbarProps) {
  const t = useTranslations('Navigation')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const isSolid = variant === 'solid'
  const resolvedActive =
    activePath ??
    (pathname.startsWith('/projects')
      ? 'projects'
      : pathname.startsWith('/team') || pathname.startsWith('/people')
        ? 'team'
        : 'home')

  const navLinkClass = (key: 'home' | 'projects' | 'team' | 'default') =>
    `transition-colors hover:text-[#C29959] ${
      (key === 'home' && resolvedActive === 'home' && pathname === '/') ||
      (key === 'projects' && resolvedActive === 'projects') ||
      (key === 'team' && resolvedActive === 'team')
        ? 'text-[#C29959]'
        : ''
    }`
  const [isPending, startTransition] = useTransition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar'
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <header
      className={`z-50 w-full transition-all duration-300 ${
        isSolid
          ? 'relative border-b border-[#E4DFD7]/60 bg-[#ffffff]'
          : 'absolute top-0 start-0 end-0'
      }`}
    >
      <div className='mx-auto flex h-25 max-w-7xl items-center justify-between px-6 lg:px-12'>
        {/* Brand Logo */}
        <Link
          href='/'
          className='flex items-center'
          aria-label='Makan Landscape'
        >
          <Image
            src='/home/svg/makan-header-logo.png'
            alt='مكان | Makan Landscape'
            width={140}
            height={53}
            priority
            className='h-14 w-auto object-contain transition-opacity hover:opacity-90'
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className='hidden md:flex items-center gap-7 font-cairo text-[16px] font-medium text-[#10201D] dark:text-[#10201D]'>
          <Link href='/' className={navLinkClass('home')}>
            {t('makan')}
          </Link>
          <Link href='/projects' className={navLinkClass('projects')}>
            {t('projects')}
          </Link>
          <a href='/#services' className={navLinkClass('default')}>
            {t('services')}
          </a>
          <Link href='/team' className={navLinkClass('team')}>
            {t('team')}
          </Link>
          <a href='/#contact' className={navLinkClass('default')}>
            {t('contact')}
          </a>

          {/* Language Switcher */}
          <button
            type='button'
            onClick={toggleLanguage}
            disabled={isPending}
            className='ms-3 font-cairo font-semibold text-[15px] text-[#10201D] hover:text-[#C29959] transition-colors cursor-pointer'
            aria-label='Toggle language'
          >
            {t('langSwitch')}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className='flex md:hidden items-center gap-3'>
          <button
            type='button'
            onClick={toggleLanguage}
            disabled={isPending}
            className='text-xs font-bold text-[#10201D] px-2 py-1 border border-[#10201D]/20 rounded-md'
          >
            {t('langSwitch')}
          </button>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 text-[#10201D]'
            aria-label='Toggle mobile menu'
          >
            {mobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className='md:hidden bg-white/95 backdrop-blur-md border-b border-[#E4DFD7] px-6 py-6 shadow-xl'>
          <nav className='flex flex-col gap-4 font-cairo text-base font-semibold text-[#10201D]'>
            <Link
              href='/'
              onClick={() => setMobileMenuOpen(false)}
              className='py-1 border-b border-zinc-100'
            >
              {t('makan')}
            </Link>
            <Link
              href='/projects'
              onClick={() => setMobileMenuOpen(false)}
              className='py-1 border-b border-zinc-100'
            >
              {t('projects')}
            </Link>
            <a
              href='/#services'
              onClick={() => setMobileMenuOpen(false)}
              className='py-1 border-b border-zinc-100'
            >
              {t('services')}
            </a>
            <Link
              href='/team'
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 border-b border-zinc-100 ${
                resolvedActive === 'team' ? 'text-[#C29959]' : ''
              }`}
            >
              {t('team')}
            </Link>
            <a
              href='/#contact'
              onClick={() => setMobileMenuOpen(false)}
              className='py-1 border-b border-zinc-100'
            >
              {t('contact')}
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
