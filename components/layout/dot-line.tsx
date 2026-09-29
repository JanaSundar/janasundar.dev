'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

/** One dash plus one gap, in px. Must match the background-size of `.dots-x` / `.dots-y`. */
const PITCH = 6;

const easeOut = (t: number) => 1 - (1 - t) ** 3;

type DotLineProps = {
  orientation: 'vertical' | 'horizontal';
  /** Reveal on mount, or when the line scrolls into view. */
  trigger?: 'mount' | 'view';
  duration?: number;
  delay?: number;
  className?: string;
};

/**
 * A dotted line that reveals one dot at a time: top to bottom when vertical, left to right when horizontal.
 * The reveal is a clip that advances in whole-dot steps, so the dots appear in sequence instead of a smooth wipe.
 */
export function DotLine({ orientation, trigger = 'mount', duration = 1, delay = 0, className }: DotLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [steps, setSteps] = useState(0);
  const reduce = useReducedMotion();
  const vertical = orientation === 'vertical';

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const length = vertical ? el.offsetHeight : el.offsetWidth;
      setSteps(Math.max(1, Math.round(length / PITCH)));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [vertical]);

  const hidden = vertical ? 'inset(0 0 100% 0)' : 'inset(0 100% 0 0)';
  const shown = 'inset(0 0% 0 0)';
  const stepped = (t: number) => (steps ? Math.floor(easeOut(t) * steps) / steps : easeOut(t));

  const animation = reduce
    ? { initial: { opacity: 0 }, target: { opacity: 1 }, transition: { duration: 0.3 } }
    : {
        initial: { clipPath: hidden },
        target: { clipPath: vertical ? 'inset(0 0 0% 0)' : shown },
        transition: { duration, delay, ease: stepped },
      };

  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none block', vertical ? 'dots-y' : 'dots-x', className)}
      initial={animation.initial}
      {...(trigger === 'view'
        ? { whileInView: animation.target, viewport: { once: true, margin: '0px 0px -10% 0px' } }
        : { animate: animation.target })}
      transition={animation.transition}
    />
  );
}
