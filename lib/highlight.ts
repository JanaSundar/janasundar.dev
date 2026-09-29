import 'server-only';

import { createHighlighter } from '@tanstack/highlight/core';
import { css } from '@tanstack/highlight/languages/css';
import { diff } from '@tanstack/highlight/languages/diff';
import { html } from '@tanstack/highlight/languages/html';
import { js } from '@tanstack/highlight/languages/js';
import { json } from '@tanstack/highlight/languages/json';
import { jsx } from '@tanstack/highlight/languages/jsx';
import { markdown } from '@tanstack/highlight/languages/markdown';
import { plaintext } from '@tanstack/highlight/languages/plaintext';
import { python } from '@tanstack/highlight/languages/python';
import { shell } from '@tanstack/highlight/languages/shell';
import { sql } from '@tanstack/highlight/languages/sql';
import { ts } from '@tanstack/highlight/languages/ts';
import { tsx } from '@tanstack/highlight/languages/tsx';
import { yaml } from '@tanstack/highlight/languages/yaml';
import { createTanStackMarkdownHighlighter } from '@tanstack/highlight/markdown';

/**
 * Class-based highlighting: tokens come back as `th-*` spans and globals.css colours them with the site's own
 * tokens, so one tree serves both themes. Only the languages the writing uses are registered.
 * `mdx` and `graphql` have no grammar here and fall back to plain text.
 */
const highlighter = createHighlighter({
  fallbackLanguage: 'plaintext',
  languages: [plaintext, js, jsx, ts, tsx, json, css, html, shell, markdown, yaml, diff, sql, python],
});

/** Sync callback for TanStack Markdown: returns escaped token markup for the renderer-owned `<code>`. */
export const codeHighlighter = createTanStackMarkdownHighlighter(highlighter);
