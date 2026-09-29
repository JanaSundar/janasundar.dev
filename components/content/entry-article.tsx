import Link from 'next/link';
import { format, formatDistanceToNowStrict } from 'date-fns';
import readingTime from 'reading-time';
import { ArrowLeft } from '@/components/icons';
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
        <div className="bg-subtle text-muted px-5 py-2.5 text-[13px] sm:px-8">
          Draft preview ·{' '}
          {/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- route handler that sets a cookie */}
          <a href="/api/draft/disable" className="link text-fg">
            exit
          </a>
        </div>
      ) : null}

      <header className="px-5 pt-14 pb-6 sm:px-8 sm:pt-20">
        <Link
          href={back.href}
          className="group text-accent press inline-flex items-center gap-1 text-[15px] hover:opacity-70"
        >
          <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
        <h1 className="title-1 text-fg mt-6 text-balance">{entry.title}</h1>
        {entry.description ? <p className="callout text-muted mt-3">{entry.description}</p> : null}
        <p className="text-faint mt-5 flex flex-wrap gap-x-2 gap-y-1 text-[13px]">
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
              <li key={tag} className="bg-subtle text-muted rounded-full px-2.5 py-0.5 text-[12px] font-medium">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="px-5 pt-6 pb-10 sm:px-8">
        {headings.length >= 3 ? (
          <details className="group card mb-10 px-4 py-3">
            <summary className="label cursor-pointer list-none marker:hidden">
              On this page <span className="inline-block transition-transform group-open:rotate-90">›</span>
            </summary>
            <ol className="mt-3 space-y-1.5 text-[15px]">
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
