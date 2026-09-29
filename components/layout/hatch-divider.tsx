import { cn } from '@/lib/cn';

/** A small crosshair that marks where a band meets the column edge. */
export function Tick({ className }: { className: string }) {
  return (
    <span aria-hidden className={cn('pointer-events-none absolute z-10 size-[9px] text-faint', className)}>
      <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current" />
    </span>
  );
}

/** Full-bleed diagonal band between sections, with crosshair ticks on the column edges. */
export function HatchDivider({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('hatch relative h-7 border-y border-border', className)}>
      <Tick className="-top-[5px] -left-[5px]" />
      <Tick className="-top-[5px] -right-[5px]" />
      <Tick className="-bottom-[5px] -left-[5px]" />
      <Tick className="-right-[5px] -bottom-[5px]" />
    </div>
  );
}
