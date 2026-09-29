import Link from 'next/link';
import { crafts, CraftCard } from '@/components/crafts';
import { CimpressLogo, GithubIcon, LinkedInIcon, Monogram, XIcon } from '@/components/icons';
import { HatchDivider } from '@/components/layout/hatch-divider';
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
  const className = 'text-muted hover:text-fg font-mono text-[11px] tracking-wide transition-colors';
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
        <h1 className="text-fg text-[17px] font-medium tracking-tight">{site.name}.</h1>
        <p className="label mt-0.5">{site.role}</p>
        <div className="text-muted mt-6 space-y-4">
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
            <Link href="/blog" className="link text-fg">
              writing
            </Link>{' '}
            about what I learn.
          </p>
        </div>
      </Section>

      <HatchDivider />

      <Section label="Experience" aside={<SeeAll href={site.resume}>Résumé</SeeAll>}>
        <ol className="space-y-5">
          {experience.map((job) => (
            <li key={job.company} className="grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-x-6">
              <p className="text-fg">
                <span className="font-medium">{job.role}</span>
                <span className="text-muted"> · {job.company}</span>
              </p>
              <p className="text-faint font-mono text-[11px] tabular-nums sm:row-span-2 sm:pt-1">
                {formatPeriod(job.start, job.end)}
              </p>
              <p className="text-muted text-[13.5px]">{job.summary}</p>
            </li>
          ))}
        </ol>
      </Section>

      <HatchDivider />

      <Section label="Projects" aside={<SeeAll href={site.socials.github.href}>GitHub</SeeAll>}>
        <ul className="space-y-1">
          {projects.map((project) => (
            <ProjectRow key={project.name} {...project} />
          ))}
        </ul>
      </Section>

      <HatchDivider />

      <Section label="Crafts" aside={<SeeAll href="/crafts">Explore more</SeeAll>}>
        <div className="space-y-10">
          {crafts.slice(0, 2).map((craft) => (
            <CraftCard key={craft.slug} {...craft} />
          ))}
        </div>
      </Section>

      {posts.length ? (
        <>
          <HatchDivider />
          <Section label="Writing" aside={<SeeAll href="/blog">All posts</SeeAll>}>
            <ul>
              {posts.map((post) => (
                <EntryRow key={post.slug} href={`/blog/${post.slug}`} title={post.title} date={post.createdAt} />
              ))}
            </ul>
          </Section>
        </>
      ) : null}

      <HatchDivider />

      <Section label="Let's connect">
        <div className="space-y-4">
          <CopyEmail email={site.email} />
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {socials.map(({ label, href, handle, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group text-muted hover:text-fg inline-flex items-center gap-2 transition-colors"
                >
                  <Icon />
                  <span className="text-[13.5px]">{handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
