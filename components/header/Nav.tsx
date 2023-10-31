/** @format */

import Image from 'next/image';
import { navMenu } from '@/contents/nav';
import { Translation } from '@/components/hooks/Translation';
import Link from 'next/link';
import Search from './Search';
import { useRouter } from 'next/router';
import { getSvgIcon } from '@/svgsIcon';

export default () => {
  const { tr } = Translation({ ns: 'nav' });
  const router = useRouter();

  const renderChild = (children: Array<any>, num: number) => {
    return (
      <ul
        key={num}
        className='hidden group-hover:block h-fit absolute z-50 inset-y-full w-max list-none  border px-4 -ml-8 rounded-[5px] select_shadow  main_bg_color  border_color'>
        {children.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${item.link}`}
              className='relative h-10 text_color font-normal flex items-center cursor-pointer rounded-[5px]  hover:text-primary hover:bg-bg_hover first:mt-4 last:mb-4'>
              <span className='px-4'>{tr(item.key)}</span>
              {item.sufIcon && <span className='absolute -top-[2px] -right-2'>{getSvgIcon(item.sufIcon)}</span>}
            </Link>
          );
        })}
      </ul>
    );
  };

  const isHome = router.asPath === '/home' || router.asPath === '/';

  return (
    <div className='flex items-center m-auto h-[60px] justify-between text-sm  font-medium custom_header'>
      <Link
        href={'/'}
        className='flex gap-x-2 items-center text_color cursor-pointer mt-1' >
        <Image src={'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/logo.png'} width={40} height={40} alt='logo' />
        {/* {getSvgIcon('logoText')} */}
        <Image src={'https://filscan-v2.oss-cn-hongkong.aliyuncs.com/fvm_manage/images/logoText.png'} alt='logo' width={95} height={16}></Image>
        {/* <span className='font-Barlow font-bold text-xl '>Filscan</span> */}
      </Link>
      <div className='flex-1 ml-5 mr-10'>
        {!isHome && <Search className='!h-10 !max-w-lg	' />}
      </div>

      <div className='flex relative gap-x-9 h-full justify-between items-center'>
        {navMenu.map((nav, index) => {
          if (nav?.children) {
            return (
              <div
                key={index}
                className='group h-full relative  gap-x-1 flex cursor-pointer items-center hover:text-primary'>

                {tr(nav.key)}
                <span>{getSvgIcon('downIcon')}</span>
                {nav.sufIcon && <span className='absolute top-[13px] -right-[12px]'>{getSvgIcon(nav.sufIcon)}</span>}
                {renderChild(nav.children, index)}
              </div>
            );
          }
          if (nav.outLink) {
            return <div className='relative' key={nav.key} onClick={() => {
              window?.open(nav.outLink)
            } }>
              <li
                className='cursor-pointer text_color list-none  hover:text-primary'>
                {tr(nav.key)}
              </li>
              {nav.sufIcon && <span className='absolute -top-[8px] -right-6'>{getSvgIcon(nav.sufIcon)}</span>}
            </div>
          }
          return (
            <div className='relative' key={ nav.key}>
              <Link
                href={`${nav.link|| nav.outLink}`}
                className='cursor-pointer text_color  hover:text-primary'>
                {tr(nav.key)}
              </Link>
              {nav.sufIcon && <span className='absolute -top-[8px] -right-6'>{getSvgIcon(nav.sufIcon)}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
