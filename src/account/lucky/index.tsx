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
import useAxiosData from '@/store/useAxiosData';
import { formatDateTime } from '@/utils';

export default ({
  selectedKey,
}: {
  selectedKey: string;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string>('0');
  const columns = useMemo(() => {
    return account_lucky.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  //proApi
  const { data: luckyData, loading } = useAxiosData(proApi.getLucky, {
    group_id: active ? Number(active) : '',
  });

  const data = useMemo(() => {
    return luckyData?.lucky_rate_list || [];
  }, [luckyData]);

  const { data: groupsData, } = useAxiosData(proApi.getGroupsId, {
    group_id: active ? Number(active) : null,
  });
  const groups:Array<any> = useMemo(() => {
    let newGroups: Array<any> = [{
      value: '0',
      label:'all'
    }];
    (groupsData?.group_list || []).forEach((group: any) => {
      newGroups.push({
        ...group,
        value: String(group.group_id),
        label: tr(group?.group_name),
      });
    });
    return newGroups
  },[groupsData?.group_list, tr])

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
              {formatDateTime(luckyData?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects
            value={active}
            options={groups}
            onChange={(v: string) => {
              setActive(v);
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
