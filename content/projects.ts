export type Project = {
  name: string;
  description: string;
  href: string;
  repo?: string;
  /** Hue (0–360) for the generated icon tile. */
  hue: number;
  glyph: string;
};

export const projects: Project[] = [
  {
    name: 'Luzo',
    description: 'Design API workflows like a flowchart. Debug them like a timeline.',
    href: 'https://luzoapi.vercel.app',
    repo: 'https://github.com/JanaSundar/luzo',
    hue: 262,
    glyph: '⌥',
  },
  {
    name: 'Thaal',
    description: 'A private, fully client-side PDF editor. Your files never leave the browser.',
    href: 'https://thaalpdf.vercel.app',
    repo: 'https://github.com/JanaSundar/thaal',
    hue: 18,
    glyph: 'த',
  },
  {
    name: 'DevWiz',
    description: 'Code conversion and transformation toolkit for developers.',
    href: 'https://devwiz.vercel.app',
    repo: 'https://github.com/JanaSundar/devwiz',
    hue: 152,
    glyph: '{}',
  },
  {
    name: 'svg2jsx',
    description: 'Paste an SVG, get a clean React component back.',
    href: 'https://svg2jsx.vercel.app',
    repo: 'https://github.com/JanaSundar/svg2jsx',
    hue: 205,
    glyph: '</>',
  },
];
