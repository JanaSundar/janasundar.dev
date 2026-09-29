import type { Metadata } from 'next';
import { site } from '@/content/site';

type OpenGraph = NonNullable<Metadata['openGraph']>;

/**
 * The social card for a page, as metadata to spread into its `metadata` or `generateMetadata`. The card itself is drawn
 * by the `/og/...` route from the same path, so a page only says where it lives.
 *
 * Next replaces `openGraph` and `twitter` wholesale rather than merging them, so this carries the site-wide values too;
 * `openGraph` adds to them (a post's `type: 'article'` and dates, say).
 */
export function ogMetadata(path = '/', openGraph: Partial<OpenGraph> = {}): Pick<Metadata, 'openGraph' | 'twitter'> {
  const url = path === '/' ? '/og' : `/og${path}`;

  return {
    openGraph: {
      type: 'website',
      locale: 'en_IN',
      url: site.url,
      siteName: site.name,
      ...openGraph,
      images: [{ url, width: 1200, height: 630, alt: site.name }],
    } as OpenGraph,
    twitter: { card: 'summary_large_image', creator: `@${site.socials.twitter.handle}`, images: [url] },
  };
}
