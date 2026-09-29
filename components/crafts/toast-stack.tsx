'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useRef, useState } from 'react';

const messages = [
  { title: 'Deploy succeeded', body: 'janasundar.dev is live on production.' },
  { title: 'New comment', body: 'Someone replied to your post on caching.' },
  { title: 'Build queued', body: 'Waiting for an available runner.' },
  { title: 'Invite accepted', body: 'You have a new collaborator.' },
];

type Toast = { id: number; title: string; body: string };

const VISIBLE = 3;

export function ToastStack() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [expanded, setExpanded] = useState(false);
  const next = useRef(0);

  function push() {
    const id = next.current++;
    const message = messages[id % messages.length];
    setToasts((current) => [{ id, ...message }, ...current].slice(0, 5));
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-between py-4">
      <div
        className="relative h-[164px] w-64"
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        onFocus={() => setExpanded(true)}
        onBlur={() => setExpanded(false)}
      >
        <ol aria-label="Notifications">
          <AnimatePresence initial={false}>
            {toasts.map((toast, index) => {
              const hidden = index >= VISIBLE;
              return (
                <motion.li
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, y: -24, scale: 0.9 }}
                  animate={{
                    opacity: hidden ? 0 : 1,
                    y: expanded ? index * 56 : index * 8,
                    scale: expanded ? 1 : 1 - index * 0.05,
                  }}
                  exit={{ opacity: 0, x: 40, transition: { duration: 0.15 } }}
                  transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  style={{ zIndex: toasts.length - index }}
                  className="border-border bg-surface absolute inset-x-0 top-0 origin-top rounded-xl border px-3.5 py-2 shadow-[0_4px_16px_-6px_rgb(0_0_0/0.18)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-fg text-[13px] font-medium">{toast.title}</p>
                      <p className="text-muted truncate text-[12px]">{toast.body}</p>
                    </div>
                    <button
                      type="button"
                      aria-label="Dismiss"
                      onClick={() => setToasts((current) => current.filter((t) => t.id !== toast.id))}
                      className="text-faint hover:bg-subtle hover:text-fg -mr-1 grid size-5 shrink-0 place-items-center rounded"
                    >
                      ×
                    </button>
                  </div>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ol>
      </div>
      <button
        type="button"
        onClick={push}
        className="border-border bg-surface text-fg rounded-full border px-3.5 py-1.5 text-[13px] font-medium shadow-sm transition-transform active:scale-95"
      >
        Send notification
      </button>
    </div>
  );
}
