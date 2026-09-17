import { timingSafeEqual } from 'node:crypto';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

function isValidSecret(provided: string | null): boolean {
  const expected = process.env.SANITY_REVALIDATE_SECRET;
  if (!expected || !provided) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request: Request) {
  try {
    if (!isValidSecret(request.headers.get('x-sanity-secret'))) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    // Revalidate all locale paths
    revalidatePath('/[locale]', 'layout');

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
