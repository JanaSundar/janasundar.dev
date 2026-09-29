import { renderOgForPath } from '@/lib/og';

/** Every social card: `/og` is the home page's, `/og/blog`, `/og/blog/my-post` and so on follow the site's paths. */
export async function GET(_request: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const image = await renderOgForPath((await params).path);
  image.headers.set('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  return image;
}
