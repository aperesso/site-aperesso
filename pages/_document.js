import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from 'react';
import "@babel/polyfill";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
            <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,maximum-scale=1,user-scalable=no" />
            <meta name="theme-color" content="#050505" />
            <meta name="language" content='en' />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="Alexia Peresson" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@psn_al" />
            <meta name="twitter:creator" content="@psn_al" />
            <link rel="apple-touch-icon" sizes="57x57" href="assets/favicons/apple-icon-57x57.png?url"/>
            <link rel="apple-touch-icon" sizes="60x60" href="assets/favicons/apple-icon-60x60.png?url"/>
            <link rel="apple-touch-icon" sizes="72x72" href="assets/favicons/apple-icon-72x72.png?url"/>
            <link rel="apple-touch-icon" sizes="76x76" href="assets/favicons/apple-icon-76x76.png?url"/>
            <link rel="apple-touch-icon" sizes="114x114" href="assets/favicons/apple-icon-114x114.png?url"/>
            <link rel="apple-touch-icon" sizes="120x120" href="assets/favicons/apple-icon-120x120.png?url"/>
            <link rel="apple-touch-icon" sizes="144x144" href="assets/favicons/apple-icon-144x144.png?url"/>
            <link rel="apple-touch-icon" sizes="152x152" href="assets/favicons/apple-icon-152x152.png?url"/>
            <link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/apple-icon-180x180.png?url"/>
            <link rel="icon" type="image/png" sizes="192x192" href="assets/favicons/android-icon-192x192.png?url"/>
            <link rel="icon" type="image/png" sizes="32x32" href="assets/favicons//favicon-32x32.png?url"/>
            <link rel="icon" type="image/png" sizes="96x96" href="assets/favicons/favicon-96x96.png?url"/>
            <link rel="icon" type="image/png" sizes="16x16" href="assets/favicons/favicon-16x16.png?url"/>
            <link rel="manifest" href="assets/favicons/manifest.json" />
            <link rel="shortcut icon" href="assets/favicons/favicon.ico" />
            <meta name="msapplication-TileColor" content="#050505" />
            <meta name="msapplication-TileImage" content="assets/favicons/ms-icon-144x144.png"/>
            <meta name="msapplication-config" content="assets/favicons/browserconfig.xml" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="1200" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument