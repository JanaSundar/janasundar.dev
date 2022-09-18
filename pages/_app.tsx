import '../styles/globals.css';
import '@fontsource/nunito';
import '@fontsource/nunito/700.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins';
import type { AppProps } from 'next/app';
import BaseLayout from '~layouts/BaseLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BaseLayout>
      <Component {...pageProps} />
    </BaseLayout>
  );
}

export default MyApp;
