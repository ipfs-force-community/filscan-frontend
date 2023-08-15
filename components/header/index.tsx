/** @format */

import { header_top, langOptions } from '@/contents/common';
import { Layout } from 'antd';
import { Translation } from '@/components/hooks/Translation';
import network from '@/assets/images/network.svg';
import moon from '@/assets/images/moon.svg';
import light from '@/assets/images/sun.svg';
import Account from './Account';
import Image from 'next/image';
import Link from 'next/link';
import Nav from './Nav';
import { useFilscanStore } from '@/store/FilscanStore';
import { useMemo } from 'react';
import Select from '@/packages/select';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import CompoundedSpace from 'antd/es/space';

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
    router.push(router.asPath, router.asPath, { locale: value });
    setLang(value);
  };

  return (
    <Header className='custom_header !h-[106px] !p-0 '>
      <div className='flex justify-between items-center h-[45px] text-xs !text-font font-PingFang font-medium border-b border-border_des px-24'>
        <ul className='flex gap-x-5 list-none '>
          {header_top.left.map((item) => {
            const { title, dataIndex, render } = item;
            const value = data[dataIndex];
            const renderDom = render && render(value, data);
            return (
              <li key={dataIndex} className='flex gap-x-1 text-font'>
                <span className='text-font'>{tr(title)}:</span>
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
              <span className='flex items-center justify-center w-7 h-7 border border-border cursor-pointer rounded-[5px]'>
                {tr(lang)}
              </span>
            }
            onChange={handleLangChange}
            options={langOptions}
          />

          <Image
            src={showTheme}
            width={28}
            height={28}
            alt='theme'
            className='cursor-pointer'
            key='moon'
            onClick={() => {
              console.log('---e', theme);
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
          />
          {/* <Link href='/account/login' as='/account/login' scroll={ false}>
                     <span className="flex items-center justify-center w-14 h-7 border border-border rounded-[5px] text-font">{ tr('login')}</span>
                </Link> */}
          <Account />
        </div>
      </div>
      <Nav />
    </Header>
  );
};
