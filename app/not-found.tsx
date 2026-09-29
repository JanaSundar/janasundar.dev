import Link from 'next/link';
import { Section } from '@/components/layout/section';

export default function NotFound() {
  return (
    <Section intro className="pb-24 sm:pb-28">
      <p className="label">404</p>
      <h1 className="text-fg mt-2 text-[17px] font-medium tracking-tight">This page wandered off.</h1>
      <p className="text-muted mt-2">
        It may have moved, or never existed.{' '}
        <Link href="/" className="link text-fg">
          Head home
        </Link>{' '}
        or{' '}
        <Link href="/blog" className="link text-fg">
          read something
        </Link>
        .
      </p>
    </Section>
  );
}
