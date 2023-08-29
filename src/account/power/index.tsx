/** @format */

import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useMemo, useState } from 'react';
import { account_power } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';
import useAxiosData from '@/store/useAxiosData';
import DateTime from '@/src/account/DateTIme';
import { formatDateTime } from '@/utils';
import { useHash } from '@/components/hooks/useHash';
import Detail from './Detail';

export default ({
  selectedKey,
  groups,
}: {
  selectedKey: string;
  groups: Array<any>;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const { hashParams } = useHash();
  const [active, setActive] = useState<string | number>(0);
  const [date, setDate] = useState({
    startTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ'
    ),
    endTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ'
    ),
  });

  const columns = useMemo(() => {
    return account_power.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  //proApi
  const { data: powerData, loading } = useAxiosData(proApi.getPower, {
    group_id: active ? Number(active) : 0,
    start_date: date.startTime,
    end_date: date.endTime || date.startTime,
  });

  const data = useMemo(() => {
    return powerData?.power_detail_list || [];
  }, [powerData]);

  const newGroups = useMemo(() => {
    return groups;
  }, [groups]);

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} data={powerData} />;
  }

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex  flex-col'>
          <span className='w-full text-lg font-semibold font-PingFang	'>
            {tr(selectedKey)}
          </span>
          <span className='text-xs text_des'>
            <span>{tr('last_time')}</span>
            <span className='ml-2'>
              {formatDateTime(powerData?.epoch_time)}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects
            value={String(active)}
            options={newGroups}
            onChange={(v: string) => {
              setActive(v);
              // load(v);
            }}
          />
          <DateTime
            defaultValue={[date.startTime, date.endTime]}
            onChange={(start, end) => {
              setDate({
                startTime: start,
                endTime: end,
              });
            }}
          />
          <ExportExcel columns={columns} data={data} />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5'>
        <Table data={data} columns={columns} loading={loading} />
      </div>
    </>
  );
};
