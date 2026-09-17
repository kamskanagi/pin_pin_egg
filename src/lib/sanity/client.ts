import { createClient, type SanityClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-03-01';

/** True when Sanity env vars are present. Callers should fall back to placeholder data otherwise. */
export const isSanityConfigured = Boolean(projectId);

if (!isSanityConfigured && process.env.NODE_ENV === 'development') {
  console.warn('[Sanity] Missing NEXT_PUBLIC_SANITY_PROJECT_ID — CMS features will be unavailable.');
}

// createClient throws on an empty projectId, so only construct it when configured —
// importing this module must never crash the app.
export const client: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === 'production',
    })
  : null;

export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  if (!client) {
    throw new Error('[Sanity] sanityFetch called without NEXT_PUBLIC_SANITY_PROJECT_ID — check isSanityConfigured first.');
  }
  return client.fetch<T>(query, params ?? {}, {
    next: { revalidate: 60 },
  });
}
