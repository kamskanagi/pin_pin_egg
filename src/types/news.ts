import type {
  LocaleString,
  LocaleText,
  LocalePortableText,
  SanityImage,
  SanitySlug,
} from './sanity';

export type NewsCategory = 'new-flavor' | 'store-opening' | 'collaboration' | 'event';

export interface NewsPost {
  _id: string;
  _type: 'newsPost';
  title: LocaleString;
  slug: SanitySlug;
  category: NewsCategory;
  excerpt: LocaleText;
  body: LocalePortableText;
  featuredImage: SanityImage;
  publishedAt: string;
  isFeatured: boolean;
}
