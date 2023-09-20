/** @format */

import style from './index.module.scss';
import Search from '../header/Search';
import Banner from '@/src/home/Banner';

export default () => {

  return (
    <div className={style.banner}>
      <div className={style.banner_bg}>
        <div className={style.banner_bg_bl} />
        <div className='banner-contain !h-[350px] relative'>
          <div className={`${style.banner_bg_circle1} animated-div`} />
          <div className={`${style.banner_bg_circle2} animated-div1`} />
          <div className={style.banner_search}>
            <h3 className='clip_text text-[28px] py-2 font-Barlow font-bold'>
            Filecoin Blockchain Explorer
            </h3>
            <Search origin='banner' />
            {/* <span className='text-white flex items-center gap-x-2'>
              <Image src={BannerIcon} width={21} height={21} alt='' />
              <span>Check Spex website，Airdrop 1000FILs </span>
            </span> */}
          </div>

          <div className={`${style.banner_content}`}>
            <Banner />
          </div>
        </div>
      </div>

    </div>
  );
};
