'use client';

import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'motion/react';
import { useRef, useState } from 'react';

const HOLD_MS = 1400;

export function HoldToConfirm() {
  const [done, setDone] = useState(false);
  const progress = useMotionValue(0);
  const clip = useTransform(progress, (p) => `inset(0 ${100 - p * 100}% 0 0)`);
  const controls = useRef<ReturnType<typeof animate> | null>(null);

  function start() {
    if (done) return;
    controls.current?.stop();
    controls.current = animate(progress, 1, {
      duration: (HOLD_MS / 1000) * (1 - progress.get()),
      ease: 'linear',
      onComplete: () => {
        setDone(true);
        setTimeout(() => {
          setDone(false);
          progress.set(0);
        }, 1600);
      },
    });
  }

  function cancel() {
    if (done) return;
    controls.current?.stop();
    controls.current = animate(progress, 0, { duration: 0.3, ease: [0.22, 1, 0.36, 1] });
  }

  const label = (text: string) => (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span
        key={done ? 'done' : 'hold'}
        initial={{ y: 12, opacity: 0, filter: 'blur(3px)' }}
        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
        exit={{ y: -12, opacity: 0, filter: 'blur(3px)' }}
        transition={{ duration: 0.2 }}
        className="block"
      >
        {done ? 'Archived' : text}
      </motion.span>
    </AnimatePresence>
  );

  return (
    <motion.button
      type="button"
      onPointerDown={start}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && !e.repeat && start()}
      onKeyUp={(e) => (e.key === ' ' || e.key === 'Enter') && cancel()}
      whileTap={{ scale: 0.97 }}
      className="bg-surface text-fg relative h-11 w-48 touch-none overflow-hidden rounded-full text-[15px] font-medium shadow-[0_1px_3px_rgb(0_0_0/0.15),0_0_0_0.5px_rgb(0_0_0/0.06)] select-none"
    >
      <span className="relative block overflow-hidden">{label('Hold to archive')}</span>
      <motion.span
        aria-hidden
        style={{ clipPath: clip }}
        className="bg-fg text-bg absolute inset-0 grid place-items-center overflow-hidden"
      >
        {label('Hold to archive')}
      </motion.span>
    </motion.button>
  );
}
