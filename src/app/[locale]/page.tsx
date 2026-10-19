import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureGrid from '@/components/FeatureGrid';
import FontShowcase from '@/components/FontShowcase';
import Footer from '@/components/Footer';
import { Code, BookOpen, Terminal, Check } from 'lucide-react';

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

  const isRtl = locale === 'ar';

  return (
    <div className="flex min-h-screen flex-col bg-background selection:bg-sky-500/20">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <FontShowcase />
        <FeatureGrid />

        {/* Developer Quick-Start Guide Section */}
        <section id="docs" className="py-20 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-semibold text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 mb-3 shadow-xs">
                <Terminal className="h-3.5 w-3.5 text-sky-500" />
                <span className="font-alexandria">
                  {isRtl ? 'دليل الاستخدام السريع' : 'Developer Quick Start'}
                </span>
              </div>
              <h2 className="font-alexandria text-3xl font-extrabold text-zinc-900 dark:text-white">
                {isRtl
                  ? 'كيف تستخدم الخطوط والترجمة في مشروعك؟'
                  : 'How to use Fonts & Translations in your Code'}
              </h2>
              <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-cairo">
                {isRtl
                  ? 'تم تجهيز كل شيء ليعمل بسلاسة تامة مع Tailwind CSS و next-intl'
                  : 'Pre-configured best practices ready to be used across your components and pages.'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Card 1: Using Fonts */}
              <div className="rounded-2xl bg-zinc-950 p-6 text-zinc-200 shadow-xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Code className="h-4 w-4 text-sky-400" />
                      <span className="font-alexandria text-sm font-bold text-white">
                        {isRtl ? 'استخدام الخطوط في Tailwind' : 'Using Fonts in Tailwind'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md">
                      Tailwind v4 Classes
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 font-mono text-xs">
                    <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80">
                      <p className="text-zinc-400">{`// ${isRtl ? 'خط الإسكندرية للعناوين والشعارات' : 'Alexandria for display & headings'}`}</p>
                      <p className="text-sky-300 mt-1">&lt;h1 className=&quot;<span className="text-amber-300 font-bold">font-alexandria</span> text-4xl&quot;&gt;</p>
                      <p className="text-zinc-300 ps-4">{isRtl ? 'عنوان رئيسي رائع' : 'Awesome Headline'}</p>
                      <p className="text-sky-300">&lt;/h1&gt;</p>
                    </div>

                    <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80">
                      <p className="text-zinc-400">{`// ${isRtl ? 'خط كايرو للنصوص والفقرات' : 'Cairo for paragraphs and body'}`}</p>
                      <p className="text-sky-300 mt-1">&lt;p className=&quot;<span className="text-emerald-300 font-bold">font-cairo</span> text-base&quot;&gt;</p>
                      <p className="text-zinc-300 ps-4">{isRtl ? 'نص الفقرة عالي الوضوح' : 'High legibility body text'}</p>
                      <p className="text-sky-300">&lt;/p&gt;</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 font-cairo flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>
                    {isRtl
                      ? 'تم ضبط font-cairo كخط افتراضي للجسم (Body Default)'
                      : 'font-cairo is pre-configured as default body font'}
                  </span>
                </div>
              </div>

              {/* Card 2: Using Translations */}
              <div className="rounded-2xl bg-zinc-950 p-6 text-zinc-200 shadow-xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-indigo-400" />
                      <span className="font-alexandria text-sm font-bold text-white">
                        {isRtl ? 'استخدام الترجمة (next-intl)' : 'Using Translations (next-intl)'}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-900 px-2.5 py-1 rounded-md">
                      Client & Server
                    </span>
                  </div>

                  <div className="mt-4 space-y-3 font-mono text-xs">
                    <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80">
                      <p className="text-zinc-400">{'// Client Component'}</p>
                      <p className="text-purple-300">import &#123; useTranslations &#125; from &apos;next-intl&apos;;</p>
                      <p className="text-zinc-300 mt-1">const t = useTranslations(&apos;Hero&apos;);</p>
                      <p className="text-indigo-300 mt-1">&lt;h1&gt;&#123;t(&apos;titlePrefix&apos;)&#125;&lt;/h1&gt;</p>
                    </div>

                    <div className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800/80">
                      <p className="text-zinc-400">{'// Server Component'}</p>
                      <p className="text-purple-300">import &#123; getTranslations &#125; from &apos;next-intl/server&apos;;</p>
                      <p className="text-zinc-300 mt-1">const t = await getTranslations(&apos;Hero&apos;);</p>
                      <p className="text-indigo-300 mt-1">&lt;h1&gt;&#123;t(&apos;titlePrefix&apos;)&#125;&lt;/h1&gt;</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 text-xs text-zinc-400 font-cairo flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-400" />
                  <span>
                    {isRtl
                      ? 'أمان كامل للأنواع (Type-safe autocomplete) لمفاتيح الترجمة'
                      : 'Full TypeScript autocomplete for translation keys'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
