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
import { FilscanStoreProvider, useFilscanStore } from '@/store/FilscanStore';

import HeaderMain from '@/components/header';
import ErrorBoundary from '@/components/Bounday';
import { UserInfo, UserStoreContext } from '@/store/UserStore';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';
import { useRouter } from 'next/router';
import Footer from '@/components/footer';
import { MobileView } from '@/components/device-detect';
import classNames from 'classnames';
import Search from '@/components/mobile/search';
import styles from './_app.module.scss'
import { useTranslation } from 'react-i18next';
import { DeviceContext } from '@/store/DeviceContext';
import MobileDetect from 'mobile-detect';
const { Content, Header } = Layout;
import Ap from 'next/app'

App.getInitialProps = async (context:any)=>{
  const initialProps = await Ap.getInitialProps(context)

  const regex = RegExp("Android|iPhone")

  if (context.ctx.req) {
    return {
      ...initialProps,
      isMobile: regex.test(context.ctx.req.headers['user-agent'])
    };
  }
  return {
    isMobile:window.innerWidth < 1000,
    ...initialProps
  }
}

//@ts-ignore
export default function App({ Component, pageProps,isMobile }: any) {
  const [userInfo, setUserInfo] = useState<any>();
  const [locale, setLocale] = useState('zh');
  const [theme, setTheme] = useState('light');
  const [home, setHome] = useState<boolean>(false);
  const {t} =useTranslation('home')
  const router = useRouter();

  useEffect(() => {
    if (localStorage?.getItem('userInfo')) {
      const lastUser = JSON.parse(localStorage?.getItem('userInfo') || '');
      if (lastUser) {
        setUserInfo(lastUser);
      }
    }
    loadUser();
  }, []);

  const loadUser = async () => {
    const userData: any = await fetchData(proApi.userInfo);
    setUserInfo({ ...userData, last_login: userData?.last_login_at || '' });
    localStorage.setItem(
      'userInfo',
      JSON.stringify({ ...userData, last_login: userData?.last_login_at || '' })
    );
  };

  useEffect(()=>{
    const pathname = router.pathname
    setHome(pathname === '/' || pathname === '/home')
  },[router.pathname])

  return (
    <ErrorBoundary>
      <ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>
        <DeviceContext.Provider value={{isMobile}}>
          <FilscanStoreProvider>
            <UserStoreContext.Provider value={{ ...userInfo, setUserInfo }}>
              <div className={classNames(`container_body ${theme}`)}>
                <HeaderMain />
                <MobileView>
                  {home && <div className={classNames(styles.title)}>
                    <span>Filecoin </span>
                    <span>{t('blockchain_browser')}</span>
                  </div>}
                  <Search className={home ? styles['search-home'] : styles['search']}/>
                </MobileView>
                <div className={classNames(home ? styles.home : styles.other,styles.component)}>
                  <Component {...pageProps} />
                </div>
                <Footer />           </div>
            </UserStoreContext.Provider>
          </FilscanStoreProvider>
        </DeviceContext.Provider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
