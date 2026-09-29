import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'node_modules/geist/dist/fonts');

/** Shared social card: hatch band, bordered column, title in Geist. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [regular, medium, mono] = await Promise.all([
    readFile(join(fontDir, 'geist-sans/Geist-Regular.ttf')),
    readFile(join(fontDir, 'geist-sans/Geist-Medium.ttf')),
    readFile(join(fontDir, 'geist-mono/GeistMono-Regular.ttf')),
  ]);

  const hatch = 'repeating-linear-gradient(-45deg, #e3e3e0 0px, #e3e3e0 1px, transparent 1px, transparent 9px)';

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#f7f7f6', justifyContent: 'center' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 960,
          height: '100%',
          background: '#fbfbfa',
          borderLeft: '1px solid #e3e3e0',
          borderRight: '1px solid #e3e3e0',
        }}
      >
        <div style={{ display: 'flex', height: 64, backgroundImage: hatch, borderBottom: '1px solid #e3e3e0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', padding: '0 72px' }}>
          <div
            style={{
              fontFamily: 'Geist Mono',
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#6b6b66',
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 24,
              fontFamily: 'Geist',
              fontWeight: 500,
              fontSize: title.length > 60 ? 56 : 68,
              lineHeight: 1.1,
              letterSpacing: -1.5,
              color: '#1c1c1a',
            }}
          >
            {title}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '28px 72px',
            borderTop: '1px solid #e3e3e0',
            fontFamily: 'Geist Mono',
            fontSize: 22,
            color: '#6b6b66',
          }}
        >
          <span>{site.name}</span>
          <span>{site.url.replace('https://', '')}</span>
        </div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: 'Geist', data: regular, weight: 400 },
        { name: 'Geist', data: medium, weight: 500 },
        { name: 'Geist Mono', data: mono, weight: 400 },
      ],
    }
  );
}
