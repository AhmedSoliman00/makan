import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing, type Locale } from '@/i18n/routing';
import { cairo, alexandria } from '@/lib/fonts';
import '../globals.css';

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
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `/${locale}`,
      siteName: isRtl ? 'مكان لاندسكيب' : 'Makan Landscape',
      images: [
        {
          url: '/home/images/hero.webp',
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      locale: isRtl ? 'ar_SA' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/home/images/hero.webp'],
    },
    icons: {
      icon: '/favicon.ico',
    },
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
      'https://instagram.com/makanlandscape',
      'https://x.com/makanlandscape',
      'https://linkedin.com/company/makanlandscape',
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
