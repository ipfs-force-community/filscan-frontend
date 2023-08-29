/** @format */

import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import { navMenu } from '@/contents/nav';
import down from '@/assets/images/down.svg';
import { Translation } from '@/components/hooks/Translation';
import Link from 'next/link';
import Search from './Search';
import { useRouter } from 'next/router';
export default () => {
  const { tr } = Translation({ ns: 'nav' });
  const router = useRouter();

  const renderChild = (children: Array<any>, num: number) => {
    return (
      <ul
        key={num}
        className='hidden  group-hover:block absolute z-50 inset-y-full max-h-fit w-max list-none  border p-4 rounded-[5px] select_shadow  card_bg_color  border_color'>
        {children.map((item, index) => {
          return (
            <Link
              key={index}
              href={`${item.link}`}
              className='h-10 text_color font-normal flex items-center cursor-pointer rounded-[5px]  hover:text-primary hover:bg-bg_hover'>
              <span className='px-4'>{tr(item.key)}</span>
            </Link>
          );
        })}
      </ul>
    );
  };

  const isHome = router.asPath === '/home' || router.asPath === '/';

  return (
    <div className='flex items-center px-24 h-[60px] justify-between text-sm  font-medium '>
      <Link
        href={'/'}
        className='flex gap-x-2 items-center text_color cursor-pointer'>
        <Image src={logo} width={32} height={32} alt='logo' />
        <span className='font-Barlow font-bold text-xl '>Filscan</span>
      </Link>
      <div className='flex-1 ml-5 mr-10'>
        {!isHome && <Search className='!h-10 !max-w-lg	' />}
      </div>

      <div className='flex gap-x-8 h-full justify-between items-center'>
        {navMenu.map((nav, index) => {
          if (nav?.children) {
            return (
              <div
                key={index}
                className='group h-full flex cursor-pointer items-center relative hover:text-primary'>
                <span className='flex gap-x-1 '>
                  {tr(nav.key)}
                  <Image src={down} width={8} height={4} alt='down' />
                </span>
                {renderChild(nav.children, index)}
              </div>
            );
          }
          return (
            <Link
              href={`${nav.link}`}
              key={nav.key}
              className='cursor-pointer text_color  hover:text-primary'>
              {tr(nav.key)}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
