import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronRight } from '@/components/icons';
import { HighlightLink } from '@/components/ui/highlight';
import { RevealLi } from '@/components/ui/reveal';
import { cn } from '@/lib/cn';

type EntryRowProps = {
  href: string;
  title: string;
  description?: string;
  date: string;
  /**
   * The shared hover fill. Off, the row has no hover of its own: in a timeline the timeline reacts to the pointer
   * instead, and elsewhere the row stays still.
   */
  highlight?: boolean;
  /**
   * `inline` (default): title and description, with the date at the right. `feed`: the date leads in its own column
   * and a chevron trails, for a stand-alone list such as the one on the home page.
   */
  layout?: 'inline' | 'feed';
};

/** Month and year of an entry, as every list shows it. Brightens when its row (`group`) is hovered. */
export function EntryDate({ date, className }: { date: string; className?: string }) {
  return (
    <time
      dateTime={date}
      className={cn('text-faint group-hover:text-muted text-[13px] tabular-nums transition-colors', className)}
    >
      {format(new Date(date), 'MMM yyyy')}
    </time>
  );
}

/** The row itself, for use inside any list item. */
export function EntryLink({ href, title, description, date, highlight = true, layout = 'inline' }: EntryRowProps) {
  const feed = layout === 'feed';
  const dateEl = <EntryDate date={date} className={feed ? 'w-[4.75rem] shrink-0' : 'shrink-0'} />;

  const content = (
    <>
      {feed ? dateEl : null}
      <span className="min-w-0 flex-1">
        <span className="text-fg block font-medium">{title}</span>
        {description ? (
          <span
            className={cn(
              'footnote group-hover:text-fg/70 transition-colors',
              // `line-clamp` sets its own display, so no `block` here or it would switch the clamp off.
              feed ? 'line-clamp-2' : 'line-clamp-1'
            )}
          >
            {description}
          </span>
        ) : null}
      </span>
      {feed ? <ChevronRight className="text-faint/70 shrink-0" /> : dateEl}
    </>
  );

  const row = cn('flex justify-between gap-4', feed ? 'items-center py-3.5' : 'items-baseline py-2');

  return highlight ? (
    // The fill bleeds past the text by the row's own padding. `group` lets the text brighten with it.
    <HighlightLink href={href} className={cn(row, 'group -mx-3 px-3')}>
      {content}
    </HighlightLink>
  ) : (
    <Link href={href} className={row}>
      {content}
    </Link>
  );
}

export function EntryRow(props: EntryRowProps) {
  // Feed rows are separated by the site's dotted line, drawn above every row but the first.
  const divider =
    'before:dash-x relative before:absolute before:inset-x-0 before:top-0 before:h-px first:before:hidden';

  return (
    <RevealLi className={props.layout === 'feed' ? divider : undefined}>
      <EntryLink {...props} />
    </RevealLi>
  );
}
