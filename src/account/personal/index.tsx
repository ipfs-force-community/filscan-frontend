/** @format */

import { Translation } from '@/components/hooks/Translation';
import { UserInfo } from '@/store/UserStore';
import Image from 'next/image';
import logo from '@/assets/images/logo.svg';
import user from '@/assets/images/user.svg';
import { formatDateTime } from '@/utils';

export default () => {
  const { tr } = Translation({ ns: 'account' });
  const userInfo = UserInfo();

  console.log('====45', userInfo);
  return (
    <div className=''>
      <p className='font-semibold text-lg	 font-PingFang'>{tr('personal')}</p>
      <div className='card_shadow mt-8 p-5 border border_color rounded-xl'>
        <div className='flex justify-between'>
          <div className='flex gap-x-2 items-center'>
            <Image src={logo} alt={'author'} width={60} height={60} />
            <div className='flex flex-col justify-start '>
              <span className='font-PingFang font-semibold text-xl '>
                {userInfo.name}
              </span>
              <span className='text_des text-xs'>{userInfo.mail}</span>
            </div>
          </div>
          <div className='flex flex-col items-end'>
            <span className='des_bg_color flex gap-x-2 px-[6px] w-fit py-1 rounded-[5px]'>
              <Image src={user} width={20} height={20} alt='' />
              <span>{tr('default_user')}</span>
            </span>
            <span className='mt-2 text_des text-xs '>
              <span className='mr-2'>{tr('last_login')}:</span>
              {formatDateTime(userInfo.last_login)}
            </span>
          </div>
        </div>
      </div>
      <div className='mt-5 card_shadow p-5 border border_color rounded-xl'>
        <p className='font-semibold text-lg	 font-PingFang'>
          {tr('personal_setting')}
        </p>
      </div>
    </div>
  );
};
