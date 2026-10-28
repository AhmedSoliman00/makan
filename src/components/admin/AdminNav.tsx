'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  ExternalLink,
  LogOut,
  Globe,
  Menu,
  X,
} from 'lucide-react'
import { logoutAdminAction } from '@/actions/auth'

export default function AdminNav({ locale }: { locale: string }) {
  const t = useTranslations('Admin.nav')
  const pathname = usePathname()
  const isRtl = locale === 'ar'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    {
      href: '/admin',
      label: t('dashboard'),
      icon: LayoutDashboard,
      active: pathname === `/${locale}/admin` || pathname === '/admin',
    },
    {
      href: '/admin/projects',
      label: t('projects'),
      icon: FolderKanban,
      active: pathname.includes('/admin/projects'),
    },
    {
      href: '/admin/team',
      label: t('team'),
      icon: Users,
      active: pathname.includes('/admin/team'),
    },
  ]

  const otherLocale = locale === 'ar' ? 'en' : 'ar'
  const otherLocaleLabel = locale === 'ar' ? 'English' : 'العربية'

  // Replace current locale prefix in path
  const switchPath = pathname.replace(`/${locale}`, `/${otherLocale}`)

  return (
    <header className="sticky top-0 z-50 bg-[#082621] text-white border-b border-[#C29959]/20 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/admin" className="flex items-center gap-2 group">
              <span className="font-alexandria font-semibold text-lg tracking-wider text-white group-hover:text-[#C29959] transition-colors">
                MAKAN
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#C29959] border border-[#C29959]/40 px-1.5 py-0.5 rounded">
                ADMIN
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                      item.active
                        ? 'bg-[#10201D] text-[#C29959] border border-[#C29959]/30'
                        : 'text-zinc-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <a
              href={switchPath}
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#C29959] px-2.5 py-1.5 rounded border border-white/10 hover:border-[#C29959]/40 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{otherLocaleLabel}</span>
            </a>

            {/* Live site link */}
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white px-2.5 py-1.5 rounded transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C29959]" />
              <span>{t('liveSite')}</span>
            </Link>

            {/* Logout button */}
            <form action={() => logoutAdminAction(locale)}>
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs bg-red-950/40 text-red-300 hover:bg-red-900/60 hover:text-white px-3 py-1.5 rounded border border-red-800/40 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('logout')}</span>
              </button>
            </form>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#082621] px-4 pt-3 pb-5 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  item.active
                    ? 'bg-[#10201D] text-[#C29959] border border-[#C29959]/30'
                    : 'text-zinc-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <a
              href={switchPath}
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-[#C29959] py-1"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{otherLocaleLabel}</span>
            </a>

            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white py-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#C29959]" />
              <span>{t('liveSite')}</span>
            </Link>

            <form action={() => logoutAdminAction(locale)}>
              <button
                type="submit"
                className="flex items-center gap-1 text-xs text-red-300 hover:text-white py-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t('logout')}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  )
}
