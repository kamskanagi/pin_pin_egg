'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <span className="font-serif-tc text-[120px] font-light text-warm-gold-light/40 leading-none block">
          404
        </span>
        <h1 className="font-serif text-2xl mt-4 mb-2">{t('not_found_title')}</h1>
        <p className="text-charcoal-muted mb-8">
          {t('not_found_body')}
        </p>
        <Button href="/" variant="outline">
          {t('go_home')}
        </Button>
      </div>
    </div>
  );
}
