'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { CheckIcon, CopyIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

/** Copies text to the clipboard and reports it for `duration` ms. `copy` resolves to whether the copy worked. */
export function useCopy(duration = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return false;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), duration);
    return true;
  }

  return { copied, copy };
}

/** The copy icon, swapping to a check while `copied`. `checkClassName` colours the check. */
export function CopyStatus({
  copied,
  className,
  checkClassName = 'text-accent',
}: {
  copied: boolean;
  className?: string;
  checkClassName?: string;
}) {
  return (
    <span className={cn('relative grid size-4 place-items-center', className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={copied ? 'check' : 'copy'}
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
          transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
          className={copied ? checkClassName : undefined}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
