'use client';

import dynamic from 'next/dynamic';

type SandpackProps = {
  files: Record<string, string>;
  template?: string;
  previewOnly?: boolean;
  /** Subset of `files` to show, by name. Defaults to all. */
  only?: string[];
};

const SandpackEditor = dynamic(() => import('./sandpack-editor'), {
  ssr: false,
  loading: () => (
    <div className="border-border bg-subtle text-faint grid h-[420px] place-items-center rounded-xl border font-mono text-[11px]">
      Loading sandbox…
    </div>
  ),
});

export function Sandpack(props: SandpackProps) {
  return <SandpackEditor {...props} />;
}
