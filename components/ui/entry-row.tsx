import Link from 'next/link';
import { format } from 'date-fns';
import { ChevronRight } from '@/components/icons';

type EntryRowProps = {
  href: string;
  title: string;
  description?: string;
  date: string;
};

export function EntryRow({ href, title, description, date }: EntryRowProps) {
  return (
    <li>
      <Link
        href={href}
        className="group hover:bg-subtle active:bg-subtle flex items-center justify-between gap-4 px-4 py-3.5 transition-colors"
      >
        <span className="min-w-0">
          <span className="text-fg block font-medium">{title}</span>
          {description ? <span className="footnote line-clamp-1 block">{description}</span> : null}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          <time dateTime={date} className="text-faint text-[13px] tabular-nums">
            {format(new Date(date), 'MMM yyyy')}
          </time>
          <ChevronRight className="text-faint/70 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    </li>
  );
}
