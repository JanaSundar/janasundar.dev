'use client';

import { motion, useReducedMotion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useId } from 'react';
import { easeOut } from '@/lib/motion';
import { useIsClient } from '@/lib/use-is-client';

/** Rays around the sun: eight short strokes on a circle of radius 8, starting at 12 o'clock. */
const rays = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * Math.PI) / 4;
  const [dx, dy] = [Math.sin(angle), -Math.cos(angle)];
  return { x1: 12 + dx * 7.5, y1: 12 + dy * 7.5, x2: 12 + dx * 9.5, y2: 12 + dy * 9.5 };
});

/** A four-point sparkle, centred on (19.3, 4.9): the star beside the moon. */
const sparkle = 'M19.3 2.4 20.1 4.1 21.8 4.9 20.1 5.7 19.3 7.4 18.5 5.7 16.8 4.9 18.5 4.1Z';

/**
 * One shape that is a sun in light mode and a crescent moon in dark. The disc grows, a cut-out circle (a mask) slides
 * across it to carve the crescent, the rays fold back into it and a small star appears, so the icon transforms
 * instead of swapping.
 */
function ThemeIcon({ dark }: { dark: boolean }) {
  const mask = useId();
  const reduce = useReducedMotion();
  const transition = reduce ? { duration: 0 } : { duration: 0.45, ease: easeOut };

  return (
    <motion.svg width={16} height={16} viewBox="0 0 24 24" fill="none" aria-hidden initial={false}>
      <mask id={mask}>
        <rect width="24" height="24" fill="white" />
        <motion.circle
          r={7.4}
          fill="black"
          initial={false}
          animate={dark ? { cx: 17.2, cy: 7.4 } : { cx: 32, cy: -6 }}
          transition={transition}
        />
      </mask>
      <motion.circle
        cx={12}
        cy={12}
        fill="currentColor"
        mask={`url(#${mask})`}
        initial={false}
        animate={{ r: dark ? 8.2 : 4.5 }}
        transition={transition}
      />
      <motion.g
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        initial={false}
        animate={dark ? { scale: 0.4, opacity: 0, rotate: -30 } : { scale: 1, opacity: 1, rotate: 0 }}
        transition={transition}
      >
        {rays.map((ray) => (
          <line key={`${ray.x1}-${ray.y1}`} {...ray} />
        ))}
      </motion.g>
      <motion.path
        d={sparkle}
        fill="currentColor"
        initial={false}
        animate={dark ? { scale: 1, opacity: 1, rotate: 0 } : { scale: 0.3, opacity: 0, rotate: -90 }}
        transition={reduce ? transition : { ...transition, delay: dark ? 0.12 : 0 }}
      />
    </motion.svg>
  );
}

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
      className="text-muted hover:bg-subtle hover:text-fg press relative grid size-8 place-items-center rounded-md"
    >
      {mounted ? <ThemeIcon dark={isDark} /> : null}
    </button>
  );
}
