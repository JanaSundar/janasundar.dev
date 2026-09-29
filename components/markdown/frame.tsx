'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { Tick } from '@/components/layout/hatch-divider';
import { cn } from '@/lib/cn';

const ContainedContext = createContext(false);

/**
 * Frames inside it stay within their container instead of bleeding out to the page rails. Use it where an article's
 * content is shown somewhere narrower than the article itself, such as an expanded list item.
 */
export function ContainedFrames({ children }: { children: ReactNode }) {
  return <ContainedContext.Provider value>{children}</ContainedContext.Provider>;
}

/**
 * A band that breaks out of the text measure and runs edge to edge between the rails, with hairlines top and
 * bottom and a crosshair wherever it meets a rail. Code, playgrounds and figures all sit in one, so anything you
 * can interact with or copy reads as a separate surface from the prose. Inside `ContainedFrames` it becomes a
 * rounded box that fits its container.
 */
export function Frame({
  as: Tag = 'div',
  className,
  children,
}: {
  /** `span` where the frame sits inside running text, since a `div` can't go in a paragraph. */
  as?: 'div' | 'span';
  className?: string;
  children: ReactNode;
}) {
  const contained = useContext(ContainedContext);

  return (
    <Tag
      className={cn(
        'not-prose border-border relative',
        contained ? 'frame-contained overflow-hidden rounded-xl border' : '-mx-5 border-y sm:-mx-8',
        className
      )}
    >
      {contained ? null : (
        <>
          <Tick className="-top-[5px] -left-[5px] hidden sm:block" />
          <Tick className="-top-[5px] -right-[5px] hidden sm:block" />
          <Tick className="-bottom-[5px] -left-[5px] hidden sm:block" />
          <Tick className="-right-[5px] -bottom-[5px] hidden sm:block" />
        </>
      )}
      {children}
    </Tag>
  );
}

/** The strip along the top of a frame: a label on the left, actions on the right. Aligned to the text measure. */
export function FrameBar({
  as: Tag = 'div',
  children,
  className,
}: {
  as?: 'div' | 'span';
  children: ReactNode;
  className?: string;
}) {
  const contained = useContext(ContainedContext);

  return (
    <Tag
      className={cn(
        'border-border flex h-10 items-center justify-between gap-3 border-b font-mono text-[12px]',
        contained ? 'px-4' : 'px-5 sm:px-8',
        className
      )}
    >
      {children}
    </Tag>
  );
}

/** A quiet action in a frame bar (copy, reset, open elsewhere): faint until hovered. */
export const frameAction =
  'text-faint hover:text-fg hover:bg-subtle press inline-flex h-7 items-center gap-1 rounded-md px-2 transition-colors';
