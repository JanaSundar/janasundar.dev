'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState, type ReactNode } from 'react';

export function Spoiler({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <div
        aria-hidden={!revealed}
        className={`bg-subtle rounded-xl p-4 transition-[filter] duration-300 ${revealed ? '' : 'blur-sm select-none'}`}
      >
        {children}
      </div>
      <AnimatePresence>
        {!revealed ? (
          <motion.button
            type="button"
            onClick={() => setRevealed(true)}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="material text-fg press absolute inset-0 m-auto h-fit w-fit rounded-lg px-3.5 py-1.5 text-[13.5px] font-medium"
          >
            Reveal
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
