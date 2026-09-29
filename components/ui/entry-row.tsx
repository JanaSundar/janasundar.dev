import Link from 'next/link';
import { format } from 'date-fns';

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
        className="group hover:bg-subtle -mx-3 flex items-baseline justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors"
      >
        <span className="min-w-0">
          <span className="text-fg block font-medium">{title}</span>
          {description ? <span className="text-muted line-clamp-1 block text-[13.5px]">{description}</span> : null}
        </span>
        <time dateTime={date} className="text-faint shrink-0 font-mono text-[11px] tabular-nums">
          {format(new Date(date), 'MMM yyyy')}
        </time>
      </Link>
    </li>
  );
}
