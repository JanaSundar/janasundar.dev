export type Project = {
  name: string;
  description: string;
  href: string;
  repo?: string;
  /** Hue (0–360) for the generated icon tile. */
  hue: number;
  glyph: string;
  /** A bundled logo to show in the tile instead of the glyph. */
  logo?: 'luzo' | 'devwiz';
};

export const projects: Project[] = [
  {
    name: 'Luzo',
    description: 'Design API workflows like a flowchart. Debug them like a timeline.',
    href: 'https://luzoapi.vercel.app',
    repo: 'https://github.com/JanaSundar/luzo',
    hue: 262,
    glyph: '⌥',
    logo: 'luzo',
  },
  {
    name: 'DevWiz',
    description: 'Code conversion and transformation toolkit for developers.',
    href: 'https://devwiz.vercel.app',
    repo: 'https://github.com/JanaSundar/devwiz',
    hue: 152,
    glyph: '{}',
    logo: 'devwiz',
  },
];
