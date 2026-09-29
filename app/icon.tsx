import { logoSvg } from '@/lib/logo';

export const contentType = 'image/svg+xml';
export const size = { width: 32, height: 32 };

/** Favicon: the J tile. */
export default function Icon() {
  return new Response(logoSvg(), {
    headers: { 'Content-Type': contentType },
  });
}
