import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { LocaleString } from '@/types/sanity';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: 'TWD' | 'JPY' = 'TWD'): string {
  if (currency === 'JPY') return `¥${amount}`;
  return `NT$${amount}`;
}

export function getLocalizedValue<T>(
  obj: { zh: T; en: T; ja: T },
  locale: string
): T {
  return obj[locale as keyof typeof obj] ?? obj.en ?? obj.zh;
}

export function getLocalizedString(obj: LocaleString, locale: string): string {
  const localeMap: Record<string, keyof LocaleString> = {
    'zh-TW': 'zh',
    en: 'en',
    ja: 'ja',
  };
  const key = localeMap[locale] ?? 'en';
  return obj[key] || obj.en || obj.zh;
}
