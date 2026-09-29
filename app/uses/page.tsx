import type { Metadata } from 'next';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { Section } from '@/components/layout/section';
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
      {Object.entries(uses).map(([group, items]) => (
        <div key={group}>
          <Section label={group}>
            <ul className="grouped">
              {items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-fg hover:bg-subtle active:bg-subtle flex items-center justify-between px-4 py-3 transition-colors"
                  >
                    {item.name}
                    <ArrowUpRight className="text-faint/70 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
                  </a>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      ))}
    </>
  );
}
