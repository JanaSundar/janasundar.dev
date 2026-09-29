import { format } from 'date-fns';
import { HighlightLink } from '@/components/ui/highlight';
import { RevealLi } from '@/components/ui/reveal';

type EntryRowProps = {
  href: string;
  title: string;
  description?: string;
  date: string;
};

/** The row itself, for use inside any list item. */
export function EntryLink({ href, title, description, date }: EntryRowProps) {
  return (
    <HighlightLink href={href} className="-mx-3 flex items-baseline justify-between gap-4 px-3 py-2">
      <span className="min-w-0">
        <span className="text-fg block font-medium">{title}</span>
        {description ? <span className="footnote line-clamp-1 block">{description}</span> : null}
      </span>
      <time dateTime={date} className="text-faint shrink-0 text-[13px] tabular-nums">
        {format(new Date(date), 'MMM yyyy')}
      </time>
    </HighlightLink>
  );
}

export function EntryRow(props: EntryRowProps) {
  return (
    <RevealLi>
      <EntryLink {...props} />
    </RevealLi>
  );
}
