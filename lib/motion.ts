import type { Variants } from 'motion/react';
import type { CSSProperties } from 'react';

export const easeOut = [0.23, 1, 0.32, 1] as const;

/** Gap between siblings in a staggered entrance. */
export const STAGGER = 0.07;

/** Container: adds no visuals of its own, it only sequences the items inside it. */
export const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren: 0.04 } },
};

/**
 * Item: rises a few pixels and sharpens from a slight blur, which hides the frame where the text first paints.
 * Under reduced motion it is a plain fade: no movement, no blur.
 */
export function itemVariants(reduce: boolean | null): Variants {
  return {
    hidden: reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(10px)', filter: 'blur(3px)' },
    show: {
      opacity: 1,
      ...(reduce ? {} : { transform: 'translateY(0px)', filter: 'blur(0px)' }),
      transition: { duration: reduce ? 0.2 : 0.5, ease: easeOut },
    },
  };
}

/** Position in a CSS `enter` / `pop` sequence (see globals.css): each step starts 80ms after the one before. */
export const enterStep = (i: number) => ({ '--i': i }) as CSSProperties;

/** Content swapping in or out: it scales and blurs through the change instead of sliding or popping. */
export const morph = {
  initial: { opacity: 0, scale: 0.9, filter: 'blur(5px)' },
  animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, scale: 0.9, filter: 'blur(5px)' },
};

/** The reduced-motion stand-in for `morph`: a plain fade. */
export const fade = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
