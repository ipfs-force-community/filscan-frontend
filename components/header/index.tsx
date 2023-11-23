/** @format */

import { header_top, langOptions, networkOptions } from '@/contents/common'
import { Translation } from '@/components/hooks/Translation'
import codeImg from '@/assets/images/code.png'
import Account from './Account'
import Nav from './Nav'
import { useFilscanStore } from '@/store/FilscanStore'
import { useEffect, useState } from 'react'
import Select from '@/packages/select'
import { useRouter } from 'next/router'
import { getSvgIcon } from '@/svgsIcon'
import i18n from '@/i18n'
import { BrowserView, MobileView } from '../device-detect'
import MHeader from '@/components/mobile/header/index'
import useAxiosData from '@/store/useAxiosData'
import { FilPrice, FinalHeight } from '@/contents/apiUrl'
import TimerHtml from '../TimerHtml'
import useInterval from '../hooks/useInterval'
import cwStore from '@/store/modules/Cw'
import Image from 'next/image'
// import Skeleton from '@/packages/skeleton';

export default () => {
  const { tr } = Translation({ ns: 'common' })
  const { theme, lang, setTheme, setLang } = useFilscanStore()
  const router = useRouter()
  const { axiosData } = useAxiosData()
  const [fil, setFilData] = useState<Record<string, string | number>>({})
  const [finalHeight, setFinalHeight] = useState<
    Record<string, string | number>
  >({})

  const [show, setShow] = useState(false)
  const [lastScrollTop, setLastScrollTop] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop
      if (st > lastScrollTop) {
        setShow(false)
      } else {
        setShow(true)
      }
      setLastScrollTop(st <= 0 ? 0 : st)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollTop])

  useInterval(() => {
    loadFilPrice()
  }, 15000)
  const loadFilPrice = async () => {
    const result = await axiosData(FilPrice)
    setFilData(result || {})
    const finalHeight = await axiosData(FinalHeight)
    cwStore.setFinalHeight(finalHeight?.height)
    setFinalHeight(finalHeight || {})
  }

  const handleLangChange = (value: string) => {
    localStorage.setItem('lang', value)
    i18n.changeLanguage(lang) // 更改i18n语言
    setLang(value)
    router.push(router.asPath, router.asPath, { locale: value })
  }

  const handleNetwork = (value: string) => {
    if (value === 'Calibration') {
      window.open('https://calibration.filscan.io/')
    } else if (value === 'Mainnet') {
      window.open('https://filscan.io/')
    }
  }

  const apiFlag = process?.env?.NET_WORK
  // px-24
  return (
    <>
      <MobileView>
        <MHeader data={{ ...fil, ...finalHeight }} />
      </MobileView>
      <BrowserView>
<<<<<<< HEAD
        <div
          className={`${
            show ? ' header-fade-in visible fixed top-0 ' : 'absolute top-0'
          } ${
            lastScrollTop > 100 ? 'header-fade-in' : ''
          }  main_bg_color z-50 h-[110px] w-full`}
        >
          <div className="custom_header flex h-[45px] w-full items-center justify-between text-xs">
            <ul className="flex list-none gap-x-5">
=======
        <div className={`${show ? ' header-fade-in visible fixed top-0 ':'absolute top-0'} ${lastScrollTop> 100 ? 'header-fade-in':''} top-0  z-50 w-full h-[110px] main_bg_color` }>
          <div className='flex justify-between items-center text-xs w-full h-[45px] custom_header'>
            <ul className='flex gap-x-5 list-none'>
>>>>>>> 3685f782 (feat: update css)
              {header_top.left.map((item) => {
                const { title, dataIndex, render } = item
                const data = { ...fil, ...finalHeight }
                const value = data && data[dataIndex]
                let renderDom = render && render(value, data)
                if (dataIndex === 'block_time') {
                  renderDom = <TimerHtml ns="home" text={value} />
                }
                return (
                  <li key={dataIndex} className="flex gap-x-1">
                    <span>{tr(title)}:</span>
                    <span>{renderDom || value}</span>
                  </li>
                )
              })}
            </ul>
            <div className="flex items-center gap-x-2.5">
              <Select
                ns=""
                wrapClassName="main_bg_color"
                className="!-inset-x-1/2	"
                value={apiFlag || 'Mainnet'}
                header={
                  <div className="main_bg_color border_color flex h-7 w-7 cursor-pointer  items-center justify-center rounded-[5px] border ">
                    {getSvgIcon('code')}
                  </div>
                }
                onChange={handleNetwork}
                // options={ []}
                optionsCard={
                  <div className={`flex w-[120px] flex-col items-center `}>
                    <Image
                      src={codeImg}
                      alt=""
                      width={120}
                      className={`${
                        theme === 'dark' ? 'rounded-[5px] bg-white p-2' : ''
                      }`}
                    />
                    <div className="text_des mt-2.5 flex flex-col items-center  text-center text-xs">
                      <div className="mb-[2px] ">{tr('mobile_code_1')}</div>
                      {tr('mobile_code_2')}
                    </div>
                  </div>
                }
              />
              <Select
                ns=""
                wrapClassName="main_bg_color"
                className="!-inset-x-1/2	"
                value={apiFlag || 'Mainnet'}
                header={
                  <span className="main_bg_color border_color flex h-7 w-7 cursor-pointer  items-center justify-center rounded-[5px] border ">
                    {getSvgIcon('network')}
                  </span>
                }
                onChange={handleNetwork}
                options={networkOptions}
              />

              <Select
                ns=""
                wrapClassName="main_bg_color"
                className="!-inset-x-1/2	"
                header={
                  <span className="main_bg_color border_color flex h-7 w-7 cursor-pointer items-center  justify-center rounded-[5px] border">
                    {tr(lang)}
                  </span>
                }
                value={lang}
                onChange={handleLangChange}
                options={langOptions}
              />

              <span
                className={
                  theme === 'dark'
                    ? 'border_color h-7 w-7 cursor-pointer rounded-[5px] border text-white'
                    : 'cursor-pointer'
                }
                onClick={() => {
                  localStorage.setItem(
                    'theme',
                    theme === 'dark' ? 'light' : 'dark',
                  )
                  setTheme(theme === 'dark' ? 'light' : 'dark')
                }}
              >
                {getSvgIcon(theme === 'dark' ? 'sun' : 'moon')}
              </span>
              <Account />
            </div>
          </div>
          <hr className="border_color" />
          <Nav />
        </div>
      </BrowserView>
    </>
  )
}
