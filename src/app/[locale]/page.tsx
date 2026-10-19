import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import MetricsSection from '@/components/MetricsSection';
import SelectedWorks from '@/components/SelectedWorks';
import WhyMakan from '@/components/WhyMakan';
import ServicesSection from '@/components/ServicesSection';
import FeaturedVilla from '@/components/FeaturedVilla';
import PartnersSection from '@/components/PartnersSection';
import PreFooterCta from '@/components/PreFooterCta';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Header */}
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection />

        {/* Metrics Bar */}
        <MetricsSection />

        {/* Selected Works Grid */}
        <SelectedWorks />

        {/* Why Makan / Philosophy Section */}
        <WhyMakan />

        {/* Services 6-item Grid */}
        <ServicesSection />

        {/* Featured Villa (Mountain Garden Arch) */}
        <FeaturedVilla />

        {/* Partners Section */}
        <PartnersSection />

        {/* Pre-Footer Landscape Banner */}
        <PreFooterCta />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
