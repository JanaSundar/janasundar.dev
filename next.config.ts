import type { NextConfig } from 'next';

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com';
const posthogAssetsHost = posthogHost.replace('.i.posthog.com', '-assets.i.posthog.com');

// https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  frame-src *.codesandbox.io;
  style-src 'self' 'unsafe-inline';
  img-src * blob: data:;
  media-src 'none';
  connect-src *;
  font-src 'self';
`;

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy.replace(/\n/g, '') },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // PostHog API paths use trailing slashes.
  skipTrailingSlashRedirect: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'media.graphcms.com' },
      { protocol: 'https', hostname: '*.graphassets.com' },
      { protocol: 'https', hostname: 'media.graphassets.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async headers() {
    return [{ source: '/(.*)', headers: securityHeaders }];
  },
  async redirects() {
    return [
      { source: '/posts', destination: '/blog', permanent: true },
      { source: '/posts/:slug', destination: '/blog/:slug', permanent: true },
    ];
  },
  // Reverse proxy PostHog so ad blockers don't drop events.
  async rewrites() {
    return [
      { source: '/ingest/static/:path*', destination: `${posthogAssetsHost}/static/:path*` },
      { source: '/ingest/:path*', destination: `${posthogHost}/:path*` },
    ];
  },
};

export default nextConfig;
