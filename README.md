# Makan (مكان) — Next.js 16 + Tailwind CSS v4 + next-intl + Cairo & Alexandria

A production-ready Next.js application configured with **Tailwind CSS v4**, **next-intl v4** (type-safe internationalization), **Cairo** and **Alexandria** Arabic & Latin Google fonts, dynamic RTL/LTR support, and App Router best practices.

---

## 🌟 Key Features

1. **Next.js 16 (App Router)**:
   - High-performance Turbopack engine.
   - Async route parameters (`params: Promise<{ locale: string }>`).
   - Static rendering optimization with `setRequestLocale` and `generateStaticParams`.
   - Modern Next.js 16 `src/proxy.ts` request proxying (replaces legacy middleware).

2. **Typography (Cairo & Alexandria via `next/font/google`)**:
   - **Alexandria** (`--font-alexandria` / `font-alexandria`): Modern geometric display font designed for impactful headings, brand identities, badges, and numbers.
   - **Cairo** (`--font-cairo` / `font-cairo`): Clean, highly readable typeface engineered for body copy, paragraphs, form controls, and UI buttons.
   - **Zero Layout Shift (CLS)** with self-hosted Google Font assets preloaded for `arabic` and `latin` subsets.

3. **Tailwind CSS v4 Integration**:
   - Zero-configuration engine using `@import "tailwindcss";` and `@theme inline`.
   - Custom utility classes: `font-cairo` and `font-alexandria`.
   - Default body font configured to `var(--font-cairo)`.
   - Dark/Light mode support with CSS theme variables.

4. **Internationalization (next-intl v4)**:
   - Supported locales: Arabic (`ar`, default) and English (`en`).
   - Automatic locale detection, redirection, and cookie persistence (`NEXT_LOCALE`).
   - Bidirectional layout: Automatically sets `<html lang="ar" dir="rtl">` for Arabic and `<html lang="en" dir="ltr">` for English.
   - **100% Type-Safe Keys**: Autocompletion and compile-time verification for all translation keys via `src/types/global.d.ts`.
   - Interactive `LanguageSwitcher` preserving pathname and search queries.

---

## 📁 Project Architecture

```
makan/
├── messages/
│   ├── ar.json                 # Arabic dictionary
│   └── en.json                 # English dictionary
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx      # Root locale layout (html lang & dir, font variables, next-intl provider)
│   │   │   ├── page.tsx        # Localized landing page & typography showcase
│   │   │   └── not-found.tsx   # Localized 404 page
│   │   ├── favicon.ico
│   │   ├── globals.css         # Tailwind v4 theme, fonts, and custom tokens
│   │   └── not-found.tsx       # Root 404 fallback
│   ├── components/
│   │   ├── LanguageSwitcher.tsx# Interactive Arabic/English switcher
│   │   ├── Navbar.tsx          # Sticky glassmorphism header
│   │   ├── HeroSection.tsx     # Hero banner showcasing Alexandria & Cairo
│   │   ├── FontShowcase.tsx    # Live interactive typography playground
│   │   ├── FeatureGrid.tsx     # Architectural highlights
│   │   └── Footer.tsx          # Footer with bilingual branding
│   ├── i18n/
│   │   ├── navigation.ts       # Type-safe Link, useRouter, usePathname, redirect
│   │   ├── request.ts          # Server-side getRequestConfig
│   │   └── routing.ts          # Supported locales and defaultLocale
│   ├── lib/
│   │   └── fonts.ts            # next/font/google loaders for Cairo & Alexandria
│   ├── types/
│   │   └── global.d.ts         # TypeScript IntlMessages augmentation
│   └── proxy.ts                # Next.js 16 internationalized routing proxy
├── next.config.ts              # Wrapped with createNextIntlPlugin
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000). The app will automatically redirect to `/ar` (or `/en` depending on your browser preferences).

### 3. Production Build
```bash
npm run build
npm run start
```

---

## 🔤 How to Use Cairo & Alexandria in Code

### In JSX with Tailwind CSS:
```tsx
// Use Alexandria for headings and titles
<h1 className="font-alexandria text-4xl font-bold">
  عنوان رئيسي بخط الإسكندرية / Alexandria Heading
</h1>

// Use Cairo for body text and paragraphs (also body default)
<p className="font-cairo text-base text-zinc-600">
  نص فقرة عالي الوضوح بخط كايرو / High legibility body text with Cairo font
</p>
```

---

## 🌐 How to Use Translations

### 1. In Client Components (`'use client'`):
```tsx
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Hero');
  return <h1>{t('titlePrefix')}</h1>;
}
```

### 2. In Server Components (Async Pages/Layouts):
```tsx
import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('Hero');
  return <h1>{t('titlePrefix')}</h1>;
}
```

### 3. Navigation with Localized Links:
Always import `Link`, `useRouter`, and `usePathname` from `@/i18n/navigation` instead of `next/navigation`:
```tsx
import { Link } from '@/i18n/navigation';

<Link href="/about">عن الموقع</Link>
```

---

## 📝 Adding New Locales or Messages

1. **Add keys to dictionaries**:
   Edit `messages/ar.json` and `messages/en.json`.
2. **Add locale to routing**:
   If adding a third language (e.g. French `'fr'`), update `locales` in `src/i18n/routing.ts`:
   ```ts
   export const routing = defineRouting({
     locales: ['ar', 'en', 'fr'],
     defaultLocale: 'ar',
     localePrefix: 'always'
   });
   ```
