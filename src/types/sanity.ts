import type { PortableTextBlock } from 'next-sanity';

export interface LocaleString {
  zh: string;
  en: string;
  ja: string;
}

export interface LocaleText {
  zh: string;
  en: string;
  ja: string;
}

export interface LocalePortableText {
  zh: PortableTextBlock[];
  en: PortableTextBlock[];
  ja: PortableTextBlock[];
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

export interface SanitySlug {
  _type: 'slug';
  current: string;
}
