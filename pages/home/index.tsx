/** @format */

//import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import Banner from '@/components/banner';
import MobileBanner from '@/components/mobile/home/banner';
import MobileMeta from '@/components/mobile/home/meta';
import Meta from '@/src/home/meta';
import Gas from '@/src/statistics/Gas';
import Rank from '@/src/rank';
import Link from 'next/link';
import Image from 'next/image';
import { Translation } from '@/components/hooks/Translation';
import go from '@/assets/images/black_go.svg';
import ContractRank from '@/src/contract/rank';
import DefiList from '@/src/fevm/defi';
import Trend from '@/src/statistics/Trend';
import useObserver from '@/components/hooks/useObserver';
import { BrowserView, MobileView } from '@/components/device-detect';
import styles from './style.module.scss';
import Defi from '@/components/mobile/home/defi';

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

      <MobileView>
        <MobileBanner />
      </MobileView>
      <div className='main_bg_color'>
        <BrowserView>
          <Banner />
        </BrowserView>
        <BrowserView>
          <div className='main_contain !mt-[26px]'>
            <div className='flex justify-between h-[270px] gap-x-5 meta-gas'>
              <Meta />
              <div className='border card_shadow w-[403px] h-[270px] rounded-xl border_color gas-wrap'>
                <div className={`flex justify-between text-xs font-PingFang p-5`}>
                  {tr('base_gas')}
                  <Link href={`/statistics/gas/`}>
                    <Image
                      className='cursor-pointer'
                      src={go}
                      width={18}
                      height={18}
                      alt='go'
                    />
                  </Link>
                </div>
                <Gas className={'w-full !h-[210px]'} />
              </div>
            </div>
            <div className='flex justify-between mt-12 gap-x-5 h-[400px] box-column'>
              <Trend origin='home' className={'w-full !h-full'} />
              <Trend origin='home' className={'w-full !h-full'} />
            </div>
            <div className='mt-32' ref={ref}>
              <Rank origin={'home'} />
            </div>
          </div>

        </BrowserView>
      </div>

      <MobileView>
        <MobileContractRank/>
        <Defi/>
      </MobileView>
    </div>
  );
}

export default Home;
