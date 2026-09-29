import { HatchDivider } from '@/components/layout/hatch-divider';
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
        <h1 className="text-fg text-[17px] font-medium tracking-tight">{title}</h1>
        <p className="text-muted mt-2 max-w-prose">{intro}</p>
      </Section>

      {entries.length === 0 ? (
        <>
          <HatchDivider />
          <Section>
            <p className="text-faint font-mono text-[12px]">Nothing here yet.</p>
          </Section>
        </>
      ) : (
        groupByYear(entries).map(([year, group]) => (
          <div key={year}>
            <HatchDivider />
            <Section label={year}>
              <ul>
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
          </div>
        ))
      )}
    </>
  );
}
