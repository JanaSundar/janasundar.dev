import Link from 'next/link';
import { ArrowLeft } from '@/components/icons';
import { Section } from '@/components/layout/section';
import { DotNumerals } from '@/components/not-found/dot-numerals';
import { enterStep } from '@/lib/motion';
import { notFoundMetadata } from '@/lib/not-found';

export const metadata = notFoundMetadata;

export default function NotFound() {
  return (
    <Section intro className="flex min-h-[calc(100dvh-13rem)] flex-col items-center justify-center pb-16 text-center">
      <DotNumerals text="404" className="enter w-64 sm:w-80" />
      <h1 className="title-2 text-fg enter mt-10" style={enterStep(1)}>
        You&rsquo;re off the grid.
      </h1>
      <div className="enter mt-6" style={enterStep(2)}>
        <Link href="/" className="btn">
          <ArrowLeft />
          Back to home
        </Link>
      </div>
    </Section>
  );
}
