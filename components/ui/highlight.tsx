'use client';

import { isExternal, newTab } from '@/lib/external';
import { motion } from 'motion/react';
import Link from 'next/link';
import { createContext, useContext, useId, useState, type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Ctx = { group: string; active: string | null; setActive: (id: string | null) => void };
const HighlightContext = createContext<Ctx | null>(null);

/**
 * One highlight shared by every item inside it. Instead of each item lighting up on its own, a single indicator
 * moves from item to item (a shared `layoutId`), so hovering feels like moving one cursor. Items choose what the
 * indicator is: a fill behind a row (`HighlightLink`) or any other shape (`HighlightItem`).
 */
export function HighlightGroup({ children, className }: { children: ReactNode; className?: string }) {
  const group = useId();
  const [active, setActive] = useState<string | null>(null);

  return (
    <HighlightContext.Provider value={{ group, active, setActive }}>
      <div className={className} onPointerLeave={() => setActive(null)}>
        {children}
      </div>
    </HighlightContext.Provider>
  );
}

/** Joins the nearest group: whether this item holds the highlight, and the handlers that claim it. */
function useHighlight() {
  const id = useId();
  const ctx = useContext(HighlightContext);
  return {
    ctx,
    handlers: {
      onPointerEnter: (e: React.PointerEvent) => e.pointerType === 'mouse' && ctx?.setActive(id),
      onFocus: () => ctx?.setActive(id),
      onBlur: () => ctx?.setActive(null),
    },
    indicator: (className: string) =>
      ctx?.active === id ? (
        <motion.span
          aria-hidden
          layoutId={ctx.group}
          className={cn('pointer-events-none', className)}
          transition={{ type: 'spring', duration: 0.25, bounce: 0 }}
        />
      ) : null,
  };
}

type HighlightLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
  /** Corner radius of the highlight; match the row's own shape. */
  radius?: string;
};

/** A row link that owns a slot in the group's shared highlight. Falls back to a plain hover fill outside a group. */
export function HighlightLink({ href, radius = 'rounded-lg', className, children, ...rest }: HighlightLinkProps) {
  const { ctx, handlers, indicator } = useHighlight();
  const external = isExternal(href);

  const shared = {
    className: cn('relative isolate', !ctx && 'hover:bg-subtle', radius, className),
    ...handlers,
  };

  const content = (
    <>
      {indicator(cn('bg-subtle absolute inset-0 -z-10', radius))}
      {children}
    </>
  );

  return external ? (
    <a href={href} {...newTab} {...shared} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} {...shared} {...rest}>
      {content}
    </Link>
  );
}

/**
 * Makes any content a slot in the group's highlight without adding a box of its own (`display: contents`).
 * The `indicator` classes draw and place the highlight against the nearest positioned ancestor.
 */
export function HighlightItem({ indicator: className, children }: { indicator: string; children: ReactNode }) {
  const { handlers, indicator } = useHighlight();
  return (
    <span className="contents" {...handlers}>
      {indicator(className)}
      {children}
    </span>
  );
}
