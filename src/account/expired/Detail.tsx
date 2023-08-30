/** @format */

import { Translation } from '@/components/hooks/Translation';
import Breadcrumb from '@/packages/breadcrumb';
import { useMemo } from 'react';
import { formatDateTime } from '@/utils';
import ExportExcel from '@/packages/exportExcel';
import Table from '@/packages/Table';
import { account_expired } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import useAxiosData from '@/store/useAxiosData';

/** @format */

export default ({
  miner
}: {
  miner?: string | number | null;
}) => {
  const { tr } = Translation({ ns: 'account' });

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

  const columns = useMemo(() => {
    return account_expired.columns(tr,'detail').map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  const { data: sectorData, loading } = useAxiosData(proApi.getSector, {
    miner_id: miner,

  });

  const showData =useMemo(() => {
    if (sectorData) {
      return sectorData.sector_detail_month
    }
    return [];
  },[])

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
              {formatDateTime(sectorData?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <ExportExcel columns={columns} data={showData} />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table data={showData} columns={columns} loading={false} />
      </div>
    </>
  );
};
