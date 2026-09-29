import Link from 'next/link';
import type { CSSProperties } from 'react';
import { crafts, CraftCard } from '@/components/crafts';
import { ArrowUpRight, CimpressLogo, GithubIcon, LinkedInIcon, Monogram, XIcon } from '@/components/icons';
import { Section } from '@/components/layout/section';
import { CopyEmail } from '@/components/ui/copy-email';
import { EntryRow } from '@/components/ui/entry-row';
import { InlineLink } from '@/components/ui/inline-link';
import { ProjectRow } from '@/components/ui/project-row';
import { experience } from '@/content/experience';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { getEntries } from '@/lib/hygraph';

function formatMonth(value: string) {
  const [year, month] = value.split('-');
  return `${month}/${year.slice(2)}`;
}

function formatPeriod(start: string, end?: string) {
  return `${formatMonth(start)} — ${end ? formatMonth(end) : 'Now'}`;
}

function SeeAll({ href, children }: { href: string; children: string }) {
  const className = 'text-accent text-[15px] transition-opacity hover:opacity-70';
  if (!href.startsWith('/') || href.includes('.')) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children} ↗
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children} →
    </Link>
  );
}

const socials = [
  { ...site.socials.github, Icon: GithubIcon },
  { ...site.socials.twitter, Icon: XIcon },
  { ...site.socials.linkedin, Icon: LinkedInIcon },
];

export default async function Home() {
  const posts = await getEntries('post', 4);

  return (
    <>
      <Section intro>
        <h1 className="title-1 text-fg enter" style={{ '--i': 0 } as CSSProperties}>
          {site.name}.
        </h1>
        <p className="callout text-muted enter mt-2" style={{ '--i': 1 } as CSSProperties}>
          {site.role}
        </p>
        <div className="text-muted enter mt-8 space-y-4" style={{ '--i': 2 } as CSSProperties}>
          <p>
            I build fast, thoughtful products for the web, end to end — from React interfaces to the Node services
            behind them. I currently work as a software engineer at{' '}
            <InlineLink href="https://cimpress.com" logo={<CimpressLogo />}>
              Cimpress
            </InlineLink>{' '}
            on the Gifta team.
          </p>
          <p>
            Previously, I was a programmer analyst at{' '}
            <InlineLink href="https://www.cognizant.com" logo={<Monogram letter="C" />}>
              Cognizant
            </InlineLink>{' '}
            in R&amp;D, prototyping web and mobile apps. Outside work: family, movies, and{' '}
            <Link href="/blog" className="text-accent underline-offset-4 hover:underline">
              writing
            </Link>{' '}
            about what I learn.
          </p>
        </div>
      </Section>

      <Section label="Experience" aside={<SeeAll href={site.resume}>Résumé</SeeAll>}>
        <ol className="grouped">
          {experience.map((job) => (
            <li key={job.company} className="px-4 py-4">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-fg font-medium">{job.role}</p>
                <p className="text-faint shrink-0 text-[13px] tabular-nums">{formatPeriod(job.start, job.end)}</p>
              </div>
              <p className="text-muted text-[15px]">{job.company}</p>
              <p className="footnote mt-1.5">{job.summary}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section label="Projects" aside={<SeeAll href={site.socials.github.href}>GitHub</SeeAll>}>
        <ul className="grouped">
          {projects.map((project) => (
            <ProjectRow key={project.name} {...project} />
          ))}
        </ul>
      </Section>

      <Section label="Crafts" aside={<SeeAll href="/crafts">Explore more</SeeAll>}>
        <div className="space-y-10">
          {crafts.slice(0, 2).map((craft) => (
            <CraftCard key={craft.slug} {...craft} />
          ))}
        </div>
      </Section>

      {posts.length ? (
        <>
          <Section label="Writing" aside={<SeeAll href="/blog">All posts</SeeAll>}>
            <ul className="grouped">
              {posts.map((post) => (
                <EntryRow key={post.slug} href={`/blog/${post.slug}`} title={post.title} date={post.createdAt} />
              ))}
            </ul>
          </Section>
        </>
      ) : null}

      <Section label="Let’s connect">
        <ul className="grouped">
          <li className="px-4 py-3.5">
            <CopyEmail email={site.email} />
          </li>
          {socials.map(({ label, href, handle, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group hover:bg-subtle active:bg-subtle flex items-center gap-3 px-4 py-3.5 transition-colors"
              >
                <Icon className="text-muted" />
                <span className="text-fg">{label}</span>
                <span className="text-faint ml-auto text-[15px]">{handle}</span>
                <ArrowUpRight className="text-faint/70 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
              </a>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
