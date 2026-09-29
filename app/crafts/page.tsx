import type { Metadata } from 'next';
import { Fragment } from 'react';
import { crafts, CraftCard } from '@/components/crafts';
import { Section } from '@/components/layout/section';
import { enterStep } from '@/lib/motion';

export const metadata: Metadata = {
  title: 'Crafts',
  description: 'Small interaction studies built with React and Motion.',
  alternates: { canonical: '/crafts' },
};

export default function CraftsPage() {
  return (
    <>
      <Section intro>
        <h1 className="title-1 text-fg enter">Crafts</h1>
        <p className="callout text-muted enter mt-3" style={enterStep(1)}>
          Small interaction studies — the details I like to sweat. Built with React and Motion; poke at them.
        </p>
      </Section>
      {crafts.map((craft) => (
        <Fragment key={craft.slug}>
          <Section id={craft.slug}>
            <CraftCard {...craft} />
          </Section>
        </Fragment>
      ))}
    </>
  );
}
