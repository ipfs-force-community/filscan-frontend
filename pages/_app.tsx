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
import { useRouter } from 'next/router';

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

  const router = useRouter();

  // useEffect(() => {
  //   // 在路由改变开始时禁用滚动到顶部
  //   function handleChangeStart(url: string) {
  //     console.log('----3', url);

  //     window.history.scrollRestoration = 'manual';
  //   }
  //   function handleChangeComplete(url: string) {
  //     console.log('----3', url);
  //     if (!url.includes('#')) {
  //       window.history.scrollRestoration = 'auto';
  //     }
  //   }
  //   router.events.on('routeChangeStart', handleChangeStart);
  //   // 在路由改变完成后恢复滚动到顶部
  //   router.events.on('routeChangeComplete', handleChangeComplete);
  //   // 在组件卸载时移除事件监听器
  //   return () => {
  //     router.events.off('routeChangeStart', handleChangeStart);
  //     router.events.off('routeChangeComplete', handleChangeComplete);
  //   };
  // }, [router]);

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
