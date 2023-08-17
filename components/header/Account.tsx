/** @format */

import { Translation } from '@/components/hooks/Translation';
import author from '@/assets/images/author.svg';
import down from '@/assets/images/down.svg';
import Image from 'next/image';
import { account_manager } from '@/contents/account';
import Link from 'next/link';

//已登录状态
export default () => {
  const { tr } = Translation({ ns: 'account' });
  const name = 'zixian.kunyaokeji@com';
  return (
    <div className='group relative text-sm'>
      <div className=' flex gap-x-2 items-center cursor-pointer'>
        <Image
          src={author}
          width={32}
          height={32}
          className='rounded-full'
          alt=''
        />
        <span>{name?.slice(0, 5) + '...'}</span>
        <Image src={down} width={8} height={4} alt='down' />
      </div>
      <ul className='hidden group-hover:block absolute z-50 inset-y-full max-h-fit w-max list-none  border  p-4 rounded-[5px] select_shadow card_bg_color  border_color'>
        {account_manager.map((item, index) => {
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
