import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { jwtVerify } from 'jose'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || 'makan-landscape-admin-jwt-secret-key-32chars-minimum-2026'
)

async function verifyToken(token?: string) {
  if (!token) return false
  try {
    await jwtVerify(token, SECRET_KEY)
    return true
  } catch {
    return false
  }
}

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if accessing admin routes: /(ar|en)/admin...
  const adminMatch = pathname.match(/^\/(ar|en)\/admin(\/.*)?$/)

  if (adminMatch) {
    const locale = adminMatch[1]
    const subpath = adminMatch[2] || ''
    const isLoginPage = subpath === '/login'

    const token = request.cookies.get('makan_admin_session')?.value
    const isAuthenticated = await verifyToken(token)

    // Unauthenticated user trying to access protected admin route
    if (!isAuthenticated && !isLoginPage) {
      const loginUrl = new URL(`/${locale}/admin/login`, request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Authenticated user trying to access login page
    if (isAuthenticated && isLoginPage) {
      const adminUrl = new URL(`/${locale}/admin`, request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/', '/(ar|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
}
