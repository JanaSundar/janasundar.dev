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
    <header className="material sticky top-0 z-40">
      <nav className="flex h-14 items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" aria-label="Home" className="text-fg press">
          <Logo />
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
                    className={`relative block rounded-md px-2.5 py-1.5 text-[13.5px] font-medium tracking-[-0.01em] transition-colors ${
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {active ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="bg-subtle absolute inset-0 rounded-md"
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
