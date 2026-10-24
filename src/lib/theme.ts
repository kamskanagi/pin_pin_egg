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
    // Deepened from #A68B52 so small gold labels pass WCAG AA on cream (5.3:1).
    dark: '#7E6234',
  },
  charcoal: {
    DEFAULT: '#2A2520',
    light: '#4A4440',
    // Deepened from #7A756F so captions pass WCAG AA on cream-dark too.
    muted: '#68635D',
  },
  'accent-matcha': '#8BA888',
  'accent-coral': '#D4856A',
  'accent-coffee': '#8B7355',
} as const;
