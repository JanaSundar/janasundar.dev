'use client';

import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

const easeOut = [0.23, 1, 0.32, 1] as const;

/** Scroll reveal: a short rise + fade. Under reduced motion it is a plain fade with no movement. */
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, transform: reduce ? 'translateY(0px)' : 'translateY(12px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: reduce ? 0.2 : 0.55, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}
