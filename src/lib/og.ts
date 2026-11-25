import type { Metadata } from 'next'

export const DEFAULT_OG_IMAGE = '/home/images/hero.webp'

/**
 * Normalizes a local or external image path into a WhatsApp/social-safe
 * 1200x630 JPEG URL served via `/api/og`.
 */
export function buildOgImageUrl(rawSrc?: string | null): string {
  const trimmed = rawSrc?.trim() ?? ''
  if (!trimmed || trimmed.startsWith('data:')) {
    return `/api/og?src=${encodeURIComponent(DEFAULT_OG_IMAGE)}`
  }

  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed
  }

  const normalized = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const isAllowedLocal =
    normalized.startsWith('/home/') || normalized.startsWith('/uploads/')

  const target = isAllowedLocal ? normalized : DEFAULT_OG_IMAGE
  return `/api/og?src=${encodeURIComponent(target)}`
}

type SocialMetadataInput = {
  title: string
  description: string
  url: string
  locale: string
  siteName: string
  image?: string | null
  alt?: string
  type?: 'website' | 'article'
}

/**
 * Builds consistent OpenGraph + Twitter card metadata with explicit JPEG
 * dimensions so WhatsApp, Facebook, LinkedIn, and X render previews reliably.
 */
export function buildSocialMetadata({
  title,
  description,
  url,
  locale,
  siteName,
  image,
  alt,
  type = 'website',
}: SocialMetadataInput): Pick<Metadata, 'openGraph' | 'twitter'> {
  const ogImageUrl = buildOgImageUrl(image)
  const imageAlt = alt || title

  return {
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  }
}

