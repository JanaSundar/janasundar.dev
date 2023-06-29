import '../styles/globals.css';
import '@fontsource/inter/variable.css';
import type { AppProps } from 'next/app';
import BaseLayout from '~layouts/BaseLayout';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import useAnalytics from '~hooks/useAnalytics';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { pageview } from '~helpers/analytics';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (process.env.NODE_EN === 'production') {
        pageview(url);
      }
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
  return (
    <>
      <DefaultSeo {...SEO} />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
      <Toaster position="top-right" gutter={4} />
      <Analytics />
    </>
  );
}

export default MyApp;
