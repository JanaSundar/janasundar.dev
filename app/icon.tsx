import { logoSvg } from '@/lib/logo';

export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

/** Favicon: the ஜ mark on a solid rounded tile, so it reads on light and dark tabs alike. */
export default function Icon() {
  return new Response(logoSvg({ fill: '#ededed', background: '#0a0a0a', pad: 190, radius: 0.22 }), {
    headers: { 'Content-Type': contentType },
  });
}
