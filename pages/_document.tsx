import { getSandpackCssText } from "@codesandbox/sandpack-react";
import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: getSandpackCssText() }} id="sandpack" />
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
