import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { cairo, alexandria } from '@/lib/fonts';
import { buildSocialMetadata, DEFAULT_OG_IMAGE } from '@/lib/og';
import '../globals.css';

export const viewport: Viewport = {
  themeColor: '#082621',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messagesModule = await import(`../../../messages/${locale}.json`);
  const meta = messagesModule.default.Metadata;

  const isRtl = locale === 'ar';
  const siteUrl = 'https://makanlandscape.sa';

  return {
    title: {
      default: meta.title,
      template: `%s | ${isRtl ? 'مكان لاندسكيب' : 'Makan Landscape'}`,
    },
    description: meta.description,
    keywords: isRtl
      ? ['مكان', 'لاندسكيب', 'تنسيق حدائق', 'عمارة المشهد', 'مشاريع سكنية', 'السعودية', 'الرياض', 'تخطيط عام']
      : ['Makan Landscape', 'Landscape Architecture', 'Placemaking', 'Master Planning', 'Saudi Arabia', 'Riyadh'],
    authors: [{ name: 'Makan Landscape' }],
    creator: 'Makan Landscape',
    publisher: 'Makan Landscape',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: '/ar',
        en: '/en',
      },
    },
    ...buildSocialMetadata({
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      locale,
      siteName: isRtl ? 'مكان لاندسكيب' : 'Makan Landscape',
      image: DEFAULT_OG_IMAGE,
      alt: meta.title,
      type: 'website',
    }),
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '192x192',
          url: '/android-chrome-192x192.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '512x512',
          url: '/android-chrome-512x512.png',
        },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to client components
  const messages = await getMessages();

  const isRtl = locale === 'ar';
  const dir = isRtl ? 'rtl' : 'ltr';

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: isRtl ? 'مكان لاندسكيب' : 'Makan Landscape',
    image: 'https://makanlandscape.sa/home/images/hero.webp',
    '@id': 'https://makanlandscape.sa',
    url: 'https://makanlandscape.sa',
    telephone: '+966110000000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Saud Bin Faisal Branch Rd, Al Sahafah',
      addressLocality: 'Riyadh',
      postalCode: '13321',
      addressCountry: 'SA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.8055,
      longitude: 46.6347,
    },
    sameAs: [
      'https://www.instagram.com/reel/DfAPOaiz0fH/?psln=N2VzOHVvaHAwbzF3',
      'https://www.linkedin.com/company/makan-landscape/',
      'https://www.youtube.com/@Makan_Landscape',
    ],
  };

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${alexandria.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-cairo bg-white text-[#082621] selection:bg-[#C29959]/20 selection:text-[#082621]">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
