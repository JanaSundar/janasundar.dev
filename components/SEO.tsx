import React from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

interface SEOProps {
  title: string;
  description: string;
}

export default function SEO({ title, description, ...rest }: SEOProps) {
  const router = useRouter();

  return (
    <NextSeo
      title={`${title} - Janarthanan`}
      canonical={`https://janasundar.dev${router.asPath}`}
      openGraph={{
        images: [
          {
            url: `https://janasundar.dev/api/og/?title=${title}`,
            alt: title,
            width: 1200,
            height: 630,
          },
        ],
        title: `${title} - Janarthanan`,
        description,
      }}
      {...rest}
    />
  );
}
