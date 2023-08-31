/** @format */

import success from '@/assets/images/success.svg';
import { Translation } from '@/components/hooks/Translation';
import { proApi } from '@/contents/apiUrl';
import { UserInfo } from '@/store/UserStore';
import useAxiosData from '@/store/useAxiosData';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default ({ type = '',text ,btnText}: { type?: string,btnText:string,text:string }) => {
  const { tr } = Translation({ ns: 'account' });
  const router = useRouter();

  const handleClick = () => {
    router.push('/home');
  };

  return (
    <div className='m-auto flex items-center flex-col pt-12 mt-5 pb-5 px-5 card_bg_color rounded-[5px]'>
      <Image src={success} width={80} height={80} alt='' />
      <span className='font-PingFang font-semibold text-lg mt-5'>
        {tr('welcome')}
      </span>
      <div className='mt-5 text_des text-xs flex flex-col gap-y-1 items-center'>
        {text ? <span>
          <span>{tr(text)}</span>
        </span> :
          <>
            <span>{tr('welcome_text1')}</span>
            <span>{tr('welcome_text2')}</span>
          </>
        }
      </div>
      <div className='mt-5 flex items-center gap-x-5'>
        {type !== 'login' && (
          <Link
            href={'/account/login'}
            className='border border_color rounded-[5px] px-4 py-2'>
            {tr('go_login')}
          </Link>
        )}
        <div
          onClick={handleClick}
          className='border cursor-pointer primary_btn px-4 py-2'>
          {tr(btnText)}
        </div>
      </div>
    </div>
  );
};
