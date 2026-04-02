import { setRequestLocale, getTranslations } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';

const craftImages = [
  '/images/about/craft-01.jpg',
  '/images/about/craft-02.jpg',
  '/images/about/craft-03.jpg',
  '/images/about/craft-04.jpg',
];

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return {
    title: locale === 'zh-TW' ? '職人工藝 | 品品Café' : locale === 'ja' ? '職人の技 | 品品Café' : 'Craftsmanship | 品品Café',
  };
}

const steps = [
  {
    step: '01',
    titleEn: 'The Batter',
    titleZh: '麵糊調配',
    titleJa: '生地づくり',
    descEn: 'Our batter is made fresh daily using premium flour, free-range eggs, and our secret blend of ingredients perfected over years. The precise ratio creates our signature crispy-outside, QQ-soft-inside texture.',
    descZh: '每日新鮮調配麵糊，使用頂級麵粉、放牧雞蛋，以及歷經多年完善的秘方配比。精確的比例創造出我們招牌的外酥內軟QQ口感。',
  },
  {
    step: '02',
    titleEn: 'The Pour',
    titleZh: '注入模具',
    titleJa: '型への注入',
    descEn: 'Each mold is carefully preheated to the perfect temperature. The batter is poured with practiced precision — not too much, not too little — ensuring every egg in the waffle is perfectly formed.',
    descZh: '每個模具都精確預熱至完美溫度。以純熟的手法注入麵糊——不多不少——確保每一顆蛋仔都完美成形。',
  },
  {
    step: '03',
    titleEn: 'The Flip',
    titleZh: '翻轉烘烤',
    titleJa: '反転焼き',
    descEn: 'Timing is everything. Our artisans flip the mold at exactly the right moment, distributing the batter evenly and creating that characteristic golden color on both sides.',
    descZh: '時機就是一切。我們的師傅在最佳時刻翻轉模具，使麵糊均勻分布，兩面都呈現出特有的金黃色澤。',
  },
  {
    step: '04',
    titleEn: 'The Finish',
    titleZh: '完美出爐',
    titleJa: '完成',
    descEn: 'Served hot and fresh, each eggcake is torn from the mold revealing the perfect honeycomb structure inside. Best enjoyed within minutes, when the contrast between crisp shell and soft center is at its peak.',
    descZh: '熱騰騰新鮮出爐，從模具中取出的每一個雞蛋仔都展現完美的蜂巢結構。最佳品嘗時間是出爐數分鐘內，此時外酥內軟的對比最為極致。',
  },
];

export default function CraftPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const isZh = locale === 'zh-TW';
  const isJa = locale === 'ja';

  return (
    <div className="pt-32 pb-24">
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-content mx-auto">
          <ScrollReveal>
            <SectionHeader
              label={isZh ? '職人工藝' : isJa ? '職人の技' : 'Craftsmanship'}
              title={isZh ? '雞蛋仔的誕生' : isJa ? 'エッグケーキの誕生' : 'The Making of an Eggcake'}
            />
          </ScrollReveal>

          <ScrollReveal>
            <p className="text-center text-charcoal-muted max-w-2xl mx-auto leading-relaxed mb-16">
              {isZh
                ? '每一個品品雞蛋仔都是現點現做的藝術品。從麵糊調配到完美出爐，我們堅持手工製作的溫度與品質。'
                : isJa
                  ? 'すべての品品エッグケーキは注文ごとに焼き上げる芸術作品。生地づくりから完成まで、手作りの温もりと品質にこだわっています。'
                  : 'Every Pin Pin eggcake is a work of art, made to order. From batter to finish, we insist on the warmth and quality of handcrafted perfection.'}
            </p>
          </ScrollReveal>

          <div className="space-y-24">
            {steps.map((step, i) => (
              <ScrollReveal key={step.step} delay={0.1}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'md:direction-rtl' : ''}`}>
                  <div className={`aspect-square rounded-2xl bg-cream-dark overflow-hidden relative ${i % 2 === 1 ? 'md:order-2' : ''}`}>
                    <Image
                      src={craftImages[i]}
                      alt={`Step ${step.step}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>

                  {/* Text */}
                  <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                    <span className="text-warm-gold font-serif text-sm tracking-[3px]">
                      STEP {step.step}
                    </span>
                    <h3 className="font-serif text-2xl mt-2 mb-4">
                      {isJa ? step.titleJa : isZh ? step.titleZh : step.titleEn}
                    </h3>
                    <p className="text-charcoal-muted leading-relaxed">
                      {isZh ? step.descZh : step.descEn}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality section */}
      <section className="px-6 md:px-12 py-24 bg-white">
        <div className="max-w-content mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-serif text-3xl mb-6">
              {isZh ? '品質承諾' : isJa ? '品質へのこだわり' : 'Quality Promise'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  titleEn: 'Low Sugar',
                  titleZh: '低糖配方',
                  descEn: 'Reduced sugar without sacrificing flavor. Sweetness from quality ingredients, not excess sugar.',
                  descZh: '減糖不減美味。甜度來自優質食材，而非過多糖分。',
                },
                {
                  titleEn: 'Made to Order',
                  titleZh: '現點現做',
                  descEn: 'Every eggcake is made fresh when you order. No pre-made, no reheated — just fresh.',
                  descZh: '每一份都是現點現做。沒有預製、沒有回溫——只有新鮮。',
                },
                {
                  titleEn: 'Premium Ingredients',
                  titleZh: '頂級食材',
                  descEn: 'Free-range eggs, high-grade flour, and carefully sourced flavor ingredients from around the world.',
                  descZh: '放牧雞蛋、高級麵粉，以及來自世界各地嚴選的風味食材。',
                },
              ].map((item) => (
                <div key={item.titleEn} className="p-7">
                  <h3 className="font-serif text-xl mb-3">
                    {isZh ? item.titleZh : item.titleEn}
                  </h3>
                  <p className="text-charcoal-muted text-sm leading-relaxed">
                    {isZh ? item.descZh : item.descEn}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="px-6 md:px-12 pt-24 text-center">
        <ScrollReveal>
          <Button href="/menu/eggcakes" variant="outline">
            {isZh ? '探索雞蛋仔菜單' : isJa ? 'エッグケーキメニューを見る' : 'Explore Eggcake Menu'}
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
}
