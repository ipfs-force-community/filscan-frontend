/** @format */
/** @format */

import { apiUrl } from '@/contents/apiUrl';
import fetchData from '@/store/server';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import AccountBalance from '@/src/detail/accountBalance';
import Power from '@/src/detail/Power';
import OverView from '@/src/detail/overView';
import { minerTabs, miner_overview, owner_detail } from '@/contents/detail';
import AccountChange from '@/src/detail/accountChange';
import PowerChange from '@/src/detail/powerChange';
import List from '@/src/detail/list';
import { Translation } from '@/components/hooks/Translation';
import { getShowData } from '@/utils';

export default () => {
  const router = useRouter();
  const { owner } = router.query;
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const { tr } = Translation({ ns: 'detail' });

  useEffect(() => {
    if (owner) {
      loadData();
    }
  }, [owner]);

  const loadData = async () => {
    setLoading(true);
    const result: any = await fetchData(apiUrl.detail_owner, {
      owner_id: owner,
    });
    setLoading(false);
    setData(result?.account_owner || {});
  };

  return (
    <div className='main_contain'>
      <div className={'mb-2.5 DINPro-Medium font-medium text-lg flex items-center'}>
        <span>{ tr('owner_title')}</span>
      </div>
      <div className='w-full card_shadow rounded-xl'>
        <div className='flex w-full border-b border_color'>
          <AccountBalance
            data={data?.account_indicator || {}}
            loading={loading}
          />
          <Power data={data?.account_indicator || {}} />
        </div>

        <ul className='py-8 px-7  flex gap-y-6 flex-col'>
          {owner_detail.list.map((item) => {
            const { title, render, dataIndex } = item;
            const value = data[dataIndex];
            const renderDom = render ? render(value, data) : value;
            return (
              <li key={dataIndex} className='flex w-full items-baseline'>
                <div className='text_des text-sm w-28'>{tr(title)}</div>
                <span className='flex-1'>{renderDom}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <OverView overView={miner_overview} accountId={owner} />

      <div className='flex mt-6 gap-x-5'>
        <AccountChange accountId={owner} interval={'30d'} />
        <PowerChange accountId={owner} />
      </div>
    </div>
  );
};
