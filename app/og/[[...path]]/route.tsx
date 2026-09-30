import { renderOgForPath } from '@/lib/og';

/** Every social card: `/og` is the home page's, `/og/blog`, `/og/blog/my-post` and so on follow the site's paths. */
export async function GET(_request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  try {
    const image = await renderOgForPath((await params).path);
    image.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
    return image;
  } catch (error) {
    const e = error as Error;
    return new Response(`${e?.name}: ${e?.message}\n${(e?.stack ?? '').split('\n').slice(0, 8).join('\n')}`, {
      status: 500,
      headers: { 'content-type': 'text/plain' },
    });
  }
}
