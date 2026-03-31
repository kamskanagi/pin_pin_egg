import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF6F0',
          dark: '#F2EBE0',
        },
        'warm-gold': {
          DEFAULT: '#C8A96E',
          light: '#E8D5B0',
          dark: '#A68B52',
        },
        charcoal: {
          DEFAULT: '#2A2520',
          light: '#4A4440',
          muted: '#7A756F',
        },
        'accent-matcha': '#8BA888',
        'accent-coral': '#D4856A',
        'accent-coffee': '#8B7355',
      },
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
