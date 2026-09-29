import Link from 'next/link';
import { site } from '@/content/site';

export function Footer() {
  return (
    <footer className="text-faint flex flex-wrap items-center justify-between gap-3 px-5 py-6 font-mono text-[11px] tracking-wide sm:px-8">
      <span>
        © {new Date().getFullYear()} {site.name}
      </span>
      <nav aria-label="Footer" className="flex gap-4">
        <Link href="/uses" className="hover:text-fg transition-colors">
          Uses
        </Link>
        {/* oxlint-disable-next-line nextjs/no-html-link-for-pages -- route handler, not a page */}
        <a href="/rss.xml" className="hover:text-fg transition-colors">
          RSS
        </a>
        <a href={site.newsletter} target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">
          Newsletter
        </a>
      </nav>
    </footer>
  );
}
