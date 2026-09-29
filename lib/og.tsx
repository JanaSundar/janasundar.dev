import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'node_modules/geist/dist/fonts');

/** Shared social card: black dotted grid, tight display type. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, 'geist-sans/Geist-Regular.ttf')),
    readFile(join(fontDir, 'geist-sans/Geist-SemiBold.ttf')),
  ]);

  const dots = 'radial-gradient(#2e2e2e 1px, transparent 1px)';

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '64px 80px',
        background: '#000',
        backgroundImage: dots,
        backgroundSize: '24px 24px',
      }}
    >
      <div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 26, color: '#a1a1a1', fontWeight: 400 }}>
        {eyebrow}
      </div>
      <div
        style={{
          display: 'flex',
          fontFamily: 'Geist',
          fontWeight: 600,
          fontSize: title.length > 60 ? 68 : 92,
          lineHeight: 1.02,
          letterSpacing: -4,
          color: '#ededed',
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'Geist',
          fontSize: 26,
          color: '#6f6f6f',
        }}
      >
        <span>{site.name}</span>
        <span>{site.url.replace('https://', '')}</span>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: regular, weight: 400 },
        { name: 'Geist', data: semibold, weight: 600 },
      ],
    }
  );
}
