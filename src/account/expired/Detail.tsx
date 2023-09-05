/** @format */

import { Translation } from '@/components/hooks/Translation';
import Breadcrumb from '@/packages/breadcrumb';
import { useEffect, useMemo, useState } from 'react';
import { formatDateTime } from '@/utils';
import ExportExcel from '@/packages/exportExcel';
import Table from '@/packages/Table';
import { account_expired } from '@/contents/account';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';

/** @format */

export default ({
  miner,
  selectedKey
}: {
  miner?: string | number | null;
  selectedKey:string,
}) => {
  const { tr } = Translation({ ns: 'account' });
  const {axiosData } = useAxiosData()
  const routerItems = useMemo(() => {
    if (miner && typeof miner === 'string') {
      return [
        {
          title: tr('overview_expired'),
          path: '/account#expired',
        },
        {
          title: <span>{miner}</span>,
          path: `/account#expired?miner=${miner}`,
        },
      ];
    }
    return [];
  }, [miner]);
  const [data, setData] = useState({
    epoch_time: '',
    dataSource:[]
  })

  const columns = useMemo(() => {
    return account_expired.columns(tr,'detail').map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  useEffect(() => {
    if (miner) {
      load()
    }

  }, [miner])

  const load = async() => {
    const result:any= await axiosData(proApi.getSector, {
      miner_id: miner,
    })
    setData({
      dataSource: result?.sector_detail_day || [],
      epoch_time:result?.epoch_time ||""
    })
  }

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
              {formatDateTime(data?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <ExportExcel columns={columns} data={data?.dataSource} fileName={tr(selectedKey)+miner?String(miner):""}/>
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table data={data?.dataSource} columns={columns} loading={false} />
      </div>
    </>
  );
};
