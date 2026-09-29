import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { EntryArticle } from '@/components/content/entry-article';
import { getAdjacent, getEntry, getSlugs } from '@/lib/hygraph';
import { notFoundMetadata } from '@/lib/not-found';
import { ogMetadata } from '@/lib/og-metadata';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getSlugs('snippet');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const snippet = await getEntry('snippet', slug);
  if (!snippet) return notFoundMetadata;

  return {
    title: snippet.title,
    description: snippet.description,
    alternates: { canonical: `/snippets/${slug}` },
    ...ogMetadata(`/snippets/${slug}`),
  };
}

export default async function SnippetPage({ params }: Props) {
  const { slug } = await params;
  const [snippet, adjacent, draft] = await Promise.all([
    getEntry('snippet', slug),
    getAdjacent('snippet', slug),
    draftMode(),
  ]);
  if (!snippet) notFound();

  return (
    <EntryArticle
      entry={snippet}
      back={{ href: '/snippets', label: 'Snippets' }}
      isDraft={draft.isEnabled}
      adjacent={adjacent}
    />
  );
}
