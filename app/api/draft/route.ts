import { draftMode } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

/**
 * Hygraph preview URL: /api/draft?secret=<GRAPHCMS_PREVIEW_SECRET>&slug={slug}&type=post|snippet
 */
export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const secret = process.env.GRAPHCMS_PREVIEW_SECRET;

  if (!secret || params.get('secret') !== secret) {
    return new Response('Invalid token', { status: 401 });
  }

  const slug = params.get('slug');
  if (!slug || !/^[\w-]+$/.test(slug)) return new Response('Missing or invalid slug', { status: 400 });

  (await draftMode()).enable();
  redirect(params.get('type') === 'snippet' ? `/snippets/${slug}` : `/blog/${slug}`);
}
