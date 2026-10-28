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
    { key: 'about', label: t('makan'), href: '/about' as const },
    { key: 'projects', label: t('projects'), href: '/projects' as const },
    { key: 'services', label: t('services'), href: '/services' as const },
    { key: 'team', label: t('team'), href: '/team' as const },
    { key: 'contact', label: t('contact'), href: '/contact' as const },
  ]

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
          <nav className='hidden md:flex items-center gap-7 font-cairo text-[16px] text-[#10201D]'>
            {navItems.map((item) => {
              const isActive = resolvedActive === item.key
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className='group relative flex flex-col items-center justify-center py-2'
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive
                        ? 'font-medium text-[#10201D]'
                        : 'font-normal text-[#10201D]/90 group-hover:text-[#DEA348]'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`mt-1 h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                      isActive
                        ? 'bg-[#DEA348] opacity-100 scale-x-100'
                        : 'bg-[#DEA348] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
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
              className='group relative ms-2 flex flex-col items-center justify-center py-2 font-cairo text-[16px] font-medium text-[#10201D] transition-colors cursor-pointer'
              aria-label='Toggle language'
            >
              <span className='group-hover:text-[#DEA348] transition-colors duration-300'>
                {t('langSwitch')}
              </span>
              <span className='mt-1 h-[2px] w-full rounded-full bg-[#10201D] opacity-0 scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 origin-center' />
            </button>
          </nav>

          {/* Mobile Buttons */}
          <div className='flex md:hidden items-center gap-3'>
            <button
              type='button'
              onClick={toggleLanguage}
              disabled={isPending}
              className='text-xs font-semibold text-[#10201D] px-2.5 py-1 border border-[#10201D]/20 rounded-md font-cairo'
            >
              {t('langSwitch')}
            </button>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className='p-2 text-[#10201D]'
              aria-label='Toggle mobile menu'
            >
              {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className='md:hidden bg-white/95 backdrop-blur-md border-b border-[#E4DFD7] px-6 py-6 shadow-xl'>
            <nav className='flex flex-col gap-4 font-cairo text-base font-medium text-[#10201D]'>
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
        <nav className='hidden md:flex items-center gap-7 font-cairo text-[16px] text-[#10201D]'>
          {navItems.map((item) => {
            const isActive = resolvedActive === item.key
            return (
              <Link
                key={item.key}
                href={item.href}
                className='group relative flex flex-col items-center justify-center py-2'
              >
                <span
                  className={`transition-colors duration-300 ${
                    isActive
                      ? 'font-medium text-[#10201D]'
                      : 'font-normal text-[#10201D]/90 group-hover:text-[#DEA348]'
                  }`}
                >
                  {item.label}
                </span>

                {/* Underline indicator matching Figma underline rectangle */}
                <span
                  className={`mt-1 h-[2px] w-full rounded-full transition-all duration-300 origin-center ${
                    isActive
                      ? 'bg-[#DEA348] opacity-100 scale-x-100'
                      : 'bg-[#DEA348] opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            )
          })}

          {/* Language Switcher Button matching Figma */}
          <button
            type='button'
            onClick={toggleLanguage}
            disabled={isPending}
            className='group relative ms-1 flex flex-col items-center justify-center py-2 font-cairo text-[16px] font-medium text-[#10201D] transition-colors cursor-pointer'
            aria-label='Toggle language'
          >
            <span className='group-hover:text-[#DEA348] transition-colors duration-300'>
              {t('langSwitch')}
            </span>
            <span className='mt-1 h-[2px] w-full rounded-full bg-[#10201D] opacity-0 scale-x-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-x-100 origin-center' />
          </button>
        </nav>

        {/* Mobile Hamburger Controls */}
        <div className='flex md:hidden items-center gap-2'>
          <button
            type='button'
            onClick={toggleLanguage}
            disabled={isPending}
            className='text-xs font-semibold text-[#10201D] px-2.5 py-1 border border-[#10201D]/20 rounded-md font-cairo bg-white/40'
          >
            {t('langSwitch')}
          </button>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 text-[#10201D] rounded-lg hover:bg-white/40 transition-colors'
            aria-label='Toggle mobile menu'
          >
            {mobileMenuOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className='pointer-events-auto mt-3 w-full max-w-[1312px] rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-xl p-6 transition-all duration-300'>
          <nav className='flex flex-col gap-3 font-cairo text-base font-medium text-[#10201D]'>
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
