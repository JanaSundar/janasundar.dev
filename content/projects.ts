export type Project = {
  name: string;
  description: string;
  href: string;
  repo?: string;
  /** Hue (0–360) for the generated icon tile. */
  hue: number;
  glyph: string;
  /** A bundled logo to show in the tile instead of the glyph. */
  logo?: 'luzo' | 'devwiz' | 'reify' | 'ovio';
};

export const projects: Project[] = [
  {
    name: 'Ovio',
    description: 'Animated React components, shipped as a shadcn registry, for showcasing developer projects.',
    href: 'https://ovioui.vercel.app',
    repo: 'https://github.com/JanaSundar/ovio',
    hue: 24,
    glyph: 'O',
    logo: 'ovio',
  },
  {
    name: 'Reify',
    description: 'Run JavaScript or TypeScript in the browser and step backward and forward through what it did.',
    href: 'https://tryreify.vercel.app',
    repo: 'https://github.com/JanaSundar/reify',
    hue: 200,
    glyph: 'R',
    logo: 'reify',
  },
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
