import { useTranslations, useLocale } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TextLink } from '@/components/ui/TextLink';
import { storeLocations, type PlaceholderStore } from '@/lib/placeholder-data';

export function LocationsPreview() {
  const t = useTranslations('home');
  const tLoc = useTranslations('locations');
  const locale = useLocale();

  const localized = (store: PlaceholderStore, field: 'name' | 'address' | 'city') => {
    const key = `${field}${locale === 'ja' ? 'Ja' : locale === 'en' ? 'En' : 'Zh'}` as const;
    return store[key];
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

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8 max-w-4xl mx-auto">
          {storeLocations.map((store, i) => (
            <ScrollReveal key={store.id} delay={i * 0.1}>
              <li>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-xl text-white">{localized(store, 'name')}</span>
                  <span aria-hidden="true" className="flex-1 min-w-4 border-b border-dotted border-warm-gold-light/30" />
                  <span className="text-[11px] tracking-[2px] uppercase text-warm-gold-light">
                    {store.country === 'japan' ? tLoc('japan') : tLoc('taiwan')}
                  </span>
                </div>
                <p className="mt-1 text-sm text-white/50 leading-relaxed">{localized(store, 'address')}</p>
              </li>
            </ScrollReveal>
          ))}
        </ul>

        <ScrollReveal>
          <div className="text-center mt-14">
            <TextLink href="/locations" tone="light">
              {t('view_locations')}
            </TextLink>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
