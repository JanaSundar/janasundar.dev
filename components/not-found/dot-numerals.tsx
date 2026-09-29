'use client';

import { motion, useReducedMotion } from 'motion/react';

/** Each glyph is 5 columns by 7 rows; `#` is a lit dot. */
const glyphs: Record<string, string[]> = {
  '4': ['...#.', '..##.', '.#.#.', '#..#.', '#####', '...#.', '...#.'],
  '0': ['.###.', '#...#', '#..##', '#.#.#', '##..#', '#...#', '.###.'],
};

const PITCH = 10;
const GAP = 1;

/** The one dot in the zero that marks "you are here": the middle of its diagonal. */
const MARKER = { glyph: 1, row: 3, col: 2 };

/**
 * A number in dot-matrix, drawn on the same dotted grid as the rest of the site. Every cell is a dot: the ones that
 * spell the number are bright and pop in from left to right, the rest stay faint, so the number sits inside the grid
 * instead of on top of it. One dot in the zero is the accent colour and pulses, like the current node in a timeline.
 */
export function DotNumerals({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  const columns = text.length * (5 + GAP) - GAP;
  const width = columns * PITCH;
  const height = 7 * PITCH;

  const dots = [...text].flatMap((char, glyph) =>
    glyphs[char].flatMap((line, row) =>
      [...line].map((cell, col) => {
        const x = glyph * (5 + GAP) + col;
        return {
          key: `${glyph}-${row}-${col}`,
          cx: x * PITCH + PITCH / 2,
          cy: row * PITCH + PITCH / 2,
          lit: cell === '#',
          marker: glyph === MARKER.glyph && row === MARKER.row && col === MARKER.col,
          delay: x * 0.035 + row * 0.012,
        };
      })
    )
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} style={{ overflow: 'visible' }}>
      <title>{text}</title>
      {dots.map(({ key, cx, cy, lit, marker, delay }) => {
        if (!lit) return <circle key={key} cx={cx} cy={cy} r={1.3} className="fill-grid" />;

        return (
          <motion.circle
            key={key}
            cx={cx}
            cy={cy}
            r={marker ? 3.6 : 3}
            className={marker ? 'fill-accent' : 'fill-fg'}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={reduce ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.35, delay }}
          />
        );
      })}

      {/* A soft ring that breathes around the marker, drawn under it. */}
      {reduce ? null : (
        <motion.circle
          cx={(1 * (5 + GAP) + 2) * PITCH + PITCH / 2}
          cy={3 * PITCH + PITCH / 2}
          r={3.6}
          className="fill-accent"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ scale: 1, opacity: 0 }}
          animate={{ scale: [1, 3.2], opacity: [0.35, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 1.4 }}
        />
      )}
    </svg>
  );
}
