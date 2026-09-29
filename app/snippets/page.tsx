import type { Metadata } from 'next';
import { EntryIndex } from '@/components/content/entry-index';
import { getEntries } from '@/lib/hygraph';

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'Small, reusable pieces of code I reach for again and again.',
  alternates: { canonical: '/snippets' },
};

export default async function SnippetsPage() {
  const snippets = await getEntries('snippet');
  return (
    <EntryIndex
      title="Snippets"
      intro="Small, reusable pieces of code I keep reaching for — copy, paste, adapt."
      basePath="/snippets"
      entries={snippets}
    />
  );
}
