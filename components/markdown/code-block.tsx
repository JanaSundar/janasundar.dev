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
    <div className="group border-border relative overflow-hidden rounded-xl border">
      <div className="absolute top-2 right-2 z-10 flex items-center gap-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
        {lang && lang !== 'plaintext' ? (
          <span className="text-faint font-mono text-[10px] uppercase">{lang}</span>
        ) : null}
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied' : 'Copy code'}
          className="border-border bg-surface text-muted hover:text-fg grid size-7 place-items-center rounded-md border"
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
