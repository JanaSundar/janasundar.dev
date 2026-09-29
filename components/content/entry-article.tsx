import Link from 'next/link';
import { format, formatDistanceToNowStrict } from 'date-fns';
import readingTime from 'reading-time';
import { ArrowLeft } from '@/components/icons';
import { HatchDivider } from '@/components/layout/hatch-divider';
import { Markdown } from '@/components/markdown/markdown';
import type { ContentEntry } from '@/lib/hygraph';
import { parseContent } from '@/lib/markdown';

type EntryArticleProps = {
  entry: ContentEntry;
  back: { href: string; label: string };
  isDraft: boolean;
};

export function EntryArticle({ entry, back, isDraft }: EntryArticleProps) {
  const document = parseContent(entry.content);
  const headings = (document.headings ?? []).filter((h) => h.level === 2 || h.level === 3);
  const updated =
    Math.abs(new Date(entry.updatedAt).getTime() - new Date(entry.createdAt).getTime()) > 1000 * 60 * 60 * 24;

  return (
    <article>
      {isDraft ? (
        <div className="border-border bg-subtle text-muted border-b px-5 py-2.5 font-mono text-[11px] sm:px-8">
          Draft preview ·{' '}
          {/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- route handler that sets a cookie */}
          <a href="/api/draft/disable" className="link text-fg">
            exit
          </a>
        </div>
      ) : null}

      <header className="px-5 pt-10 pb-8 sm:px-8 sm:pt-12">
        <Link
          href={back.href}
          className="group text-muted hover:text-fg inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide uppercase transition-colors"
        >
          <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
        <h1 className="text-fg mt-6 text-2xl font-medium tracking-tight text-balance sm:text-[28px] sm:leading-tight">
          {entry.title}
        </h1>
        {entry.description ? <p className="text-muted mt-3">{entry.description}</p> : null}
        <p className="text-faint mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px]">
          <time dateTime={entry.createdAt}>{format(new Date(entry.createdAt), 'MMM d, yyyy')}</time>
          <span aria-hidden>·</span>
          <span>{readingTime(entry.content).text}</span>
          {updated ? (
            <>
              <span aria-hidden>·</span>
              <span>updated {formatDistanceToNowStrict(new Date(entry.updatedAt))} ago</span>
            </>
          ) : null}
        </p>
        {entry.tags.length ? (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {entry.tags.map(({ tag }) => (
              <li
                key={tag}
                className="border-border text-muted rounded-full border px-2 py-0.5 font-mono text-[10.5px]"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <HatchDivider />

      <div className="px-5 py-10 sm:px-8">
        {headings.length >= 3 ? (
          <details className="group border-border mb-10 rounded-xl border px-4 py-3">
            <summary className="label cursor-pointer list-none marker:hidden">
              On this page <span className="inline-block transition-transform group-open:rotate-90">›</span>
            </summary>
            <ol className="mt-3 space-y-1.5 text-[13.5px]">
              {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? 'pl-4' : undefined}>
                  <a href={`#${heading.id}`} className="text-muted hover:text-fg transition-colors">
                    {heading.text}
                  </a>
                </li>
              ))}
            </ol>
          </details>
        ) : null}

        <Markdown document={document} files={entry.files} />
      </div>
    </article>
  );
}
