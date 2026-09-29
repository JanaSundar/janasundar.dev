import 'server-only';

import { draftMode } from 'next/headers';

export const HYGRAPH_TAG = 'hygraph';

export type ContentKind = 'post' | 'snippet';

export type Tag = { tag: string };

export type ContentSummary = {
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  tags: Tag[];
};

export type ContentEntry = ContentSummary & {
  content: string;
  updatedAt: string;
  files: Record<string, string> | null;
};

const endpoint = process.env.HYGRAPH_ENDPOINT;

const collection = { post: 'posts', snippet: 'snippets' } as const;

type Stage = 'DRAFT' | 'PUBLISHED';

async function stage(): Promise<Stage> {
  if (process.env.NODE_ENV !== 'production') return 'DRAFT';
  try {
    return (await draftMode()).isEnabled ? 'DRAFT' : 'PUBLISHED';
  } catch {
    // Outside a request scope (generateStaticParams, sitemap): published content only.
    return 'PUBLISHED';
  }
}

async function request<T>(query: string, variables: Record<string, unknown>): Promise<T | null> {
  if (!endpoint) {
    if (process.env.NODE_ENV !== 'production') console.warn('[hygraph] HYGRAPH_ENDPOINT is not set; content is empty.');
    return null;
  }

  const isDraft = variables.stage === 'DRAFT';
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(process.env.HYGRAPH_TOKEN && { authorization: `Bearer ${process.env.HYGRAPH_TOKEN}` }),
    },
    body: JSON.stringify({ query, variables }),
    ...(isDraft ? { cache: 'no-store' as const } : { next: { tags: [HYGRAPH_TAG], revalidate: 3600 } }),
  });

  if (!res.ok) throw new Error(`[hygraph] ${res.status} ${res.statusText}`);

  const json = (await res.json()) as { data?: T; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error(`[hygraph] ${json.errors.map((e) => e.message).join(', ')}`);

  return json.data ?? null;
}

export async function getEntries(kind: ContentKind, first?: number): Promise<ContentSummary[]> {
  const name = collection[kind];
  const data = await request<Record<string, ContentSummary[]>>(
    `query Entries($stage: Stage!, $first: Int) {
      ${name}(stage: $stage, orderBy: createdAt_DESC, first: $first) {
        slug
        title
        description
        createdAt
        tags { tag }
      }
    }`,
    { stage: await stage(), first: first ?? 100 }
  );
  return data?.[name] ?? [];
}

export async function getEntry(kind: ContentKind, slug: string): Promise<ContentEntry | null> {
  const data = await request<Record<ContentKind, ContentEntry | null>>(
    `query Entry($slug: String!, $stage: Stage!) {
      ${kind}(where: { slug: $slug }, stage: $stage) {
        slug
        title
        description
        content
        createdAt
        updatedAt
        tags { tag }
        ${kind === 'post' ? 'files' : ''}
      }
    }`,
    { slug, stage: await stage() }
  );
  const entry = data?.[kind];
  return entry ? { ...entry, files: entry.files ?? null } : null;
}

export async function getSlugs(kind: ContentKind): Promise<string[]> {
  const entries = await getEntries(kind);
  return entries.map((entry) => entry.slug);
}

/** The entries either side of `slug` in the index, which is ordered newest first. */
export async function getAdjacent(kind: ContentKind, slug: string) {
  const entries = await getEntries(kind);
  const index = entries.findIndex((entry) => entry.slug === slug);
  if (index === -1) return {};
  return { newer: entries[index - 1], older: entries[index + 1] };
}
