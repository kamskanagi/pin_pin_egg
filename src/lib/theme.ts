/**
 * Design-system color tokens — the single source for `tailwind.config.ts` and for the
 * few places that need raw color values outside Tailwind classes (Google Maps styles,
 * the `theme-color` meta tag). Components should use Tailwind classes, not these values.
 */
export const colors = {
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
} as const;
