import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="application-name" content="영어 단어장" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="단어장" />
        <meta name="description" content="영어 단어를 학습하고 테스트할 수 있는 앱" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#FF7043" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet" />

        <link rel="manifest" href={process.env.NODE_ENV === 'production' ? '/chance-words/manifest.json' : '/manifest.json'} />
        <link rel="icon" type="image/png" sizes="192x192" href={process.env.NODE_ENV === 'production' ? '/chance-words/icon-192x192.png' : '/icon-192x192.png'} />
        <link rel="icon" type="image/png" sizes="512x512" href={process.env.NODE_ENV === 'production' ? '/chance-words/icon-512x512.png' : '/icon-512x512.png'} />
        <link rel="apple-touch-icon" href={process.env.NODE_ENV === 'production' ? '/chance-words/icon-192x192.png' : '/icon-192x192.png'} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
