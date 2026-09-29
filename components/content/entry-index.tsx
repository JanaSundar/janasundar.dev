import { Section } from '@/components/layout/section';
import { EntryLink } from '@/components/ui/entry-row';
import { HighlightGroup } from '@/components/ui/highlight';
import { Timeline, TimelineItem, TimelineSubItem, TimelineSubList } from '@/components/ui/timeline';
import type { ContentSummary } from '@/lib/hygraph';
import { enterStep } from '@/lib/motion';

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
        <p className="callout text-muted enter mt-3 max-w-prose" style={enterStep(1)}>
          {intro}
        </p>
      </Section>

      {entries.length === 0 ? (
        <Section>
          <p className="text-faint">Nothing here yet.</p>
        </Section>
      ) : (
        <Section stagger>
          <HighlightGroup>
            <Timeline>
              {groupByYear(entries).map(([year, group]) => (
                <TimelineItem
                  key={year}
                  tone="done"
                  title={<h2 className="font-semibold tracking-[-0.02em]">{year}</h2>}
                >
                  <TimelineSubList>
                    {group.map((entry) => (
                      <TimelineSubItem key={entry.slug} align="link" highlight>
                        <EntryLink
                          href={`${basePath}/${entry.slug}`}
                          title={entry.title}
                          description={entry.description}
                          date={entry.createdAt}
                          highlight={false}
                        />
                      </TimelineSubItem>
                    ))}
                  </TimelineSubList>
                </TimelineItem>
              ))}
            </Timeline>
          </HighlightGroup>
        </Section>
      )}
    </>
  );
}
