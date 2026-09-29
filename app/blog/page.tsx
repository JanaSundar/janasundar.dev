import type { Metadata } from 'next';
import { EntryIndex } from '@/components/content/entry-index';
import { ogMetadata } from '@/lib/og-metadata';
import { getEntries } from '@/lib/hygraph';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Notes on React, TypeScript, Node and building for the web.',
  alternates: { canonical: '/blog' },
  ...ogMetadata('/blog'),
};

export default async function BlogPage() {
  const posts = await getEntries('post');
  return (
    <EntryIndex
      title="Writing"
      intro="Notes on React, TypeScript, Node and building for the web — mostly things I wished I'd read earlier."
      basePath="/blog"
      entries={posts}
    />
  );
}
