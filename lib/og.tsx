import { ImageResponse } from '@takumi-rs/image-response';
import { site } from '@/content/site';
import { getEntry, type ContentKind } from '@/lib/hygraph';
import { J_PATH } from '@/lib/logo';

export const ogSize = { width: 1200, height: 630 };

// The site's dark palette (see globals.css).
const color = { bg: '#000', fg: '#ededed', muted: '#a1a1a1' };

// The address shown on post cards.
const host = site.url.replace('https://', '');

/**
 * The mark as an outline: the J's stroke drawn twice, wide in the foreground colour and narrower in the background
 * colour on top, which leaves a hairline along each edge and a hollow middle.
 */
function Mark() {
  const size = 560;
  const transform = 'translate(0 1)';
  return (
    <div
      style={{
        position: 'absolute',
        left: (ogSize.width - size) / 2,
        top: (ogSize.height - size) / 2,
        width: size,
        height: size,
        display: 'flex',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <path d={J_PATH} fill="none" stroke={color.fg} strokeWidth="14" strokeLinecap="round" transform={transform} />
        <path d={J_PATH} fill="none" stroke={color.bg} strokeWidth="10.4" strokeLinecap="round" transform={transform} />
      </svg>
    </div>
  );
}

/**
 * Shared social card: black and quiet, with nothing but what it needs. With no title it is the outlined mark alone,
 * which is what the home page uses; with one, the title sits bottom-left with the address above it.
 */
export async function renderOgImage({
  title,
  path = '',
}: { title?: string; /** The section the card is for, such as `/blog`. */ path?: string } = {}) {
  const long = (title?.length ?? 0) > 60;

  return new ImageResponse(
    <div style={{ display: 'flex', position: 'relative', width: '100%', height: '100%', background: color.bg }}>
      {title ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: 80,
              top: 72,
              display: 'flex',
              fontFamily: 'Geist',
              fontSize: 22,
              letterSpacing: -0.5,
              color: color.muted,
            }}
          >
            {host}
            {path}
          </div>

          <div
            style={{
              position: 'absolute',
              left: 80,
              bottom: 72,
              width: 960,
              display: 'flex',
              fontFamily: 'Geist',
              fontWeight: 600,
              fontSize: long ? 60 : 76,
              lineHeight: 1.05,
              letterSpacing: long ? -2.2 : -3,
              color: color.fg,
            }}
          >
            {title}
          </div>
        </>
      ) : (
        <Mark />
      )}
    </div>,
    ogSize
  );
}

/** The sections that have a card of their own. `kind` marks the ones whose pages show their entry's title instead. */
const sections: Record<string, { title: string; kind?: ContentKind }> = {
  blog: { title: 'Writing', kind: 'post' },
  snippets: { title: 'Snippets', kind: 'snippet' },
  crafts: { title: 'Crafts' },
};

/**
 * The card for a path, given as its segments: none is the home page (the mark alone), one is a section's index, and
 * two is one of its entries. Anything else falls back to the home card.
 */
export async function renderOgForPath([section, slug]: string[] = []) {
  const config = sections[section];
  if (!config) return renderOgImage();

  const path = `/${section}`;
  const entry = slug && config.kind ? await getEntry(config.kind, slug) : null;
  return renderOgImage({ title: slug ? (entry?.title ?? site.name) : config.title, path });
}
