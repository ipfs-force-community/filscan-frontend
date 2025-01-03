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
  account_gas,
  account_reward,
} from '@/contents/account';
import useAxiosData from '@/store/useAxiosData';
import { proApi } from '@/contents/apiUrl';
import Tooltip from '@/packages/tooltip';

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
          title: tr('overview_gas'),
          path: '/account#gas',
        },
        {
          title: <span>{miner}</span>,
          path: `/account#gas?miner=${miner}`,
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

  //proApi.getReward
  const { data: gasData, loading } = useAxiosData(proApi.getGas, {
    miner_id: miner,
    start_date: date.startTime,
    end_date: date.endTime,
  });

  const columns = useMemo(() => {
    return account_gas.columns(tr,'detail').map((item) => {
      if (item.titleTip) {
        item.excelTitle= item.dataIndex === 'sector_count_change'? `${tr('raw_power')}/${tr('sector_power_count')}`:tr(item.title),
        item.title = <span className='flex items-center gap-x-1'>
          {tr(item.title)}
          <Tooltip context={tr(item.titleTip)} />
        </span>
      } else {
        item.title= tr(item.title)
      }
      return { ...item };
    });
  }, [tr]);

  const showData = useMemo(() => {
    const newData = gasData?.gas_cost_detail_list || [];
    return newData || [];
  }, [gasData]);

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
              {formatDateTime(gasData?.epoch_time, 'YYYY/MM/DD HH:mm')}
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
          <ExportExcel columns={columns} data={showData} fileName={tr(selectedKey)+miner?`(${miner})`:""} />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table data={showData} columns={columns} loading={loading} />
      </div>
    </>
  );
};
