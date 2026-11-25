/**
 * Uploaded assets in `/uploads/` are already optimized to WebP by Sharp
 * during upload and served directly by Nginx in production (bypassing
 * Next.js standalone static manifest limitations for runtime files).
 */
export function isDirectUploadSrc(src?: string | null): boolean {
  if (!src) return false
  return src.startsWith('/uploads/') || src.startsWith('data:')
}

export function normalizeImageSrc(
  src?: string | null,
  fallback = '/home/images/hero.webp'
): string {
  const trimmed = src?.trim() ?? ''
  if (
    !trimmed ||
    (!trimmed.startsWith('/') &&
      !trimmed.startsWith('https://') &&
      !trimmed.startsWith('http://') &&
      !trimmed.startsWith('data:'))
  ) {
    return fallback
  }
  return trimmed
}
