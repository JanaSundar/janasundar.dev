import type { ReactNode } from 'react';
import { Frame } from './frame';

/**
 * A stage for a demo, diagram or image, on the site's dotted grid. The caption sits under the frame in the
 * text measure and is numbered by a CSS counter, so figures count themselves in reading order.
 */
export function Figure({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="md-figure">
      <Frame className="dot-grid">
        <div className="md-figure-stage grid min-h-48 place-items-center px-5 py-10 text-center sm:px-8">
          <div>{children}</div>
        </div>
      </Frame>
      {caption ? <figcaption className="md-caption">{caption}</figcaption> : null}
    </figure>
  );
}
