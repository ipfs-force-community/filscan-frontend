/** @format */

import { apiUrl } from '@/apiUrl';
import fetchData from '@/store/server';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import AccountBalance from '@/src/detail/accountBalance';
import Power from '@/src/detail/Power';

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
    <div className='main_contain '>
      <div className='flex card_shadow rounded-xl'>
        <AccountBalance data={data} />
        <Power data={data?.account_indicator || {}} />
      </div>
    </div>
  );
};
