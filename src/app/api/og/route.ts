import fs from 'node:fs/promises'
import path from 'node:path'
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'
import { DEFAULT_OG_IMAGE } from '@/lib/og'

export const runtime = 'nodejs'

const OG_WIDTH = 1200
const OG_HEIGHT = 630

function resolveSafePublicImagePath(rawSrc: string | null): string {
  const publicDir = path.resolve(process.cwd(), 'public')
  const homeRoot = path.resolve(publicDir, 'home')
  const uploadsRoot = path.resolve(
    /*turbopackIgnore: true*/
    process.env.UPLOAD_DIR || path.join(publicDir, 'uploads')
  )
  const fallbackPath = path.resolve(publicDir, DEFAULT_OG_IMAGE.slice(1))

  if (!rawSrc) return fallbackPath

  const clean = rawSrc.trim()
  if (clean.includes('\0') || clean.includes('..')) {
    return fallbackPath
  }

  if (clean.startsWith('/uploads/')) {
    const rel = clean.slice('/uploads/'.length)
    const resolved = path.resolve(uploadsRoot, rel)
    if (resolved.startsWith(uploadsRoot + path.sep)) {
      return resolved
    }
  }

  if (clean.startsWith('/home/')) {
    const rel = clean.slice('/home/'.length)
    const resolved = path.resolve(homeRoot, rel)
    if (resolved.startsWith(homeRoot + path.sep)) {
      return resolved
    }
  }

  return fallbackPath
}

export async function GET(request: NextRequest) {
  const srcParam = request.nextUrl.searchParams.get('src')
  const fallbackPath = path.resolve(
    process.cwd(),
    'public',
    DEFAULT_OG_IMAGE.slice(1)
  )

  let targetPath = resolveSafePublicImagePath(srcParam)
  try {
    await fs.access(targetPath)
  } catch {
    targetPath = fallbackPath
  }

  try {
    const inputBuffer = await fs.readFile(/*turbopackIgnore: true*/ targetPath)
    const jpegBuffer = await sharp(inputBuffer)
      .rotate()
      .resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 80, progressive: true, mozjpeg: true })
      .toBuffer()

    return new NextResponse(new Uint8Array(jpegBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control':
          'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    })
  } catch (error) {
    console.error('[/api/og] Failed to generate OG JPEG:', error)
    return new NextResponse('Image unavailable', { status: 404 })
  }
}

