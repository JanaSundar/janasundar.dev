import { DotLine } from '@/components/layout/dot-line';

/** The two dotted vertical lines that frame the column. Their dots appear top to bottom on load. */
export function Rails() {
  return (
    <>
      <DotLine orientation="vertical" className="absolute inset-y-0 left-0 hidden sm:block" />
      <DotLine orientation="vertical" delay={0.12} className="absolute inset-y-0 right-0 hidden sm:block" />
    </>
  );
}
