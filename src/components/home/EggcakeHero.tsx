'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { DURATION, EASE } from '@/lib/motion';

const STEPS = [1, 2, 3, 4] as const;
const VIDEO_SRC = {
  desktop: '/video/eggcake-hero-v10-1080.mp4',
  mobile: '/video/eggcake-hero-v10-720.mp4',
} as const;
const POSTER_SRC = '/images/hero/eggcake-start-v10.webp';
const FINISH_SRC = '/images/hero/eggcake-finish-v10.webp';

/** Seeks smaller than one frame (24fps) only abort the seek in flight. */
const FRAME = 1 / 48;

/** Desktop sees nearly the whole 16:9 frame. A phone sees under half of its
 *  width, so the crop pans with the story: the iron for pour and bake, then
 *  the cone and the Mini Pins for fold and finish. Stops are scroll progress. */
const PAN_STOPS = [0, 0.5, 0.72, 1];
const PAN_MOBILE = ['36% 50%', '40% 50%', '80% 50%', '82% 50%'];
const PAN_DESKTOP = ['55% 50%', '55% 50%', '55% 50%', '55% 50%'];

/** Where each step's clip starts and ends in the stitched video, as fractions
 *  of its duration. The clips are not equal length, but each step still gets an
 *  equal quarter of the scroll track, so the label and the footage stay in step. */
const SEGMENTS = [0, 79 / 557, 321 / 557, 442 / 557, 1];

/** Scroll progress → playhead fraction, scrubbing each step's own clip. */
const videoFraction = (p: number) => {
  const step = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
  const local = p * STEPS.length - step;
  return SEGMENTS[step] + local * (SEGMENTS[step + 1] - SEGMENTS[step]);
};

/** Each step's share of the scroll track, used to land the arrows mid-step. */
const stepProgress = (step: number) => (step + 0.5) / STEPS.length;

const pad = (n: number) => String(n).padStart(2, '0');

/** Shared entrance. MotionProvider's `reducedMotion="user"` drops the travel
 *  for reduced-motion users, so server and client render the same markup. */
const ENTER = { opacity: 0, y: 30 };
const SHOWN = { opacity: 1, y: 0 };

export function EggcakeHero() {
  const t = useTranslations('home');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const [videoReady, setVideoReady] = useState(false);
  const [step, setStep] = useState(0);
  const [isPhone, setIsPhone] = useState(false);
  const inView = useInView(sectionRef);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const trackFill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const pan = useTransform(scrollYProgress, PAN_STOPS, isPhone ? PAN_MOBILE : PAN_DESKTOP);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsPhone(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const syncTarget = (p: number) => {
    const video = videoRef.current;
    // Stop just short of the end: seeking to `duration` can show an ended frame.
    if (video?.duration) {
      targetTime.current = Math.min(videoFraction(p) * video.duration, video.duration - 0.05);
    }
  };

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    syncTarget(p);
    setStep(Math.min(STEPS.length - 1, Math.floor(p * STEPS.length)));
  });

  // The video is opt-in: reduced-motion and data-saver visitors never see it,
  // so they never download it. Phones get the lighter 540p encode.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;

    const load = () => {
      video.src = window.matchMedia('(max-width: 767px)').matches
        ? VIDEO_SRC.mobile
        : VIDEO_SRC.desktop;
      // iOS Safari ignores preload and sits at readyState 1 until play() is
      // called; a play/pause primes the decoder so seeking can paint frames.
      video.play().then(() => video.pause()).catch(() => {});
    };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(load, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(load, 200);
    return () => clearTimeout(id);
  }, []);

  // Ease the playhead toward the scroll target instead of jumping to it, so a
  // flick of the wheel reads as motion rather than a cut between frames. Runs
  // only while the hero is on screen.
  useEffect(() => {
    if (prefersReducedMotion || !inView) return;
    let frame = 0;
    const tick = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2 && !video.seeking) {
        const delta = targetTime.current - video.currentTime;
        if (Math.abs(delta) > FRAME) video.currentTime += delta * 0.2;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [prefersReducedMotion, inView]);

  // Reduced motion gets the finished cone and no pinned track (see the
  // motion-reduce classes below), so the copy should describe that frame.
  useEffect(() => {
    if (prefersReducedMotion) setStep(STEPS.length - 1);
  }, [prefersReducedMotion]);

  const goToStep = (next: number) => {
    const section = sectionRef.current;
    if (!section || next < 0 || next >= STEPS.length) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const track = section.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + track * stepProgress(next),
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const current = STEPS[step];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="eggcake-hero-title"
      className="relative h-[400vh] bg-cream motion-reduce:h-svh"
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Media. The poster paints first and is the LCP element; the video
            fades in over it once it can show a frame. */}
        {/* On desktop the footage sits to the right of a cream margin, so the
            copy reads on paper instead of over the iron and the baker. */}
        <div className="absolute inset-x-0 top-0 h-[56svh] md:inset-y-0 md:left-[16%] md:right-0 md:h-auto">
          <Image
            src={POSTER_SRC}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[36%_50%] motion-reduce:hidden md:object-[55%_50%]"
          />
          <Image
            src={FINISH_SRC}
            alt={t('hero_seq_video_label')}
            fill
            sizes="100vw"
            className="hidden object-cover object-[82%_50%] motion-reduce:block md:object-[55%_50%]"
          />
          <motion.video
            ref={videoRef}
            style={{ objectPosition: pan }}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedMetadata={() => syncTarget(scrollYProgress.get())}
            onLoadedData={() => setVideoReady(true)}
            className={cn(
              'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:hidden',
              videoReady ? 'opacity-100' : 'opacity-0'
            )}
          />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-cream to-transparent md:hidden" />
          {/* A plain colour fade, no backdrop filter: the footage stays sharp. */}
          <div className="absolute inset-y-0 left-0 hidden w-[26%] bg-gradient-to-r from-cream to-transparent md:block" />
        </div>

        {/* Copy: headline group upper-left, step and CTA lower-left. */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-24 md:inset-y-0 md:flex md:flex-col md:justify-between md:px-12 md:pb-10 md:pt-[15svh]">
          <div className="max-w-md md:max-w-[24rem]">
            <motion.p
              className="text-xs font-medium tracking-[4px] uppercase text-warm-gold-dark"
              initial={ENTER}
              animate={SHOWN}
              transition={{ duration: DURATION.entrance, delay: 0.2, ease: EASE }}
            >
              {t('hero_seq_label')}
            </motion.p>

            <motion.h1
              id="eggcake-hero-title"
              className="mt-4 text-balance font-serif text-[clamp(40px,4.6vw,68px)] font-light leading-[0.95] tracking-[1px] text-charcoal"
              initial={ENTER}
              animate={SHOWN}
              transition={{ duration: DURATION.hero, delay: 0.35, ease: EASE }}
            >
              {t('hero_seq_title')}
            </motion.h1>

            <motion.p
              className="mt-5 hidden max-w-[21rem] font-sans text-base leading-relaxed text-charcoal-light md:block"
              initial={ENTER}
              animate={SHOWN}
              transition={{ duration: DURATION.entrance, delay: 0.55, ease: EASE }}
            >
              {t('hero_seq_body')}
            </motion.p>
          </div>

          <div>

            {/* The current step, swapped as the scroll crosses each quarter.
                Enter-only on purpose: a fast scroll crosses several steps at
                once, and a wait-mode exit can strand the old label on screen. */}
            <div className="mt-6 h-16 md:mt-8" aria-live="polite" aria-atomic="true">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={SHOWN}
                transition={{ duration: DURATION.state, ease: EASE }}
              >
                <p className="flex items-baseline gap-3 font-serif text-3xl text-charcoal">
                  <span className="font-sans text-sm font-medium tracking-[2px] text-warm-gold-dark">{pad(current)}</span>
                  {t(`hero_step_${current}_name`)}
                </p>
                <p className="mt-1 font-sans text-sm text-charcoal-light">
                  {t(`hero_step_${current}_caption`)}
                </p>
              </motion.div>
            </div>

            <motion.div
              className="mt-6"
              initial={ENTER}
              animate={SHOWN}
              transition={{ duration: DURATION.entrance, delay: 0.75, ease: EASE }}
            >
              <Button href="/menu/eggcakes" variant="gold" size="md">
                {t('hero_seq_cta')} <span aria-hidden="true">→</span>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Step tracker, desktop only: on phones it sat on the baker. Hidden under reduced motion: with no scroll track
            there is nothing for it to drive. */}
        <div
          role="group"
          aria-label={t('hero_seq_steps_label')}
          className="absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col items-center motion-reduce:hidden md:flex"
        >
          <div className="relative flex h-44 flex-col justify-between py-1 md:h-72">
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-charcoal/15" />
            <motion.div
              className="absolute inset-y-0 left-1/2 w-px origin-top -translate-x-1/2 bg-warm-gold"
              style={{ scaleY: trackFill }}
            />
            {STEPS.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => goToStep(i)}
                aria-current={i === step ? 'step' : undefined}
                aria-label={`${pad(s)} ${t(`hero_step_${s}_name`)}`}
                className={cn(
                  'relative flex h-8 w-8 items-center justify-center rounded-full text-[10px] tracking-[1px] transition-all duration-300',
                  i === step
                    ? 'bg-warm-gold text-white shadow-md'
                    : 'bg-cream text-charcoal-light shadow-sm hover:text-charcoal'
                )}
              >
                {pad(s)}
              </button>
            ))}
          </div>
        </div>

        {/* Prev / next. aria-disabled rather than disabled, so focus is not
            dropped to <body> when the last step is reached. */}
        <div className="absolute bottom-6 right-4 flex gap-2 motion-reduce:hidden md:bottom-10 md:right-10">
          {[
            { dir: -1, label: t('hero_seq_prev'), glyph: '←' },
            { dir: 1, label: t('hero_seq_next'), glyph: '→' },
          ].map(({ dir, label, glyph }) => {
            const atEnd = dir < 0 ? step === 0 : step === STEPS.length - 1;
            return (
              <button
                key={dir}
                type="button"
                onClick={() => goToStep(step + dir)}
                aria-label={label}
                aria-disabled={atEnd}
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/15 bg-cream text-charcoal shadow-sm transition-all duration-300',
                  atEnd ? 'cursor-default opacity-50' : 'hover:border-charcoal hover:bg-charcoal hover:text-cream'
                )}
              >
                <span aria-hidden="true">{glyph}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
