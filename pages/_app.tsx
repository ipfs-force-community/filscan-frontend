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
import Footer from '@/components/footer';

const { Content, Header } = Layout;

console.log("+=====================xxxxx")
console.log("+=====================xxxxx")
console.log("+=====================xxxxx")
console.log("+=====================xxxxx")
console.log("+=====================xxxxx")
console.log("+=====================xxxxx")
console.log("+=====================xxxxx")
console.log("+=====================xxxxx")

// const defaultUerInfo: UserInfo = {
//   name: '',
//   mail: '',
//   last_login: '',
// };

export default function App({ Component, pageProps }: AppProps) {
  const [userInfo, setUserInfo] = useState<any>();
  const [locale, setLocale] = useState('zh');
  const [theme, setTheme] = useState('light');

  const router = useRouter();

  useEffect(() => {
    // (function setRem() {
    //   try {
    //     const dom = document.documentElement;
    //     const resize =
    //       'orientationchange' in window ? 'orientationchange' : 'resize';
    //     // 设计稿宽度 1440px
    //     const DESIGN = 1440,
    //       MAX = 1920,
    //       MIN = 1024;
    //     const calculate = function () {
    //       const clientWidth = dom.clientWidth;
    //       const designWidth = clientWidth > MIN ? DESIGN : MIN;
    //       const screenWidth = clientWidth > MAX ? MAX : clientWidth;
    //       const size = (screenWidth / designWidth) * 10;
    //       dom.style.setProperty('font-size', size + 'px', 'important');
    //     };
    //     calculate();
    //     window.addEventListener(resize, calculate);
    //   } catch (error) {
    //     console.error('setRem error');
    //   }
    // })();
  }, []);
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

  return (
    <ErrorBoundary>
      <ConfigProvider locale={locale === 'zh' ? zhCN : enUS}>
        <FilscanStoreProvider>
          <UserStoreContext.Provider value={{ ...userInfo, setUserInfo }}>
            <div className={`container_body text-sm ${theme}`}>
              <div className='w-full h-[110px] main_bg_color'>
                <HeaderMain />
              </div>
              <Component {...pageProps} />
              <div className='w-full h-[140px] bg-footerColor'>
                <Footer />
              </div>

            </div>
          </UserStoreContext.Provider>
        </FilscanStoreProvider>
      </ConfigProvider>
    </ErrorBoundary>
  );
}
