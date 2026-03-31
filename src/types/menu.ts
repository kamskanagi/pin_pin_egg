import type { LocaleString, LocaleText, SanityImage, SanitySlug } from './sanity';

export type MenuBadge = 'signature' | 'seasonal' | 'new' | 'limited';

export interface MenuCategory {
  _id: string;
  _type: 'menuCategory';
  name: LocaleString;
  slug: SanitySlug;
  description: LocaleText;
  icon?: SanityImage;
  sortOrder: number;
}

export interface MenuItem {
  _id: string;
  _type: 'menuItem';
  name: LocaleString;
  slug: SanitySlug;
  category: MenuCategory;
  description: LocaleText;
  price: {
    twd: number;
    jpy?: number;
  };
  image: SanityImage;
  badges: MenuBadge[];
  isFeatured: boolean;
  isAvailable: boolean;
  seasonalDates?: {
    start: string;
    end: string;
  };
  pairsWith?: MenuItem[];
  sortOrder: number;
}
