import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="ar" dir="rtl">
      <body className="flex min-h-screen flex-col items-center justify-center p-4 text-center font-sans bg-zinc-50 text-zinc-900">
        <h1 className="font-alexandria text-4xl font-bold">404 - الصفحة غير موجودة</h1>
        <p className="mt-2 text-zinc-600">الصفحة المطلوبة غير موجودة / Page Not Found</p>
        <Link
          href="/ar"
          className="mt-6 rounded-none bg-[#10201D] hover:bg-[#C29959] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors"
        >
          العودة للرئيسية / Return Home
        </Link>
      </body>
    </html>
  );
}
