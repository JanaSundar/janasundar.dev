import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { EntryArticle } from '@/components/content/entry-article';
import { getEntry, getSlugs } from '@/lib/hygraph';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getSlugs('snippet');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const snippet = await getEntry('snippet', slug);
  if (!snippet) return {};

  return {
    title: snippet.title,
    description: snippet.description,
    alternates: { canonical: `/snippets/${slug}` },
  };
}

export default async function SnippetPage({ params }: Props) {
  const { slug } = await params;
  const [snippet, draft] = await Promise.all([getEntry('snippet', slug), draftMode()]);
  if (!snippet) notFound();

  return <EntryArticle entry={snippet} back={{ href: '/snippets', label: 'Snippets' }} isDraft={draft.isEnabled} />;
}
