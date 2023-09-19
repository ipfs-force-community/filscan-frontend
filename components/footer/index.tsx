/** @format */

import logo from '@/assets/images/logo.svg'
import Image from 'next/image'
import { Translation } from '../hooks/Translation';
import { getSvgIcon } from '@/svgsIcon';
import { BrowserView, MobileView } from '../device-detect';
import MFooter from '@/components/mobile/footer'

const footerLinks = [
  {
    label: "twitter",
    type:'_blank',
    link:'https://twitter.com/FilscanOfficial'
  },
  {
    label: "telegram",
    type:'_blank',
    link:'https://t.me/+bI9fUEkmPjMzYjg1'
  },
  {
    label: "outlook",
    type:'_self',
    link:'mailto:filscanteam@outlook.com'
  }
]

export default () => {
  const { tr } = Translation({ ns: 'common' });
  return (
    <>
      <MobileView>
        <MFooter/>
      </MobileView>
      <BrowserView>
        <div className='w-screen h-[140px] bg-footerColor'>
          <div className='custom_footer flex justify-between flex-col bg-footerColor'>
            <div className='!text-white flex items-center'>
              <Image src={logo} width={30} height={30} alt='logo' />
              <span className='font-Barlow font-medium text-xl ml-2'>Filscan.io </span>
            </div>
            <div className='flex justify-between text-border_des'>
              <div className='flex flex-col gap-y-1 text-xs'>
                <span>
                  { tr('footer_des1')}
                </span>
                <span>
                  { tr('footer_des2')}
                </span>
              </div>
              <div>
                <ul className='flex text-white gap-x-5'>
                  {footerLinks.map(linkItem => {
                    return <a key={linkItem.label}
                      className='w-5 h-5 bg-white rounded'
                      target={linkItem.type}
                      style={{ color: '#fff' }} href={linkItem.link}>{
                        getSvgIcon(linkItem.label)}</a>
                  })}
                </ul>
                <div className='mt-5'>
                  filscanteam@outlook.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </BrowserView>
    </>
  );
};
