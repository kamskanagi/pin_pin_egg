'use client';

import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface PreviewStore {
  nameEn: string;
  nameZh: string;
  nameJa: string;
  addressEn: string;
  addressZh: string;
  country: 'taiwan' | 'japan';
}

const stores: PreviewStore[] = [
  {
    nameEn: 'Mitsui Outlet Park',
    nameZh: '台中港三井 Outlet',
    nameJa: '三井アウトレットパーク台中',
    addressEn: 'Taichung Mitsui Outlet Park',
    addressZh: '台中市梧棲區台灣大道十段168號',
    country: 'taiwan',
  },
  {
    nameEn: 'Taichung LaLaport',
    nameZh: '台中 LaLaport 南館1F',
    nameJa: '台中ららぽーと南館1F',
    addressEn: 'Taichung LaLaport South Building 1F',
    addressZh: '台中市東區進德路600號',
    country: 'taiwan',
  },
  {
    nameEn: 'Nangang LaLaport',
    nameZh: '南港 LaLaport B1',
    nameJa: '南港ららぽーとB1',
    addressEn: 'Nangang LaLaport B1 Food Court',
    addressZh: '台北市南港區經貿二路188號',
    country: 'taiwan',
  },
  {
    nameEn: 'Tokyo Nakameguro',
    nameZh: '東京中目黒店',
    nameJa: '東京中目黒店',
    addressEn: 'Nakameguro, Tokyo',
    addressZh: '東京都目黒區中目黒',
    country: 'japan',
  },
];

export function LocationsPreview() {
  const t = useTranslations('home');
  const tLoc = useTranslations('locations');
  const locale = useLocale();

  const getName = (store: PreviewStore) => {
    if (locale === 'ja') return store.nameJa;
    if (locale === 'en') return store.nameEn;
    return store.nameZh;
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <SectionHeader
            label={t('locations_section_label')}
            title={t('locations_section_title')}
            theme="dark"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stores.map((store, i) => (
            <ScrollReveal key={store.nameEn} delay={i * 0.1}>
              <div
                className={cn(
                  'rounded-xl p-6 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10',
                  store.country === 'japan' && 'border border-warm-gold/30'
                )}
              >
                <p className="text-[10px] tracking-[3px] uppercase text-warm-gold-light mb-3">
                  {store.country === 'japan' ? tLoc('japan') : tLoc('taiwan')}
                </p>
                <h3 className="font-serif text-lg text-white mb-2">
                  {getName(store)}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed">
                  {locale === 'zh-TW' ? store.addressZh : store.addressEn}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="text-center mt-12">
            <Button href="/locations" variant="white" size="sm">
              {t('view_locations')}
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
