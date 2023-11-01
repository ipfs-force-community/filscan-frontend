/** @format */

import { Translation } from '@/components/hooks/Translation';
import Breadcrumb from '@/packages/breadcrumb';
import { useEffect, useMemo, useState } from 'react';
import { formatDateTime, getCalcTime } from '@/utils';
import ExportExcel from '@/packages/exportExcel';
import Table from '@/packages/Table';
import DateTime from '@/src/account/DateTIme';
import {account_power}from '@/contents/account';
import Tooltip from '@/packages/tooltip';
import manageStore from '@/store/modules/account/manage';
import { observer } from 'mobx-react';

/** @format */

export default observer(({
  miner,
  selectedKey
}: {
  miner?: string | number | null;
  selectedKey:string
}) => {
  const { tr } = Translation({ ns: 'account' });
  const { powerDetailData, powerDetailLoading } = manageStore;

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

  useEffect(() => {
    if (miner) {
      load();
    }
  },[miner])

  const load = ( time?: Record<string, string>) => {
    const newDate = time || date;
    if (miner) {
      const payload = {
        miner_id: miner,
        end_date: newDate.endTime || newDate.startTime,
        start_date: newDate.startTime,
      }
      manageStore.getPowerDetailData(payload)
    }
  }

  const columns = useMemo(() => {
    return account_power.columns(tr,'detail').map((item) => {
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
              {formatDateTime(powerDetailData?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <DateTime
            showEnd={true}
            defaultValue={[date.startTime, date.endTime]}
            onChange={(start, end) => {
              load({
                startTime: start,
                endTime: end,
              })
              setDate({
                startTime: start,
                endTime: end,
              });
            }}
          />
          <ExportExcel columns={columns} data={powerDetailData?.power_detail_list || []} fileName={tr(selectedKey)+miner?String(miner):""}/>
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table data={powerDetailData?.power_detail_list || []} columns={columns} loading={powerDetailLoading} />
      </div>
    </>
  );
});
