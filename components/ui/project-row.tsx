import type { Project } from '@/content/projects';
import { ArrowUpRight } from '@/components/icons';

const wrapHue = (hue: number) => hue % 360;

/** App-icon style tile: continuous squircle-ish corners, soft gloss and a hairline edge. */
function ProjectIcon({ hue, glyph }: Pick<Project, 'hue' | 'glyph'>) {
  return (
    <span
      aria-hidden
      className="grid size-11 shrink-0 place-items-center rounded-[10px] text-[15px] font-semibold tracking-tight text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),inset_0_0_0_1px_rgb(0_0_0/0.06),0_1px_2px_rgb(0_0_0/0.15)]"
      style={{
        background: `linear-gradient(160deg, oklch(0.74 0.15 ${wrapHue(hue)}), oklch(0.55 0.19 ${wrapHue(hue + 25)}))`,
      }}
    >
      {glyph}
    </span>
  );
}

export function ProjectRow({ name, description, href, hue, glyph }: Project) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group hover:bg-subtle active:bg-subtle flex items-center gap-3.5 px-4 py-3 transition-colors"
      >
        <ProjectIcon hue={hue} glyph={glyph} />
        <span className="min-w-0 flex-1">
          <span className="text-fg block font-medium">{name}</span>
          <span className="footnote block">{description}</span>
        </span>
        <ArrowUpRight className="text-faint/70 shrink-0 transition-transform group-hover:translate-x-px group-hover:-translate-y-px" />
      </a>
    </li>
  );
}
