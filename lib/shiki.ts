import 'server-only';

import { createHighlighter, type BundledLanguage, type ThemeRegistration } from 'shiki';

// Colours carried over from the v2 Prism "Sorcerer" theme.
const white = '#ffffff';
const pink = '#ff006a';
const lightBlue = '#44dfff';
const gray = '#5a6986';
const lightGreen = '#aaed36';

const sorcerer: ThemeRegistration = {
  name: 'sorcerer',
  type: 'dark',
  colors: { 'editor.background': '#0e141a', 'editor.foreground': white },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: gray, fontStyle: 'italic' } },
    { scope: ['punctuation', 'meta.brace', 'meta.delimiter'], settings: { foreground: gray } },
    {
      scope: ['string', 'string.quoted', 'string.template', 'constant.character'],
      settings: { foreground: lightGreen },
    },
    {
      scope: ['entity.name.function', 'support.function', 'meta.function-call', 'markup.inserted'],
      settings: { foreground: pink },
    },
    { scope: ['entity.name.tag', 'support.class.component'], settings: { foreground: pink } },
    {
      scope: ['variable', 'variable.other', 'constant.language.boolean', 'markup.changed', 'keyword.operator.spread'],
      settings: { foreground: lightBlue },
    },
    {
      scope: [
        'keyword',
        'storage',
        'constant.numeric',
        'entity.name.type',
        'support.type',
        'entity.other.attribute-name',
      ],
      settings: { foreground: white },
    },
    { scope: ['variable.other.property', 'meta.object-literal.key'], settings: { foreground: white } },
    { scope: ['markup.deleted'], settings: { foreground: '#ff6b6b' } },
  ],
};

const langs = [
  'javascript',
  'jsx',
  'typescript',
  'tsx',
  'json',
  'css',
  'html',
  'bash',
  'shellscript',
  'markdown',
  'mdx',
  'yaml',
  'diff',
  'graphql',
  'sql',
  'python',
] as const;

const aliases: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  sh: 'bash',
  shell: 'bash',
  md: 'markdown',
  yml: 'yaml',
};

let highlighterPromise: ReturnType<typeof createHighlighter> | undefined;

function getShiki() {
  return (highlighterPromise ??= createHighlighter({ themes: ['github-light', sorcerer], langs: [...langs] }));
}

const wrapper = /^<pre[^>]*><code[^>]*>([\s\S]*)<\/code><\/pre>$/;

/**
 * TanStack Markdown owns the `<pre><code>` wrapper and wants only the inner
 * token markup back, synchronously. Load Shiki once, then hand back a sync callback.
 */
export async function getCodeHighlighter() {
  const shiki = await getShiki();
  const loaded = new Set(shiki.getLoadedLanguages());

  return (code: string, lang?: string) => {
    const requested = lang ? (aliases[lang] ?? lang) : 'text';
    const html = shiki.codeToHtml(code.replace(/\n$/, ''), {
      lang: loaded.has(requested) ? (requested as BundledLanguage) : 'text',
      themes: { light: 'github-light', dark: 'sorcerer' },
      defaultColor: false,
    });
    return wrapper.exec(html)?.[1] ?? html;
  };
}
