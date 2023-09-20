/** @format */

import { Translation } from '@/components/hooks/Translation';
import AuthorIcon from '@/assets/images/author.svg';
import DownIcon from '@/assets/images/down.svg';
import { account_manager } from '@/contents/account';
import Link from 'next/link';
import { UserInfo } from '@/store/UserStore';
import { useRouter } from 'next/router';

//已登录状态
export default () => {
  const { tr } = Translation({ ns: 'account' });
  const userInfo = UserInfo();
  const router = useRouter();
  const name = userInfo?.name || userInfo?.mail || '';
  if (!name) {
    return (
      <Link href='/account/login' as='/account/login' scroll={false}>
        <span className='flex items-center justify-center !w-14 h-7 border border_color main_bg_color  rounded-[5px] primary_btn '>
          {tr('login')}
        </span>
      </Link>
    );
  }
  return (
    <div className='group relative text-sm'>
      <div className=' flex gap-x-2 items-center cursor-pointer'>
        <AuthorIcon width={32} height={32} className='rounded-full'/>
        <span>{name?.length > 5? name?.slice(0, 5) + '...' : name}</span>
        <DownIcon width={8} height={4} />
      </div>
      <ul className='hidden group-hover:block absolute z-50 inset-y-full h-fit w-max list-none  border  p-4 rounded-[5px] select_shadow main_bg_color  border_color'>
        {account_manager.map((item, index) => {
          if (item.key === 'logout') {
            return (
              <li
                key={index}
                onClick={() => {
                  //logout
                  localStorage.removeItem('token');
                  //userInfo.setUserInfo(null);
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
};
