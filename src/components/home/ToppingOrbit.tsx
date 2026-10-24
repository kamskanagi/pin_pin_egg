'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import Image from 'next/image';
import { toppingsGroup } from '@/lib/placeholder-data';
import { cn, formatPrice } from '@/lib/utils';
import type { OptionChoice } from '@/types/order';

// The eight NT$15 toppings: the set on the stores' printed flyer.
const TOPPINGS = toppingsGroup.choices.filter((choice) => choice.priceDeltaTwd === 15);
const STEP_DEG = 360 / TOPPINGS.length;
const LAST = TOPPINGS.length - 1;

/** Fraction of each step spent resting on a topping before the ring turns on. */
const DWELL = 0.35;

/**
 * Scroll progress → ring position in "steps" (0 … LAST), with a dwell: the ring
 * holds each topping at the front for the first part of its step, then eases on
 * to the next. A plain linear map never lets a card settle long enough to read.
 */
function ringStep(p: number) {
  const raw = Math.min(Math.max(p, 0), 1) * LAST;
  const k = Math.min(Math.floor(raw), LAST);
  const f = Math.min(Math.max((raw - k - DWELL) / (1 - DWELL), 0), 1);
  return k + f * f * (3 - 2 * f);
}

/** Where in the section's scroll a given topping sits squarely at the front. */
function progressFor(index: number) {
  return index === LAST ? 1 : (index + DWELL / 2) / LAST;
}

function labelFor(choice: OptionChoice, locale: string) {
  return locale === 'ja' ? choice.labelJa : locale === 'en' ? choice.labelEn : choice.labelZh;
}

interface RingGeometry {
  /** Horizontal radius, in vw. */
  rx: number;
  /** Vertical radius, in px — the ring's tilt. */
  ry: number;
}

const RING_DESKTOP: RingGeometry = { rx: 27, ry: 120 };
const RING_PHONE: RingGeometry = { rx: 34, ry: 125 };

interface OrbitCardProps {
  choice: OptionChoice;
  index: number;
  step: MotionValue<number>;
  ring: RingGeometry;
  name: string;
  price: string;
}

/**
 * One card on the ring. Every transform is derived from the shared `step`
 * value, so turning the ring never re-renders React.
 */
function OrbitCard({ choice, index, step, ring, name, price }: OrbitCardProps) {
  const angle = useTransform(step, (s) => ((index - s) * STEP_DEG * Math.PI) / 180);
  const depth = useTransform(angle, Math.cos);
  const x = useTransform(angle, (a) => `${Math.sin(a) * ring.rx}vw`);
  const y = useTransform(depth, (d) => d * ring.ry);
  const scale = useTransform(depth, [-1, 1], [0.7, 1.06]);
  const opacity = useTransform(depth, [-1, 0, 1], [0.55, 0.8, 1]);
  // In front of the cone (z-10) while on the near half of the ring, behind it otherwise.
  const zIndex = useTransform(depth, (d) => (d > 0 ? 20 : 5));

  return (
    <motion.div
      className="absolute left-0 top-0"
      style={{ x, y, scale, opacity, zIndex }}
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <ToppingCard src={`/images/toppings/${choice.key}.webp`} name={name} price={price} alt="" />
      </div>
    </motion.div>
  );
}

interface ToppingCardProps {
  src: string;
  name: string;
  price: string;
  alt: string;
}

function ToppingCard({ src, name, price, alt }: ToppingCardProps) {
  return (
    <div className="w-[84px] md:w-[156px] rounded-2xl border border-warm-gold/15 bg-white/90 p-1.5 md:p-2 shadow-xl shadow-charcoal/10 backdrop-blur-sm">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-cream-dark">
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 84px, 156px" className="object-cover" />
      </div>
      <div className="px-1 pb-0.5 pt-1.5 md:pt-2">
        <p className="font-serif text-xs md:text-lg leading-tight text-charcoal">{name}</p>
        <p className="mt-0.5 text-[9px] md:text-xs font-medium tracking-wide text-warm-gold-dark">{price}</p>
      </div>
    </div>
  );
}

/**
 * Toppings orbiting the eggcake, after the "SIP" section of the reference reel.
 *
 * The section pins for 300vh and scrolling turns the ring one topping at a
 * time. Cards on the far half of the ring pass behind the cone and shrink; cards
 * on the near half pass in front of it. Under reduced motion the section does
 * not pin and the toppings are laid out as a plain grid instead.
 */
export function ToppingOrbit() {
  const t = useTranslations('home');
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isPhone, setIsPhone] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const target = useTransform(scrollYProgress, ringStep);
  const step = useSpring(target, { stiffness: 140, damping: 28, mass: 0.6 });

  useMotionValueEvent(step, 'change', (s) => {
    const next = Math.min(Math.max(Math.round(s), 0), LAST);
    setActive((current) => (current === next ? current : next));
  });

  const goTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const travel = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + progressFor(index) * travel, behavior: 'smooth' });
  };

  const ring = isPhone ? RING_PHONE : RING_DESKTOP;
  const price = t('toppings_price', { price: formatPrice(15) });
  const names = TOPPINGS.map((choice) => labelFor(choice, locale));

  return (
    <section
      ref={sectionRef}
      aria-labelledby="topping-orbit-title"
      className="relative h-[300vh] bg-cream motion-reduce:h-auto"
    >
      <div className="sticky top-0 h-svh overflow-hidden motion-reduce:static motion-reduce:h-auto motion-reduce:py-24">
        {/* Oversized ghost word behind everything, as in the reference. */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-serif text-[22vw] md:text-[15vw] italic font-light leading-none text-charcoal/[0.05] motion-reduce:hidden"
        >
          {t('toppings_ghost')}
        </p>

        {/* Copy: top on phones, left column on desktop. */}
        <div className="relative z-30 mx-auto max-w-content px-6 pt-24 md:absolute md:inset-y-0 md:left-0 md:flex md:w-[34vw] md:max-w-[420px] md:flex-col md:justify-center md:px-12 md:pt-0 motion-reduce:md:static motion-reduce:md:w-auto motion-reduce:md:max-w-content motion-reduce:pt-0">
          <p className="mb-3 md:mb-4 text-xs uppercase tracking-[4px] text-warm-gold-dark">{t('toppings_label')}</p>
          <h2 id="topping-orbit-title" className="max-w-[14ch] text-balance font-serif text-3xl md:text-4xl xl:text-5xl font-light italic text-charcoal">
            {t('toppings_title')}
          </h2>
          <p className="mt-3 md:mt-5 max-w-sm text-[15px] leading-relaxed text-charcoal-muted">{t('toppings_body')}</p>

          <p aria-live="polite" className="mt-5 md:mt-8 flex items-baseline gap-3 motion-reduce:hidden">
            <span className="font-serif text-2xl md:text-3xl text-charcoal">{names[active]}</span>
            <span className="text-sm font-medium tracking-wide text-warm-gold-dark">{price}</span>
          </p>

          <div role="group" aria-label={t('toppings_label')} className="mt-4 md:mt-6 flex gap-2 motion-reduce:hidden">
            {TOPPINGS.map((choice, i) => (
              <button
                key={choice.key}
                type="button"
                onClick={() => goTo(i)}
                aria-label={t('toppings_show', { name: names[i] })}
                aria-current={i === active ? 'true' : undefined}
                className="group flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={cn(
                    'block h-1.5 rounded-full transition-all duration-300',
                    i === active ? 'w-5 bg-warm-gold-dark' : 'w-1.5 bg-charcoal/20 group-hover:bg-charcoal/40',
                  )}
                />
              </button>
            ))}
          </div>
        </div>

        {/* The orbit stage: cone at the centre, ring around it. */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-[70%] md:left-[60%] md:top-1/2 motion-reduce:hidden"
        >
          <div className="absolute left-0 top-0 z-10 h-[40svh] md:h-[62svh] aspect-[419/845] -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/images/toppings/cone-v2.webp"
              alt=""
              fill
              sizes="(max-width: 768px) 40vw, 32vh"
              className="object-contain drop-shadow-2xl"
            />
          </div>
          {TOPPINGS.map((choice, i) => (
            <OrbitCard
              key={choice.key}
              choice={choice}
              index={i}
              step={step}
              ring={ring}
              name={names[i]}
              price={price}
            />
          ))}
        </div>

        {/* Reduced motion: no pinning, no ring — the cone and a plain grid. */}
        <div className="hidden motion-reduce:block">
          <div className="mx-auto mt-12 grid max-w-content grid-cols-2 justify-items-center gap-6 px-6 sm:grid-cols-4 md:px-12">
            {TOPPINGS.map((choice, i) => (
              <ToppingCard
                key={choice.key}
                src={`/images/toppings/${choice.key}.webp`}
                name={names[i]}
                price={price}
                alt={t('toppings_card_alt', { name: names[i] })}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
