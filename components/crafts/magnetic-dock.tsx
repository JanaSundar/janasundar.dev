'use client';

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';

const apps = [
  { name: 'Finder', hue: 220, glyph: '◐' },
  { name: 'Terminal', hue: 150, glyph: '>_' },
  { name: 'Editor', hue: 262, glyph: '{}' },
  { name: 'Design', hue: 330, glyph: '◇' },
  { name: 'Music', hue: 12, glyph: '♪' },
  { name: 'Notes', hue: 48, glyph: '✎' },
];

function DockItem({ mouseX, name, hue, glyph }: { mouseX: MotionValue<number> } & (typeof apps)[number]) {
  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(mouseX, (x) => {
    const bounds = ref.current?.getBoundingClientRect();
    return bounds ? x - bounds.left - bounds.width / 2 : Infinity;
  });
  const size = useSpring(useTransform(distance, [-120, 0, 120], [40, 64, 40]), {
    stiffness: 380,
    damping: 26,
    mass: 0.2,
  });

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label={name}
      style={{
        width: size,
        height: size,
        background: `linear-gradient(145deg, oklch(0.72 0.15 ${hue}), oklch(0.52 0.17 ${hue + 20}))`,
      }}
      className="group relative grid shrink-0 place-items-center rounded-[28%] font-mono text-[13px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_2px_6px_rgb(0_0_0/0.15)]"
    >
      {glyph}
      <span className="border-border bg-surface text-fg pointer-events-none absolute -top-7 rounded-md border px-1.5 py-0.5 font-sans text-[11px] font-normal opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {name}
      </span>
    </motion.button>
  );
}

export function MagneticDock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.clientX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="border-border bg-surface/70 flex h-[76px] items-end gap-2.5 rounded-2xl border px-3 pb-2.5 shadow-sm backdrop-blur"
    >
      {apps.map((app) => (
        <DockItem key={app.name} mouseX={mouseX} {...app} />
      ))}
    </div>
  );
}
