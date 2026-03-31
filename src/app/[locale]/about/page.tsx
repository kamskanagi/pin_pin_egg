import { setRequestLocale, getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'nav' });
  return { title: `${t('about')} | 品品Café` };
}

const timeline = [
  { year: '2019', titleEn: 'First Store Opens', titleZh: '首店開幕', titleJa: '第一号店オープン', descEn: 'Pin Pin Café opens its first location at Taichung Mitsui Outlet Park.', descZh: '品品 Café 在台中港三井 Outlet 開設第一家門市。' },
  { year: '2021', titleEn: 'Department Store Expansion', titleZh: '百貨拓展', titleJa: '百貨店展開', descEn: 'Expanding to Taichung LaLaport, establishing our presence in major department stores.', descZh: '進駐台中 LaLaport，確立百貨商場的品牌定位。' },
  { year: '2024', titleEn: 'Taipei Debut', titleZh: '台北首店', titleJa: '台北デビュー', descEn: 'Opening at Nangang LaLaport brings Pin Pin Café to the Taipei metropolitan area.', descZh: '南港 LaLaport 開幕，品品 Café 正式進軍台北都會區。' },
  { year: '2026', titleEn: 'Japan Launch', titleZh: '日本展店', titleJa: '日本進出', descEn: 'Our first international store opens in Nakameguro, Tokyo.', descZh: '東京中目黒店開幕，首次國際展店。' },
];

export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = useTranslations('home');

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
      <section className="px-6 md:px-12 mb-24 bg-white py-24">
        <div className="max-w-content mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="flex justify-center">
              <span className="font-serif-tc text-[200px] font-light text-warm-gold-light/30 leading-none select-none">
                品
              </span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div>
              <h2 className="font-serif text-3xl mb-6">
                {locale === 'zh-TW' ? '品嚐美食、品茶之韻、品味人生' : locale === 'ja' ? '美食を味わい、茶の韻を味わい、人生を味わう' : 'Taste the food, taste the tea, taste the life'}
              </h2>
              <p className="text-charcoal-muted leading-relaxed mb-4">
                {locale === 'zh-TW'
                  ? '「品品」二字，意為品嚐再品嚐。我們相信每一口食物都值得細細品味，每一杯茶都承載著文化的韻味，每一個在咖啡館度過的時刻都是品味人生的機會。'
                  : locale === 'ja'
                    ? '「品品」の二文字は、味わい、そしてもう一度味わうこと。一口一口の食べ物をゆっくり味わい、一杯一杯のお茶に文化の香りを感じ、カフェで過ごすひとときが人生を味わう機会であると信じています。'
                    : 'The characters "品品" mean to taste, and taste again. We believe every bite of food deserves to be savored slowly, every cup of tea carries the rhythm of culture, and every moment spent at our café is an opportunity to taste life itself.'}
              </p>
              <p className="text-charcoal-muted leading-relaxed">
                {locale === 'zh-TW'
                  ? '從台中的第一家店到東京中目黒，我們堅持使用最好的食材，現點現做，將外酥內軟QQ的雞蛋仔帶給每一位客人。'
                  : locale === 'ja'
                    ? '台中の第一号店から東京中目黒まで、最高の食材を使い、注文ごとに焼き上げ、外はカリッと中はもちもちのエッグケーキをすべてのお客様にお届けしています。'
                    : 'From our first store in Taichung to Nakameguro in Tokyo, we insist on using the finest ingredients, made to order, delivering crispy-outside, QQ-soft-inside eggcakes to every guest.'}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Timeline */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="font-serif text-3xl text-center mb-16">
              {locale === 'zh-TW' ? '我們的旅程' : locale === 'ja' ? '私たちの歩み' : 'Our Journey'}
            </h2>
          </ScrollReveal>

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
                      {locale === 'zh-TW' ? item.descZh : item.descEn}
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
