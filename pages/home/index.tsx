/** @format */

//import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'

import Banner from '@/components/banner';
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
    <>
      <Banner />
      <div className='main_contain !mt-[26px]'>
        <div className='flex justify-between h-[270px] gap-x-5'>
          <Meta />
          <div className='border card_shadow w-[403px] h-[270px] rounded-xl border_color'>
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
        <div className='flex justify-between mt-12 gap-x-5 h-[400px]'>
          <Trend origin='home' className={'w-full !h-full'} />
          <Trend origin='home' className={'w-full !h-full'} />
        </div>
        <div className='mt-32' ref={ref}>
          <Rank origin={'home'} />
        </div>
        <div className='flex w-full mt-12 gap-x-5 h-[489px]  ' ref={ref1}>
          <div className='flex-1'>
            <div className={`flex justify-between items-center h-[30px]`}>
              <div className='font-PingFang font-semibold text-lg	'>
                {tr('contract_rank')}
              </div>
              <Link href={`/contract/rank`}>
                <Image
                  className='cursor-pointer'
                  src={go}
                  width={18}
                  height={18}
                  alt='go'
                />
              </Link>
            </div>
            <ContractRank origin='home' />
          </div>
          <div className='flex-1'>
            <div className={`flex justify-between items-center h-[30px]`}>
              <div className='font-PingFang font-semibold text-lg	'>
                {tr('defi_list')}
              </div>
              <Link href={`/contract/rank`}>
                <Image
                  className='cursor-pointer'
                  src={go}
                  width={18}
                  height={18}
                  alt='go'
                />
              </Link>
            </div>
            <DefiList origin='home' />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
