'use client';

import { useTranslations } from 'next-intl';
import { PageIntro } from '@/components/ui/PageIntro';
import { StorePicker } from '@/components/order/StorePicker';

export default function OrderStorePickerPage() {
  const t = useTranslations('order');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <PageIntro label={t('page_label')} title={t('choose_store_title')} intro={t('store_intro')} />
        <StorePicker />
      </div>
    </div>
  );
}
