import type { MetadataRoute } from 'next';
import { site } from '@/content/site';
import { getEntries } from '@/lib/hygraph';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, snippets] = await Promise.all([getEntries('post'), getEntries('snippet')]);

  const pages = ['', '/blog', '/snippets', '/crafts', '/uses'].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));

  return [
    ...pages,
    ...posts.map((post) => ({ url: `${site.url}/blog/${post.slug}`, lastModified: new Date(post.createdAt) })),
    ...snippets.map((s) => ({ url: `${site.url}/snippets/${s.slug}`, lastModified: new Date(s.createdAt) })),
  ];
}
