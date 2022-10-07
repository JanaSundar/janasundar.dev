const title = 'Janarthanan\'s Personal Site';
const description =
  'Developer and Javascript enthusiast from India interested in React, Node, Jamstack, Typescript and Music.';

const SEO = {
  title,
  description,
  canonical: 'https://janasundar.dev',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://janasundar.dev',
    title,
    description,
    images: [
      {
        url: 'https://janasundar.dev/images/default.png',
        alt: title,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    handle: '@jana__sundar',
    site: '@jana__sundar',
    cardType: 'summary_large_image',
  },
};

export default SEO;
