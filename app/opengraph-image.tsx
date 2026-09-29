import { site } from '@/content/site';
import { ogSize, renderOgImage } from '@/lib/og';

export const alt = `${site.name} — ${site.role}`;
export const size = ogSize;
export const contentType = 'image/png';

export default function Image() {
  return renderOgImage();
}
