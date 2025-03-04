/** @format */
import '@/styles/iconfont.css'
import '@/styles/globals.css'
import '@/styles/common.scss'
import '@/styles/custom.scss'
import '@/styles/_mixins.scss'
import { ConfigProvider, theme } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import enUS from 'antd/lib/locale/en_US'
import { useEffect, useState } from 'react'
import HeaderMain from '@/components/header'
import ErrorBoundary from '@/components/Bounday'
import { NextSeo } from 'next-seo'
import { useRouter, withRouter } from 'next/router'
import Footer from '@/components/footer'
import { MobileView } from '@/components/device-detect'
import classNames from 'classnames'
import Search from '@/components/mobile/search'
import styles from './_app.module.scss'
import { DeviceContext } from '@/store/DeviceContext'
import i18n from '@/i18n'
import Ap from 'next/app'
import { SEO } from '@/contents/common'
import Script from 'next/script'
import { Provider, observer } from 'mobx-react'
import * as mobxStores from '@/store'
import Member from '@/src/account/member'
import filscanStore from '@/store/modules/filscan'
import Warn from '@/src/user/Warn'
const antdTheme = theme

App.getInitialProps = async (context: any) => {
  const initialProps = await Ap.getInitialProps(context)
  const regex = RegExp('Android|iPhone')
  if (context.ctx.req) {
    return {
      ...initialProps,
      isMobile: regex.test(context.ctx.req.headers['user-agent']),
    }
  }
  return {
    isMobile: window.innerWidth < 1000,
    ...initialProps,
  }
}

//@ts-ignore
function App({ Component, pageProps, isMobile }: any) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const { theme, lang } = filscanStore
  const [wallet, setWallet] = useState({
    wallet: '',
    account: '',
  })

  useEffect(() => {
    loadTheme(theme)
  }, [theme])
  useEffect(() => {
    const theme_Local = localStorage.getItem('theme')
    let lang_Local = localStorage.getItem('lang')
    const wallet_local = localStorage.getItem('wallet')
    const wallet_store = JSON.parse(wallet_local || '{}')
    if (!wallet?.account) {
      setWallet(wallet_store)
    }
    if (router.locale) {
      lang_Local = router.locale
    }
    if (!lang_Local) {
      lang_Local = navigator.language.startsWith('zh') ? 'zh' : 'en'
    }
    loadTheme(theme_Local)
    if (theme_Local) filscanStore.setTheme(theme_Local)
    i18n.changeLanguage(lang_Local) // 更改i18n语言
    if (lang_Local) filscanStore.setLang(lang_Local)
    setLoading(false)
    if (typeof window !== undefined) {
      window.addEventListener('resize', onResize)
      return () => {
        window.removeEventListener('resize', onResize)
      }
    }
  }, [])

  const onResize = () => {
    const theme_Local = localStorage.getItem('theme')
    if (window.innerWidth < 1000) {
      isMobile = true
      loadTheme('light')
      return
    }
    isMobile = false
    loadTheme(theme_Local)
  }

  const loadTheme = (theme_Local: any) => {
    if (theme_Local === 'dark' && !isMobile) {
      document.documentElement.setAttribute('theme', 'dark')
    } else {
      document.documentElement.setAttribute('theme', 'light')
    }
  }

  if (loading) {
    return null
  }

  const seo = SEO[lang]
  let themeProps = {}
  if (theme === 'dark') {
    themeProps = {
      algorithm: antdTheme.darkAlgorithm,
    }
  }
  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.url}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: seo.keywords,
          },
        ]}
        languageAlternates={[
          { hrefLang: 'en', href: 'https://filscan.io/en' },
          { hrefLang: 'zh', href: 'https://filscan.io/zh' },
        ]}
      />
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-VZ0MMF5MLC" />
      <Script id="google-analytics">
        {`
         window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-VZ0MMF5MLC');
        `}
      </Script>
      <Provider {...mobxStores}>
        <ErrorBoundary>
          <DeviceContext.Provider value={{ isMobile }}>
            {/* <WalletState.Provider
              value={{
                wallet,
                setWallet: (walletItem: any) => {
                  setWallet(walletItem)
                },
              }}
            > */}
            <ConfigProvider locale={lang === 'zh' ? zhCN : enUS}>
              <div className={classNames(`container_body text-sm ${theme}`)}>
                <HeaderMain />
                <MobileView>
                  <Search className={styles['search']} />
                </MobileView>
                <div
                  className={classNames(
                    styles.home,
                    styles.component,
                    'chart-wrapper',
                  )}
                >
                  <Component {...pageProps} />
                  <Warn />
                  <Member />
                </div>
                <Footer />
              </div>
            </ConfigProvider>
          </DeviceContext.Provider>
        </ErrorBoundary>
      </Provider>
    </>
  )
}

export default withRouter(observer(App))
