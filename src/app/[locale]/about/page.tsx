import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { EditorialSplit } from '@/components/ui/EditorialSplit';
import { MaskedHeading } from '@/components/ui/MaskedHeading';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: t('about') };
}

const timeline = [
  { year: '2019', titleEn: 'First Store Opens', titleZh: '首店開幕', titleJa: '第一号店オープン', descEn: 'Pin Pin Café opens its first location at Taichung Mitsui Outlet Park.', descZh: '品品 Café 在台中港三井 Outlet 開設第一家門市。', descJa: '台中港三井アウトレットパークに品品カフェ第一号店がオープン。' },
  { year: '2021', titleEn: 'Department Store Expansion', titleZh: '百貨拓展', titleJa: '百貨店展開', descEn: 'Expanding to Taichung LaLaport, establishing our presence in major department stores.', descZh: '進駐台中 LaLaport，確立百貨商場的品牌定位。', descJa: '台中ららぽーとに出店し、大型商業施設での存在感を確立。' },
  { year: '2024', titleEn: 'Taipei Debut', titleZh: '台北首店', titleJa: '台北デビュー', descEn: 'Opening at Nangang LaLaport brings Pin Pin Café to the Taipei metropolitan area.', descZh: '南港 LaLaport 開幕，品品 Café 正式進軍台北都會區。', descJa: '南港ららぽーとのオープンで、台北都市圏に進出。' },
  { year: '2026', titleEn: 'Japan Launch', titleZh: '日本展店', titleJa: '日本進出', descEn: 'Our first international store opens in Nakameguro, Tokyo.', descZh: '東京中目黒店開幕，首次國際展店。', descJa: '初の海外店舗を東京・中目黒にオープン。' },
];

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('home');
  const tAbout = useTranslations('about');

  return (
    <div className="pt-32 pb-24">
      {/* Hero */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-content mx-auto text-center">
          <ScrollReveal>
            <p className="text-xs tracking-[4px] uppercase text-warm-gold mb-4">
              {t('philosophy_label')}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl mb-6">
              {t('philosophy_title')}
            </h1>
            <p className="text-charcoal-muted max-w-2xl mx-auto leading-relaxed text-lg">
              {t('philosophy_body')}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand 品 section */}
      <section className="px-6 md:px-12 mb-24 bg-white">
        <div className="max-w-content mx-auto">
          <EditorialSplit
            label={tAbout('taste_label')}
            title={tAbout('taste_title')}
            intro={tAbout('taste_body_1')}
            image="/images/about/craft-01.jpg"
            imageAlt={tAbout('craft_link')}
            caption={<p>{tAbout('taste_body_2')}</p>}
            link={{ href: '/about/craft', label: tAbout('craft_link') }}
          />
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-3xl mx-auto">
          <MaskedHeading
            text={tAbout('journey_title')}
            className="font-serif text-3xl text-center mb-16"
          />

          <div className="space-y-12">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={i * 0.1}>
                <div className="flex gap-8">
                  <div className="flex-shrink-0 w-20">
                    <span className="font-serif text-2xl text-warm-gold">{item.year}</span>
                  </div>
                  <div className="border-l border-warm-gold/20 pl-8 pb-4">
                    <h3 className="font-serif text-xl mb-2">
                      {locale === 'ja' ? item.titleJa : locale === 'en' ? item.titleEn : item.titleZh}
                    </h3>
                    <p className="text-charcoal-muted text-sm leading-relaxed">
                      {locale === 'ja' ? item.descJa : locale === 'en' ? item.descEn : item.descZh}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 text-center">
        <ScrollReveal>
          <Button href="/menu" variant="outline">
            {t('view_full_menu')}
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
}
