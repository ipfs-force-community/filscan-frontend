import React from 'react';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import type { DocumentContext } from 'next/document';
import Script from 'next/script';

const MyDocument = () => (
  <Html lang="en">

    <Head >
      <title>Filscan--Filecoin Explorer</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0, minimum-scale=1,user-scalable=no'
      />
      <meta name='description' content="Filscan.io is a Filecoin blockchain explorer and data service platform.It offers a range of one-stop data services, including mining ranking, blockchain data query, visualization charts, and FVM ecosystem data analysis." />
      <meta
        name='keywords'
        content='Filecoin官方区块浏览器,Filecoin官方浏览器, Filecoin Explorer,fvm,Filscan,Filecoin, blockchain, crypto, currency,最新区块,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易'
      />
      <link rel="alternate" href="https://filscan.io/kr" hrefLang="kr-US" />
      <link rel="alternate" href="https://filscan.io/en" hrefLang="en-US" />
      <link rel="alternate" href="https://filscan.io" hrefLang="zh-CN" />
      <link rel='icon' href='https://filscan-v2.oss-accelerate.aliyuncs.com/client/logo.ico' />
      <Script src='https://hm.baidu.com/hm.js?db68ddd1d28effdabb6dfc9f07258667' strategy="lazyOnload"></Script>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-VZ0MMF5MLC" ></script>
      <script id="google-analytics">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VZ0MMF5MLC');
            `}
      </script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

MyDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default MyDocument;