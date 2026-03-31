# Pin Pin Café (品品Café) — Website Project Specification

> **Version:** 1.0
> **Date:** March 29, 2026
> **Status:** Ready for development
> **Dev tool:** Claude Code

---

## 1. Project overview

### 1.1 About the client

Pin Pin Café (品品Café) is a Taiwanese eggcake (雞蛋仔), tea, and coffee brand. They are the self-described "No.1 eggcake brand in department stores" in Taiwan. Their name "品品" means "to taste, and taste again" — a play on the Chinese character 品 (pǐn), which means to savor or appreciate. Their tagline is: **品嚐美食、品茶之韻、品味人生** ("Taste the food, taste the tea, taste the life").

They specialize in crispy-outside, QQ-soft-inside Hong Kong-style egg waffles (雞蛋仔) with various flavors, premium teas, and specialty coffee.

### 1.2 Current presence

- **Instagram:** [@pinpin_eggcake](https://www.instagram.com/pinpin_eggcake/) (~1,100 followers)
- **Facebook:** [品品 CAFÉ • 雞蛋仔](https://www.facebook.com/pinpineggcake/) (~2,800 likes)
- **Website:** None (this project)

### 1.3 Store locations

**Taiwan:**
1. Taichung Mitsui Outlet Park (台中港三井 Outlet)
2. Taichung LaLaport South Building 1F (台中 LaLaport 南館1F)
3. Nangang LaLaport B1 Food Court (南港 LaLaport B1 美食街)

**Japan:**
4. Tokyo Nakameguro (東京中目黒店) — Instagram: @pinpinnakameguro

### 1.4 Project goal

Build a modern, clean, bilingual (trilingual) marketing website that:
- Establishes Pin Pin Café's digital presence and brand identity
- Showcases their menu (eggcakes, tea, coffee)
- Helps customers find store locations
- Supports international expansion (franchise inquiries)
- Serves as the canonical brand hub across Taiwan and Japan

### 1.5 Non-goals (out of scope for v1)

- Online ordering / e-commerce
- User accounts / loyalty program
- Payment processing
- Mobile app

---

## 2. Tech stack

### 2.1 Framework & runtime

| Layer | Technology | Rationale |
|---|---|---|
| Framework | **Next.js 14+ (App Router)** | SSR/SSG for SEO, built-in i18n routing, React ecosystem |
| Language | **TypeScript** | Type safety across components and CMS data |
| Runtime | **Node.js 20+** | LTS, required for Next.js |
| Package manager | **pnpm** | Fast, disk-efficient |

### 2.2 Styling

| Tool | Usage |
|---|---|
| **Tailwind CSS 3.4+** | Utility-first styling, custom theme config |
| **tailwind-merge** | Conditional class merging |
| **clsx** | Conditional class construction |
| CSS Modules | Only if component-scoped overrides are needed |

### 2.3 Content management

| Tool | Usage |
|---|---|
| **Sanity v3** | Headless CMS for menu items, locations, news posts, seasonal content |
| **@sanity/image-url** | Responsive image URL builder |
| **next-sanity** | Next.js integration, preview mode |

### 2.4 Internationalization

| Tool | Usage |
|---|---|
| **next-intl** | Message-based i18n with App Router support |
| Locales | `zh-TW` (default, no prefix), `en`, `ja` |
| Strategy | Prefix-based routing: `/en/menu`, `/ja/menu`, `/menu` (zh-TW) |

### 2.5 Deployment & infrastructure

| Tool | Usage |
|---|---|
| **Vercel** | Hosting, edge network, preview deployments |
| **GitHub** | Source control |
| Domain | TBD — likely `pinpincafe.com` or `pinpingroup.com` |

### 2.6 Other dependencies

| Package | Purpose |
|---|---|
| `framer-motion` | Page transitions, scroll animations, micro-interactions |
| `@googlemaps/js-api-loader` | Store locator map |
| `react-hook-form` + `zod` | Contact/franchise form validation |
| `@vercel/analytics` | Web analytics |
| `@vercel/speed-insights` | Performance monitoring |
| `sharp` | Image optimization (Next.js image pipeline) |

---

## 3. Project structure

```
pinpin-cafe/
├── public/
│   ├── fonts/                    # Self-hosted web fonts
│   ├── images/                   # Static images (logo, icons, og-image)
│   │   ├── logo.svg
│   │   ├── logo-white.svg
│   │   └── og-image.jpg
│   └── favicon.ico
│
├── src/
│   ├── app/
│   │   ├── [locale]/             # i18n dynamic segment
│   │   │   ├── layout.tsx        # Root layout (nav, footer, fonts)
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── about/
│   │   │   │   ├── page.tsx      # Our story
│   │   │   │   └── craft/
│   │   │   │       └── page.tsx  # Craftsmanship
│   │   │   ├── menu/
│   │   │   │   ├── page.tsx      # Menu overview (all categories)
│   │   │   │   ├── eggcakes/
│   │   │   │   │   └── page.tsx  # Eggcake detail grid
│   │   │   │   ├── drinks/
│   │   │   │   │   └── page.tsx  # Tea & coffee
│   │   │   │   └── seasonal/
│   │   │   │       └── page.tsx  # Current seasonal items
│   │   │   ├── locations/
│   │   │   │   └── page.tsx      # Store locator with map
│   │   │   ├── news/
│   │   │   │   ├── page.tsx      # News listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx  # Individual news post
│   │   │   └── contact/
│   │   │       └── page.tsx      # Contact + franchise inquiry
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts      # Contact form handler
│   │   │   └── revalidate/
│   │   │       └── route.ts      # Sanity webhook for ISR
│   │   ├── sitemap.ts            # Dynamic sitemap generation
│   │   └── robots.ts             # Robots.txt generation
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Sticky nav with scroll behavior
│   │   │   ├── NavbarLinks.tsx    # Desktop nav links
│   │   │   ├── MobileMenu.tsx     # Mobile hamburger menu
│   │   │   ├── Footer.tsx         # Site footer
│   │   │   └── LanguageSwitcher.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx           # Full-bleed hero with animation
│   │   │   ├── PhilosophyStrip.tsx # "品" brand story section
│   │   │   ├── MenuHighlights.tsx  # 3-card featured menu
│   │   │   ├── LocationsPreview.tsx # Location cards (dark bg)
│   │   │   ├── InstagramFeed.tsx   # IG grid section
│   │   │   └── CtaBanner.tsx       # Gold CTA banner
│   │   ├── menu/
│   │   │   ├── MenuCard.tsx        # Individual menu item card
│   │   │   ├── MenuGrid.tsx        # Responsive product grid
│   │   │   ├── CategoryFilter.tsx  # Filter tabs (all/classic/seasonal)
│   │   │   └── PriceDisplay.tsx    # Currency-aware price
│   │   ├── locations/
│   │   │   ├── StoreMap.tsx        # Google Maps integration
│   │   │   ├── StoreCard.tsx       # Individual store info card
│   │   │   └── CountryFilter.tsx   # Taiwan/Japan filter
│   │   ├── news/
│   │   │   ├── NewsCard.tsx        # Article preview card
│   │   │   └── NewsGrid.tsx        # Article listing grid
│   │   ├── contact/
│   │   │   ├── ContactForm.tsx     # General inquiry form
│   │   │   └── FranchiseForm.tsx   # Business inquiry form
│   │   └── ui/
│   │       ├── Button.tsx          # Reusable button variants
│   │       ├── SectionHeader.tsx   # Label + title pattern
│   │       ├── ScrollReveal.tsx    # Intersection Observer wrapper
│   │       ├── ImageWithFallback.tsx
│   │       └── Badge.tsx           # "Seasonal", "New", "Signature" tags
│   │
│   ├── lib/
│   │   ├── sanity/
│   │   │   ├── client.ts          # Sanity client config
│   │   │   ├── queries.ts         # All GROQ queries
│   │   │   ├── schemas/           # Sanity schema definitions
│   │   │   │   ├── menuItem.ts
│   │   │   │   ├── menuCategory.ts
│   │   │   │   ├── storeLocation.ts
│   │   │   │   ├── newsPost.ts
│   │   │   │   └── siteSettings.ts
│   │   │   └── image.ts           # Image URL helpers
│   │   ├── i18n/
│   │   │   ├── config.ts          # Locale config, default locale
│   │   │   ├── request.ts         # next-intl request config
│   │   │   └── navigation.ts      # Localized link/redirect helpers
│   │   └── utils.ts               # Shared utilities (cn, formatPrice)
│   │
│   ├── messages/                   # i18n translation files
│   │   ├── zh-TW.json
│   │   ├── en.json
│   │   └── ja.json
│   │
│   ├── styles/
│   │   └── globals.css            # Tailwind directives, font-face, CSS vars
│   │
│   └── types/
│       ├── menu.ts                # MenuItem, MenuCategory types
│       ├── location.ts            # StoreLocation type
│       ├── news.ts                # NewsPost type
│       └── sanity.ts              # Sanity-specific utility types
│
├── sanity/                        # Sanity Studio (embedded or separate)
│   ├── sanity.config.ts
│   ├── sanity.cli.ts
│   └── schemas/
│       └── index.ts
│
├── .env.local                     # Environment variables (not committed)
├── .env.example                   # Template for env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Design system

### 4.1 Color palette

```
Primary palette (warm, golden, earthy):

--cream:            #FAF6F0    (page background)
--cream-dark:       #F2EBE0    (secondary background)
--warm-gold:        #C8A96E    (brand accent, CTAs)
--warm-gold-light:  #E8D5B0    (highlights, hover states)
--warm-gold-dark:   #A68B52    (pressed states, emphasis)
--charcoal:         #2A2520    (primary text, dark sections)
--charcoal-light:   #4A4440    (secondary text)
--charcoal-muted:   #7A756F    (tertiary text, captions)
--white:            #FFFFFF    (cards, surfaces)

Accent colors (menu categories):

--accent-matcha:    #8BA888    (tea / matcha items)
--accent-coral:     #D4856A    (seasonal / warm items)
--accent-coffee:    #8B7355    (coffee items)
```

### 4.2 Typography

| Role | Font | Weight | Size (desktop) |
|---|---|---|---|
| Display / hero | Cormorant Garamond | 300, 400 | 80–140px (clamp) |
| Chinese display | Noto Serif TC | 300, 400, 500 | 80–140px (clamp) |
| Section titles | Cormorant Garamond | 400 | 32–40px |
| Body text | DM Sans | 300, 400, 500 | 14–16px |
| Labels / caps | DM Sans | 400, 500 | 11–13px, letter-spacing: 2–4px |
| Chinese body | Noto Sans TC (fallback) | 400 | 14–16px |

**Font loading strategy:** Self-host via `next/font/google` with `display: swap`. Preload the primary weights.

### 4.3 Spacing scale

Use Tailwind's default spacing scale. Key design tokens:
- Section vertical padding: `py-24` (96px) desktop, `py-16` (64px) mobile
- Card padding: `p-7` (28px)
- Component gap: `gap-8` (32px) between cards
- Max content width: `max-w-5xl` (1100px) for content, full bleed for hero/CTA

### 4.4 Border radius

- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-sm` (2px) — intentionally sharp, editorial feel
- Badges: `rounded-full` (pill)
- Location cards: `rounded-xl` (12px)

### 4.5 Animation principles

- **Entrance:** Fade-up with 30–40px translate, 0.8s duration, staggered 0.15s per item
- **Hover (cards):** translateY(-8px) + shadow expand, 0.5s cubic-bezier(0.23,1,0.32,1)
- **Hover (images):** scale(1.05), 0.6s ease
- **Nav transition:** background/backdrop-filter on scroll, 0.4s
- **Page transitions:** Fade between routes using framer-motion AnimatePresence
- **Scroll trigger:** IntersectionObserver with threshold 0.15, rootMargin "0px 0px -40px 0px"

---

## 5. Page specifications

### 5.1 Homepage (`/`)

**Sections in order:**

1. **Hero** — Full viewport height. Background: product photography with dark gradient overlay. Centered content: "品品" in massive serif, "Eggcake × Tea × Coffee" subtitle, divider line, Chinese tagline. Scroll indicator at bottom.

2. **Philosophy strip** — White background. Left: giant "品" character in gold-light. Right: English heading + paragraph about brand story. Scroll-triggered entrance.

3. **Menu highlights** — Cream background. Section header ("Signature selections" / "Our Menu"). 3-column grid of cards: Eggcakes, Tea Collection, Coffee. Each card: category image, badge, name (EN), name (ZH), description, starting price. Link to full menu.

4. **Locations** — Dark charcoal background, white text. 4-column grid of store cards. Each: country flag label, store name, address. Japan card has gold accent border. Link to store locator.

5. **Instagram feed** — White background. 6-column grid of latest posts (placeholders in v1, live feed in v2). Link to @pinpin_eggcake.

6. **CTA banner** — Gold gradient background. Heading + subtext + white button ("View locations").

**Data sources:** Menu highlights from Sanity (featured flag), locations from Sanity, Instagram from static or API.

### 5.2 About — Our Story (`/about`)

- Hero image with overlay text
- Brand origin narrative (copywriting needed from client)
- Timeline component: key milestones (first store, department store expansion, Japan launch)
- Philosophy section with the 品 character motif
- Team/founder section (optional, depends on client)

### 5.3 About — Craftsmanship (`/about/craft`)

- Step-by-step visual storytelling of how eggcakes are made
- Ingredient sourcing details
- Quality philosophy (low-sugar, made to order)
- Photography or video embed

### 5.4 Menu (`/menu`)

Overview page with links to subcategories. May include a "featured" or "popular" section.

### 5.5 Menu — Eggcakes (`/menu/eggcakes`)

- Filterable grid: All / Classic / Seasonal / Limited Edition
- Each card: image, name (EN + ZH), description, price, badge (signature/seasonal/new)
- Data from Sanity `menuItem` where `category == "eggcake"`

### 5.6 Menu — Drinks (`/menu/drinks`)

- Split into Tea and Coffee subsections
- Same card pattern as eggcakes
- Optional: "Pairs well with..." recommendation links

### 5.7 Menu — Seasonal (`/menu/seasonal`)

- Currently available seasonal items with "limited" badge
- Optional countdown or availability note
- Archive of past seasonal items

### 5.8 Locations (`/locations`)

- Interactive Google Map with store pins (custom gold pin marker)
- Country/region filter tabs (All / Taiwan / Japan)
- Store cards below map: name, address, hours, nearest transit, photo
- "Coming soon" placeholder for future locations
- Each card links to Google Maps directions

### 5.9 News (`/news`)

- Reverse-chronological blog feed
- Category filter: All / New Flavors / Store Openings / Events
- Card: featured image, title, date, excerpt, category badge
- Pagination or "Load more"

### 5.10 News — Article (`/news/[slug]`)

- Full article with Sanity Portable Text rendering
- Featured image hero
- Share buttons (LINE, Facebook, copy link)
- Related articles at bottom

### 5.11 Contact (`/contact`)

- Two-tab or two-section layout:
  - **General inquiry:** name, email, subject, message
  - **Franchise / partnership:** company name, contact person, email, phone, country, message, budget range
- Form validation with zod schemas
- Submission sends to configured email (via API route or third-party like Resend)
- Social media links sidebar
- Optional: press kit download

---

## 6. Data models (Sanity schemas)

### 6.1 Menu item (`menuItem`)

```typescript
{
  _type: 'menuItem',
  name: LocaleString,           // { zh: '原味雞蛋仔', en: 'Original Eggcake', ja: 'オリジナルエッグケーキ' }
  slug: Slug,
  category: Reference<MenuCategory>,
  description: LocaleText,
  price: {
    twd: number,                // NT$ price
    jpy?: number,               // ¥ price (optional, Japan-only items)
  },
  image: Image,
  badges: Array<'signature' | 'seasonal' | 'new' | 'limited'>,
  isFeatured: boolean,          // Show on homepage
  isAvailable: boolean,         // Currently on menu
  seasonalDates?: {             // For seasonal items
    start: Date,
    end: Date,
  },
  pairsWith?: Array<Reference<MenuItem>>,
  sortOrder: number,
}
```

### 6.2 Menu category (`menuCategory`)

```typescript
{
  _type: 'menuCategory',
  name: LocaleString,           // { zh: '雞蛋仔系列', en: 'Eggcakes', ja: 'エッグケーキ' }
  slug: Slug,                   // 'eggcakes', 'drinks', 'seasonal'
  description: LocaleText,
  icon?: Image,
  sortOrder: number,
}
```

### 6.3 Store location (`storeLocation`)

```typescript
{
  _type: 'storeLocation',
  name: LocaleString,           // { zh: '台中港三井 Outlet', en: 'Mitsui Outlet Park', ja: '三井アウトレットパーク' }
  slug: Slug,
  country: 'taiwan' | 'japan',
  city: LocaleString,
  address: LocaleString,
  coordinates: {
    lat: number,
    lng: number,
  },
  hours: LocaleString,          // '11:00–21:00'
  nearestTransit?: LocaleString,
  phone?: string,
  photo?: Image,
  googleMapsUrl: URL,
  instagramHandle?: string,     // For Nakameguro: '@pinpinnakameguro'
  isComingSoon: boolean,
  sortOrder: number,
}
```

### 6.4 News post (`newsPost`)

```typescript
{
  _type: 'newsPost',
  title: LocaleString,
  slug: Slug,
  category: 'new-flavor' | 'store-opening' | 'collaboration' | 'event',
  excerpt: LocaleText,
  body: LocalePortableText,     // Rich text with images
  featuredImage: Image,
  publishedAt: DateTime,
  isFeatured: boolean,
}
```

### 6.5 Site settings (`siteSettings`)

```typescript
{
  _type: 'siteSettings',
  siteName: LocaleString,
  tagline: LocaleString,
  description: LocaleString,     // For meta description
  ogImage: Image,
  socialLinks: {
    instagram: URL,
    facebook: URL,
    line: URL,
  },
  announcementBar?: {
    text: LocaleString,
    link?: URL,
    isActive: boolean,
  },
}
```

### 6.6 Shared types

```typescript
type LocaleString = {
  zh: string;
  en: string;
  ja: string;
};

type LocaleText = {
  zh: string;
  en: string;
  ja: string;
};

type LocalePortableText = {
  zh: PortableTextBlock[];
  en: PortableTextBlock[];
  ja: PortableTextBlock[];
};
```

---

## 7. Internationalization (i18n)

### 7.1 Routing

| Locale | URL pattern | Example |
|---|---|---|
| `zh-TW` (default) | `/path` | `/menu/eggcakes` |
| `en` | `/en/path` | `/en/menu/eggcakes` |
| `ja` | `/ja/path` | `/ja/menu/eggcakes` |

### 7.2 Translation file structure

```json
// messages/en.json
{
  "nav": {
    "about": "About",
    "menu": "Menu",
    "locations": "Locations",
    "news": "News",
    "contact": "Contact"
  },
  "home": {
    "hero_tagline": "Eggcake × Tea × Coffee",
    "hero_philosophy": "Taste the food · Taste the tea · Taste the life",
    "menu_section_label": "Signature selections",
    "menu_section_title": "Our Menu",
    "locations_section_label": "Find us",
    "locations_section_title": "Our Locations",
    "cta_title": "Find your nearest Pin Pin Café",
    "cta_subtitle": "From Taichung to Tokyo — your next eggcake moment awaits.",
    "view_locations": "View locations",
    "view_full_menu": "View full menu"
  },
  "menu": {
    "filter_all": "All",
    "filter_classic": "Classic",
    "filter_seasonal": "Seasonal",
    "filter_limited": "Limited Edition",
    "from_price": "From {price}",
    "pairs_with": "Pairs well with"
  },
  "locations": {
    "taiwan": "Taiwan",
    "japan": "Japan",
    "coming_soon": "Coming soon",
    "get_directions": "Get directions",
    "hours": "Hours"
  },
  "contact": {
    "general": "General inquiry",
    "franchise": "Franchise inquiry",
    "name": "Name",
    "email": "Email",
    "message": "Message",
    "submit": "Send message",
    "success": "Thank you! We'll be in touch.",
    "company": "Company name",
    "phone": "Phone number",
    "country": "Country",
    "budget": "Budget range"
  },
  "common": {
    "scroll": "Scroll",
    "read_more": "Read more",
    "share": "Share",
    "follow_instagram": "Follow @pinpin_eggcake on Instagram",
    "back": "Back",
    "loading": "Loading..."
  },
  "footer": {
    "rights": "© {year} 品品Café. All rights reserved.",
    "privacy": "Privacy policy",
    "terms": "Terms of use"
  }
}
```

### 7.3 CMS content language

All Sanity content uses the `LocaleString` / `LocaleText` pattern. The frontend reads the correct locale field based on the active language. Fallback chain: requested locale → `en` → `zh`.

---

## 8. SEO & metadata

### 8.1 Per-page metadata

Each page exports a `generateMetadata` function returning:

```typescript
{
  title: `${pageTitle} | 品品Café`,
  description: localizedDescription,
  alternates: {
    canonical: canonicalUrl,
    languages: {
      'zh-TW': '/path',
      'en': '/en/path',
      'ja': '/ja/path',
    },
  },
  openGraph: {
    title, description, images: [ogImage],
    locale: currentLocale,
    type: 'website', // or 'article' for news
  },
}
```

### 8.2 Structured data (JSON-LD)

- **Organization** schema on all pages (name, logo, social links)
- **Restaurant** schema on homepage and locations (address, hours, cuisine type)
- **BreadcrumbList** on all inner pages
- **Article** schema on news posts (headline, datePublished, author)

### 8.3 Technical SEO

- Dynamic `sitemap.xml` via `src/app/sitemap.ts` (includes all localized URLs)
- Dynamic `robots.txt` via `src/app/robots.ts`
- Canonical URLs on every page
- hreflang tags via `alternates.languages`
- Next.js Image component for all images (WebP/AVIF, responsive srcset)

---

## 9. Performance targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| LCP (Largest Contentful Paint) | < 2.5s |
| FID (First Input Delay) | < 100ms |
| CLS (Cumulative Layout Shift) | < 0.1 |
| Total bundle size (JS) | < 150KB gzipped |
| Image format | WebP/AVIF via Next.js Image |
| Font loading | `display: swap`, preload primary weights |

---

## 10. Environment variables

```bash
# .env.example

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2026-03-01
SANITY_API_TOKEN=                    # Server-side only, for preview/mutations

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Contact form
RESEND_API_KEY=                      # Or alternative email service
CONTACT_EMAIL_TO=hello@pinpincafe.com

# Analytics
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=

# Revalidation
SANITY_REVALIDATE_SECRET=            # Webhook secret for on-demand ISR

# Site
NEXT_PUBLIC_SITE_URL=https://pinpincafe.com
```

---

## 11. Development workflow

### 11.1 Getting started

```bash
# Clone and install
git clone <repo-url>
cd pinpin-cafe
pnpm install

# Set up environment
cp .env.example .env.local
# Fill in values

# Run development server
pnpm dev

# Run Sanity Studio (if embedded)
pnpm sanity:dev
```

### 11.2 Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Production (auto-deploys to Vercel) |
| `develop` | Integration branch |
| `feature/*` | Feature branches off develop |
| `fix/*` | Bug fixes |

### 11.3 Development phases (Claude Code tasks)

**Phase 1 — Scaffolding & core setup**
```
Tasks:
1. Initialize Next.js 14 project with TypeScript, Tailwind, pnpm
2. Configure tailwind.config.ts with the design system tokens (colors, fonts, spacing)
3. Set up next-intl with zh-TW/en/ja routing
4. Create the base layout (Navbar, Footer, LanguageSwitcher)
5. Set up global CSS with font-face declarations and CSS variables
6. Create the reusable UI components (Button, SectionHeader, ScrollReveal, Badge)
7. Configure Sanity project + schemas
8. Create lib/sanity/client.ts with GROQ query helpers
```

**Phase 2 — Homepage**
```
Tasks:
1. Build Hero component with entrance animations
2. Build PhilosophyStrip with scroll-triggered reveal
3. Build MenuHighlights with 3-card grid and hover effects
4. Build LocationsPreview (dark section) with store cards
5. Build InstagramFeed placeholder grid
6. Build CtaBanner with gold gradient
7. Assemble homepage from components
8. Add page metadata and JSON-LD
```

**Phase 3 — Menu pages**
```
Tasks:
1. Build MenuCard component with image, badges, price display
2. Build MenuGrid with responsive layout
3. Build CategoryFilter tabs
4. Build PriceDisplay with currency toggle (TWD/JPY)
5. Create /menu overview page
6. Create /menu/eggcakes, /menu/drinks, /menu/seasonal pages
7. Wire up Sanity queries for menu data
8. Add page metadata
```

**Phase 4 — Locations page**
```
Tasks:
1. Build StoreMap with Google Maps, custom markers
2. Build StoreCard component
3. Build CountryFilter
4. Create /locations page
5. Wire up Sanity queries for location data
6. Add JSON-LD Restaurant schema per location
```

**Phase 5 — News pages**
```
Tasks:
1. Build NewsCard component
2. Build NewsGrid with category filter
3. Create /news listing page with pagination
4. Create /news/[slug] article page with Portable Text rendering
5. Add share buttons (LINE, Facebook, copy link)
6. Wire up Sanity queries
7. Add Article JSON-LD
```

**Phase 6 — Contact page**
```
Tasks:
1. Build ContactForm with react-hook-form + zod
2. Build FranchiseForm with business-specific fields
3. Create /contact page with tab/section layout
4. Build API route for form submission (Resend or similar)
5. Add success/error states
```

**Phase 7 — Polish & launch prep**
```
Tasks:
1. Add framer-motion page transitions
2. Responsive QA across breakpoints (mobile, tablet, desktop)
3. Accessibility audit (keyboard nav, screen reader, contrast)
4. Set up Vercel deployment
5. Configure custom domain
6. Set up Sanity webhook for on-demand ISR
7. Performance audit (Lighthouse, bundle analysis)
8. Create sitemap.ts and robots.ts
9. Final content entry in Sanity
```

---

## 12. Component API reference

### 12.1 Key component props

```typescript
// Button
interface ButtonProps {
  variant: 'outline' | 'solid' | 'white' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  href?: string;       // Renders as link if provided
  children: ReactNode;
  className?: string;
}

// SectionHeader
interface SectionHeaderProps {
  label: string;       // Uppercase small text
  title: string;       // Large serif title
  alignment?: 'center' | 'left';
  theme?: 'light' | 'dark';
}

// ScrollReveal
interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;      // Stagger delay in seconds
  direction?: 'up' | 'left' | 'right';
  className?: string;
}

// MenuCard
interface MenuCardProps {
  item: MenuItem;
  locale: Locale;
}

// StoreCard
interface StoreCardProps {
  store: StoreLocation;
  locale: Locale;
  compact?: boolean;   // For homepage preview
}

// PriceDisplay
interface PriceDisplayProps {
  twd: number;
  jpy?: number;
  locale: Locale;
  prefix?: string;     // "From" / "從"
}
```

---

## 13. Accessibility requirements

- WCAG 2.1 AA compliance
- All images have descriptive `alt` text (bilingual from Sanity)
- Focus-visible outlines on all interactive elements
- Skip-to-content link
- Semantic HTML5 landmarks (`<nav>`, `<main>`, `<section>`, `<footer>`)
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text
- Form labels associated with inputs
- Error messages announced to screen readers
- Reduced motion: respect `prefers-reduced-motion` for all animations
- Language attribute set per locale (`lang="zh-TW"`, `lang="en"`, `lang="ja"`)

---

## 14. Testing checklist (pre-launch)

- [ ] All pages render correctly in zh-TW, en, ja
- [ ] Language switcher preserves current page path
- [ ] Nav transitions correctly between hero-visible and scrolled states
- [ ] All scroll animations trigger on first viewport entry
- [ ] Menu data loads from Sanity and displays correctly
- [ ] Location map renders with correct pin positions
- [ ] Contact form validates, submits, and shows success state
- [ ] Franchise form validates with business-specific fields
- [ ] All links (internal and external) work correctly
- [ ] Social links open in new tabs
- [ ] Images lazy-load below the fold
- [ ] Responsive: mobile (375px), tablet (768px), desktop (1280px+)
- [ ] Lighthouse scores meet targets
- [ ] JSON-LD validates via Google Rich Results Test
- [ ] Sitemap includes all localized URLs
- [ ] OG image renders correctly in social shares
- [ ] 404 page is styled and includes nav/footer
- [ ] Keyboard navigation works for all interactive elements
- [ ] Screen reader announces page structure correctly
- [ ] `prefers-reduced-motion` disables animations
- [ ] CMS preview mode works for draft content

---

## 15. Future roadmap (post-launch)

| Feature | Priority | Notes |
|---|---|---|
| Live Instagram feed API | High | Replace placeholder grid with real @pinpin_eggcake posts |
| Online ordering deeplinks | High | UberEats / Foodpanda links per store |
| LINE Official integration | Medium | Chat widget, loyalty program |
| Gift box e-commerce | Medium | For packaged eggcake sets (seasonal) |
| Blog/recipe content | Low | Longer-form editorial content |
| Multi-brand support | Low | If Pin Pin Group expands beyond Café |
| AR menu experience | Low | Scan-to-view 3D eggcake (novelty) |

---

*This spec is the single source of truth for the Pin Pin Café website project. All development work in Claude Code should reference this document.*
