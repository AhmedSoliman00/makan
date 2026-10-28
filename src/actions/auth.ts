'use server'

import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { createAdminSession, destroyAdminSession } from '@/lib/auth'

export type AuthActionResult = {
  success?: boolean
  error?: string
}

export async function loginAdminAction(
  prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const locale = (formData.get('locale') as string) || 'ar'

  if (!email || !password) {
    return { error: 'requiredFields' }
  }

  try {
    const user = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!user) {
      return { error: 'invalidCredentials' }
    }

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if (!isValid) {
      return { error: 'invalidCredentials' }
    }

    await createAdminSession({
      id: user.id,
      email: user.email,
      name: user.name,
    })
  } catch (err) {
    console.error('Login action error:', err)
    return { error: 'serverError' }
  }

  redirect(`/${locale}/admin`)
}

export async function logoutAdminAction(locale: string = 'ar') {
  await destroyAdminSession()
  redirect(`/${locale}/admin/login`)
}
