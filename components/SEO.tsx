import React from 'react';
import { NextSeo } from 'next-seo';
import type { OpenGraph } from 'next-seo/lib/types';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
}

export default function SEO({ title, ...rest }: SEOProps) {
  const router = useRouter();

  const openGraph: OpenGraph = React.useMemo(
    () => ({
      url: `https://janasundar.dev/api/og/?title={title}`,
      title: `${title} - Janarthanan`,
    }),
    [title]
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
