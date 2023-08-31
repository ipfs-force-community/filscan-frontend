/** @format */

import { Layout } from 'antd';
import logo from '@/assets/images/logo.svg'
import Image from 'next/image'
import { Translation } from '../hooks/Translation';
import { getSvgIcon } from '@/svgsIcon';

import { BrowserView, MobileView } from '../device-detect';
import MFooter from '@/components/mobile/footer'
const { Footer, Header } = Layout;

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
    link:'mailto:filscan@ipfsforce.com'
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
        <Footer className='custom_footer !bg-black h-[140px] flex justify-between flex-col'>
          <span className='!text-white flex items-center'>
            <Image src={logo} width={45} height={45} alt='logo' />
            <span className='font-Barlow font-medium text-xl ml-2'>Filscan.io </span>
          </span>
          <div className='flex justify-between text-border_des'>
            <div className='flex flex-col gap-y-1 text-xs'>
              <span>
                { tr('footer_des1')}
              </span>
              <div className='flex justify-between text-border_des'>
                <div className='flex flex-col gap-y-1 text-xs'>
                  <span>
                    { tr('footer_des1')}
                  </span>
                  <span>
                    { tr('footer_des2')}
                  </span>
                </div>
                <ul className='flex text-white gap-x-5'>
                  {footerLinks.map(linkItem => {
                    return <a key={linkItem.label}
                      className='w-5 h-5 bg-white rounded'
                      target={linkItem.type}
                      style={{ color: '#fff' }} href={linkItem.link}>{
                        getSvgIcon(linkItem.label)}</a>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </Footer>
      </BrowserView>
    </>

  );
};
