/** @format */

import '@/styles/globals.css';
import '@/styles/common.scss';
import '@/styles/custom.scss';
import { Layout } from 'antd';
import type { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import enUS from 'antd/lib/locale/en_US';
import { useEffect, useState } from 'react';
import { FilscanStoreProvider } from '@/store/FilscanStore';

import HeaderMain from '@/components/header';
import ErrorBoundary from '@/components/Bounday';
import { UserInfo, UserStoreContext } from '@/store/UserStore';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';

const { Content, Footer, Header } = Layout;

const defaultUerInfo: UserInfo = {
  name: '',
  mail: '',
  last_login: '',
};

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<any>({ ...defaultUerInfo });
  const [locale, setLocale] = useState('zh');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData: any = await fetchData(proApi.userInfo);
    setUserInfo({ ...userData, last_login: userData?.last_login_at || '' });
  };

  return (
    <ErrorBoundary>
      <ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>
        <FilscanStoreProvider>
          <UserStoreContext.Provider value={userInfo}>
            <Layout className={`container_body ${theme}`}>
              <HeaderMain />
              <Content>
                <Component {...pageProps} />
              </Content>
            </Layout>
          </UserStoreContext.Provider>
        </FilscanStoreProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
