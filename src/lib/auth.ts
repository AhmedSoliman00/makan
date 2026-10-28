import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const SECRET_KEY = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || 'makan-landscape-admin-jwt-secret-key-32chars-minimum-2026'
)

const COOKIE_NAME = 'makan_admin_session'
const ONE_WEEK = 7 * 24 * 60 * 60 * 1000

export type AdminSessionUser = {
  id: string
  email: string
  name: string
}

/**
 * Sign JWT and set HTTP-only cookie
 */
export async function createAdminSession(user: AdminSessionUser) {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET_KEY)

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ONE_WEEK / 1000,
    path: '/',
  })

  return token
}

/**
 * Verify JWT token string (can be used in middleware/proxy)
 */
export async function verifyAdminToken(token: string): Promise<AdminSessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY)
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string,
    }
  } catch {
    return null
  }
}

/**
 * Get current admin session from cookies
 */
export async function getAdminSession(): Promise<AdminSessionUser | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value

  if (!token) return null

  return verifyAdminToken(token)
}

/**
 * Destroy admin session cookie
 */
export async function destroyAdminSession() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
