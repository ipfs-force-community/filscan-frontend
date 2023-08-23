/** @format */

import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useEffect, useMemo, useState } from 'react';
import { account_reward } from '@/contents/account';
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
  groups,
}: {
  selectedKey: string;
  groups: Array<any>;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [data, setData] = useState<any>([]);
  const [active, setActive] = useState<string | number>(0);
  const columns = useMemo(() => {
    return account_reward.columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  useEffect(() => {
    load();
  }, []);

  const load = async (groupId?: string | number) => {
    const group_id = groupId || active;

    //proApi.getReward
    const result: any = await fetchData(proApi.getReward, { group_id });
    setData(result?.reward_detail_list || []);
    console.log('---3', result);
  };

  console.log('---groups', groups);

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
            <span className='ml-2'>{data?.last_time || '--'}</span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects
            value={String(active)}
            options={newGroups}
            onChange={(v: string) => {
              setActive(v);
              load(v);
            }}
          />
          <ExportExcel columns={columns} data={data} />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5'>
        <Table
          data={data}
          columns={columns}
          loading={false}
          //onChange={handleChange}
        />
      </div>
    </>
  );
};
