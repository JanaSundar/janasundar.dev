'use client';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { fade, morph } from '@/lib/motion';

/**
 * Content that slides open in place: the box grows to its height with a spring, and the content blurs in a beat
 * later. Everything below it moves down to make room, and moves back up when it closes. The trigger is the caller's
 * to build; give it `aria-expanded` and `aria-controls={id}`.
 *
 * `className` styles the box that grows (it clips its content while it does), and `contentClassName` the content
 * inside it.
 */
export function SlideOpen({
  open,
  id,
  className,
  contentClassName = 'pt-4 pb-1',
  children,
}: {
  open: boolean;
  id: string;
  className?: string;
  contentClassName?: string;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const spring = reduce ? { duration: 0 } : { type: 'spring' as const, duration: 0.45, bounce: 0 };

  return (
    <AnimatePresence initial={false}>
      {open ? (
        <motion.div
          key="body"
          id={id}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={spring}
          className={cn('overflow-hidden', className)}
        >
          <motion.div
            {...(reduce ? fade : morph)}
            // The content follows a beat after the box starts growing, so it arrives into space that is already there.
            transition={reduce ? { duration: 0 } : { ...spring, delay: 0.05 }}
            className={cn('origin-top', contentClassName)}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
