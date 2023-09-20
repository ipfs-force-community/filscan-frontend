/** @format */

//import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Banner from '@/components/banner';
import MobileBanner from '@/components/mobile/home/banner';
import Meta from '@/src/home/meta';
import Gas from '@/src/statistics/Gas';
import Rank from '@/src/rank';
import Link from 'next/link';
import { Translation } from '@/components/hooks/Translation';
import GoIcon from '@/assets/images/black_go.svg';
import GoMobileIcon from '@/assets/images/icon-right-white.svg';
import ContractRank from '@/src/contract/rank';
import DefiList from '@/src/fevm/defi';
import Trend from '@/src/statistics/Trend';
import useObserver from '@/components/hooks/useObserver';
import { BrowserView, MobileView } from '@/components/device-detect';
import styles from './style.module.scss';
import Defi from '@/components/mobile/home/defi';
import MobileContractRank from '@/components/mobile/home/contractRank'
import MobileRank from '@/components/mobile/home/rank'
import Search from '@/components/mobile/search';
import classNames from 'classnames';
import ContractTrend from '@/src/statistics/ContractTrend';
//import fetchData from '@/store/server';

// type HomeProps = {
//   home_meta: any
// }

// export const getServerSideProps = async () => {
//   const home_meta = await fetchData(apiUrl.home_meta);
//   console.log('---3',home_meta)
//    return { props: { home_meta } }

// }

function Home(props: any) {
  const { tr } = Translation({ ns: 'home' });
  const ref = useObserver();
  const ref1 = useObserver();

  return (
    <div className={styles['home-page']}>
      <div >
        <MobileView>
          <MobileBanner />
        </MobileView>
        <BrowserView>
          <Banner />
        </BrowserView>
        <div className='main_contain !mt-[26px]'>
          <div className='flex justify-between h-[270px] gap-x-5 meta-gas'>
            <Meta />
            <div className='border card_shadow w-[403px] h-[270px] rounded-xl border_color gas-wrap'>
              <BrowserView>
                <div className={`flex justify-between text-xs font-PingFang p-5`}>
                  {tr('base_gas')}
                  <Link href={`/statistics/gas/`}>
                    <GoIcon
                      className='cursor-pointer'
                      width={18}
                      height={18}
                    />
                  </Link>
                </div>
              </BrowserView>

              <MobileView>
                <div className={styles['chart-title']}>
                  <div className={styles.label}>{tr('base_gas')}</div>
                  <Link href={`/statistics/gas/`}>
                    <GoMobileIcon
                      className='cursor-pointer'
                      width={28}
                      height={28}
                    />
                  </Link>
                </div>
              </MobileView>
              <Gas className={'w-full !h-[210px]'} />
            </div>
          </div>
          <div className='flex justify-between mt-12 gap-x-5 h-[400px] box-column'>
            <Trend origin='home' className={'flex-1 w-full !h-full'} />
            <ContractTrend origin='home' className={'flex-1 w-full !h-full'}/>
          </div>
          <BrowserView>
            <div className='mt-32' ref={ref}>
              <Rank origin={'home'} />
            </div>
            <div className='flex gap-x-5 mt-12' ref={ref1}>
              <div className='w-1/2'>
                <ContractRank origin='home'/>
              </div>
              <div className='w-1/2'>
                <div className={`flex justify-between items-center h-[30px] px-2.5`}>
                  <div className='font-PingFang font-semibold text-lg'>
                    {tr('defi_list')}
                  </div>
                  <Link href={`/contract/rank`}>
                    <GoIcon
                      className='cursor-pointer'
                      width={18}
                      height={18}
                    />
                  </Link>
                </div>
                <DefiList origin='home' />
              </div>
            </div>
          </BrowserView>
        </div>
      </div>
      <MobileView>
        <div className={classNames('px-[12px]')}>
          <MobileRank/>
          <MobileContractRank/>
          <Defi/>
        </div>
      </MobileView>
    </div>
  );
}

export default Home;
