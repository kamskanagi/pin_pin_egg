import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

/**
 * Existing product photography, in the order that reads best as a strip:
 * tall, wide, tall, wide. Alt text is intentionally descriptive — the strip is
 * decorative, but the first copy of it is still real content.
 */
const strip = [
  { src: '/images/menu/eggcake.jpg', alt: 'A fresh eggcake, still warm from the iron' },
  { src: '/images/menu/matcha.jpg', alt: 'Matcha latte poured over ice' },
  { src: '/images/menu/strawberry.jpg', alt: 'Seasonal strawberries, halved and stacked' },
  { src: '/images/menu/coffee.jpg', alt: 'A single-origin pour-over, mid-bloom' },
  { src: '/images/menu/seasonal.jpg', alt: "This season's limited eggcake" },
  { src: '/images/instagram/ig-01.jpg', alt: 'The counter at Nangang LaLaport' },
];

/**
 * A continuous horizontal product strip.
 *
 * CSS keyframes, not a JS loop: a `useAnimationFrame` driver would run on the
 * main thread the whole time the section is on screen, while a CSS transform
 * animation stays on the compositor. It also inherits the global
 * `prefers-reduced-motion` kill-switch in globals.css for free.
 */
export function ProductMarquee() {
  const t = useTranslations('home');

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-content mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader label={t('marquee_label')} title={t('marquee_title')} />
        </ScrollReveal>
      </div>

      {/* The track holds the list twice and translates by half its width, so the
          loop lands exactly on the duplicate and never seams. */}
      <div className="mt-14 flex w-max animate-marquee gap-4 will-change-transform hover:[animation-play-state:paused] motion-reduce:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-4" aria-hidden={copy === 1 ? 'true' : undefined}>
            {strip.map((item) => (
              <div
                key={item.src}
                className="relative h-[200px] w-[280px] md:h-[280px] md:w-[400px] shrink-0 overflow-hidden rounded-sm bg-cream-dark"
              >
                <Image
                  src={item.src}
                  alt={copy === 0 ? item.alt : ''}
                  fill
                  sizes="(max-width: 768px) 280px, 400px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
