import { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="stylesheet"
          href={`https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap`}
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>RadarFit - Missão Frontend</title>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}