import { useLocale, useTranslations } from 'next-intl';
import { formatPrice } from '@/lib/utils';

interface PriceDisplayProps {
  twd: number;
  jpy?: number;
  showFrom?: boolean;
}

export function PriceDisplay({ twd, jpy, showFrom = false }: PriceDisplayProps) {
  const locale = useLocale();
  const t = useTranslations('menu');

  const isJapan = locale === 'ja';
  const amount = isJapan && jpy ? jpy : twd;
  const currency = isJapan && jpy ? 'JPY' : 'TWD';
  const formatted = formatPrice(amount, currency as 'TWD' | 'JPY');

  return (
    <span className="text-sm tracking-wide font-medium text-warm-gold-dark">
      {showFrom ? t('from_price', { price: formatted }) : formatted}
    </span>
  );
}
