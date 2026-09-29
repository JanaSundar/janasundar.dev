'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Logo } from '@/components/icons';
import { navLinks } from '@/content/nav';
import { ThemeToggle } from './theme-toggle';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href);
}

export function Nav() {
  const pathname = usePathname();
  const list = useRef<HTMLUListElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number } | null>(null);
  const [animate, setAnimate] = useState(false);

  // The pill is a plain absolutely-positioned box measured from the active link, so it only ever slides
  // horizontally. (A shared-layout animation re-measured it against the page scroll and flew in from below.)
  useLayoutEffect(() => {
    const measure = () => {
      const active = list.current?.querySelector<HTMLElement>('[aria-current="page"]');
      setPill(active ? { left: active.offsetLeft, width: active.offsetWidth } : null);
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // pathname isn't read here, but a route change is what moves the active link.
    // oxlint-disable-next-line react/exhaustive-deps
  }, [pathname]);

  // Skip the transition on the first paint so the pill doesn't slide in from the left on load.
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <header className="material sticky top-0 z-40">
      <nav className="flex h-14 items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link href="/" aria-label="Home" className="text-fg press">
          <Logo />
        </Link>
        <div className="flex items-center gap-0.5">
          <ul ref={list} className="relative flex items-center">
            <li
              aria-hidden
              className={`bg-subtle pointer-events-none absolute inset-y-0 rounded-md ${
                animate ? 'transition-[left,width,opacity] duration-300 ease-(--ease-out)' : ''
              }`}
              style={{ left: pill?.left ?? 0, width: pill?.width ?? 0, opacity: pill ? 1 : 0 }}
            />
            {navLinks.map(({ href, label }) => {
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
                    {label}
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
