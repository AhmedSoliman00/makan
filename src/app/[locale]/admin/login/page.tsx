'use client'

import { useActionState } from 'react'
import { useTranslations } from 'next-intl'
import { Lock, Mail, ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react'
import { loginAdminAction } from '@/actions/auth'

export default function AdminLoginPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const [state, formAction, isPending] = useActionState(loginAdminAction, null)
  const t = useTranslations('Admin.login')

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-[0_12px_40px_rgba(8,38,33,0.08)] border border-[#C29959]/20">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#082621] text-[#C29959] mb-4 shadow-sm">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-alexandria text-2xl font-semibold text-[#082621]">
            {t('title')}
          </h2>
          <p className="mt-2 text-sm text-[#6F746F] font-cairo">
            {t('subtitle')}
          </p>
        </div>

        {/* Error Alert */}
        {state?.error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-3 text-sm">
            <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
            <span>
              {state.error === 'invalidCredentials'
                ? t('invalidCredentials')
                : state.error === 'requiredFields'
                ? t('requiredFields')
                : t('serverError')}
            </span>
          </div>
        )}

        {/* Form */}
        <form action={formAction} className="mt-8 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-2">
              {t('email')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                name="email"
                required
                defaultValue="admin@makan.sa"
                placeholder={t('emailPlaceholder')}
                className="w-full ps-10 pe-4 py-3 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#10201D] uppercase tracking-wider mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 ps-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                name="password"
                required
                defaultValue="Admin123!@#"
                placeholder={t('passwordPlaceholder')}
                className="w-full ps-10 pe-4 py-3 bg-[#FAF8F5] border border-[#DBC9AD]/60 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C29959] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full mt-6 py-3.5 px-6 rounded-xl bg-[#082621] text-white hover:bg-[#C29959] font-medium text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <span>{isPending ? t('submitting') : t('submit')}</span>
          </button>
        </form>
      </div>
    </div>
  )
}
