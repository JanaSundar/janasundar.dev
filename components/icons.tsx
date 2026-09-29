import type { SVGProps } from 'react';
import { LOGO_PATH, LOGO_VIEWBOX } from '@/lib/logo';

type IconProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** The ஜ ribbon mark. Scales with `width`; height follows the mark's aspect ratio. */
export const Logo = ({ width = 28, ...props }: IconProps) => {
  const w = Number(width);
  return (
    <svg
      viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      width={w}
      height={(w * LOGO_VIEWBOX.height) / LOGO_VIEWBOX.width}
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d={LOGO_PATH} fillRule="evenodd" />
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

export const CimpressLogo = (props: IconProps) => (
  <svg width={16} height={13} viewBox="0 0 30 24" fill="none" aria-hidden {...props}>
    <path
      d="M18.405 23.835a1.447 1.447 0 0 1-.588-.118 1.486 1.486 0 0 1-.496-.348 54.19 54.19 0 0 1-1.18-1.213c-.838-.886-.849-1.509 0-2.395 2.105-2.184 4.21-4.342 6.315-6.526 1.154-1.19 1.154-1.19 0-2.377a6261.568 6261.568 0 0 0-6.247-6.467c-.935-.968-.936-1.558-.019-2.522.368-.393.732-.78 1.116-1.15.677-.656 1.35-.695 2.012-.019 3.36 3.44 6.705 6.895 10.038 10.365.644.67.568 1.37-.165 2.135-1.664 1.736-3.343 3.456-5.016 5.184-1.572 1.616-3.14 3.235-4.705 4.856-.323.328-.649.622-1.065.595ZM7.998 4.01c.384.028.743.203 1.007.49.313.32.621.64.932.96 1.154 1.192 1.16 1.671.028 2.842-.97.997-1.914 2.03-2.924 2.987-.551.53-.665.863-.025 1.447 1.12 1.044 2.163 2.193 3.226 3.311.772.813.768 1.448 0 2.267a30.01 30.01 0 0 1-1.24 1.278c-.647.628-1.317.687-1.94.056a517.816 517.816 0 0 1-6.5-6.714C0 12.343.078 11.63.616 11.066c2.13-2.235 4.294-4.442 6.438-6.659.122-.13.269-.232.431-.3.163-.07.337-.102.513-.098Z"
      fill="currentColor"
    />
    <path
      d="M14.927 7.9c.42.027.812.222 1.095.542.828.852 1.666 1.692 2.476 2.562.663.711.676 1.344.016 2.063a71.994 71.994 0 0 1-2.54 2.623c-.661.657-1.273.684-1.93.045a74.723 74.723 0 0 1-2.669-2.746c-.563-.6-.544-1.278-.01-1.862.9-.988 1.848-1.929 2.787-2.88a1.2 1.2 0 0 1 .775-.348Z"
      fill="#FE5C36"
    />
  </svg>
);

/** Neutral monogram for companies without a bundled logo. */
export const Monogram = ({ letter, className }: { letter: string; className?: string }) => (
  <span
    aria-hidden
    className={`bg-fg text-bg inline-grid size-4 place-items-center rounded-[5px] text-[9px] leading-none font-semibold ${className ?? ''}`}
  >
    {letter}
  </span>
);
