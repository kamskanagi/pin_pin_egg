# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Pin Pin Café (品品Café) marketing website. Full spec in `pinpin-cafe-project-spec.md`.

## Project context

This is the marketing website for **Pin Pin Café (品品Café)**, a Taiwanese eggcake, tea, and coffee brand expanding internationally. They have no existing website. We are building one from scratch.

**Full spec:** Read `pinpin-cafe-project-spec.md` in the project root for complete details on pages, data models, design system, and component APIs. That document is the single source of truth — defer to it whenever there's ambiguity.

---

## Tech stack (do not deviate)

- **Framework:** Next.js 14+ with App Router (not Pages Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4+ — no CSS-in-JS, no styled-components
- **CMS:** Sanity v3 (headless)
- **i18n:** next-intl with `[locale]` dynamic segment
- **Animation:** framer-motion
- **Forms:** react-hook-form + zod
- **Maps:** @googlemaps/js-api-loader
- **Package manager:** pnpm (not npm, not yarn)
- **Deployment target:** Vercel

---

## Key commands

```bash
pnpm dev              # Start dev server (localhost:3000)
pnpm build            # Production build
pnpm lint             # ESLint
pnpm type-check       # TypeScript check (tsc --noEmit)
```

---

## Project structure

All source code lives under `src/`. Current layout:

```
src/app/[locale]/                    → Pages (route segments)
  page.tsx                           → Homepage
  about/page.tsx                     → About page
  about/craft/page.tsx               → Our Craft sub-page
  menu/page.tsx                      → Menu overview
  menu/eggcakes/page.tsx             → Eggcakes sub-category
  menu/drinks/page.tsx               → Drinks sub-category
  menu/seasonal/page.tsx             → Seasonal items sub-category
  locations/page.tsx                 → Store locator
  news/page.tsx                      → News listing
  news/[slug]/page.tsx               → News article detail
  contact/page.tsx                   → Contact + franchise inquiry forms
src/app/api/contact/route.ts         → Contact form handler (Resend)
src/app/api/revalidate/route.ts      → Sanity ISR webhook handler
src/components/                      → React components, grouped by feature
src/components/ui/                   → Reusable primitives (Button, Badge, etc.)
src/components/layout/               → Navbar, Footer, LanguageSwitcher, MobileMenu
src/components/home/                 → Hero, MenuHighlights, LocationsPreview, etc.
src/components/menu/                 → MenuCard, MenuGrid, CategoryFilter, PriceDisplay
src/components/locations/            → StoreCard, StoreMap, CountryFilter
src/components/news/                 → NewsCard, NewsGrid
src/components/contact/              → ContactForm, FranchiseForm
src/lib/sanity/                      → client.ts, queries.ts, image.ts, schemas/
src/lib/i18n/                        → config.ts, navigation.ts, request.ts
src/lib/schemas/contact.ts           → Zod schemas for contact/franchise forms
src/lib/placeholder-data.ts          → Static data used until Sanity is connected
src/lib/utils.ts                     → Shared utilities
src/messages/                        → Translation JSON files (zh-TW.json, en.json, ja.json)
src/styles/globals.css               → Tailwind directives, CSS custom properties
src/types/                           → TypeScript type definitions
```

### Current data source

Pages currently render from `src/lib/placeholder-data.ts` (flat objects with `nameZh/nameEn/nameJa` fields), not from Sanity. Sanity integration is wired but requires env vars to activate. Migrate a page to Sanity by replacing placeholder imports with `sanityFetch()` calls using queries from `src/lib/sanity/queries.ts`.

---

## Coding standards

### TypeScript
- Strict mode enabled, no `any` types
- Use interfaces for component props, types for unions/utilities
- Export types from `src/types/` — components import from there
- All Sanity query results must be typed

### Components
- Functional components only, no class components
- Use `'use client'` directive only when needed (interactivity, hooks, browser APIs)
- Default to Server Components — keep client components small and leaf-level
- Props interfaces named `{ComponentName}Props`
- One component per file, filename matches component name (PascalCase)
- Co-locate component-specific types in the same file if small, otherwise in `src/types/`

### Styling
- Tailwind utility classes as the primary styling method
- Use the `cn()` utility (clsx + tailwind-merge) for conditional classes
- Design system tokens are defined in `tailwind.config.ts` — always use them:
  - Colors: `cream`, `cream-dark`, `warm-gold`, `warm-gold-light`, `warm-gold-dark`, `charcoal`, `charcoal-light`, `charcoal-muted`
  - Accents: `accent-matcha`, `accent-coral`, `accent-coffee`
- Never hardcode hex colors in components — use Tailwind classes
- CSS custom properties in `globals.css` are only for values Tailwind can't handle

### Fonts
- Load via `next/font/google` in the root layout
- Three font families:
  - `Cormorant Garamond` → display/headings (English)
  - `Noto Serif TC` → display/headings (Chinese)
  - `DM Sans` → body text
- Map to CSS variables: `--font-serif`, `--font-serif-tc`, `--font-sans`
- Extend in Tailwind config: `fontFamily: { serif, 'serif-tc', sans }`

### i18n
- All user-facing strings come from `src/messages/{locale}.json` — never hardcode text
- Use `useTranslations('namespace')` in client components
- Use `getTranslations('namespace')` in server components
- CMS content uses `LocaleString` fields — read the correct locale in queries
- Default locale is `zh-TW` (no URL prefix). `en` and `ja` get prefixes.
- Fallback chain for CMS content: requested locale → `en` → `zh`

### Data fetching
- Use `sanityFetch<T>(query, params?)` from `src/lib/sanity/client.ts` — never call `client.fetch()` directly
- GROQ queries live in `src/lib/sanity/queries.ts`
- ISR default: `revalidate: 60` (set inside `sanityFetch`); on-demand via `POST /api/revalidate` webhook
- Google Maps loads client-side only

### Animations
- Use framer-motion for page transitions and complex animations
- Use CSS transitions for simple hover/focus states
- All animations must respect `prefers-reduced-motion`:
  ```tsx
  const prefersReducedMotion = useReducedMotion();
  ```
- Scroll-triggered entrances: fade-up 30px, 0.8s duration, stagger 0.15s
- Card hover: translateY(-8px) + shadow, 0.5s ease

### Forms
- react-hook-form for state management
- zod for validation schemas
- Server-side validation in API routes (never trust client-only validation)
- Show inline errors below fields
- Disable submit button while submitting, show loading state

---

## Design system quick reference

### Color mapping (Tailwind classes)

| Token | Usage |
|---|---|
| `bg-cream` | Page background |
| `bg-white` | Cards, alternate sections |
| `bg-charcoal` | Dark sections (locations, footer) |
| `bg-warm-gold` | CTA banners, accents |
| `text-charcoal` | Primary text |
| `text-charcoal-light` | Secondary text |
| `text-charcoal-muted` | Captions, meta |
| `text-warm-gold` | Accent text, labels |
| `border-warm-gold/15` | Subtle gold borders |

### Typography patterns

```
Hero title:     font-serif text-[clamp(80px,12vw,140px)] font-light tracking-[6px]
Section title:  font-serif text-4xl font-normal
Section label:  text-xs tracking-[4px] uppercase text-warm-gold
Body:           font-sans text-[15px] leading-relaxed text-charcoal-muted
Card title:     font-serif text-2xl font-normal
Card subtitle:  font-serif-tc text-sm text-charcoal-muted
Price:          text-sm tracking-wide font-medium text-warm-gold-dark
Nav links:      text-[13px] tracking-[1.5px] uppercase
```

### Spacing patterns

```
Section padding:     py-24 px-12 (desktop) → py-16 px-6 (mobile)
Card padding:        p-7
Content max-width:   max-w-[1100px] mx-auto
Card grid gap:       gap-8
Card border-radius:  rounded-2xl
Button radius:       rounded-sm (intentionally sharp)
```

### Nav behavior

The navbar has two visual states:
1. **Hero-visible:** Transparent background, white text, positioned over hero image
2. **Scrolled:** Frosted glass (`bg-cream/88 backdrop-blur-xl`), dark text, border-bottom

Transition happens when hero section scrolls past the nav height. Use IntersectionObserver or scroll position check.

---

## File naming conventions

| Type | Convention | Example |
|---|---|---|
| Components | PascalCase | `MenuCard.tsx` |
| Pages | `page.tsx` (Next.js convention) | `src/app/[locale]/menu/page.tsx` |
| Layouts | `layout.tsx` | `src/app/[locale]/layout.tsx` |
| API routes | `route.ts` | `src/app/api/contact/route.ts` |
| Utilities | camelCase | `utils.ts`, `queries.ts` |
| Types | camelCase | `menu.ts`, `location.ts` |
| Translation files | locale code | `zh-TW.json`, `en.json`, `ja.json` |
| Sanity schemas | camelCase | `menuItem.ts`, `storeLocation.ts` |

---

## Shared utilities (`src/lib/utils.ts`)

All four utilities are implemented — import directly, don't re-implement:

```typescript
cn(...inputs)                           // clsx + tailwind-merge
formatPrice(amount, currency?)          // NT$60 or ¥300
getLocalizedValue(obj, locale)          // { zh, en, ja } → T (for placeholder data)
getLocalizedString(obj: LocaleString, locale)  // Sanity LocaleString → string
```

`LocaleString` (from `src/types/sanity.ts`) is the Sanity field shape `{ zh: string; en: string; ja: string }`. `getLocalizedString` maps `zh-TW` locale to the `zh` key.

---

## Environment variables

Required in `.env.local` before running the project:

```
NEXT_PUBLIC_SANITY_PROJECT_ID     # From sanity.io dashboard
NEXT_PUBLIC_SANITY_DATASET        # Usually "production"
NEXT_PUBLIC_SANITY_API_VERSION    # "2026-03-01"
SANITY_API_TOKEN                  # For server-side preview/mutations
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY   # For store locator map
RESEND_API_KEY                    # For contact form emails
CONTACT_EMAIL_TO                  # Recipient email address
SANITY_REVALIDATE_SECRET          # Webhook secret for ISR
NEXT_PUBLIC_SITE_URL              # Production URL
```

If a key is missing, the related feature should degrade gracefully (no crash). Show a console warning in dev mode.

---

## What NOT to do

- Do not use Pages Router — App Router only
- Do not use CSS Modules or styled-components — Tailwind only
- Do not use `getServerSideProps` or `getStaticProps` — use Server Components
- Do not hardcode any user-facing text — everything goes through next-intl
- Do not hardcode color hex values in components — use Tailwind design tokens
- Do not fetch Sanity data on the client for initial page loads — Server Components
- Do not install UI libraries (shadcn, MUI, Chakra) — we build our own components
- Do not use `next/image` `fill` prop without a sized container — always set dimensions
- Do not create barrel exports (`index.ts` re-exports) — import directly from files
- Do not use default exports for components — use named exports (except `page.tsx` and `layout.tsx` which Next.js requires as default)
- Do not put `'use client'` on components that don't need it

---

## Build status

Phases 1–6 are complete (scaffolding, homepage, menu, locations, news, contact). Remaining work is phase 7:

- **Polish** — Page transitions, responsive QA, a11y audit, SEO metadata per-page, performance
- **Sanity migration** — Replace `src/lib/placeholder-data.ts` usage with live `sanityFetch()` calls once Sanity is configured

---

## Testing quick checks

After each phase, verify:
- `pnpm build` succeeds with no errors
- `pnpm lint` passes
- `pnpm type-check` passes
- All three locales render correctly (`/`, `/en`, `/ja`)
- Mobile viewport (375px) looks correct
- No hydration warnings in console
- No layout shifts on page load
