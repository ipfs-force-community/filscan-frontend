/** @format */

import { Translation } from '@/components/hooks/Translation';
import NoMiner from '../NoMiner';
import Table from '@/packages/Table';
import { useEffect, useMemo, useState } from 'react';
import { account_balance, account_lucky } from '@/contents/account';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';

const mockData = [
  {
    tag: '标签一',
    miner_id: 'f02438',
    group_name: '分组-',
    lucky_rate_24h: '100%',
    lucky_rate_7d: '30%',
    lucky_rate_30d: '80%',
  },
];

export default ({
  selectedKey,
  noMiners,
}: {
  selectedKey: string;
  noMiners: boolean;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [data, setData] = useState<any>({});
  const options = useMemo(() => {
    return account_lucky.headerOptions.map((item) => {
      return { ...item, label: tr(item.label) };
    });
  }, []);

  const columns = useMemo(() => {
    return account_balance.columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const result = await fetchData(proApi.getLucky);
  };

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    // let cur: number = pagination.current || current;
    // let order = { ...sort };
    // if (sorter.field) {
    //   order = {
    //     field: sorter.field,
    //     order: sorter.order,
    //   };
    // }
    // setCurrent(cur);
    // setSort(order);
    // load(active, cur, order);
  };

  if (noMiners) {
    return <NoMiner selectedKey={selectedKey} />;
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
            <span className='ml-2'>{data?.last_time || '--'}</span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects value={'all'} options={[]} onChange={() => {}} />
          <ExportExcel columns={columns} data={mockData} />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table
          data={mockData}
          columns={columns}
          loading={false}
          onChange={handleChange}
        />
      </div>
    </>
  );
};
