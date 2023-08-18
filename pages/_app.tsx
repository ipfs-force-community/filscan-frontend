/** @format */

import '@/styles/globals.css';
import '@/styles/common.scss';
import '@/styles/custom.scss';
import { Layout } from 'antd';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { useEffect, useState } from 'react';
import { FilscanStoreProvider } from '@/store/FilscanStore';

import HeaderMain from '@/components/header';
import i18n from '@/i18n';
import ErrorBoundary from '@/components/Bounday';

const { Content, Footer, Header } = Layout;

export default function App({ Component, pageProps }: AppProps) {
  const [locale, setLocale] = useState('zh');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // if ('scrollRestoration' in window.history) {
    //   window.history.scrollRestoration = 'manual';
    // }
    const prefersDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    setTheme('dark');
  }, []);

  return (
    <ErrorBoundary>
      <ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>
        <FilscanStoreProvider>
          <Layout className={`container_body ${theme}`}>
            <HeaderMain />
            <Content>
              <Component {...pageProps} />
            </Content>
          </Layout>
        </FilscanStoreProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
