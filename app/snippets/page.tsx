import type { Metadata } from 'next';
import { SnippetList, type SnippetItem } from '@/components/content/snippet-list';
import { Section } from '@/components/layout/section';
import { Markdown } from '@/components/markdown/markdown';
import { languageLabel } from '@/lib/code-language';
import { getEntries, getEntry } from '@/lib/hygraph';
import { uniqueLabels } from '@/lib/labels';
import { firstCodeLanguage, parseContent } from '@/lib/markdown';
import { enterStep } from '@/lib/motion';

export const metadata: Metadata = {
  title: 'Snippets',
  description: 'Small, reusable pieces of code I reach for again and again.',
  alternates: { canonical: '/snippets' },
};

export default async function SnippetsPage() {
  const summaries = await getEntries('snippet');
  // The list opens each snippet in place, so it needs every snippet's content, which the summary query leaves out.
  const entries = await Promise.all(summaries.map(({ slug }) => getEntry('snippet', slug)));

  const items: SnippetItem[] = summaries.map((summary, i) => {
    const entry = entries[i];
    const document = entry ? parseContent(entry.content) : null;
    const lang = document ? firstCodeLanguage(document) : undefined;

    return {
      slug: summary.slug,
      title: summary.title,
      createdAt: summary.createdAt,
      // The language comes from the code, and a tag often repeats it: show each label once.
      labels: uniqueLabels([...(lang ? [languageLabel(lang)] : []), ...summary.tags.map(({ tag }) => tag)]),
      body: document ? <Markdown document={document} /> : null,
    };
  });

  return (
    <>
      <Section intro>
        <h1 className="title-1 text-fg enter">Snippets</h1>
        <p className="callout text-muted enter mt-3 max-w-prose" style={enterStep(1)}>
          Small, reusable pieces of code I keep reaching for — copy, paste, adapt.
        </p>
      </Section>

      <Section>
        {items.length === 0 ? <p className="text-faint">Nothing here yet.</p> : <SnippetList items={items} />}
      </Section>
    </>
  );
}
