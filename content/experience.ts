export type Experience = {
  company: string;
  href: string;
  role: string;
  start: string;
  end?: string;
  summary: string;
};

export const experience: Experience[] = [
  {
    company: 'Cimpress',
    href: 'https://cimpress.com',
    role: 'Software Engineer',
    start: '2021-05',
    summary:
      'Gifta team (B2C e-commerce). Integrated the designer experience (DEX) package and built full-stack microservices.',
  },
  {
    company: 'Cognizant',
    href: 'https://www.cognizant.com',
    role: 'Programmer Analyst',
    start: '2019-07',
    end: '2021-04',
    summary: 'R&D team. Built proof-of-concept web and mobile apps and a library of reusable components.',
  },
];
