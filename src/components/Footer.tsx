'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const locale = useLocale();
  const isRtl = locale === 'ar';

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://instagram.com',
      icon: (
        <svg
          className="h-5 w-5 lg:h-6 lg:w-6 fill-none stroke-current text-white group-hover:text-[#C29959] transition-colors"
          viewBox="0 0 24 24"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: 'https://youtube.com',
      icon: (
        <svg
          className="h-5 w-5 lg:h-6 lg:w-6 fill-current text-white group-hover:text-[#C29959] transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
    {
      name: 'X',
      href: 'https://x.com',
      icon: (
        <svg
          className="h-4 w-4 lg:h-5 lg:w-5 fill-current text-white group-hover:text-[#C29959] transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com',
      icon: (
        <svg
          className="h-5 w-5 lg:h-6 lg:w-6 fill-current text-white group-hover:text-[#C29959] transition-colors"
          viewBox="0 0 24 24"
        >
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.59 1.59 0 1 0 0 3.18 1.59 1.59 0 0 0 0-3.18z" />
        </svg>
      ),
    },
  ];

  const quickNavLinks = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: tNav('projects'), href: '/projects' },
    { label: tNav('services'), href: '/services' },
  ];

  return (
    <footer id="contact" className="w-full bg-[#042620] text-white pt-12 sm:pt-16 lg:pt-[70px] pb-8 lg:pb-12">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-[59px]">
        {/* Top 3 Columns: Brand & Socials, Quick Links, Contact */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 items-start">
          {/* Brand & Socials Column (5 cols on lg) */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start text-start">
            <Link href="/" className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C29959]">
              <Image
                src="/home/svg/makan-logo.svg"
                alt="مكان | Makan Landscape"
                width={222}
                height={91}
                className="h-14 sm:h-16 lg:h-[76px] w-auto object-contain"
                priority={false}
              />
            </Link>

            <p className="mt-4 sm:mt-6 font-cairo text-base sm:text-lg lg:text-[20px] font-normal text-white/90 leading-relaxed">
              {t('statement')}
            </p>

            {/* Social Icons (56px circles on desktop, 44px on mobile) */}
            <div className="mt-6 sm:mt-8 flex items-center gap-3 sm:gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex h-11 w-11 sm:h-12 sm:w-12 lg:h-14 lg:w-14 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-[#C29959] hover:bg-white/5"
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column (3 cols on lg) */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col items-start text-start">
            <h3 className="font-cairo text-xl sm:text-[22px] lg:text-[24px] font-medium text-[#C29959] mb-4 sm:mb-6">
              {t('quickLinks')}
            </h3>

            {/* Mobile: Horizontal row wrap / Desktop: Vertical list */}
            <ul className="flex flex-wrap md:flex-col gap-4 sm:gap-5 md:gap-3 font-cairo text-base sm:text-lg lg:text-[20px] font-normal text-white/90">
              {quickNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-[#C29959] transition-colors inline-block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information Column (4 cols on lg) */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-start text-start">
            <h3 className="font-cairo text-xl sm:text-[22px] lg:text-[24px] font-medium text-[#C29959] mb-4 sm:mb-6">
              {t('contactHeading')}
            </h3>

            <ul className="space-y-4 sm:space-y-5 font-cairo text-base sm:text-lg lg:text-[20px] font-normal text-white/90">
              <li className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center text-[#C29959]">
                  <Mail className="h-5 w-5" />
                </div>
                <a
                  href={`mailto:${t('email')}`}
                  className="hover:text-[#C29959] transition-colors dir-ltr font-mono text-sm sm:text-base lg:text-[18px]"
                >
                  {t('email')}
                </a>
              </li>

              <li className="flex items-start gap-3 sm:gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center text-[#C29959] mt-1">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="leading-relaxed text-sm sm:text-base lg:text-[18px]">
                  {t('address')}
                </span>
              </li>

              <li className="flex items-center gap-3 sm:gap-4">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center text-[#C29959]">
                  <Phone className="h-5 w-5" />
                </div>
                <a
                  href={`tel:${t('phone')}`}
                  className="hover:text-[#C29959] transition-colors dir-ltr font-mono text-sm sm:text-base lg:text-[18px]"
                >
                  {t('phone')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Monumental Makan Architectural Wordmark (Group 1: مكان / MAKAN) */}
        <div className="my-10 sm:my-14 lg:my-16 w-full max-w-[1275px] mx-auto select-none pointer-events-none">
          <Image
            src="/home/svg/makan-footer-giant-wordmark.svg"
            alt="Makan Landscape"
            width={1275}
            height={423}
            className="w-full h-auto object-contain opacity-95 transition-opacity"
          />
        </div>

        {/* Footer Bottom Legal Bar: Copyright & Policies */}
        <div className="border-t border-white/15 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 text-center md:text-start">
          {/* Copyright text */}
          <p className="font-cairo text-sm sm:text-base lg:text-[18px] text-[#A2B5AD]">
            {t('copyright')}
          </p>

          {/* Privacy & Terms Links */}
          <div className="flex items-center gap-5 sm:gap-6 font-cairo text-sm sm:text-base lg:text-[18px] text-white/90">
            <Link
              href="#privacy"
              className="hover:text-[#C29959] transition-colors"
            >
              {t('privacy')}
            </Link>
            <Link
              href="#terms"
              className="hover:text-[#C29959] transition-colors"
            >
              {t('terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

