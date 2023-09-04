/** @format */

import { header_top, langOptions } from '@/contents/common';
import { Layout } from 'antd';
import { Translation } from '@/components/hooks/Translation';
import network from '@/assets/images/network.svg';
import moon from '@/assets/images/moon.svg';
import light from '@/assets/images/sun.svg';
import Account from './Account';
import Image from 'next/image';
import Nav from './Nav';
import { useFilscanStore } from '@/store/FilscanStore';
import { useMemo } from 'react';
import Select from '@/packages/select';
import { useRouter } from 'next/router';
import { getSvgIcon } from '@/svgsIcon';
import i18n from '@/i18n';
import Search from './Search';
import { BrowserView, MobileView } from '../device-detect';
import MHeader from '@/components/mobile/header/index'

const { Header } = Layout;
const data: any = {
  fil: '42.35',
  last_time: '3分11秒',
  base_fee: '0.089 FIL',
  last_height: '234562',
};

export default () => {
  const { tr } = Translation({ ns: 'common' });
  const { theme, lang, setTheme, setLang } = useFilscanStore();
  const router = useRouter();

  const showTheme = useMemo(() => {
    if (theme === 'dark') {
      return light;
    }
    return moon;
  }, [theme]);

  const handleLangChange = (value: string) => {
    //切换语言
    setLang(value);
    localStorage.setItem('lang', value);
    router.push(router.asPath, router.asPath, { locale: value });
    i18n.changeLanguage(lang); // 更改i18n语言
  };

  // px-24
  return (
    <>
      <div className='w-full h-[110px] main_bg_color'>
        <div className='flex justify-between items-center text-xs w-full h-[45px] custom_header'>
          <ul className='flex gap-x-5 list-none'>
            {header_top?.left.map((item) => {
              const { title, dataIndex, render } = item;
              const value = data[dataIndex];
              const renderDom = render && render(value, data);
              return (
                <li key={dataIndex} className='flex gap-x-1'>
                  <span>{tr(title)}:</span>
                  <span>{renderDom || value}</span>
                </li>
              );
            })}
          </ul>
          <div className='flex gap-x-2.5 items-center'>
            <Image
              src={network}
              width={28}
              height={28}
              alt='network'
              key='network'
            />
            <Select
              ns=''
              wrapClassName='!bg-bgColor'
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
            <span className='flex items-center justify-center w-7 h-7 border  cursor-pointer rounded-[5px] main_bg_color  border_color '>
              {getSvgIcon('network')}
            </span>
            <Image
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
            />
            {/* <Link href='/account/login' as='/account/login' scroll={ false}>
                     <span className="flex items-center justify-center w-14 h-7 border border-border rounded-[5px] text-font">{ tr('login')}</span>
                </Link> */}
            <Account />
          </div>
        </div>
        <hr className='border_color'/>
        <Nav />
      </div>

    </>
  );
};
