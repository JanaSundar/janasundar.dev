import { posthog } from 'posthog-js';

const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key && process.env.NODE_ENV === 'production') {
  posthog.init(key, {
    // Proxied through next.config.ts rewrites so ad blockers don't drop events.
    api_host: '/ingest',
    ui_host: (process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com').replace(
      '.i.posthog.com',
      '.posthog.com'
    ),
    // Captures $pageview on client-side navigations too.
    defaults: '2026-08-30',
    person_profiles: 'identified_only',
  });
}
