'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { FranchiseForm } from '@/components/contact/FranchiseForm';
import { cn } from '@/lib/utils';

export function ContactTabs() {
  const t = useTranslations('contact');
  const [activeTab, setActiveTab] = useState<'general' | 'franchise'>('general');

  return (
    <div>
      {/* Tab switcher */}
      <div className="flex gap-2 mb-8" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'general'}
          onClick={() => setActiveTab('general')}
          className={cn(
            'px-5 py-2 text-[13px] tracking-[1.5px] uppercase font-sans rounded-sm transition-all duration-300',
            activeTab === 'general'
              ? 'bg-charcoal text-white'
              : 'text-charcoal-muted hover:text-charcoal border border-charcoal/10'
          )}
        >
          {t('general')}
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'franchise'}
          onClick={() => setActiveTab('franchise')}
          className={cn(
            'px-5 py-2 text-[13px] tracking-[1.5px] uppercase font-sans rounded-sm transition-all duration-300',
            activeTab === 'franchise'
              ? 'bg-charcoal text-white'
              : 'text-charcoal-muted hover:text-charcoal border border-charcoal/10'
          )}
        >
          {t('franchise')}
        </button>
      </div>

      <ScrollReveal>
        <div className="rounded-2xl bg-white p-8">
          {activeTab === 'general' ? <ContactForm /> : <FranchiseForm />}
        </div>
      </ScrollReveal>
    </div>
  );
}
