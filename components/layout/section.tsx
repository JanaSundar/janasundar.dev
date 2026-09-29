import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { SectionDivider } from '@/components/layout/section-divider';
import { Reveal, RevealItem } from '@/components/ui/reveal';

type SectionProps = {
  id?: string;
  label?: string;
  aside?: ReactNode;
  /** Page intro: extra top padding, and painted immediately instead of revealed on scroll. */
  intro?: boolean;
  /**
   * Let the content sequence its own entrance. Rows built from `RevealItem` / `RevealLi` enter one after another.
   * Without it the whole content block enters as a single step after the heading.
   */
  stagger?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, label, aside, intro = false, stagger = false, className, children }: SectionProps) {
  const heading = label ? (
    <div className="mb-5 flex items-baseline justify-between gap-4">
      <h2 className="title-2 text-fg">{label}</h2>
      {aside}
    </div>
  ) : null;

  return (
    <>
      {intro ? null : <SectionDivider />}
      <section id={id} className={cn('px-5 py-10 sm:px-8 sm:py-12', intro && 'pt-14 sm:pt-16', className)}>
        {intro ? (
          <>
            {heading}
            {children}
          </>
        ) : (
          <Reveal>
            {heading ? <RevealItem>{heading}</RevealItem> : null}
            {stagger ? children : <RevealItem>{children}</RevealItem>}
          </Reveal>
        )}
      </section>
    </>
  );
}
