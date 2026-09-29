'use client';

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  UnstyledOpenInCodeSandboxButton,
  useSandpack,
  type SandpackFiles,
  type SandpackPredefinedTemplate,
  type SandpackTheme,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';
import { ArrowUpRight } from '@/components/icons';
import { cn } from '@/lib/cn';
import { Frame, FrameBar, frameAction } from './frame';

/**
 * Built from the site's own tokens, so the one theme follows light and dark without swapping. The syntax colours
 * mirror the `th-*` rules in globals.css: ink for structure, the accent for literals, faint for comments.
 */
const ink: SandpackTheme = {
  colors: {
    surface1: 'var(--code-bg)',
    surface2: 'var(--border)',
    surface3: 'var(--subtle)',
    clickable: 'var(--faint)',
    base: 'var(--fg)',
    disabled: 'var(--faint)',
    hover: 'var(--fg)',
    accent: 'var(--fg)',
    error: '#e5484d',
    errorSurface: 'color-mix(in oklab, #e5484d 12%, var(--bg))',
  },
  syntax: {
    plain: 'color-mix(in oklab, var(--fg) 86%, var(--muted))',
    comment: { color: 'var(--faint)', fontStyle: 'italic' },
    keyword: { color: 'var(--fg)', fontWeight: '600' },
    definition: 'var(--fg)',
    punctuation: 'var(--faint)',
    property: 'var(--muted)',
    tag: 'var(--fg)',
    static: 'var(--accent)',
    string: 'var(--accent)',
  },
  font: {
    body: 'var(--font-geist-sans)',
    mono: 'var(--font-geist-mono)',
    size: '13px',
    lineHeight: '22px',
  },
};

const indexJs = `import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./stage.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;

/**
 * The preview sits on the same dotted grid as figures. The iframe can't read the page's tokens, so their current
 * values are copied in; `theme` is only there so a theme change produces new CSS.
 */
function stageCss(theme: string | undefined) {
  const root = getComputedStyle(document.documentElement);
  const token = (name: string) => root.getPropertyValue(name).trim();
  return `* { margin: 0; padding: 0; box-sizing: border-box; }
:root { color-scheme: ${theme === 'dark' ? 'dark' : 'light'}; }
body {
  display: flex; align-items: center; justify-content: center; min-height: 100vh;
  font-family: system-ui, sans-serif; color: ${token('--fg')};
  background: ${token('--bg')} radial-gradient(${token('--grid')} 1px, transparent 1px) 0 0 / 16px 16px;
}
`;
}

const normalize = (name: string) => (name.startsWith('/') ? name : `/${name}`);

function Toolbar({ title, previewOnly }: { title: string; previewOnly: boolean }) {
  const { sandpack } = useSandpack();

  return (
    <FrameBar>
      <span className="text-muted flex items-center gap-2">
        <span aria-hidden className="bg-accent size-1.5 rounded-full" />
        {title}
      </span>
      {previewOnly ? null : (
        <span className="flex items-center gap-1">
          <button type="button" onClick={() => sandpack.resetAllFiles()} className={frameAction}>
            Reset
          </button>
          <UnstyledOpenInCodeSandboxButton className={cn(frameAction, '-mr-2')}>
            CodeSandbox
            <ArrowUpRight />
          </UnstyledOpenInCodeSandboxButton>
        </span>
      )}
    </FrameBar>
  );
}

type Props = {
  files: Record<string, string>;
  template?: string;
  title?: string;
  previewOnly?: boolean;
  only?: string[];
};

export default function SandpackEditor({ files, template = 'react', title, previewOnly = false, only }: Props) {
  const { resolvedTheme } = useTheme();
  const wanted = only?.map(normalize);

  const entries = Object.entries(files)
    .map(([name, code]) => [normalize(name), code.trim()] as const)
    .filter(([name]) => !wanted || wanted.includes(name));

  const setup: SandpackFiles =
    template === 'react'
      ? {
          '/index.js': { code: indexJs, hidden: true },
          '/stage.css': { code: stageCss(resolvedTheme), hidden: true },
        }
      : {};

  return (
    <Frame className="bg-(--code-bg)">
      <SandpackProvider
        template={template as SandpackPredefinedTemplate}
        theme={ink}
        files={{ ...Object.fromEntries(entries), ...setup }}
        options={{ externalResources: ['https://cdn.tailwindcss.com'] }}
      >
        <Toolbar title={title ?? (previewOnly ? 'Preview' : 'Playground')} previewOnly={previewOnly} />
        {/* Stacked rather than side by side: the text column is too narrow to split. */}
        <SandpackLayout className="sandpack-stack">
          {previewOnly ? null : <SandpackCodeEditor showTabs showLineNumbers />}
          <SandpackPreview showOpenInCodeSandbox={false} showRefreshButton={!previewOnly} />
        </SandpackLayout>
      </SandpackProvider>
    </Frame>
  );
}
