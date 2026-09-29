import { revalidateTag } from 'next/cache';
import type { NextRequest } from 'next/server';
import { HYGRAPH_TAG } from '@/lib/hygraph';

/**
 * Hygraph publish webhook. Configure it to POST here with the header
 * `x-revalidate-secret: <HYGRAPH_REVALIDATE_SECRET>` on publish/unpublish.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.HYGRAPH_REVALIDATE_SECRET;
  const provided = request.headers.get('x-revalidate-secret') ?? request.nextUrl.searchParams.get('secret');

  if (!secret || provided !== secret) {
    return Response.json({ revalidated: false, message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag(HYGRAPH_TAG, { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
