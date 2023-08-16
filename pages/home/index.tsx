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

  return (
    <>
      <Banner />
      <div className='main_contain'>
        <div className='flex justify-between'>
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
        <div className='mt-16 '>
          <Rank origin={'home'} />
        </div>
        <div className='flex mt-12 gap-x-5 h-[489px] '>
          <div className=''>
            <div className={`flex justify-between `}>
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
          <div className=''>
            <div className={`flex justify-between `}>
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
