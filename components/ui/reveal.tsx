'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ComponentProps, ReactNode } from 'react';
import { containerVariants, itemVariants } from '@/lib/motion';

/**
 * Scroll-triggered orchestration. Children built from `RevealItem` / `RevealLi` (anywhere below, however deeply
 * nested in plain elements) enter one after another, like a wave, instead of the whole block fading at once.
 */
export function Reveal({ children }: { children: ReactNode }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {children}
    </motion.div>
  );
}

/** A step in the sequence. Renders inert (fully visible) when there is no `Reveal` above it. */
export function RevealItem(props: ComponentProps<typeof motion.div>) {
  const reduce = useReducedMotion();
  return <motion.div variants={itemVariants(reduce)} {...props} />;
}

export function RevealLi(props: ComponentProps<typeof motion.li>) {
  const reduce = useReducedMotion();
  return <motion.li variants={itemVariants(reduce)} {...props} />;
}
