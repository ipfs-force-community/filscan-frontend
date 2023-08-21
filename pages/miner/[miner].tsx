/** @format */

import { apiUrl } from '@/apiUrl';
import fetchData from '@/store/server';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AccountBalance from '@/src/detail/accountBalance';
import Power from '@/src/detail/Power';
import OverView from '@/src/detail/overView';
import { miner_overview } from '@/contents/detail';

export default () => {
  const router = useRouter();
  const { miner } = router.query;
  const [data, setData] = useState<any>({});

  useEffect(() => {
    if (miner) {
      loadMinerData();
    }
  }, [miner]);

  const loadMinerData = async () => {
    const result: any = await fetchData(apiUrl.detail_account, {
      account_id: miner,
    });
    console.log('======', result);
    setData(result?.account_info?.account_miner || {});
  };
  return (
    <div className='main_contain'>
      <div className='flex w-full card_shadow rounded-xl'>
        <AccountBalance data={data} />
        <Power data={data?.account_indicator || {}} />
      </div>
      <div>
        <OverView overView={miner_overview} accountId={miner} />
      </div>
    </div>
  );
};
