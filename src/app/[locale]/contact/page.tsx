'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ContactForm } from '@/components/contact/ContactForm';
import { FranchiseForm } from '@/components/contact/FranchiseForm';
import { cn } from '@/lib/utils';

export default function ContactPage() {
  const t = useTranslations('contact');
  const [activeTab, setActiveTab] = useState<'general' | 'franchise'>('general');

  return (
    <div className="pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader label={t('page_label')} title={t('page_title')} />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          {/* Form area */}
          <div className="lg:col-span-2">
            {/* Tab switcher */}
            <div className="flex gap-2 mb-8">
              <button
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

          {/* Sidebar */}
          <div>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl bg-white p-8 space-y-6">
                <div>
                  <p className="text-xs tracking-[3px] uppercase text-warm-gold mb-3">Social</p>
                  <div className="space-y-2">
                    <a
                      href="https://www.instagram.com/pinpin_eggcake/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-charcoal-muted hover:text-warm-gold transition-colors"
                    >
                      Instagram — @pinpin_eggcake
                    </a>
                    <a
                      href="https://www.facebook.com/pinpineggcake/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-sm text-charcoal-muted hover:text-warm-gold transition-colors"
                    >
                      Facebook — 品品 CAFÉ
                    </a>
                  </div>
                </div>

                <div>
                  <p className="text-xs tracking-[3px] uppercase text-warm-gold mb-3">Email</p>
                  <a
                    href="mailto:hello@pinpincafe.com"
                    className="text-sm text-charcoal-muted hover:text-warm-gold transition-colors"
                  >
                    hello@pinpincafe.com
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
