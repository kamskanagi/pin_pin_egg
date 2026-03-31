import type { LocaleString, SanityImage, SanitySlug } from './sanity';

export type Country = 'taiwan' | 'japan';

export interface StoreLocation {
  _id: string;
  _type: 'storeLocation';
  name: LocaleString;
  slug: SanitySlug;
  country: Country;
  city: LocaleString;
  address: LocaleString;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: LocaleString;
  nearestTransit?: LocaleString;
  phone?: string;
  photo?: SanityImage;
  googleMapsUrl: string;
  instagramHandle?: string;
  isComingSoon: boolean;
  sortOrder: number;
}
