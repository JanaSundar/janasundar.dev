import Link from 'next/link';
import { format, formatDistanceToNowStrict } from 'date-fns';
import readingTime from 'reading-time';
import { ArrowLeft } from '@/components/icons';
import { Toc } from '@/components/content/toc';
import { SectionDivider } from '@/components/layout/section-divider';
import { Markdown } from '@/components/markdown/markdown';
import { EntryDate } from '@/components/ui/entry-row';
import type { ContentEntry, ContentSummary } from '@/lib/hygraph';
import { parseContent } from '@/lib/markdown';
import { enterStep } from '@/lib/motion';

type EntryArticleProps = {
  entry: ContentEntry;
  back: { href: string; label: string };
  isDraft: boolean;
  /** Neighbours in the index (newest first), for the links at the end of the article. */
  adjacent?: { newer?: ContentSummary; older?: ContentSummary };
};

function Neighbour({ entry, href, direction }: { entry: ContentSummary; href: string; direction: 'newer' | 'older' }) {
  const older = direction === 'older';
  return (
    <Link
      href={href}
      className={`group hover:bg-subtle press flex flex-col gap-1 px-5 py-5 transition-colors sm:px-8 ${
        older ? 'sm:items-end sm:text-right' : ''
      }`}
    >
      <span className="label">{older ? 'Older' : 'Newer'}</span>
      <span className="text-fg font-medium text-balance">{entry.title}</span>
      <EntryDate date={entry.createdAt} />
    </Link>
  );
}

export function EntryArticle({ entry, back, isDraft, adjacent }: EntryArticleProps) {
  const document = parseContent(entry.content);
  const headings = (document.headings ?? []).filter((h) => h.level === 2 || h.level === 3);
  const updated =
    Math.abs(new Date(entry.updatedAt).getTime() - new Date(entry.createdAt).getTime()) > 1000 * 60 * 60 * 24;
  const { newer, older } = adjacent ?? {};

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

      <header className="px-5 pt-14 pb-10 sm:px-8 sm:pt-20">
        <Link
          href={back.href}
          className="group text-muted hover:text-fg press enter inline-flex items-center gap-1.5 text-[13.5px] transition-colors"
        >
          <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
          {back.label}
        </Link>
        <p
          className="text-faint enter mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[12px] tabular-nums"
          style={enterStep(1)}
        >
          <time dateTime={entry.createdAt}>{format(new Date(entry.createdAt), 'MMM d, yyyy')}</time>
          <span aria-hidden>/</span>
          <span>{readingTime(entry.content).text}</span>
          {updated ? (
            <>
              <span aria-hidden>/</span>
              <span>updated {formatDistanceToNowStrict(new Date(entry.updatedAt))} ago</span>
            </>
          ) : null}
        </p>
        <h1 className="title-article text-fg enter mt-3 text-balance" style={enterStep(2)}>
          {entry.title}
        </h1>
        {entry.description ? (
          <p className="callout text-muted enter mt-4 text-pretty" style={enterStep(3)}>
            {entry.description}
          </p>
        ) : null}
        {entry.tags.length ? (
          <ul className="enter mt-6 flex flex-wrap gap-1.5" style={enterStep(4)}>
            {entry.tags.map(({ tag }) => (
              <li key={tag} className="border-border text-muted rounded-md border px-2 py-0.5 text-[12px] font-medium">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <SectionDivider />

      <div className="px-5 pt-10 pb-16 sm:px-8">
        {headings.length >= 3 ? <Toc headings={headings.map(({ id, text, level }) => ({ id, text, level }))} /> : null}

        <Markdown document={document} files={entry.files} />
      </div>

      {newer || older ? (
        <nav aria-label="More writing" className="border-border grid border-t sm:grid-cols-2">
          <div className="border-border sm:border-r">
            {newer ? <Neighbour entry={newer} href={`${back.href}/${newer.slug}`} direction="newer" /> : null}
          </div>
          <div className="border-border border-t sm:border-t-0">
            {older ? <Neighbour entry={older} href={`${back.href}/${older.slug}`} direction="older" /> : null}
          </div>
        </nav>
      ) : null}
    </article>
  );
}
