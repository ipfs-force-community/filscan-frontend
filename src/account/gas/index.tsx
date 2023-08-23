/** @format */

import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useMemo, useState } from 'react';
import { account_gas } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';
import useAxiosData from '@/store/useAxiosData';
import DateTime from '@/src/account/DateTIme';
import { formatDateTime } from '@/utils';

export default ({
  selectedKey,
  groups,
}: {
  selectedKey: string;
  groups: Array<any>;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string | number>(0);
  const [date, setDate] = useState({
    startTime: '',
    endTime: '',
  });

  const columns = useMemo(() => {
    return account_gas.columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  //proApi
  const { data: gasData, loading } = useAxiosData(proApi.getGas, {
    group_id: active ? Number(active) : null,
    start_date: date.startTime,
    end_date: date.endTime,
  });

  const data = useMemo(() => {
    return gasData?.gas_cost_detail_list || [];
  }, [gasData]);

  const newGroups = useMemo(() => {
    return groups;
  }, [groups]);

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex  flex-col'>
          <span className='w-full text-lg font-semibold font-PingFang	'>
            {tr(selectedKey)}
          </span>
          <span className='text-xs text_des'>
            <span>{tr('last_time')}</span>
            <span className='ml-2'>{formatDateTime(gasData?.epoch_time)}</span>
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
