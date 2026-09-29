'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';
import { CheckIcon, CopyIcon, MailIcon } from '@/components/icons';

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      window.location.href = `mailto:${email}`;
      return;
    }
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="group text-fg press flex w-full items-center gap-3 text-left"
      aria-label={`Copy email address ${email}`}
    >
      <MailIcon className="text-muted" />
      <span>{email}</span>
      <span className="text-faint group-hover:text-fg relative ml-auto grid size-4 place-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={copied ? 'check' : 'copy'}
            initial={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.7, filter: 'blur(2px)' }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className={copied ? 'text-accent' : undefined}
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Copied to clipboard' : ''}
      </span>
    </button>
  );
}
