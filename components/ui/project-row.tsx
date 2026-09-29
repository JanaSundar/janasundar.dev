import type { Project } from '@/content/projects';
import { ArrowUpRight } from '@/components/icons';

const wrapHue = (hue: number) => hue % 360;

function ProjectIcon({ hue, glyph }: Pick<Project, 'hue' | 'glyph'>) {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-[10px] font-mono text-[12px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.25),0_1px_2px_rgb(0_0_0/0.12)]"
      style={{
        background: `linear-gradient(145deg, oklch(0.68 0.16 ${wrapHue(hue)}), oklch(0.5 0.18 ${wrapHue(hue + 25)}))`,
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
        className="group hover:bg-subtle -mx-3 flex items-start gap-3.5 rounded-xl px-3 py-2.5 transition-colors"
      >
        <ProjectIcon hue={hue} glyph={glyph} />
        <span className="min-w-0 flex-1">
          <span className="text-fg flex items-center gap-1.5 font-medium">
            {name}
            <ArrowUpRight className="text-faint opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" />
          </span>
          <span className="text-muted block text-[13.5px]">{description}</span>
        </span>
      </a>
    </li>
  );
}
