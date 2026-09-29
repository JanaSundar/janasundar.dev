import { site } from '@/content/site';
import { getEntry } from '@/lib/hygraph';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt = `${site.name} — Writing`;
export const size = ogSize;
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getEntry('post', slug);
  return renderOgImage({ title: post?.title ?? site.name });
}
