/** @format */

import success from '@/assets/images/success.svg';
import { Translation } from '@/components/hooks/Translation';
import { Button } from 'antd';
import Image from 'next/image';

export default () => {
  const { tr } = Translation({ ns: 'account' });
  return (
    <div className='m-auto flex items-center flex-col pt-12 card_bg_color'>
      <Image src={success} width={80} height={80} alt='' />
      <span className='font-PingFang font-semibold text-lg mt-5'>
        {tr('welcome')}
      </span>
      <div className='mt-5 text_des text-xs flex flex-col gap-y-1 items-center'>
        <span>{tr('welcome_text1')}</span>
        <span>{tr('welcome_text2')}</span>
      </div>
      <div className='mt-5'>
        <Button>{tr('go_home')}</Button>
      </div>
    </div>
  );
};
