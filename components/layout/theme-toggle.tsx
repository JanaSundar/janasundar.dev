'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useIsClient } from '@/lib/use-is-client';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The theme is unknown during SSR; render an empty button until hydrated.
  const mounted = useIsClient();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={mounted ? `Switch to ${isDark ? 'light' : 'dark'} theme` : 'Toggle theme'}
      className="text-muted hover:bg-subtle hover:text-fg relative grid size-7 place-items-center rounded-md transition-colors"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.svg
            key={isDark ? 'moon' : 'sun'}
            width={15}
            height={15}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            aria-hidden
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
            ) : (
              <>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </>
            )}
          </motion.svg>
        ) : null}
      </AnimatePresence>
    </button>
  );
}
