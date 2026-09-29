import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import { EntryArticle } from '@/components/content/entry-article';
import { getAdjacent, getEntry, getSlugs } from '@/lib/hygraph';
import { notFoundMetadata } from '@/lib/not-found';
import { ogMetadata } from '@/lib/og-metadata';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getSlugs('post');
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getEntry('post', slug);
  if (!post) return notFoundMetadata;

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    ...ogMetadata(`/blog/${slug}`, {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.createdAt,
      modifiedTime: post.updatedAt,
      tags: post.tags.map(({ tag }) => tag),
    }),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, adjacent, draft] = await Promise.all([getEntry('post', slug), getAdjacent('post', slug), draftMode()]);
  if (!post) notFound();

  return (
    <EntryArticle
      entry={post}
      back={{ href: '/blog', label: 'Writing' }}
      isDraft={draft.isEnabled}
      adjacent={adjacent}
    />
  );
}
