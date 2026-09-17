import imageUrlBuilder from '@sanity/image-url';
import { dataset } from './client';
import type { SanityImage } from '@/types/sanity';

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset,
});

export function urlFor(source: SanityImage) {
  return builder.image(source);
}
