'use client';

import { useRef, useState, type ComponentPropsWithoutRef } from 'react';
import { CheckIcon, CopyIcon } from '@/components/icons';

type CodeBlockProps = ComponentPropsWithoutRef<'pre'> & { 'data-lang'?: string };

export function CodeBlock({ children, className, ...props }: CodeBlockProps) {
  const ref = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);
  const lang = props['data-lang'];

  async function copy() {
    await navigator.clipboard.writeText(ref.current?.textContent ?? '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="group card relative overflow-hidden rounded-2xl">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        {lang && lang !== 'plaintext' ? <span className="text-faint font-mono text-[11px]">{lang}</span> : null}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="bg-surface text-muted hover:text-fg press grid size-7 place-items-center rounded-full shadow-[0_0_0_1px_var(--border)]"
        >
          {copied ? <CheckIcon className="text-accent" /> : <CopyIcon />}
        </button>
      </div>
      <pre ref={ref} className={className} {...props}>
        {children}
      </pre>
    </div>
  );
}
