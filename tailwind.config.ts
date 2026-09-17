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
    },
  },
  plugins: [],
};

export default config;
