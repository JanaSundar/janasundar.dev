'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useEffect, useId, useMemo, useState } from 'react';
import { easeOut } from '@/lib/motion';
import { Timeline, TimelineItem, TimelineSubItem, TimelineSubList, type NodeTone } from '@/components/ui/timeline';

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

/** Id of the last heading that has scrolled past the reading line near the top of the viewport. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    if (!elements.length) return;

    const update = () => {
      const line = window.innerHeight * 0.3;
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

function TocList({ groups, order, active }: { groups: Group[]; order: string[]; active: string | null }) {
  const activeIndex = active ? order.indexOf(active) : -1;
  const tone = (id: string): NodeTone => {
    const index = order.indexOf(id);
    if (index === activeIndex) return 'current';
    return index < activeIndex ? 'done' : 'default';
  };

  const linkClass = (id: string) => `block transition-colors hover:text-fg ${id === active ? 'text-fg' : 'text-muted'}`;

  return (
    <Timeline>
      {groups.map(({ heading, children }) => (
        <TimelineItem
          key={heading.id}
          tone={tone(heading.id)}
          title={
            <a href={`#${heading.id}`} className={`${linkClass(heading.id)} text-[13.5px] font-medium`}>
              {heading.text}
            </a>
          }
        >
          {children.length ? (
            <TimelineSubList>
              {children.map((child) => (
                <TimelineSubItem key={child.id} tone={tone(child.id)}>
                  <a href={`#${child.id}`} className={`${linkClass(child.id)} text-[13px]`}>
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
 * Article contents as a dotted timeline. On wide screens it sits in the left margin and follows the reader;
 * on narrower screens it is a collapsible block above the article. Nodes fill in as headings are passed.
 */
export function Toc({ headings }: { headings: TocHeading[] }) {
  const groups = useMemo(() => group(headings), [headings]);
  const order = useMemo(
    () => groups.flatMap(({ heading, children }) => [heading.id, ...children.map((c) => c.id)]),
    [groups]
  );
  const active = useActiveHeading(order);
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const reduce = useReducedMotion();

  return (
    <>
      <nav
        aria-label="On this page"
        className="fixed top-24 hidden max-h-[calc(100dvh-8rem)] w-52 overflow-y-auto xl:block"
        style={{ left: 'max(1.5rem, calc(50% - 22rem - 14.5rem))' }}
      >
        <p className="label mb-4">On this page</p>
        <TocList groups={groups} order={order} active={active} />
      </nav>

      <div className="card mb-10 px-4 py-3 xl:hidden">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
          className="label press flex w-full items-center justify-between"
        >
          On this page
          <motion.span
            aria-hidden
            animate={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
            transition={{ duration: 0.2, ease: easeOut }}
          >
            ›
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="panel"
              className="overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: reduce ? 0.15 : 0.28, ease: easeOut }}
            >
              <div className="pt-4">
                <TocList groups={groups} order={order} active={active} />
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
