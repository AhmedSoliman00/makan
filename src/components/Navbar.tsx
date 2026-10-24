'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import Image from 'next/image'
import { useState, useTransition } from 'react'
import { Menu, X } from 'lucide-react'

type NavbarProps = {
  variant?: 'overlay' | 'solid'
  activePath?: 'home' | 'about' | 'projects' | 'services' | 'team' | 'contact'
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
    (pathname.startsWith('/about')
      ? 'about'
      : pathname.startsWith('/projects')
        ? 'projects'
        : pathname.startsWith('/services')
          ? 'services'
          : pathname.startsWith('/team') || pathname.startsWith('/people')
            ? 'team'
            : pathname.startsWith('/contact')
              ? 'contact'
              : 'home')

  const navLinkClass = (key: 'home' | 'about' | 'projects' | 'services' | 'team' | 'contact' | 'default') =>
    `transition-colors hover:text-[#C29959] ${
      (key === 'home' && resolvedActive === 'home' && pathname === '/') ||
      (key === 'about' && resolvedActive === 'about') ||
      (key === 'projects' && resolvedActive === 'projects') ||
      (key === 'services' && resolvedActive === 'services') ||
      (key === 'team' && resolvedActive === 'team') ||
      (key === 'contact' && resolvedActive === 'contact')
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
          <Link href='/about' className={navLinkClass('about')}>
            {t('makan')}
          </Link>
          <Link href='/projects' className={navLinkClass('projects')}>
            {t('projects')}
          </Link>
          <Link href='/services' className={navLinkClass('services')}>
            {t('services')}
          </Link>
          <Link href='/team' className={navLinkClass('team')}>
            {t('team')}
          </Link>
          <Link href='/contact' className={navLinkClass('contact')}>
            {t('contact')}
          </Link>

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
              href='/about'
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 border-b border-zinc-100 ${
                resolvedActive === 'about' ? 'text-[#C29959]' : ''
              }`}
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
            <Link
              href='/services'
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 border-b border-zinc-100 ${
                resolvedActive === 'services' ? 'text-[#C29959]' : ''
              }`}
            >
              {t('services')}
            </Link>
            <Link
              href='/team'
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 border-b border-zinc-100 ${
                resolvedActive === 'team' ? 'text-[#C29959]' : ''
              }`}
            >
              {t('team')}
            </Link>
            <Link
              href='/contact'
              onClick={() => setMobileMenuOpen(false)}
              className={`py-1 border-b border-zinc-100 ${
                resolvedActive === 'contact' ? 'text-[#C29959]' : ''
              }`}
            >
              {t('contact')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
