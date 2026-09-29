import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { HighlightItem } from '@/components/ui/highlight';
import { RevealLi } from '@/components/ui/reveal';

export type NodeTone = 'default' | 'done' | 'current';

/** Node styles: hollow when upcoming, filled once done, accent when current. Parents are `md`, sub-items `sm`. */
export function nodeClass(tone: NodeTone, size: 'sm' | 'md' = 'md') {
  return cn(
    'absolute left-0 rounded-full transition-colors duration-200',
    size === 'md' ? 'size-2' : 'size-1.5',
    tone === 'default' && 'border-faint bg-bg border',
    tone === 'done' && 'bg-faint',
    tone === 'current' && 'bg-accent shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_22%,transparent)]'
  );
}

export function Node({
  tone = 'default',
  size,
  className,
}: {
  tone?: NodeTone;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return <span aria-hidden className={cn(nodeClass(tone, size), className)} />;
}

/**
 * The dotted line between two nodes. It starts just under its own node and runs past the item's bottom edge to
 * just above the next node, so consecutive nodes are always joined.
 */
function Spine({ className }: { className: string }) {
  return <span aria-hidden className={cn('dots-list-y absolute', className)} />;
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
  /** Tighter spacing between items, for compact places like the contents island. */
  dense?: boolean;
  /**
   * Fade in with the section's scroll reveal (default). That reveal plays once, so items that appear later, such as
   * the result of a filter, would stay hidden: lists that change turn it off and let their container do the fading.
   */
  reveal?: boolean;
  children?: ReactNode;
};

/**
 * A parent on the spine. The spine is one path: a parent without sub-items runs straight to the next parent; a
 * parent with sub-items hands the path to them (the first sub-item's elbow) and the last sub-item brings it back.
 * `--tl-gap` is the space before the next parent, which that return curve has to cross.
 */
export function TimelineItem({
  title,
  aside,
  tone = 'default',
  id,
  dense = false,
  reveal = true,
  children,
}: TimelineItemProps) {
  const Item = reveal ? RevealLi : 'li';
  return (
    <Item
      id={id}
      className={cn('group relative pb-(--tl-gap) pl-7 last:pb-0', dense ? '[--tl-gap:0.75rem]' : '[--tl-gap:1.75rem]')}
    >
      <Node tone={tone} className="top-[calc(0.55rem-1px)]" />
      <Spine className="top-[calc(1.35rem-1px)] -bottom-[calc(0.55rem-4px)] left-[3.5px] group-last:hidden group-has-[[data-sub-list]]:hidden" />
      {/* A fixed row height, whatever the title's size: the node, spine and elbow offsets are measured against it. */}
      <div className="flex items-baseline justify-between gap-4 leading-[1.55rem]">
        <div className="text-fg min-w-0">{title}</div>
        {aside ? <div className="text-faint shrink-0 text-[13px] tabular-nums">{aside}</div> : null}
      </div>
      {children}
    </Item>
  );
}

/** Sub-items under a parent: small nodes in their own column, joined to the parent's path by an elbow in and a curve out. */
export function TimelineSubList({ children, className }: { children: ReactNode; className?: string }) {
  // `data-sub-list` is how a parent knows to hand its spine to these items (see `TimelineItem`).
  return (
    <ul data-sub-list className={cn('mt-2', className)}>
      {children}
    </ul>
  );
}

/** Corner radius of both curves (into the sub-items and back out), so the path turns the same way each time. */
const R = 8;

/**
 * Where a sub-item's node centre sits (`--node-y`), from which its node, spine and curves are all placed.
 * `link` rows carry their own padding, so the node drops to the first line's centre inside it; `text` rows centre
 * the node on the first line of whatever type the row uses (`lh`), so any text size lines up.
 */
const nodeY = { text: '[--node-y:0.5lh]', link: '[--node-y:calc(1.1rem+2px)]' } as const;
const node = 'top-[calc(var(--node-y)-3px)]';
/** Just under the node: where lines leaving it start. */
const below = 'top-[calc(var(--node-y)+6px)]';

/**
 * `className` sets the row's type (size, leading, colour) on the item itself, so the node is measured against the
 * same line box as the text. `highlight` joins the nearest `HighlightGroup`: hovering or focusing the item moves
 * the group's accent node onto this item's node.
 */
export function TimelineSubItem({
  children,
  tone = 'default',
  align = 'text',
  highlight = false,
  className,
}: {
  children: ReactNode;
  tone?: NodeTone;
  align?: 'text' | 'link';
  highlight?: boolean;
  className?: string;
}) {
  return (
    <li className={cn('group/sub relative pl-5', nodeY[align], className)}>
      {/*
        In: from just under the parent's node, down and round into this node. The straight part stretches; only the
        corner is drawn. The box starts on the parent spine (x 0-1) and its bottom edge is level with this node.
      */}
      <span
        aria-hidden
        className="absolute top-[-14px] -left-[24.5px] hidden h-[calc(14px+var(--node-y)+1px)] w-[24.5px] flex-col group-first/sub:flex"
      >
        <span className="dots-list-y flex-1" />
        <svg
          aria-hidden
          width="24.5"
          height={R + 1}
          viewBox={`0 0 24.5 ${R + 1}`}
          fill="none"
          className="text-faint/70 shrink-0"
        >
          <path d={`M.5 0Q.5 ${R} ${R + 0.5} ${R}H24.5`} stroke="currentColor" strokeDasharray="3 3" />
        </svg>
      </span>
      <Node tone={tone} size="sm" className={node} />
      <Spine className={cn('left-[2.5px] -bottom-[calc(var(--node-y)-6px)] group-last/sub:hidden', below)} />
      {/*
        Out: the mirror of the way in. From the last sub-item down its column, round to the left, across, and round
        down into the parent column, ending just above the next parent's node. It spans the rest of this item plus
        the gap, so the straight part stretches. The box runs from the parent spine (x 0-1) to this column (x 27-28).
      */}
      <span
        aria-hidden
        className={cn(
          'absolute -left-[24.5px] hidden w-7 flex-col group-last/sub:flex group-last:hidden!',
          'bottom-[calc(-1*var(--tl-gap)-0.55rem+4px)]',
          below
        )}
      >
        <span className="dots-list-y flex-1 self-end" />
        <svg
          aria-hidden
          width="28"
          height={2 * R}
          viewBox={`0 0 28 ${2 * R}`}
          fill="none"
          className="text-faint/70 shrink-0"
        >
          <path
            d={`M27.5 0Q27.5 ${R} ${27.5 - R} ${R}H${R + 0.5}Q.5 ${R} .5 ${2 * R}`}
            stroke="currentColor"
            strokeDasharray="3 3"
          />
        </svg>
      </span>
      {highlight ? (
        <HighlightItem indicator={cn(nodeClass('current', 'sm'), 'z-10', node)}>{children}</HighlightItem>
      ) : (
        children
      )}
    </li>
  );
}
