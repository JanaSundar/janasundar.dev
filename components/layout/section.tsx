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
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="label">{label}</h2>
          {aside}
        </div>
      ) : null}
      {children}
    </>
  );

  return (
    <section id={id} className={cn('px-5 py-10 sm:px-8 sm:py-12', intro && 'pt-14 sm:pt-16', className)}>
      {intro ? content : <Reveal>{content}</Reveal>}
    </section>
  );
}
