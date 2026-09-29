import type { CSSProperties, ReactNode } from 'react';
import { ArrowUpRight } from '@/components/icons';

/** Inline company/product link with a leading logo, used inside running text. */
export function InlineLink({
  href,
  logo,
  pop,
  children,
}: {
  href: string;
  logo?: ReactNode;
  /** Order in the page-load sequence; the logo pops in at this step, after its sentence has landed. */
  pop?: number;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group text-fg inline-flex items-center gap-1.5 align-middle font-medium whitespace-nowrap"
    >
      {/* Every logo sits in the same 16px box so different marks share one optical centre. */}
      {logo ? (
        <span
          className={`inline-grid size-4 shrink-0 place-items-center ${pop === undefined ? '' : 'pop'}`}
          style={pop === undefined ? undefined : ({ '--i': pop } as CSSProperties)}
        >
          {logo}
        </span>
      ) : null}
      <span className="link">{children}</span>
      <ArrowUpRight
        width={10}
        height={10}
        className="text-faint group-hover:text-fg -ml-0.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
      />
    </a>
  );
}
