import type { Metadata } from 'next';
import { ArrowUpRight } from '@/components/icons';
import { HatchDivider } from '@/components/layout/hatch-divider';
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
        <h1 className="text-fg text-[17px] font-medium tracking-tight">Uses</h1>
        <p className="text-muted mt-2">The software and hardware I reach for every day.</p>
      </Section>
      {Object.entries(uses).map(([group, items]) => (
        <div key={group}>
          <HatchDivider />
          <Section label={group}>
            <ul className="grid gap-x-6 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group text-fg hover:bg-subtle -mx-3 flex items-center justify-between rounded-lg px-3 py-2 transition-colors"
                  >
                    {item.name}
                    <ArrowUpRight className="text-faint opacity-0 transition-opacity group-hover:opacity-100" />
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
