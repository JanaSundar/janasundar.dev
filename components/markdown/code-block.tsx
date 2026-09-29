'use client';

import { useRef, type ComponentPropsWithoutRef } from 'react';
import { CopyStatus, useCopy } from '@/components/ui/copy';
import { cn } from '@/lib/cn';
import { languageLabel } from '@/lib/code-language';
import { Frame, FrameBar, frameAction } from './frame';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & {
  'data-lang'?: string;
  'data-code-title'?: string;
  'data-meta'?: string;
  'data-filename'?: string;
};

export function CodeBlock({
  children,
  className,
  'data-code-title': title,
  'data-meta': _meta,
  'data-filename': _filename,
  ...props
}: CodeBlockProps) {
  const ref = useRef<HTMLPreElement>(null);
  const { copied, copy } = useCopy(1500);
  const lang = props['data-lang'];
  const label = title ?? languageLabel(lang);

  return (
    <Frame className="bg-(--code-bg)">
      <FrameBar>
        <span className={title ? 'text-fg' : 'text-faint'}>{label}</span>
        <button
          type="button"
          onClick={() => copy(ref.current?.textContent ?? '')}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className={cn(frameAction, '-mr-2')}
        >
          <CopyStatus copied={copied} className="size-3.5" checkClassName="text-fg" />
        </button>
      </FrameBar>
      <pre ref={ref} className={className} {...props}>
        {children}
      </pre>
    </Frame>
  );
}
