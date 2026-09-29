import type { Variants } from 'motion/react';

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
