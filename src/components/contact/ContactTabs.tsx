'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { FranchiseForm } from '@/components/contact/FranchiseForm';
import { filterTabClassName } from '@/components/menu/CategoryFilter';

export function ContactTabs() {
  const t = useTranslations('contact');
  const [activeTab, setActiveTab] = useState<'general' | 'franchise'>('general');

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex flex-wrap gap-x-8 gap-y-2 mb-10" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
          className={filterTabClassName(activeTab === 'general')}
        >
          {t('general')}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'franchise'}
          onClick={() => setActiveTab('franchise')}
          className={filterTabClassName(activeTab === 'franchise')}
        >
          {t('franchise')}
        </button>
      </div>

      <ScrollReveal>
        <div>
          {activeTab === 'general' ? <ContactForm /> : <FranchiseForm />}
        </div>
      </ScrollReveal>
    </div>
  );
}
