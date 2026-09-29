import type { MarkdownDocument, MarkdownExtension } from '@tanstack/markdown';
import { calloutsExtension } from '@tanstack/markdown/extensions/callouts';
import { commentComponentsExtension } from '@tanstack/markdown/extensions/comment-components';
import { headingCollectionExtension } from '@tanstack/markdown/extensions/headings';
import { parseMarkdown } from '@tanstack/markdown/parser';

export const markdownExtensions: MarkdownExtension[] = [
  calloutsExtension(),
  commentComponentsExtension(),
  headingCollectionExtension(),
];

export function parseContent(source: string): MarkdownDocument {
  return parseMarkdown(normalizeLegacyMdx(source), { extensions: markdownExtensions });
}

const calloutKinds: Record<string, string> = {
  info: 'NOTE',
  warning: 'WARNING',
  success: 'TIP',
  error: 'CAUTION',
};

/** Reads `key="value"`, `key='value'`, `key={"value"}` and bare boolean props from a JSX tag. */
function jsxAttributes(tag: string) {
  const attributes: Record<string, string> = {};
  const re = /([A-Za-z][\w-]*)(?:=(?:"([^"]*)"|'([^']*)'|\{\s*["'`]([^"'`]*)["'`]\s*\}|\{\s*(true|false|\d+)\s*\}))?/g;
  for (const match of tag.replace(/^<\/?\w+|\/?>$/g, '').matchAll(re)) {
    attributes[match[1]] = match[2] ?? match[3] ?? match[4] ?? match[5] ?? 'true';
  }
  return attributes;
}

function toComment(attributes: Record<string, string>) {
  return Object.entries(attributes)
    .map(([key, value]) => (value === 'true' ? key : `${key}="${value.replace(/"/g, "'")}"`))
    .join(' ');
}

/**
 * v2 posts were written as MDX for mdx-bundler. TanStack Markdown doesn't evaluate
 * JSX, so the handful of components those posts used are rewritten to their
 * Markdown equivalents: GitHub-style callouts and `<!-- ::component -->` comments.
 * Anything left over renders as escaped text, never as executable markup.
 */
export function normalizeLegacyMdx(source: string): string {
  const lines = source.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let fence: string | null = null;
  let callout = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    const fenceMatch = /^(`{3,}|~{3,})/.exec(trimmed);
    if (fenceMatch) {
      if (!fence) fence = fenceMatch[1];
      else if (trimmed.startsWith(fence)) fence = null;
      out.push(callout ? `> ${line}` : line);
      continue;
    }
    if (fence) {
      out.push(callout ? `> ${line}` : line);
      continue;
    }

    // MDX module syntax has no Markdown meaning.
    if (/^(import|export)\s/.test(trimmed)) continue;

    if (/^<Callout\b/.test(trimmed)) {
      const attributes = jsxAttributes(trimmed.replace(/>.*$/, '>'));
      const kind = calloutKinds[attributes.type ?? 'info'] ?? 'NOTE';
      out.push(`> [!${kind}]${attributes.title ? ` ${attributes.title}` : ''}`);
      callout = true;
      const rest = trimmed.replace(/^<Callout\b[^>]*>/, '').replace(/<\/Callout>$/, '');
      if (rest) out.push(`> ${rest}`);
      if (trimmed.endsWith('</Callout>')) callout = false;
      continue;
    }
    if (callout) {
      if (trimmed.endsWith('</Callout>')) {
        const rest = line.replace(/<\/Callout>\s*$/, '');
        if (rest.trim()) out.push(`> ${rest}`);
        callout = false;
      } else {
        out.push(line.trim() ? `> ${line}` : '>');
      }
      continue;
    }

    if (/^<Sandpack\b/.test(trimmed)) {
      let tag = trimmed;
      while (!/\/?>\s*$/.test(tag) && i + 1 < lines.length) tag += ` ${lines[++i].trim()}`;
      // Consume a paired closing tag if the component wasn't self-closing.
      if (!/\/>\s*$/.test(tag)) while (i + 1 < lines.length && !lines[i].includes('</Sandpack>')) i++;
      out.push(`<!-- ::sandpack ${toComment(jsxAttributes(tag))} -->`.replace('  ', ' '));
      continue;
    }

    if (trimmed.startsWith('<Spoiler>')) {
      out.push('<!-- ::start:spoiler -->', '');
      const rest = trimmed.replace(/^<Spoiler>/, '').replace(/<\/Spoiler>$/, '');
      if (rest) out.push(rest);
      if (trimmed.endsWith('</Spoiler>')) out.push('', '<!-- ::end:spoiler -->');
      continue;
    }
    if (trimmed.startsWith('</Spoiler>')) {
      out.push('', '<!-- ::end:spoiler -->');
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}
