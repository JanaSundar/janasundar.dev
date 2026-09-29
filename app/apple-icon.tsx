import { ImageResponse } from 'next/og';
import { LOGO_TILE, logoSvg } from '@/lib/logo';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

/** Home-screen icon: the J tile, rasterised. iOS rounds the corners itself. */
export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: LOGO_TILE.background }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt=""
        width={size.width}
        height={size.height}
        src={`data:image/svg+xml;base64,${Buffer.from(logoSvg()).toString('base64')}`}
      />
    </div>,
    size
  );
}
