import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-03-01';

if (!projectId && process.env.NODE_ENV === 'development') {
  console.warn('[Sanity] Missing NEXT_PUBLIC_SANITY_PROJECT_ID — CMS features will be unavailable.');
}

export const client = createClient({
  projectId: projectId ?? '',
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
});

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return client.fetch<T>(query, params ?? {}, {
    next: { revalidate: 60 },
  });
}
