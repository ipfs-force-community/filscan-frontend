/** @format */

import { apiUrl } from '@/contents/apiUrl';
import { Translation } from '@/components/hooks/Translation';
import Segmented from '@/packages/segmented';
import SkeletonScreen from '@/packages/skeleton';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { getShowData } from '@/utils';
import { useEffect, useState } from 'react';

//统计指标

export default ({
  overView,
  accountId,
}: {
  overView: any;
  accountId?: string | string[];
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });

  const [interval, setInterval] = useState('24h');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  //   useColumnAlign('.overView', '.overView_item', 'last_item');

  useEffect(() => {
    if (accountId) {
      load();
    }
  }, [accountId]);

  const load = async (inter?: string) => {
    setLoading(true);
    const show_inter = inter || interval;
    const result: any = await fetchData(apiUrl.detail_Indicators, {
      account_id: accountId,
      filters: {
        interval: show_inter,
      },
    });
    setLoading(false);
    setData(result.miner_indicators || {});
  };

  const handleTabChange = (value: string) => {
    setInterval(value);
    load(value);
  };

  return (
    <div className='w-full'>
      <div className='w-full flex items-center mt-7 mb-5'>
        <span className='text-lg font-semibold mr-5'>{tr(overView.title)}</span>
        <Segmented
          data={overView.tabList}
          ns='detail'
          defaultValue={interval}
          isHash={false}
          onChange={handleTabChange}
        />
      </div>
      <ul className='card_shadow p-5 h-[170px] py-7 px-5 rounded-xl border border_color  gap-y-6 flex flex-wrap flex-col'>
        {overView?.list.map((item: any) => {
          const { render, dataIndex, style = {}, width, title } = item;
          const showData = getShowData(item, data);
          const value = render
            ? render(showData[dataIndex])
            : showData[dataIndex] || '--';
          return (
            <li key={dataIndex} style={{ width, ...style }} className='flex'>
              <span className='text-sm text_des w-20'>{tr(title)}</span>
              <span className='font-DINPro-Medium text-sm font-medium'>
                {loading ? <SkeletonScreen /> : value}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
