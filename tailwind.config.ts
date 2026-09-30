import type { Config } from 'tailwindcss';
import { colors } from './src/lib/theme';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors,
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        'serif-tc': ['var(--font-serif-tc)', 'Noto Serif TC', 'serif'],
        sans: ['var(--font-sans)', 'DM Sans', 'sans-serif'],
      },
      maxWidth: {
        content: '1100px',
      },
      borderRadius: {
        '2xl': '16px',
        xl: '12px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      transitionDuration: {
        // Spec §4.5 nav transition. Not a Tailwind default, so `duration-400`
        // silently emitted nothing before this entry existed.
        400: '400ms',
      },
      keyframes: {
        // The track renders its children twice, so translating by half its
        // width lands exactly on the duplicate and the loop is seamless.
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        // Linear on purpose: easing a continuous loop makes it visibly pulse.
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
