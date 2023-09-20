/** @format */

import { header_top, langOptions, networkOptions } from '@/contents/common';
import { Translation } from '@/components/hooks/Translation';
import Account from './Account';
import Nav from './Nav';
import { useFilscanStore } from '@/store/FilscanStore';
import { useEffect, useState } from 'react';
import Select from '@/packages/select';
import { useRouter } from 'next/router';
import { getSvgIcon } from '@/svgsIcon';
import i18n from '@/i18n';
import { BrowserView, MobileView } from '../device-detect';
import MHeader from '@/components/mobile/header/index'
import useAxiosData from '@/store/useAxiosData';
import { FilPrice, FinalHeight } from '@/contents/apiUrl';
import TimerHtml from '../TimerHtml';
import useInterval from '../hooks/useInterval';
// import Skeleton from '@/packages/skeleton';

export default () => {
  const { tr } = Translation({ ns: 'common' });
  const { theme, lang, setTheme, setLang } = useFilscanStore();
  const router = useRouter();
  const { axiosData } = useAxiosData()
  const [fil, setFilData] = useState<Record<string,string|number>>({})
  const [finalHeight, setFinalHeight] = useState<Record<string,string|number>>({})

  const [show, setShow] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop){
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  useInterval(() => {
    loadFilPrice();
  }, 15000);
  const loadFilPrice = async () => {
    const result = await axiosData(FilPrice);
    setFilData(result || {})
    const finalHeight = await axiosData(FinalHeight);
    setFinalHeight(finalHeight || {})
  }

  const handleLangChange = (value: string) => {
    localStorage.setItem('lang', value);
    i18n.changeLanguage(lang); // 更改i18n语言
    setLang(value);
    router.push(router.asPath, router.asPath, { locale: value });
  };

  const handleNetwork = (value:string) => {
    if (value === 'Calibration') {
      window.open('https://calibration.filscan.io/')
    } else if (value === 'Mainnet') {
      window.open('https://filscan.io/')
    }
  }

  const apiFlag = process?.env?.NET_WORK;
  // px-24
  return (
    <>
      <MobileView>
        <MHeader/>
      </MobileView>
      <BrowserView>
        <div className={`${show ? ' header-fade-in visible fixed top-0 ':'absolute top-0'} z-50 w-full h-[110px] main_bg_color` }>
          <div className='flex justify-between items-center text-xs w-full h-[45px] custom_header'>
            <ul className='flex gap-x-5 list-none'>
              {header_top.left.map((item) => {
                const { title, dataIndex, render } = item;
                const data = {...fil,...finalHeight}
                const value = data&&data[dataIndex];
                let renderDom = render && render(value, data);
                if (dataIndex === 'block_time') {
                  renderDom = <TimerHtml ns='home' text={ value} />
                }
                return (
                  <li key={dataIndex} className='flex gap-x-1'>
                    <span>{tr(title)}:</span>
                    <span>{renderDom || value}</span>
                  </li>
                );
              })}
            </ul>
            <div className='flex gap-x-2.5 items-center'>
              <Select
                ns=''
                wrapClassName='main_bg_color'
                className='!-inset-x-1/2	'
                value={apiFlag || 'Mainnet'}
                header={
                  <span className='flex items-center justify-center w-7 h-7 border  cursor-pointer rounded-[5px] main_bg_color border_color '>
                    {getSvgIcon('network')}
                  </span>
                }
                onChange={handleNetwork}
                options={networkOptions}
              />

              <Select
                ns=''
                wrapClassName='main_bg_color'
                className='!-inset-x-1/2	'
                header={
                  <span className='flex items-center justify-center w-7 h-7 border main_bg_color  border_color cursor-pointer rounded-[5px]'>
                    {tr(lang)}
                  </span>
                }
                value={lang}
                onChange={handleLangChange}
                options={langOptions}
              />

              <span className={ theme === 'dark'?'text-white cursor-pointer w-7 h-7 border border_color rounded-[5px]':'cursor-pointer'} onClick={() => {
                localStorage.setItem(
                  'theme',
                  theme === 'dark' ? 'light' : 'dark'
                );
                setTheme(theme === 'dark' ? 'light' : 'dark');
              }}>
                { getSvgIcon(theme === 'dark' ? 'sun' : 'moon')}
              </span>
              {/* <Image
                src={showTheme}
                width={28}
                height={28}
                alt='theme'
                className='cursor-pointer'
                key='moon'
                onClick={() => {
                  localStorage.setItem(
                    'theme',
                    theme === 'dark' ? 'light' : 'dark'
                  );
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                }}
              /> */}
              {/* <Link href='/account/login' as='/account/login' scroll={ false}>
                     <span className="flex items-center justify-center w-14 h-7 border border-border rounded-[5px] text-font">{ tr('login')}</span>
                </Link> */}
              <Account />
            </div>
          </div>
          <hr className='border_color'/>
          <Nav />
        </div>
      </BrowserView>

    </>
  );
};
