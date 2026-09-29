'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { createContext, useContext, useId, useState, type ComponentProps, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type Ctx = { group: string; active: string | null; setActive: (id: string | null) => void };
const HighlightContext = createContext<Ctx | null>(null);

/**
 * One highlight shared by every row inside it. Instead of each row lighting up on its own, a single
 * background slides from row to row (a shared `layoutId`), so hovering feels like moving one cursor.
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

type HighlightLinkProps = Omit<ComponentProps<'a'>, 'href'> & {
  href: string;
  /** Corner radius of the highlight; match the row's own shape. */
  radius?: string;
};

/** A row link that owns a slot in the group's shared highlight. Falls back to a plain hover fill outside a group. */
export function HighlightLink({ href, radius = 'rounded-lg', className, children, ...rest }: HighlightLinkProps) {
  const id = useId();
  const ctx = useContext(HighlightContext);
  const isActive = ctx?.active === id;
  const external = /^https?:/.test(href);

  const shared = {
    className: cn('relative isolate', !ctx && 'hover:bg-subtle', radius, className),
    onPointerEnter: (e: React.PointerEvent) => e.pointerType === 'mouse' && ctx?.setActive(id),
    onFocus: () => ctx?.setActive(id),
    onBlur: () => ctx?.setActive(null),
  };

  const content = (
    <>
      {isActive ? (
        <motion.span
          aria-hidden
          layoutId={ctx?.group}
          className={cn('bg-subtle absolute inset-0 -z-10', radius)}
          transition={{ type: 'spring', duration: 0.25, bounce: 0 }}
        />
      ) : null}
      {children}
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" {...shared} {...rest}>
      {content}
    </a>
  ) : (
    <Link href={href} {...shared} {...rest}>
      {content}
    </Link>
  );
}
