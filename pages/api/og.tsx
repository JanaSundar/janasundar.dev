import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import SocialImage from '~components/SocialImage';

export const config = {
  runtime: 'edge',
};

const font = fetch(new URL('../../fonts/Inter-Bold.ttf', import.meta.url)).then((res) => res.arrayBuffer());

export default async function handler(req: NextRequest) {
  try {
    const fontData = await font;
    const { searchParams: qp } = new URL(req.url);

    const title = qp.get('title')!;
    const background = qp.get('background');
    const color = qp.get('color');

    return new ImageResponse(<SocialImage {...{ title, background, color }} />, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
        },
      ],
    });
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
