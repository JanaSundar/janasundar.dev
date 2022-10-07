import React from 'react';
import { NextSeo } from 'next-seo';
import type { OpenGraph } from 'next-seo/lib/types';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  slug: string;
}

export default function SEO({ title, slug, ...rest }: SEOProps) {
  const router = useRouter();

  const openGraph: OpenGraph = React.useMemo(
    () => ({
      url: `https://janasundar.dev/og/${slug}.png`,
      title: `${title} - Janarthanan`,
    }),
    [title, slug]
  );

  return (
    <NextSeo
      title={`${title} - Janarthanan`}
      canonical={`https://janasundar.dev${router.asPath}`}
      openGraph={openGraph}
      {...rest}
    />
  );
}
