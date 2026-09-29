import type { MarkdownDocument } from '@tanstack/markdown';
import { renderMarkdownReact, type MarkdownComponents } from '@tanstack/markdown/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { getCodeHighlighter } from '@/lib/shiki';
import { markdownExtensions } from '@/lib/markdown';
import { CodeBlock } from './code-block';
import { Sandpack } from './sandpack';
import { Spoiler } from './spoiler';

function MdLink({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external && { target: '_blank', rel: 'noreferrer' })} {...props}>
      {children}
    </a>
  );
}

function MdImage({ alt = '', ...props }: ComponentPropsWithoutRef<'img'>) {
  // oxlint-disable-next-line nextjs/no-img-element -- CMS images have unknown dimensions.
  return <img alt={alt} loading="lazy" decoding="async" {...props} />;
}

type EmbedProps = {
  'data-component'?: string;
  'data-attributes'?: string;
  children?: ReactNode;
};

/** Renders `<!-- ::name attrs -->` comment components. */
function createEmbed(files: Record<string, string> | null) {
  return function Embed({ 'data-component': name, 'data-attributes': raw, children }: EmbedProps) {
    const attributes = raw ? (JSON.parse(raw) as Record<string, string>) : {};

    switch (name) {
      case 'sandpack':
        return files ? (
          <Sandpack
            files={files}
            template={attributes.template}
            previewOnly={attributes.previewonly === 'true' || attributes.previewOnly === 'true'}
            only={attributes.files?.split(',').map((f) => f.trim())}
          />
        ) : null;
      case 'spoiler':
        return <Spoiler>{children}</Spoiler>;
      default:
        return <div>{children}</div>;
    }
  };
}

type MarkdownProps = {
  document: MarkdownDocument;
  files?: Record<string, string> | null;
};

export async function Markdown({ document, files = null }: MarkdownProps) {
  const highlighter = await getCodeHighlighter();

  const components = {
    a: MdLink,
    img: MdImage,
    pre: CodeBlock,
    'md-comment-component': createEmbed(files),
  } satisfies MarkdownComponents;

  return (
    <div className="prose">
      {renderMarkdownReact(document, {
        extensions: markdownExtensions,
        highlighter,
        headingAnchors: { content: '#', className: 'heading-anchor' },
        components,
      })}
    </div>
  );
}
