import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { RevealLi } from '@/components/ui/reveal';

export type NodeTone = 'default' | 'done' | 'current';

/** Parent node: hollow when upcoming, filled once done, accent when current. */
export function Node({ tone = 'default', className }: { tone?: NodeTone; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute left-0 size-2 rounded-full transition-colors duration-200',
        tone === 'default' && 'border-faint bg-bg border',
        tone === 'done' && 'bg-faint',
        tone === 'current' && 'bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_22%,transparent)]',
        className
      )}
    />
  );
}

/** A title/sub-item list joined by a dotted spine. Parents are nodes on the spine; sub-items hang off it. */
export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
  return <ol className={cn('relative', className)}>{children}</ol>;
}

type TimelineItemProps = {
  title: ReactNode;
  aside?: ReactNode;
  tone?: NodeTone;
  id?: string;
  children?: ReactNode;
};

export function TimelineItem({ title, aside, tone = 'default', id, children }: TimelineItemProps) {
  return (
    <RevealLi id={id} className="group relative pb-7 pl-7 last:pb-0">
      <Node tone={tone} className="top-[0.55rem]" />
      <span aria-hidden className="dots-list-y absolute top-[1.35rem] bottom-1.5 left-[3.5px] group-last:hidden" />
      <div className="flex items-baseline justify-between gap-4">
        <div className="text-fg min-w-0">{title}</div>
        {aside ? <div className="text-faint shrink-0 text-[13px] tabular-nums">{aside}</div> : null}
      </div>
      {children}
    </RevealLi>
  );
}

/** Sub-items under a parent: small hollow nodes, a short spine between them and a curved elbow off the parent spine. */
export function TimelineSubList({ children, className }: { children: ReactNode; className?: string }) {
  return <ul className={cn('mt-2', className)}>{children}</ul>;
}

/**
 * `align="link"` is for rows that carry their own vertical padding (hover-fill links): the node drops to the
 * first line's centre. `align="text"` is for bare text.
 */
export function TimelineSubItem({
  children,
  tone = 'default',
  align = 'text',
}: {
  children: ReactNode;
  tone?: NodeTone;
  align?: 'text' | 'link';
}) {
  const link = align === 'link';
  return (
    <li className="group/sub relative pl-5">
      {/*
        Elbow from the parent spine into the first sub-item. The parent draws its own spine only when another
        item follows, so on the last item the elbow brings its own stem.
      */}
      <svg
        aria-hidden
        width="24.5"
        height={link ? 40 : 34}
        viewBox={`0 0 24.5 ${link ? 40 : 34}`}
        fill="none"
        className="text-faint/70 absolute top-[-13px] -left-[24.5px] hidden group-first/sub:block"
      >
        <path
          d={link ? 'M.5 23Q.5 33.6 12.5 33.6H24.5' : 'M.5 17Q.5 27.2 12.5 27.2H24.5'}
          stroke="currentColor"
          strokeDasharray="3 3"
        />
        <path
          d={link ? 'M.5 0V23' : 'M.5 0V17'}
          stroke="currentColor"
          strokeDasharray="3 3"
          className="hidden group-last:block"
        />
      </svg>
      <Node tone={tone} className={cn('size-1.5', link ? 'top-[1.1rem]' : 'top-[0.7rem]')} />
      <span
        aria-hidden
        className={cn(
          'dots-list-y absolute bottom-0 left-[2.5px] group-last/sub:hidden',
          link ? 'top-[1.7rem]' : 'top-[1.3rem]'
        )}
      />
      {children}
    </li>
  );
}
