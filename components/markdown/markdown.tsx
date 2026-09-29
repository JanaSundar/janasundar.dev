import { externalProps } from '@/lib/external';
import type { MarkdownDocument } from '@tanstack/markdown';
import { renderMarkdownReact, type MarkdownComponents } from '@tanstack/markdown/react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { codeHighlighter } from '@/lib/highlight';
import { markdownExtensions } from '@/lib/markdown';
import { CodeBlock } from './code-block';
import { Figure } from './figure';
import { Sandpack } from './sandpack';
import { Spoiler } from './spoiler';

function MdLink({ href = '', children, ...props }: ComponentPropsWithoutRef<'a'>) {
  return (
    <a href={href} {...externalProps(href)} {...props}>
      {children}
    </a>
  );
}

/**
 * Images sit inside a paragraph, so the frame is built from spans rather than `<figure>`. A Markdown title
 * (`![alt](src "caption")`) becomes the caption.
 */
function MdImage({ alt = '', title, ...props }: ComponentPropsWithoutRef<'img'>) {
  return (
    <span className="md-media">
      {/* oxlint-disable-next-line nextjs/no-img-element -- CMS images have unknown dimensions. */}
      <img alt={alt} loading="lazy" decoding="async" {...props} />
      {title ? <span className="md-caption">{title}</span> : null}
    </span>
  );
}

/** The renderer wraps titled fences in `<figure><figcaption>`; `CodeBlock` draws its own header instead. */
function MdFigure({ className, children, ...props }: ComponentPropsWithoutRef<'figure'>) {
  if (className === 'tm-code-frame') return <>{children}</>;
  return (
    <figure className={className} {...props}>
      {children}
    </figure>
  );
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
            title={attributes.title}
            previewOnly={attributes.previewonly === 'true' || attributes.previewOnly === 'true'}
            only={attributes.files?.split(',').map((f) => f.trim())}
          />
        ) : null;
      case 'figure':
        return <Figure caption={attributes.caption}>{children}</Figure>;
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

export function Markdown({ document, files = null }: MarkdownProps) {
  const components = {
    a: MdLink,
    img: MdImage,
    pre: CodeBlock,
    figure: MdFigure,
    figcaption: () => null,
    'md-comment-component': createEmbed(files),
  } satisfies MarkdownComponents;

  return (
    <div className="prose">
      {renderMarkdownReact(document, {
        extensions: markdownExtensions,
        highlighter: codeHighlighter,
        codeLineNumbers: true,
        headingAnchors: { content: '#', className: 'heading-anchor' },
        components,
      })}
    </div>
  );
}
