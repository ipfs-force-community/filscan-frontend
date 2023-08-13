import '@/styles/globals.css'
import '@/styles/common.css'
import '@/styles/custom.scss'
import { Layout, Space } from 'antd'
import { I18nextProvider } from 'react-i18next';
import { useRouter } from 'next/router';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { useEffect, useState } from 'react';
import { FilscanStoreProvider } from '@/store/FilscanStore';

import HeaderMain from '@/components/header';
import i18n from '@/i18n';


const { Content, Footer, Header }  = Layout

export default function App({ Component, pageProps }: AppProps) {
  
  const [locale, setLocale] = useState('zh')
   const [theme, setTheme] = useState('light')

  useEffect(() => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme('dark')
  }, [])


  return <ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>

    <I18nextProvider i18n={i18n}>
      <FilscanStoreProvider>
       <Layout className={`container_body ${theme}`}>
        <HeaderMain />
        <Content >
        <Component {...pageProps} />
      </Content>
      <Footer>Footer</Footer>
    </Layout>
    </FilscanStoreProvider>
    </I18nextProvider>
  </ConfigProvider>

}
