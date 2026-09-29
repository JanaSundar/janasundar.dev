'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState, type ReactNode } from 'react';

export function Spoiler({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div className="relative">
      <div
        aria-hidden={!revealed}
        className={`border-border bg-subtle rounded-xl border p-4 transition-[filter] duration-300 ${revealed ? '' : 'blur-sm select-none'}`}
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
            className="border-border bg-surface text-fg absolute inset-0 m-auto h-fit w-fit rounded-full border px-3.5 py-1.5 text-[13px] font-medium shadow-sm"
          >
            Reveal
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
