/** @format */

import { Translation } from '@/components/hooks/Translation';
import AuthorIcon from '@/assets/images/author.svg';
import DownIcon from '@/assets/images/down.svg';
import { account_manager } from '@/contents/account';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userStore from '@/store/modules/user';
import { observer } from 'mobx-react';

//已登录状态
export default observer(() => {
  const { tr } = Translation({ ns: 'account' });
  const { userInfo } = userStore;
  const {name,mail} = userInfo
  const router = useRouter();
  const showName = name || mail || '';

  if (!showName) {
    return (
      <Link href='/account/login' as='/account/login' scroll={false}>
        <span className='flex items-center justify-center h-[46px]  border border_color  main_bg_color primary_btn !rounded-none'>
          {tr('login')}
        </span>
      </Link>
    );
  }
  return (
    <div className='group relative text-sm'>
      <div className=' flex gap-x-2 items-center cursor-pointer'>
        <AuthorIcon width={32} height={32} className='rounded-full'/>
        <span>{showName?.length > 5? showName?.slice(0, 5) + '...' : showName}</span>
        <DownIcon width={8} height={4} />
      </div>
      <ul className='hidden group-hover:block absolute z-50 inset-y-full h-fit w-max list-none  border  p-4 rounded-[5px] select_shadow main_bg_color  border_color'>
        {account_manager.map((item, index) => {
          if (item.children && item.children.length > 0) {
            return null
          }
          if (item.key === 'logout') {
            return (
              <li
                key={index}
                onClick={() => {
                  //logout
                  localStorage.removeItem('token');
                  userStore.setUserInfo()
                  router.reload();
                }}
                className='h-10  text_color font-normal flex items-center cursor-pointer rounded-[5px]  hover:text-primary hover:bg-bg_hover'>
                <span className='flex items-center gap-x-2 px-4'>
                  {item.icon}
                  {tr(item.label)}
                </span>
              </li>
            );
          }
          return (
            <Link
              key={index}
              href={`/account/#${item.href}`}
              scroll={false}
              className='h-10  text_color font-normal flex items-center cursor-pointer rounded-[5px]  hover:text-primary hover:bg-bg_hover'>
              <span className='flex items-center gap-x-2 px-4'>
                {item.icon}
                {tr(item.label)}
              </span>
            </Link>
          );
        })}
      </ul>
    </div>
  );
});
