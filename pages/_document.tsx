import { getSandpackCssText } from '@codesandbox/sandpack-react';
import type { DocumentContext, DocumentInitialProps } from 'next/document';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="preload"
            href="/fonts/MonoLisa-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <style dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} id="sandpack" />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
             window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `,
            }}
          />
        </Head>
        <body className="overflow-x-hidden overflow-y-scroll bg-primary font-medium text-slate-100 antialiased selection:text-slate-300">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
