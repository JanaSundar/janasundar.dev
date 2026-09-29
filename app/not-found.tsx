import Link from 'next/link';
import { Section } from '@/components/layout/section';

export default function NotFound() {
  return (
    <Section intro className="pb-24 sm:pb-28">
      <p className="label enter">404</p>
      <h1 className="title-1 text-fg enter mt-2" style={{ '--i': 1 } as React.CSSProperties}>
        This page wandered off.
      </h1>
      <p className="callout text-muted enter mt-3" style={{ '--i': 2 } as React.CSSProperties}>
        It may have moved, or never existed.{' '}
        <Link href="/" className="text-fg link">
          Head home
        </Link>{' '}
        or{' '}
        <Link href="/blog" className="text-fg link">
          read something
        </Link>
        .
      </p>
    </Section>
  );
}
