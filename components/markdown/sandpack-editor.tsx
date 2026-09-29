'use client';

import {
  SandpackCodeEditor,
  SandpackLayout,
  SandpackPreview,
  SandpackProvider,
  type SandpackPredefinedTemplate,
  type SandpackThemeProp,
} from '@codesandbox/sandpack-react';
import { useTheme } from 'next-themes';

// Carried over from the v2 Sorcerer theme.
const sorcerer: SandpackThemeProp = {
  colors: {
    surface1: '#0e141a',
    surface2: '#1a222b',
    surface3: '#5a69861f',
    clickable: '#8d8d96',
    base: '#ececee',
    disabled: '#5a6986',
    hover: '#ffffff',
    accent: '#ff006a',
  },
  syntax: {
    plain: '#44dfff',
    comment: { color: '#5a6986', fontStyle: 'italic' },
    keyword: '#ffffff',
    tag: '#ff006a',
    punctuation: '#5a6986',
    definition: '#ff006a',
    property: '#ff006a',
    static: '#44dfff',
    string: '#aaed36',
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
import "./center.css";
import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
`;

const centerCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: system-ui, sans-serif; }
`;

const reactSetup = {
  '/index.js': { code: indexJs, hidden: true },
  '/center.css': { code: centerCss, hidden: true },
};

const normalize = (name: string) => (name.startsWith('/') ? name : `/${name}`);

type Props = {
  files: Record<string, string>;
  template?: string;
  previewOnly?: boolean;
  only?: string[];
};

export default function SandpackEditor({ files, template = 'react', previewOnly = false, only }: Props) {
  const { resolvedTheme } = useTheme();
  const wanted = only?.map(normalize);

  const entries = Object.entries(files)
    .map(([name, code]) => [normalize(name), code.trim()] as const)
    .filter(([name]) => !wanted || wanted.includes(name));

  return (
    <div className="not-prose card overflow-hidden">
      <SandpackProvider
        template={template as SandpackPredefinedTemplate}
        theme={resolvedTheme === 'dark' ? sorcerer : 'light'}
        files={{ ...Object.fromEntries(entries), ...(template === 'react' ? reactSetup : {}) }}
        options={{ externalResources: ['https://cdn.tailwindcss.com'] }}
      >
        <SandpackLayout style={{ border: 0, borderRadius: 0 }}>
          {previewOnly ? null : <SandpackCodeEditor showTabs showLineNumbers />}
          <SandpackPreview showOpenInCodeSandbox={!previewOnly} showRefreshButton={!previewOnly} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
