import { useId, type SVGProps } from 'react';
import { J_PATH } from '@/lib/logo';

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** The "J" mark, drawn with the site's tokens so it follows the theme. */
export const Logo = ({ width = 34, ...props }: IconProps) => {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" width={width} height={width} fill="none" aria-hidden {...props}>
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse" x1="36" y1="84" x2="64" y2="14">
          <stop offset="0" style={{ stopColor: 'var(--muted)' }} />
          <stop offset="1" style={{ stopColor: 'var(--fg)' }} />
        </linearGradient>
      </defs>
      <path d={J_PATH} stroke={`url(#${id})`} strokeWidth="10" strokeLinecap="round" />
    </svg>
  );
};

export const GithubIcon = (props: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden {...stroke} {...props}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
);

export const XIcon = (props: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden {...stroke} {...props}>
    <path d="M4 4l11.733 16H20L8.267 4z" />
    <path d="M4 20l6.768-6.768m2.46-2.46L20 4" />
  </svg>
);

export const LinkedInIcon = (props: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden {...stroke} {...props}>
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
    <path d="M2 9H6V21H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg width={16} height={16} viewBox="0 0 24 24" aria-hidden {...stroke} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const ArrowUpRight = (props: IconProps) => (
  <svg width={12} height={12} viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const ChevronRight = (props: IconProps) => (
  <svg width={12} height={12} viewBox="0 0 16 16" aria-hidden {...stroke} strokeWidth={1.8} {...props}>
    <path d="m6 3.5 4.5 4.5L6 12.5" />
  </svg>
);

export const ArrowLeft = (props: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2} {...props}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </svg>
);

export const CopyIcon = (props: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden {...stroke} {...props}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);

export const CheckIcon = (props: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden {...stroke} strokeWidth={2} {...props}>
    <path d="m5 12 5 5L20 7" />
  </svg>
);

export const RssIcon = (props: IconProps) => (
  <svg width={14} height={14} viewBox="0 0 24 24" aria-hidden {...stroke} {...props}>
    <path d="M5 19h.01M4 4a16 16 0 0 1 16 16M4 11a9 9 0 0 1 9 9" />
  </svg>
);

/** DevWiz: a magic wand with sparkles. */
export const DevWizLogo = (props: IconProps) => (
  <svg width={20} height={20} viewBox="0 0 512 512" fill="currentColor" aria-hidden {...props}>
    <path d="M464 6.1c9.5-8.5 24-8.1 33 .9l8 8c9 9 9.4 23.5.9 33l-85.8 95.9c-2.6 2.9-4.1 6.7-4.1 10.7V176c0 8.8-7.2 16-16 16h-15.8c-4.6 0-8.9 1.9-11.9 5.3L100.7 500.9C94.3 508 85.3 512 75.8 512c-8.8 0-17.3-3.5-23.5-9.8L9.7 459.7C3.5 453.4 0 445 0 436.2c0-9.5 4-18.5 11.1-24.8l111.6-99.8c3.4-3 5.3-7.4 5.3-11.9V272c0-8.8 7.2-16 16-16h34.6c3.9 0 7.7-1.5 10.7-4.1L464 6.1zM432 288c3.6 0 6.7 2.4 7.7 5.8l14.8 51.7 51.7 14.8c3.4 1 5.8 4.1 5.8 7.7s-2.4 6.7-5.8 7.7l-51.7 14.8-14.8 51.7c-1 3.4-4.1 5.8-7.7 5.8s-6.7-2.4-7.7-5.8l-14.8-51.7-51.7-14.8c-3.4-1-5.8-4.1-5.8-7.7s2.4-6.7 5.8-7.7l51.7-14.8 14.8-51.7c1-3.4 4.1-5.8 7.7-5.8zM87.7 69.8l14.8 51.7 51.7 14.8c3.4 1 5.8 4.1 5.8 7.7s-2.4 6.7-5.8 7.7l-51.7 14.8-14.8 51.7c-1 3.4-4.1 5.8-7.7 5.8s-6.7-2.4-7.7-5.8l-14.8-51.7-51.7-14.8c-3.4-1-5.8-4.1-5.8-7.7s2.4-6.7 5.8-7.7l51.7-14.8 14.8-51.7c1-3.4 4.1-5.8 7.7-5.8s6.7 2.4 7.7 5.8zM208 0c3.7 0 6.9 2.5 7.8 6.1l6.8 27.3 27.3 6.8c3.6.9 6.1 4.1 6.1 7.8s-2.5 6.9-6.1 7.8l-27.3 6.8-6.8 27.3c-.9 3.6-4.1 6.1-7.8 6.1s-6.9-2.5-7.8-6.1l-6.8-27.3-27.3-6.8c-3.6-.9-6.1-4.1-6.1-7.8s2.5-6.9 6.1-7.8l27.3-6.8 6.8-27.3c.9-3.6 4.1-6.1 7.8-6.1z" />
  </svg>
);

/** Luzo: the wordmark, wider than it is tall (decorative: the tile sits next to the name). */
export const LuzoLogo = (props: IconProps) => (
  <svg width={28} height={11} viewBox="0 0 48 19" fill="currentColor" aria-hidden {...props}>
    <path d="M0 18.615V0h2.346v18.615zm12.17.306c-1.172 0-2.226-.238-3.161-.714q-1.377-.74-2.168-2.04-.765-1.3-.765-3.034V5.61h2.372v7.497q0 1.173.51 2.04c.34.561.79.994 1.351 1.3q.867.46 1.836.46.995 0 1.836-.46.867-.459 1.377-1.3.536-.867.536-2.04V5.61h2.371v7.522q0 1.735-.79 3.035t-2.168 2.04q-1.377.714-3.136.714m11.73-.306q-.816 0-1.453-.383t-1.02-1.02q-.357-.663-.357-1.428 0-.816.382-1.428.408-.637 1.173-1.147l5.993-3.8c.255-.152.416-.305.484-.458a.983.983 0 0 0 .128-.485c0-.204-.085-.391-.255-.561a.854.854 0 0 0-.663-.28h-6.605V5.61h7.319q.79 0 1.402.383.638.382.995 1.045c.255.425.382.892.382 1.403q0 .79-.408 1.453c-.255.425-.629.799-1.122 1.122l-5.992 3.8q-.383.229-.51.458-.102.23-.102.485 0 .306.255.587.255.255.688.255h6.962v2.014zm17.232.306q-1.99 0-3.52-.892-1.53-.918-2.422-2.448-.892-1.556-.892-3.468c0-1.275.297-2.423.892-3.443a6.565 6.565 0 0 1 2.423-2.448c1.02-.612 2.193-.918 3.519-.918s2.499.306 3.519.918q1.555.893 2.422 2.423.893 1.53.893 3.468 0 1.912-.893 3.468-.867 1.53-2.422 2.448-1.53.892-3.52.892m0-2.014q1.352 0 2.347-.638t1.555-1.708q.561-1.097.561-2.448t-.56-2.423a4.39 4.39 0 0 0-1.556-1.734q-.995-.637-2.346-.637-1.326 0-2.346.637A4.39 4.39 0 0 0 37.23 9.69q-.56 1.071-.56 2.423t.56 2.448q.561 1.07 1.556 1.708 1.02.638 2.346.638" />
  </svg>
);
