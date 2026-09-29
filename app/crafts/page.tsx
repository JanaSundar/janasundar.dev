import type { Metadata } from 'next';
import { Fragment } from 'react';
import { crafts, CraftCard } from '@/components/crafts';
import { HatchDivider } from '@/components/layout/hatch-divider';
import { Section } from '@/components/layout/section';

export const metadata: Metadata = {
  title: 'Crafts',
  description: 'Small interaction studies built with React and Motion.',
  alternates: { canonical: '/crafts' },
};

export default function CraftsPage() {
  return (
    <>
      <Section intro>
        <h1 className="text-fg text-[17px] font-medium tracking-tight">Crafts</h1>
        <p className="text-muted mt-2">
          Small interaction studies — the details I like to sweat. Built with React and Motion; poke at them.
        </p>
      </Section>
      {crafts.map((craft) => (
        <Fragment key={craft.slug}>
          <HatchDivider />
          <Section id={craft.slug}>
            <CraftCard {...craft} />
          </Section>
        </Fragment>
      ))}
    </>
  );
}
