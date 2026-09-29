'use client';

import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, type Transition } from 'motion/react';
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react';
import { Timeline, TimelineItem, TimelineSubItem, TimelineSubList, type NodeTone } from '@/components/ui/timeline';
import { cn } from '@/lib/cn';
import { fade, morph } from '@/lib/motion';

export type TocHeading = { id: string; text: string; level: number };

type Group = { heading: TocHeading; children: TocHeading[] };

/** h2s are parents; h3s hang under the h2 above them. A leading h3 becomes its own parent. */
function group(headings: TocHeading[]): Group[] {
  const groups: Group[] = [];
  for (const heading of headings) {
    const last = groups.at(-1);
    if (heading.level === 3 && last) last.children.push(heading);
    else groups.push({ heading, children: [] });
  }
  return groups;
}

/**
 * Id of the last heading that has scrolled past the reading line. The line sits 30% down the viewport, then slides
 * to the bottom over the last screen of scroll: headings near the end of the page can never reach 30%, and would
 * otherwise never become active.
 */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const update = () => {
      const viewport = window.innerHeight;
      const remaining = document.documentElement.scrollHeight - (window.scrollY + viewport);
      const nearEnd = 1 - Math.min(1, Math.max(0, remaining) / viewport);
      const line = viewport * (0.3 + 0.7 * nearEnd);
      let current: string | null = null;
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
      }
      setActive(current);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [ids]);

  return active;
}

/** Sections as the site's timeline: passed sections are filled, the current one is the accent node. */
function TocList({ groups, active, onPick }: { groups: Group[]; active: string | null; onPick: () => void }) {
  const order = groups.flatMap(({ heading, children }) => [heading.id, ...children.map((c) => c.id)]);
  const activeIndex = active ? order.indexOf(active) : -1;
  const tone = (id: string): NodeTone => {
    const index = order.indexOf(id);
    if (index === activeIndex) return 'current';
    return index < activeIndex ? 'done' : 'default';
  };
  const link = (id: string) => cn('hover:text-fg block transition-colors', id === active ? 'text-fg' : 'text-muted');

  return (
    <Timeline>
      {groups.map(({ heading, children }) => (
        <TimelineItem
          key={heading.id}
          dense
          tone={tone(heading.id)}
          title={
            <a href={`#${heading.id}`} onClick={onPick} className={cn(link(heading.id), 'text-[13px] font-medium')}>
              {heading.text}
            </a>
          }
        >
          {children.length ? (
            <TimelineSubList>
              {children.map((child) => (
                <TimelineSubItem key={child.id} tone={tone(child.id)} className="text-[13px]">
                  <a href={`#${child.id}`} onClick={onPick} className={link(child.id)}>
                    {child.text}
                  </a>
                </TimelineSubItem>
              ))}
            </TimelineSubList>
          ) : null}
        </TimelineItem>
      ))}
    </Timeline>
  );
}

/**
 * How far through the page the reader is, drawn as a ring that fills clockwise from 12 o'clock. It sits in a slot as
 * wide as a timeline node and is centred on it, so the ring lies on the same column as the nodes below it. The margin
 * after it (plus the button's gap) puts the section name where the timeline's titles start (28px in).
 */
function ProgressRing() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 300, damping: 40, restDelta: 0.001 });

  return (
    <span aria-hidden className="relative mr-2.5 size-2 shrink-0">
      <svg
        viewBox="0 0 16 16"
        className="absolute top-1/2 left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 -rotate-90"
      >
        <circle cx="8" cy="8" r="6" fill="none" strokeWidth="2" className="stroke-border" />
        <motion.circle
          cx="8"
          cy="8"
          r="6"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-fg"
          style={{ pathLength: progress }}
        />
      </svg>
    </span>
  );
}

/** Island geometry: a capsule when compact (radius = half its height), rounder-cornered card when open. */
const ROW = 36;
const RADIUS = 22;

/** Springs: opening overshoots a little, like the island reaching out; closing settles without a bounce. */
const springs = {
  open: { type: 'spring', duration: 0.5, bounce: 0.3 },
  close: { type: 'spring', duration: 0.4, bounce: 0.12 },
} satisfies Record<string, Transition>;

/** Text that re-renders in place when `id` changes (the section name, its number). */
function Swap({ id, className, children }: { id: string; className?: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <span className={cn('relative min-w-0', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span key={id} {...(reduce ? fade : morph)} transition={springs.close} className="block truncate">
          {children}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const pad = (n: number) => String(n).padStart(2, '0');

/**
 * Article contents as a Dynamic Island under the nav. Compact, it shows a reading-progress ring, the section being
 * read and its number. Opening grows the same island into the section timeline: one element resizes (`layout`)
 * and its header row never unmounts, so nothing in it fades out and back in. It appears at the first heading and
 * closes on a pick, an outside click or Escape.
 */
export function Toc({ headings }: { headings: TocHeading[] }) {
  const ids = useMemo(() => headings.map((h) => h.id), [headings]);
  const groups = useMemo(() => group(headings), [headings]);
  const active = useActiveHeading(ids);
  const index = headings.findIndex((h) => h.id === active);
  const current = headings[index];
  const [open, setOpen] = useState(false);
  const shell = useRef<HTMLDivElement>(null);
  const listId = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!shell.current?.contains(e.target as globalThis.Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const transition = reduce ? { duration: 0 } : open ? springs.open : springs.close;

  return (
    <nav
      aria-label="On this page"
      className="pointer-events-none fixed inset-x-0 top-[4.25rem] z-30 flex justify-center px-5"
    >
      <AnimatePresence>
        {current ? (
          <motion.div
            key="island"
            ref={shell}
            layout
            {...(reduce ? fade : morph)}
            transition={transition}
            // Radius lives in `style` so the layout animation keeps corners true while the box resizes. The width is
            // the same open or closed: the island only grows downward, so the header row never moves or rescales.
            style={{ borderRadius: open ? RADIUS : ROW / 2 }}
            className="island bg-subtle text-fg border-border pointer-events-auto w-[min(20rem,calc(100vw-2.5rem))] overflow-hidden border shadow-[0_8px_30px_-12px_rgb(0_0_0/0.5)]"
          >
            <motion.button
              layout="position"
              type="button"
              aria-expanded={open}
              aria-controls={listId}
              onClick={() => setOpen((o) => !o)}
              style={{ height: ROW }}
              className="flex w-full items-center gap-2.5 px-3 text-[13px] font-medium"
            >
              <ProgressRing />
              <Swap id={current.id} className="flex-1 text-left">
                {current.text}
              </Swap>
              <span className="text-faint flex shrink-0 font-mono text-[11px] tabular-nums">
                <Swap id={current.id}>{pad(index + 1)}</Swap>/{pad(headings.length)}
              </span>
            </motion.button>

            {/* `popLayout` takes the closing list out of flow at once, so the island shrinks with it, not after it. */}
            <AnimatePresence mode="popLayout" initial={false}>
              {open ? (
                <motion.div
                  key="list"
                  id={listId}
                  {...(reduce ? fade : morph)}
                  // A beat after the island starts growing, so the list arrives into space that is already there.
                  transition={reduce ? { duration: 0 } : { ...springs.open, delay: 0.05 }}
                  className="origin-top px-3 pt-1 pb-3.5"
                >
                  <TocList groups={groups} active={active} onPick={() => setOpen(false)} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
