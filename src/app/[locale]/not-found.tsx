'use client';

import { useTranslations } from 'next-intl';
import { MaskedHeading } from '@/components/ui/MaskedHeading';
import { TextLink } from '@/components/ui/TextLink';
import { WavyDivider } from '@/components/ui/WavyDivider';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24">
      <div className="text-center max-w-md w-full">
        <span aria-hidden="true" className="font-serif italic text-[140px] font-light text-warm-gold-light leading-none block">
          404
        </span>
        <MaskedHeading as="h1" text={t('not_found_title')} className="font-serif italic text-4xl font-light mt-4 mb-4" />
        <p className="text-charcoal-muted mb-8">{t('not_found_body')}</p>
        <WavyDivider className="mb-8" />
        <TextLink href="/">{t('go_home')}</TextLink>
      </div>
    </div>
  );
}
