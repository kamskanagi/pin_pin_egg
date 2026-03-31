import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Cormorant_Garamond, Noto_Serif_TC, DM_Sans } from 'next/font/google';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n/config';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: '品品Café — Eggcake × Tea × Coffee',
    template: '%s | 品品Café',
  },
  description: 'Pin Pin Café — Taiwanese eggcake, premium tea, and specialty coffee. From Taichung to Tokyo.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://pinpincafe.com'),
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    siteName: '品品Café',
    locale: 'zh_TW',
    alternateLocale: ['en_US', 'ja_JP'],
  },
  other: {
    'theme-color': '#2C2C2C',
  },
};

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-serif',
  display: 'swap',
});

const notoSerifTC = Noto_Serif_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-serif-tc',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
});

const langMap: Record<Locale, string> = {
  'zh-TW': 'zh-TW',
  en: 'en',
  ja: 'ja',
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={langMap[locale as Locale] ?? 'en'}
      className={`${cormorant.variable} ${notoSerifTC.variable} ${dmSans.variable}`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-warm-gold focus:text-white focus:rounded-sm"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
