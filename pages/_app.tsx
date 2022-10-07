import '../styles/globals.css';
import '@fontsource/nunito';
import '@fontsource/nunito/700.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins';
import type { AppProps } from 'next/app';
import BaseLayout from '~layouts/BaseLayout';
import { DefaultSeo } from 'next-seo';
import SEO from '../next-seo.config';
import useAnalytics from '~hooks/useAnalytics';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();
  return (
    <>
      <DefaultSeo {...SEO} />
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
      <Toaster position="top-right" gutter={4} />
    </>
  );
}

export default MyApp;
