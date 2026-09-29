import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { Section } from '@/components/layout/section';
import { HighlightGroup, HighlightLink } from '@/components/ui/highlight';
import { Timeline, TimelineItem, TimelineSubItem, TimelineSubList } from '@/components/ui/timeline';
import { uses } from '@/content/uses';

export const metadata: Metadata = {
  title: 'Uses',
  description: 'The software and hardware I use every day.',
  alternates: { canonical: '/uses' },
};

export default function UsesPage() {
  return (
    <>
      <Section intro>
        <h1 className="title-1 text-fg enter">Uses</h1>
        <p className="callout text-muted enter mt-3" style={{ '--i': 1 } as CSSProperties}>
          The software and hardware I reach for every day.
        </p>
      </Section>
      <Section stagger>
        <HighlightGroup>
          <Timeline>
            {Object.entries(uses).map(([group, items]) => (
              <TimelineItem
                key={group}
                tone="done"
                title={<h2 className="font-semibold tracking-[-0.02em]">{group}</h2>}
              >
                <TimelineSubList>
                  {items.map((item) => (
                    <TimelineSubItem key={item.name} align="link">
                      <HighlightLink
                        href={item.url}
                        className="group text-fg -mx-3 flex items-center justify-between px-3 py-2"
                      >
                        {item.name}
                        <ArrowUpRight className="text-faint/70 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
                      </HighlightLink>
                    </TimelineSubItem>
                  ))}
                </TimelineSubList>
              </TimelineItem>
            ))}
          </Timeline>
        </HighlightGroup>
      </Section>
    </>
  );
}
