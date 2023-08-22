/** @format */

import { Translation } from '@/components/hooks/Translation';
import NoMiner from '../NoMiner';
import Table from '@/packages/Table';
import { useEffect, useMemo, useState } from 'react';
import { account_lucky } from '@/contents/account';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';

export default ({
  selectedKey,
  groups,
}: {
  selectedKey: string;
  groups: Array<any>;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [data, setData] = useState<any>([]);
  const [active, setActive] = useState<string | number>(0);

  const columns = useMemo(() => {
    return account_lucky.columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  useEffect(() => {
    load();
  }, []);

  const load = async (groupId?: string | number) => {
    const group_id = groupId || active;
    const result: any = await fetchData(proApi.getLucky, { group_id });
    setData(result?.lucky_rate_list || []);
  };

  return (
    <>
      <div className='flex justify-between items-center'>
        <div className='flex  flex-col'>
          <span className='w-full text-lg font-semibold font-PingFang	'>
            {tr(selectedKey)}
          </span>
          <span className='text-xs text_des'>
            <span>{tr('last_time')}</span>
            <span className='ml-2'>{data?.last_time || '--'}</span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects
            value={'all'}
            options={groups}
            onChange={(v: string | number) => {
              setActive(v);
              load(v);
            }}
          />
          <ExportExcel columns={columns} data={data} />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5'>
        <Table data={data} columns={columns} loading={false} />
      </div>
    </>
  );
};
