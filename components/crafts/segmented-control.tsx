'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useId, useState } from 'react';

const options = [
  { id: 'daily', label: 'Daily', value: '₹240', note: 'billed every day' },
  { id: 'monthly', label: 'Monthly', value: '₹4,800', note: 'billed every month' },
  { id: 'yearly', label: 'Yearly', value: '₹48,000', note: '2 months free' },
] as const;

export function SegmentedControl() {
  const [active, setActive] = useState<(typeof options)[number]['id']>('monthly');
  const pill = useId();
  const current = options.find((option) => option.id === active)!;

  return (
    <div className="flex flex-col items-center gap-5">
      <fieldset className="bg-fg/[0.07] flex rounded-full p-1">
        <legend className="sr-only">Billing period</legend>
        {options.map((option) => (
          <label
            key={option.id}
            className="has-checked:text-fg text-muted relative cursor-pointer rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors has-focus-visible:outline-2 has-focus-visible:outline-(--accent)"
          >
            <input
              type="radio"
              name={pill}
              value={option.id}
              checked={active === option.id}
              onChange={() => setActive(option.id)}
              className="sr-only"
            />
            {active === option.id ? (
              <motion.span
                layoutId={pill}
                className="bg-surface absolute inset-0 rounded-full shadow-[0_1px_3px_rgb(0_0_0/0.15),0_0_0_0.5px_rgb(0_0_0/0.04)]"
                transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </label>
        ))}
      </fieldset>
      <div className="flex h-12 flex-col items-center overflow-hidden text-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.id}
            initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <p className="text-fg text-2xl font-semibold tracking-tight tabular-nums">{current.value}</p>
            <p className="footnote">{current.note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
