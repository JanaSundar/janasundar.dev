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
    <header className="border-border bg-surface/80 sticky top-0 z-40 border-b backdrop-blur-md">
      <nav className="flex h-12 items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" aria-label="Home" className="text-fg transition-opacity hover:opacity-70">
          <Logo width={16} height={16} />
        </Link>
        <div className="flex items-center gap-1">
          <ul className="flex items-center">
            {links.map(({ href, label }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative block px-2 py-1 font-mono text-[11px] tracking-[0.12em] uppercase transition-colors sm:px-2.5 ${
                      active ? 'text-fg' : 'text-muted hover:text-fg'
                    }`}
                  >
                    {label}
                    {active ? (
                      <motion.span
                        layoutId="nav-underline"
                        className="bg-fg absolute inset-x-2 -bottom-[13px] h-px sm:inset-x-2.5"
                        transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                      />
                    ) : null}
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
