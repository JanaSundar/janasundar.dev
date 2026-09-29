import Link from 'next/link';
import type { CSSProperties } from 'react';
import { crafts, CraftCard } from '@/components/crafts';
import { CimpressLogo, GithubIcon, LinkedInIcon, Monogram, XIcon } from '@/components/icons';
import { Section } from '@/components/layout/section';
import { CopyEmail } from '@/components/ui/copy-email';
import { HighlightGroup } from '@/components/ui/highlight';
import { RevealItem, RevealLi } from '@/components/ui/reveal';
import { EntryRow } from '@/components/ui/entry-row';
import { InlineLink } from '@/components/ui/inline-link';
import { Timeline, TimelineItem, TimelineSubItem, TimelineSubList } from '@/components/ui/timeline';
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
  const className = 'text-muted hover:text-fg text-[13.5px] transition-colors';
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
        <h1 className="title-2 text-fg enter">{site.name}.</h1>
        <p className="label enter mt-1" style={{ '--i': 1 } as CSSProperties}>
          {site.role}
        </p>
        <div className="text-muted mt-6 space-y-4">
          <p className="enter" style={{ '--i': 2 } as CSSProperties}>
            I build fast, thoughtful products for the web, end to end — from React interfaces to the Node services
            behind them. I currently work as a software engineer at{' '}
            <InlineLink href="https://cimpress.com" logo={<CimpressLogo />} pop={4}>
              Cimpress
            </InlineLink>{' '}
            on the Gifta team.
          </p>
          <p className="enter" style={{ '--i': 3 } as CSSProperties}>
            Previously, I was a programmer analyst at{' '}
            <InlineLink href="https://www.cognizant.com" logo={<Monogram letter="C" />} pop={5}>
              Cognizant
            </InlineLink>{' '}
            in R&amp;D, prototyping web and mobile apps. Outside work: family, movies, and{' '}
            <Link href="/blog" className="link text-fg">
              writing
            </Link>{' '}
            about what I learn.
          </p>
        </div>
      </Section>

      <Section stagger label="Experience" aside={<SeeAll href={site.resume}>Resume</SeeAll>}>
        <Timeline>
          {experience.map((job) => (
            <TimelineItem
              key={job.company}
              tone={job.end ? 'done' : 'current'}
              title={
                <p>
                  <span className="font-medium">{job.role}</span>
                  <span className="text-muted"> · {job.company}</span>
                </p>
              }
              aside={formatPeriod(job.start, job.end)}
            >
              <TimelineSubList>
                <TimelineSubItem>
                  <p className="text-muted text-[13.5px] leading-[1.6]">{job.summary}</p>
                </TimelineSubItem>
              </TimelineSubList>
            </TimelineItem>
          ))}
        </Timeline>
      </Section>

      <Section stagger label="Projects" aside={<SeeAll href={site.socials.github.href}>GitHub</SeeAll>}>
        <ul className="space-y-1">
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
          <Section stagger label="Writing" aside={<SeeAll href="/blog">All posts</SeeAll>}>
            <HighlightGroup>
              <ul>
                {posts.map((post) => (
                  <EntryRow key={post.slug} href={`/blog/${post.slug}`} title={post.title} date={post.createdAt} />
                ))}
              </ul>
            </HighlightGroup>
          </Section>
        </>
      ) : null}

      <Section stagger label="Let’s connect">
        <div className="space-y-4">
          <RevealItem>
            <CopyEmail email={site.email} />
          </RevealItem>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map(({ label, href, handle, Icon }) => (
              <RevealLi key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group text-muted hover:text-fg press inline-flex items-center gap-2 transition-colors"
                >
                  <Icon />
                  <span className="text-[13.5px]">{handle}</span>
                </a>
              </RevealLi>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
