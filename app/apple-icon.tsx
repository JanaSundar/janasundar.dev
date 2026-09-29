import { ImageResponse } from 'next/og';
import { LOGO_PATH, LOGO_VIEWBOX } from '@/lib/logo';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the ஜ mark on a black tile. iOS rounds the corners itself. */
export default function AppleIcon() {
  const width = 112;
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#0a0a0a',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width={width}
        height={(width * LOGO_VIEWBOX.height) / LOGO_VIEWBOX.width}
        viewBox={`0 0 ${LOGO_VIEWBOX.width} ${LOGO_VIEWBOX.height}`}
      >
        <path d={LOGO_PATH} fill="#ededed" fillRule="evenodd" />
      </svg>
    </div>,
    size
  );
}
