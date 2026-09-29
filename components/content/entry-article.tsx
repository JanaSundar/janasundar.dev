import Link from 'next/link';
import { format, formatDistanceToNowStrict } from 'date-fns';
import readingTime from 'reading-time';
import { ArrowLeft } from '@/components/icons';
import { Toc } from '@/components/content/toc';
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

      <header className="px-5 pt-16 pb-6 sm:px-8 sm:pt-24">
        <Link
          href={back.href}
          className="group text-muted hover:text-fg press inline-flex items-center gap-1.5 text-[13.5px] transition-colors"
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
              <li key={tag} className="border-border text-muted rounded-md border px-2 py-0.5 text-[12px] font-medium">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="px-5 pt-6 pb-10 sm:px-8">
        {headings.length >= 3 ? <Toc headings={headings.map(({ id, text, level }) => ({ id, text, level }))} /> : null}

        <Markdown document={document} files={entry.files} />
      </div>
    </article>
  );
}
