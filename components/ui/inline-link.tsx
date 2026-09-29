import type { ReactNode } from 'react';
import { ArrowUpRight } from '@/components/icons';

/** Inline company/product link with a leading logo, used inside running text. */
export function InlineLink({ href, logo, children }: { href: string; logo?: ReactNode; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group text-fg inline-flex items-baseline gap-1 font-medium whitespace-nowrap"
    >
      {logo ? <span className="inline-flex translate-y-[2px] self-baseline">{logo}</span> : null}
      <span className="link">{children}</span>
      <ArrowUpRight
        width={10}
        height={10}
        className="text-faint group-hover:text-fg transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
      />
    </a>
  );
}
