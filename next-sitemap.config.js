const siteUrl = 'https://www.janasundar.dev';

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.7,
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/sitemap.xml`, `${siteUrl}/server-sitemap.xml`],
  },
  exclude: ['/server-sitemap.xml'],
};
