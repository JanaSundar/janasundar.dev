import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Reveal } from '@/components/ui/reveal';

type SectionProps = {
  id?: string;
  label?: string;
  aside?: ReactNode;
  /** Page intro: extra top padding, and painted immediately instead of revealed on scroll. */
  intro?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, label, aside, intro = false, className, children }: SectionProps) {
  const content = (
    <>
      {label ? (
        <div className="mb-4 flex items-baseline justify-between gap-4 px-1">
          <h2 className="title-2 text-fg">{label}</h2>
          {aside}
        </div>
      ) : null}
      {children}
    </>
  );

  return (
    <section id={id} className={cn('px-4 py-8 sm:px-6 sm:py-10', intro && 'pt-16 pb-6 sm:pt-24', className)}>
      {intro ? content : <Reveal>{content}</Reveal>}
    </section>
  );
}
