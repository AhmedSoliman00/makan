'use server'

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
import { getAdminSession } from '@/lib/auth'

export type UploadActionResult = {
  success: boolean
  url?: string
  error?: string
}

export async function uploadImageAction(
  formData: FormData
): Promise<UploadActionResult> {
  const session = await getAdminSession()
  if (!session) {
    return { success: false, error: 'Unauthorized' }
  }

  try {
    const file = formData.get('file') as File | null
    const type = (formData.get('type') as string) || 'general' // 'hero' | 'gallery' | 'portrait' | 'general'

    if (!file || file.size === 0) {
      return { success: false, error: 'No image file provided.' }
    }

    // Validate mime type
    const validMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/heic', 'image/tiff']
    if (!validMimes.includes(file.type) && !file.type.startsWith('image/')) {
      return { success: false, error: 'Unsupported file format. Please upload a valid image (JPEG, PNG, WebP).' }
    }

    // Limit size to 20MB
    if (file.size > 20 * 1024 * 1024) {
      return { success: false, error: 'Image exceeds the maximum allowed size of 20MB.' }
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Storage target directory
    const targetDir =
      process.env.UPLOAD_DIR || path.join(process.cwd(), 'public', 'uploads')
    await fs.mkdir(targetDir, { recursive: true })

    // Generate safe, unique WebP filename with timestamp
    const originalCleanName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .toLowerCase()
      .slice(0, 40)
    const fileName = `${Date.now()}-${originalCleanName || 'image'}.webp`
    const filePath = path.join(targetDir, fileName)

    // Sharp optimization pipeline
    let pipeline = sharp(buffer)

    if (type === 'portrait') {
      // Team portrait: resize to max width 900px, 4:5 or 3:4 friendly
      pipeline = pipeline.resize({
        width: 900,
        withoutEnlargement: true,
      })
    } else {
      // Hero or Gallery landscape: resize to max width 1920px
      pipeline = pipeline.resize({
        width: 1920,
        withoutEnlargement: true,
      })
    }

    // Convert to modern WebP with 80% quality and strip EXIF
    await pipeline
      .rotate() // auto-orient based on EXIF before stripping
      .webp({ quality: 80, effort: 4 })
      .toFile(filePath)

    return {
      success: true,
      url: `/uploads/${fileName}`,
    }
  } catch (err: any) {
    console.error('Sharp upload processing error:', err)
    return {
      success: false,
      error: err.message || 'Failed to process and optimize image.',
    }
  }
}
