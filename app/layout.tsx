import type { Metadata, Viewport } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/footer';
import { HatchDivider } from '@/components/layout/hatch-divider';
import { Nav } from '@/components/layout/nav';
import { Providers } from '@/components/layout/providers';
import { site } from '@/content/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` },
  description: site.description,
  authors: [{ name: site.fullName, url: site.url }],
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': [{ url: '/rss.xml', title: `${site.name} — Writing` }] },
  },
  openGraph: { type: 'website', locale: 'en_IN', url: site.url, siteName: site.name },
  twitter: { card: 'summary_large_image', creator: `@${site.socials.twitter.handle}` },
  icons: { icon: '/favicon.ico' },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f7f6' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans">
        <Providers>
          <a
            href="#main"
            className="bg-fg text-bg sr-only z-50 rounded-md px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
          >
            Skip to content
          </a>
          <div className="border-border bg-surface mx-auto flex min-h-dvh w-full max-w-[44rem] flex-col border-x">
            <Nav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <HatchDivider />
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
