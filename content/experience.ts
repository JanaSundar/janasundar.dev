/** One point on a job's timeline: a short lead-in that names the area, then a single concise sentence. */
export type Highlight = { lead: string; text: string };

export type Experience = {
  company: string;
  href: string;
  role: string;
  start: string;
  end?: string;
  /** The strongest points for the role, at most five. */
  highlights: Highlight[];
};

export const experience: Experience[] = [
  {
    company: 'Cimpress',
    href: 'https://cimpress.com',
    role: 'Senior Software Engineer',
    start: '2021-05',
    highlights: [
      {
        lead: 'Gifta.com',
        text: 'Own product configuration, personalization and preview end to end, and improved its Core Web Vitals.',
      },
      { lead: 'Gift wrapping', text: 'Launched the experience, lifting revenue by about 5%.' },
      {
        lead: 'Integrations',
        text: 'Architected Shopify and Etsy integrations on Node.js, NestJS, Redis and BullMQ.',
      },
      { lead: 'AI onboarding agent', text: 'Automates environment, dependency and access setup for new developers.' },
      {
        lead: 'AI context platform',
        text: 'Makes engineering knowledge reusable across Copilot, MCP, Confluence and Jira.',
      },
    ],
  },
  {
    company: 'Cognizant',
    href: 'https://www.cognizant.com',
    role: 'Programmer Analyst',
    start: '2019-07',
    end: '2021-04',
    highlights: [
      { lead: 'AI recruiting platform', text: 'Owned an AI-based interviewing platform end to end.' },
      {
        lead: 'Covid app',
        text: 'Designed a Bluetooth mobile proof of concept to identify infected people and their contacts.',
      },
      { lead: 'IoT dashboard', text: 'Built and maintained a website tracking data from IoT devices.' },
      { lead: 'Legacy support', text: 'Improved browser support from IE10 down to IE6.' },
    ],
  },
];
