'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  return (
    <footer id="contact" className="w-full bg-[#082621] text-white pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
          {/* Column 1: Brand & Socials (4 cols) */}
          <div className="md:col-span-4 flex flex-col items-start md:items-start text-start">
            <Image
              src="/home/svg/makan-footer-logo.png"
              alt="مكان | Makan Landscape"
              width={200}
              height={82}
              className="h-16 w-auto object-contain"
            />
            <p className="mt-4 font-cairo text-base text-zinc-300">
              {t('statement')}
            </p>

            {/* Social Icons */}
            <div className="mt-8 flex items-center gap-3">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#C29959] hover:text-[#C29959]"
                aria-label="Instagram"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#C29959] hover:text-[#C29959]"
                aria-label="YouTube"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#C29959] hover:text-[#C29959]"
                aria-label="X"
              >
                <svg className="h-3.5 w-3.5 fill-currentColor" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-[#C29959] hover:text-[#C29959]"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-currentColor" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.59 1.59 0 1 0 0 3.18 1.59 1.59 0 0 0 0-3.18z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h3 className="font-cairo text-lg font-medium text-[#C29959] mb-6">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-3 font-cairo text-base text-zinc-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {tNav('makan')}
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  {tNav('projects')}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  {tNav('services')}
                </a>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  {tNav('team')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info (5 cols) */}
          <div className="md:col-span-5">
            <h3 className="font-cairo text-lg font-medium text-[#C29959] mb-6">
              {t('contactHeading')}
            </h3>
            <ul className="space-y-4 font-cairo text-base text-zinc-300">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#C29959] shrink-0" />
                <a
                  href={`mailto:${t('email')}`}
                  className="hover:text-white transition-colors dir-ltr font-mono text-sm"
                >
                  {t('email')}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#C29959] shrink-0 mt-1" />
                <span className="leading-relaxed">{t('address')}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#C29959] shrink-0" />
                <a
                  href={`tel:${t('phone')}`}
                  className="hover:text-white transition-colors font-mono text-sm dir-ltr"
                >
                  {t('phone')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Divider & Copyright */}
        <div className="border-t border-white/10 pt-8 text-center font-cairo text-sm text-[#B8C9C2]">
          <p>{t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
