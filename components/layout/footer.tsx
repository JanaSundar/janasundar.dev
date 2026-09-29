import Link from 'next/link';
import { site } from '@/content/site';

const linkClass = 'hover:text-fg transition-colors';

export function Footer() {
  return (
    <footer className="text-faint mt-8 flex flex-wrap items-center justify-between gap-3 px-5 pt-6 pb-10 text-[13px] tracking-normal sm:px-8">
      <span>
        © {new Date().getFullYear()} {site.fullName}
      </span>
      <nav aria-label="Footer" className="flex gap-5">
        <Link href="/uses" className={linkClass}>
          Uses
        </Link>
        {/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- route handler, not a page */}
        <a href="/rss.xml" className={linkClass}>
          RSS
        </a>
        <a href={site.newsletter} target="_blank" rel="noreferrer" className={linkClass}>
          Newsletter
        </a>
      </nav>
    </footer>
  );
}
