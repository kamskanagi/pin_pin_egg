import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale, localePrefix } from '@/lib/i18n/navigation';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: false,
});

export const config = {
  matcher: ['/', '/(zh-TW|en|ja)/:path*'],
};
