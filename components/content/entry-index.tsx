import type { CSSProperties } from 'react';
import { Section } from '@/components/layout/section';
import { EntryRow } from '@/components/ui/entry-row';
import type { ContentSummary } from '@/lib/hygraph';

type EntryIndexProps = {
  title: string;
  intro: string;
  basePath: string;
  entries: ContentSummary[];
};

function groupByYear(entries: ContentSummary[]) {
  const groups = new Map<string, ContentSummary[]>();
  for (const entry of entries) {
    const year = String(new Date(entry.createdAt).getFullYear());
    groups.set(year, [...(groups.get(year) ?? []), entry]);
  }
  return [...groups];
}

export function EntryIndex({ title, intro, basePath, entries }: EntryIndexProps) {
  return (
    <>
      <Section intro>
        <h1 className="title-1 text-fg enter">{title}</h1>
        <p className="callout text-muted enter mt-3 max-w-prose" style={{ '--i': 1 } as CSSProperties}>
          {intro}
        </p>
      </Section>

      {entries.length === 0 ? (
        <Section>
          <p className="text-faint">Nothing here yet.</p>
        </Section>
      ) : (
        groupByYear(entries).map(([year, group]) => (
          <Section key={year} label={year}>
            <ul className="grouped">
              {group.map((entry) => (
                <EntryRow
                  key={entry.slug}
                  href={`${basePath}/${entry.slug}`}
                  title={entry.title}
                  description={entry.description}
                  date={entry.createdAt}
                />
              ))}
            </ul>
          </Section>
        ))
      )}
    </>
  );
}
