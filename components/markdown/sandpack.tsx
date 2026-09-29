'use client';

import dynamic from 'next/dynamic';
import { Frame } from './frame';

type SandpackProps = {
  files: Record<string, string>;
  template?: string;
  /** Label in the toolbar. Defaults to "Playground", or "Preview" when `previewOnly`. */
  title?: string;
  previewOnly?: boolean;
  /** Subset of `files` to show, by name. Defaults to all. */
  only?: string[];
};

const SandpackEditor = dynamic(() => import('./sandpack-editor'), {
  ssr: false,
  loading: () => (
    <Frame className="dot-grid">
      <div className="text-faint grid h-[560px] place-items-center font-mono text-[12px]">Loading playground…</div>
    </Frame>
  ),
});

export function Sandpack(props: SandpackProps) {
  return <SandpackEditor {...props} />;
}
