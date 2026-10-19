import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['ar', 'en'],

  // Used when no locale matches
  defaultLocale: 'ar',

  // Prefix strategy: 'always' ensures /ar or /en is always in the URL
  localePrefix: 'always'
});

export type Locale = (typeof routing.locales)[number];
