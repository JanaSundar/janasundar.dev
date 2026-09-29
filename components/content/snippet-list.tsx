'use client';

import { useId, useMemo, useState, type ReactNode } from 'react';
import { ChevronRight } from '@/components/icons';
import { ContainedFrames } from '@/components/markdown/frame';
import { EntryDate } from '@/components/ui/entry-row';
import { SlideOpen } from '@/components/ui/slide-open';
import { Timeline, TimelineItem } from '@/components/ui/timeline';
import { cn } from '@/lib/cn';
import { sameLabel, uniqueLabels } from '@/lib/labels';

export type SnippetItem = {
  slug: string;
  title: string;
  createdAt: string;
  /** Language and tags, shown as chips and used by the filter. */
  labels: string[];
  /** The snippet's content, rendered on the server. */
  body: ReactNode;
};

/** A small pill label, used for a snippet's labels and for the filter chips. */
const chip = 'rounded-md border px-2 py-0.5 font-mono text-[11px] leading-5 uppercase transition-colors';

function Labels({ labels }: { labels: string[] }) {
  if (!labels.length) return null;
  return (
    <ul className="mt-1.5 flex flex-wrap gap-1.5">
      {labels.map((label) => (
        <li key={label} className={cn(chip, 'border-border text-muted')}>
          {label}
        </li>
      ))}
    </ul>
  );
}

/**
 * One snippet on the timeline: a dot, the title (a button that opens it), the date, and its labels. Opening grows the
 * item in place to reveal the snippet, so the list stays where it is and the rest of it moves down to make room.
 */
function SnippetRow({
  title,
  createdAt,
  labels,
  body,
  open,
  onToggle,
}: SnippetItem & { open: boolean; onToggle: () => void }) {
  const panel = useId();
  return (
    <TimelineItem
      reveal={false}
      tone={open ? 'current' : 'default'}
      aside={<EntryDate date={createdAt} />}
      title={
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panel}
          onClick={onToggle}
          className="group/title press flex items-center gap-1.5 text-left font-medium"
        >
          {title}
          <ChevronRight
            className={cn(
              'text-faint group-hover/title:text-fg transition-[transform,color] duration-200',
              open && 'rotate-90'
            )}
          />
        </button>
      }
    >
      <Labels labels={labels} />

      <SlideOpen open={open} id={panel}>
        <ContainedFrames>{body}</ContainedFrames>
      </SlideOpen>
    </TimelineItem>
  );
}

/** Filter chips, one per label plus "All". Only worth showing when there's more than one label. */
function LabelFilter({
  labels,
  value,
  onChange,
}: {
  labels: string[];
  value: string | null;
  onChange: (label: string | null) => void;
}) {
  const option = (label: string | null, text: string) => (
    <button
      key={text}
      type="button"
      aria-pressed={value === label}
      onClick={() => onChange(label)}
      className={cn(
        chip,
        'press',
        value === label ? 'border-fg bg-fg text-bg' : 'border-border text-muted hover:text-fg hover:border-grid'
      )}
    >
      {text}
    </button>
  );

  return (
    <fieldset className="flex flex-wrap gap-1.5">
      <legend className="sr-only">Filter snippets</legend>
      {option(null, 'All')}
      {labels.map((label) => option(label, label))}
    </fieldset>
  );
}

export function SnippetList({ items }: { items: SnippetItem[] }) {
  const [label, setLabel] = useState<string | null>(null);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const labels = useMemo(() => uniqueLabels(items.flatMap((item) => item.labels)), [items]);
  const visible = label ? items.filter((item) => item.labels.some((l) => sameLabel(l, label))) : items;

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        {labels.length > 1 ? <LabelFilter labels={labels} value={label} onChange={setLabel} /> : <span />}
        <p className="text-faint font-mono text-[12px] tabular-nums" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'snippet' : 'snippets'}
        </p>
      </div>
      <Timeline>
        {visible.map((item) => (
          <SnippetRow
            key={item.slug}
            {...item}
            open={openSlug === item.slug}
            onToggle={() => setOpenSlug(openSlug === item.slug ? null : item.slug)}
          />
        ))}
      </Timeline>
    </>
  );
}
