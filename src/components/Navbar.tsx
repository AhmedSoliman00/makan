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

  const [isPending, startTransition] = useTransition()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
              : pathname === '/'
                ? 'home'
                : 'home')

  const toggleLanguage = () => {
    const nextLocale = locale === 'ar' ? 'en' : 'ar'
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  // Navigation items matching Figma node 433:5613
  const navItems = [
    { key: 'home', label: t('home'), href: '/' as const },
    { key: 'about', label: t('makan'), href: '/about' as const },
    { key: 'projects', label: t('projects'), href: '/projects' as const },
    { key: 'services', label: t('services'), href: '/services' as const },
    { key: 'team', label: t('team'), href: '/team' as const },
    { key: 'contact', label: t('contact'), href: '/contact' as const },
  ]

  const desktopNav = (langMarginClass: string) => (
    <nav className='hidden md:flex items-center gap-7 font-cairo text-[16px] text-black'>
      {navItems.map((item) => {
        const isActive = resolvedActive === item.key
        return (
          <Link
            key={item.key}
            href={item.href}
            className='group relative inline-flex items-center py-2.5'
          >
            <span className={isActive ? 'font-semibold text-black' : 'font-medium text-black'}>
              {item.label}
            </span>
            <span
              aria-hidden='true'
              className={`pointer-events-none absolute inset-x-0 bottom-1 h-[2px] rounded-full bg-[#DEA348] transition-opacity duration-200 ${
                isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}
            />
          </Link>
        )
      })}

      {/* Language Switcher */}
      <button
        type='button'
        onClick={toggleLanguage}
        disabled={isPending}
        className={`group relative ${langMarginClass} inline-flex items-center py-2.5 font-cairo text-[16px] font-medium text-black cursor-pointer`}
        aria-label='Toggle language'
      >
        <span>{t('langSwitch')}</span>
        <span
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 bottom-1 h-[2px] rounded-full bg-black opacity-0 transition-opacity duration-200 group-hover:opacity-100'
        />
      </button>
    </nav>
  )

  if (isSolid) {
    return (
      <header className='relative z-50 w-full border-b border-[#E4DFD7]/60 bg-white'>
        <div className='mx-auto flex h-24 max-w-7xl items-center justify-between px-6 lg:px-12'>
          {/* Brand Logo */}
          <Link href='/' className='flex items-center' aria-label='Makan Landscape'>
            <Image
              src='/home/svg/makan-header-logo.png'
              alt='مكان | Makan Landscape'
              width={140}
              height={54}
              priority
              className='h-12 md:h-[52px] w-auto object-contain transition-opacity hover:opacity-90'
            />
          </Link>

          {/* Desktop Navigation */}
          {desktopNav('ms-2')}

          {/* Mobile Buttons */}
          <div className='flex md:hidden items-center gap-3'>
            <button
              type='button'
              onClick={toggleLanguage}
              disabled={isPending}
              className='text-xs font-semibold text-black px-2.5 py-1 border border-black/20 rounded-none font-cairo'
            >
              {t('langSwitch')}
            </button>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 text-black'
              aria-label='Toggle mobile menu'
            >
              {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className='md:hidden bg-white/95 backdrop-blur-md border-b border-[#E4DFD7] px-6 py-6 shadow-xl'>
            <nav className='flex flex-col gap-4 font-cairo text-base font-medium text-black'>
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`py-2 border-b border-zinc-100 flex items-center justify-between ${
                    resolvedActive === item.key ? 'text-[#DEA348] font-semibold' : ''
                  }`}
                >
                  <span>{item.label}</span>
                  {resolvedActive === item.key && (
                    <span className='h-1.5 w-1.5 rounded-full bg-[#DEA348]' />
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    )
  }

  // Floating Header / Liquid Glass Component (433:5613) with exact Figma values
  return (
    <header className='w-full max-w-[1312px] animate-navbar-entrance pointer-events-auto'>
      {/* Liquid Glass Pill Bar: exact Figma styling & Tailwind equivalent */}
      <div
        className='navbar-glass w-full h-[72px] md:h-[96px] rounded-2xl border border-white/20 bg-white/[0.16] px-8 py-4 backdrop-blur-[8px] shadow-[0_12px_16px_rgba(0,0,0,0.1)] flex items-center justify-between'
      >
        {/* Brand Logo - 140px width */}
        <Link
          href='/'
          className='flex items-center select-none group'
          aria-label='Makan Landscape'
        >
          <Image
            src='/home/svg/makan-header-logo.png'
            alt='مكان | Makan Landscape'
            width={140}
            height={54}
            priority
            className='h-10 md:h-[54px] w-auto object-contain transition-opacity duration-300 group-hover:opacity-85'
          />
        </Link>

        {/* Desktop Navigation Links matching Figma 433:5615 */}
        {desktopNav('ms-1')}

        {/* Mobile Hamburger Controls */}
        <div className='flex md:hidden items-center gap-2'>
          <button
            type='button'
            onClick={toggleLanguage}
            disabled={isPending}
            className='text-xs font-semibold text-black px-2.5 py-1 border border-black/20 rounded-none font-cairo bg-white/40'
          >
            {t('langSwitch')}
          </button>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 text-black rounded-none hover:bg-white/40 transition-colors'
            aria-label='Toggle mobile menu'
          >
            {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className='pointer-events-auto mt-3 w-full max-w-[1312px] rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl p-6 transition-all duration-300'>
          <nav className='flex flex-col gap-3 font-cairo text-base font-medium text-black'>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg border-b border-zinc-100/80 flex items-center justify-between transition-colors ${
                  resolvedActive === item.key
                    ? 'text-[#DEA348] font-semibold bg-amber-50/50'
                    : 'hover:bg-zinc-50'
                }`}
              >
                <span>{item.label}</span>
                {resolvedActive === item.key && (
                  <span className='h-2 w-2 rounded-full bg-[#DEA348]' />
                )}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
