# janasundar.dev

My portfolio and blog, v3.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com) and [Motion](https://motion.dev)
- [Hygraph](https://hygraph.com) for posts and snippets, with tag revalidation on publish and draft mode for previews
- [TanStack Markdown](https://tanstack.com/markdown) + [Shiki](https://shiki.style) for rendering, and [Sandpack](https://sandpack.codesandbox.io) for live demos
- [PostHog](https://posthog.com) analytics, proxied through `/ingest`
- [oxlint](https://oxc.rs/docs/guide/usage/linter) and [oxfmt](https://oxc.rs/docs/guide/usage/formatter), with pnpm

## Develop

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Other scripts: `pnpm lint`, `pnpm format`, `pnpm typecheck` and `pnpm build`.

## Writing content in Hygraph

Posts are Markdown. Besides standard Markdown and GFM tables, the renderer supports:

- **Callouts:** `> [!NOTE] Title`, where the kind is `NOTE`, `TIP`, `WARNING`, `CAUTION` or `IMPORTANT`.
- **Code titles:** a title in the fence info, e.g. ` ```tsx title="app.tsx" `.
- **Sandpack:** `<!-- ::sandpack template="react" -->`, which uses the post's `files` JSON field. It accepts `previewOnly` and `files="App.js,styles.css"`.
- **Spoilers:** `<!-- ::start:spoiler -->` … `<!-- ::end:spoiler -->`.

Older MDX posts that use `<Callout>`, `<Sandpack />` or `<Spoiler>` are rewritten into these forms automatically (see `lib/markdown.ts`). Other JSX renders as plain text.

### Hygraph setup

- **Webhook:** on publish or unpublish, `POST https://janasundar.dev/api/revalidate` with the header `x-revalidate-secret: $HYGRAPH_REVALIDATE_SECRET`.
- **Preview URL:** `https://janasundar.dev/api/draft?secret=$HYGRAPH_PREVIEW_SECRET&slug={slug}&type=post` (use `type=snippet` for snippets).
