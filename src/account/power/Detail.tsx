/** @format */

import { Translation } from '@/components/hooks/Translation';
import Breadcrumb from '@/packages/breadcrumb';
import { useCallback, useMemo, useState } from 'react';
import { formatDateTime, getCalcTime } from '@/utils';
import ExportExcel from '@/packages/exportExcel';
import Table from '@/packages/Table';
import DateTime from '@/src/account/DateTIme';
import {
  account_expired,
  account_power,
  account_reward,
} from '@/contents/account';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';

/** @format */

export default ({
  miner,
  data,
  selectedKey
}: {
  miner?: string | number | null;
    data?: any;
  selectedKey:string
}) => {
  const { tr } = Translation({ ns: 'account' });

  const routerItems = useMemo(() => {
    if (miner && typeof miner === 'string') {
      return [
        {
          title: tr('overview_power'),
          path: '/account#power',
        },
        {
          title: <span>{miner}</span>,
          path: `/account#power?miner=${miner}`,
        },
      ];
    }
    return [];
  }, [miner]);

  const [date, setDate] = useState({
    startTime: formatDateTime(getCalcTime(6), 'YYYY-MM-DDTHH:mm:ssZ'),
    endTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ'
    ),
  });

  //proApi
  const { data: powerDataDetail, loading } = useAxiosData(proApi.getPower, {
    miner_id: miner,
    start_date: date.startTime,
    end_date: date.endTime,
  });

  const columns = useMemo(() => {
    return account_power.columns(tr,'detail').map((item) => {
      return { ...item, title: tr(item.title) } ;
    });
  }, [tr]);

  const showData = useMemo(() => {
    const newData = powerDataDetail?.reward_detail_list || [];
    return newData || [];
  }, [powerDataDetail]);

  return (
    <>
      {routerItems && routerItems.length > 0 && (
        <Breadcrumb items={routerItems} />
      )}
      <div className='flex justify-between items-center mt-10'>
        <div className='flex  flex-col'>
          <span className='w-full text-lg font-semibold font-PingFang	'>
            {miner}
          </span>
          <span className='text-xs text_des'>
            <span>{tr('last_time')}</span>
            <span className='ml-2'>
              {formatDateTime(powerDataDetail?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <DateTime
            showEnd={true}
            defaultValue={[date.startTime, date.endTime]}
            onChange={(start, end) => {
              setDate({
                startTime: start,
                endTime: end,
              });
            }}
          />
          <ExportExcel columns={columns} data={showData} fileName={tr(selectedKey)+miner?String(miner):""}/>
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table data={showData} columns={columns} loading={loading} />
      </div>
    </>
  );
};