import { GetServerSideProps } from 'next';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { getSlugs } from '~helpers/queries';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const base_url = process.env.NEXT_PUBLIC_SITE_URL;
  const slugs = await getSlugs();

  const fields: ISitemapField[] = slugs.map(({ slug }) => ({
    loc: `${base_url}/blog/${slug}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));

  return getServerSideSitemap(ctx, fields);
};

export default function Site() {
  return null;
}
