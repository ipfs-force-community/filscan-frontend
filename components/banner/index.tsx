/** @format */

import Search from '@/components/search';
import style from './index.module.scss';
import { search } from '@/contents/common';
import BannerIcon from '@/assets/images/banner_icon.png';
import Image from 'next/image';

export default () => {
  return (
    <div className={style.banner}>
      <div className={style.banner_bg}>
        <div className={style.banner_bg_bl} />
        <div className={`${style.banner_bg_circle1} animated-div`} />
        <div className={`${style.banner_bg_circle2} animated-div1`} />
      </div>

      <div className={style.banner_search}>
        <h3 className='clip_text text-[28px] py-2 font-Barlow font-bold'>
          Filecoin Blockchain Explorer
        </h3>
        <Search
          ns='common'
          placeholder={search.holder}
          onSearch={(value: string) => {}}
          origin='banner'
        />
        <span className='text-white flex items-center gap-x-2'>
          <Image src={BannerIcon} width={21} height={21} alt='' />
          <span>Check Spex website，Airdrop 1000FILs </span>
        </span>
      </div>

      <div className={`${style.banner_content}`}></div>
    </div>
  );
};
