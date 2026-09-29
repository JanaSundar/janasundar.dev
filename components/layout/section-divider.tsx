import { DotLine } from '@/components/layout/dot-line';

/** Section divider: the same dotted line as the rails, laid flat, fading out at both ends. */
export function SectionDivider() {
  return (
    <div aria-hidden className="px-5 sm:px-8">
      <DotLine orientation="horizontal" trigger="view" duration={0.8} className="fade-x" />
    </div>
  );
}
