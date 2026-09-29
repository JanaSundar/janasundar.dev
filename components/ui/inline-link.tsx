import { newTab } from '@/lib/external';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { ContainedFrames, Frame, FrameBar } from '@/components/markdown/frame';

/** Inline company/product link used inside running text. With a `preview`, hovering or focusing it shows the site. */
export function InlineLink({ href, preview, children }: { href: string; preview?: string; children: ReactNode }) {
  return (
    <span className="group/preview relative inline-block align-middle">
      <a
        href={href}
        {...newTab}
        className="group text-fg inline-flex items-center gap-1.5 font-medium whitespace-nowrap"
      >
        <span className="link">{children}</span>
        <ArrowUpRight
          width={10}
          height={10}
          className="text-faint group-hover:text-fg -ml-0.5 transition-transform group-hover:translate-x-px group-hover:-translate-y-px"
        />
      </a>
      {preview ? (
        // Decorative and pointer-transparent; only where a real hover exists, so touch screens never see it.
        <span
          aria-hidden
          className="pointer-events-none invisible absolute top-full left-1/2 z-50 mt-3 hidden w-72 -translate-x-1/2 -translate-y-1 scale-[0.97] opacity-0 shadow-lg transition-[opacity,translate,scale,visibility] duration-200 ease-out group-focus-within/preview:visible group-focus-within/preview:translate-y-0 group-focus-within/preview:scale-100 group-focus-within/preview:opacity-100 group-hover/preview:visible group-hover/preview:translate-y-0 group-hover/preview:scale-100 group-hover/preview:opacity-100 [@media(hover:hover)]:block"
        >
          <ContainedFrames>
            <Frame as="span" className="bg-bg block">
              <FrameBar as="span" className="text-muted h-8 px-3">
                <span className="truncate">{new URL(href).hostname.replace(/^www\./, '')}</span>
                <ArrowUpRight width={10} height={10} className="text-faint shrink-0" />
              </FrameBar>
              <Image src={preview} alt="" width={1200} height={614} sizes="288px" className="block h-auto w-full" />
            </Frame>
          </ContainedFrames>
        </span>
      ) : null}
    </span>
  );
}
