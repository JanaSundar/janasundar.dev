'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { Logo } from '@/components/icons';
import { ThemeToggle } from './theme-toggle';

const links = [
  { href: '/', label: 'About' },
  { href: '/blog', label: 'Writing' },
  { href: '/snippets', label: 'Snippets' },
  { href: '/crafts', label: 'Crafts' },
] as const;

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-3 z-40 px-3 pt-3 sm:px-4">
      <nav className="material flex h-12 items-center justify-between rounded-full pr-1.5 pl-4" aria-label="Main">
        <Link href="/" aria-label="Home" className="text-fg press transition-opacity hover:opacity-70">
          <Logo width={18} height={18} />
        </Link>
        <div className="flex items-center gap-0.5">
          <ul className="flex items-center">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block rounded-full px-2.5 py-1.5 text-[13px] font-medium tracking-[-0.006em] transition-colors sm:px-3.5 ${
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="bg-fg/[0.07] absolute inset-0 rounded-full"
                        transition={{ type: 'spring', duration: 0.35, bounce: 0 }}
                      />
                    ) : null}
                    <span className="relative">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
