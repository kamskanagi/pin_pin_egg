'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StorePicker } from '@/components/order/StorePicker';

export default function OrderStorePickerPage() {
  const t = useTranslations('order');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('choose_store_title')} />
        </ScrollReveal>
        <StorePicker />
      </div>
    </div>
  );
}
