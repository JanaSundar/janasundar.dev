import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/content/site';

export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), 'node_modules/geist/dist/fonts');

/** Shared social card: soft gradient wash, one rounded card, tight display type. */
export async function renderOgImage({ eyebrow, title }: { eyebrow: string; title: string }) {
  const [regular, semibold] = await Promise.all([
    readFile(join(fontDir, 'geist-sans/Geist-Regular.ttf')),
    readFile(join(fontDir, 'geist-sans/Geist-SemiBold.ttf')),
  ]);

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 48,
        background: 'linear-gradient(160deg, #eef2ff 0%, #f5f5f7 45%, #fdf2f8 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: '56px 64px',
          borderRadius: 40,
          background: '#ffffff',
          boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 24px 48px -24px rgba(0,0,0,0.18)',
        }}
      >
        <div style={{ display: 'flex', fontFamily: 'Geist', fontSize: 28, color: '#0066cc', fontWeight: 600 }}>
          {eyebrow}
        </div>
        <div
          style={{
            display: 'flex',
            fontFamily: 'Geist',
            fontWeight: 600,
            fontSize: title.length > 60 ? 64 : 84,
            lineHeight: 1.05,
            letterSpacing: -3,
            color: '#1d1d1f',
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
            color: '#6e6e73',
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
        { name: 'Geist', data: semibold, weight: 600 },
      ],
    }
  );
}
