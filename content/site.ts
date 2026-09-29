export const site = {
  name: 'Jana',
  fullName: 'Janarthanan',
  role: 'Senior Software Engineer',
  url: 'https://janasundar.vercel.app',
  description:
    'Senior software engineer from India building fast, thoughtful web products with React, Node and TypeScript. Writing about the web along the way.',
  email: 'mailtojana23@gmail.com',
  resume: '/resume.pdf',
  newsletter: 'https://janasundar.substack.com',
  socials: {
    github: { label: 'GitHub', handle: 'janasundar', href: 'https://github.com/janasundar' },
    twitter: { label: 'X', handle: 'jana__sundar', href: 'https://twitter.com/jana__sundar' },
    linkedin: { label: 'LinkedIn', handle: 'janasundar', href: 'https://www.linkedin.com/in/janasundar/' },
  },
} as const;

export type Site = typeof site;
