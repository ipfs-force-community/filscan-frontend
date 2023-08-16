/** @format */

import Search from '@/components/search';
import style from './index.module.scss';
import { search } from '@/contents/common';

export default () => {
  return (
    <div className={style.banner}>
      <div className={style.banner_bg}>
        <div className={style.banner_bg_bl} />
        <div className={`${style.banner_bg_circle1} animated-div`} />
        <div className={`${style.banner_bg_circle2} animated-div1`} />
      </div>

      <div className={style.banner_search}>
        <h3 className='clip_text text-[28px] font-Barlow font-bold	'>
          Filecoin Blockchain
        </h3>
        <Search
          ns='common'
          placeholder={search.holder}
          onSearch={(value: string) => {}}
          className='!w-[500px] !text-white'
          origin='banner'
        />
      </div>

      <div className={`${style.banner_content}`}></div>
    </div>
  );
};
