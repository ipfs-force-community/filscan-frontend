/** @format */

import { Translation } from '@/components/hooks/Translation';
import NoMiner from '../../NoMiner';
import Table from '@/packages/Table';
import { useEffect, useMemo, useState } from 'react';
import { account_balance, account_lucky } from '@/contents/account';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';
import { formatDateTime } from '@/utils';
import useAxiosData from '@/store/useAxiosData';

export default ({
  selectedKey,

}: {
  selectedKey: string;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string>('-1');
  const columns = useMemo(() => {
    return account_balance.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  //proApi
  const { data: balanceData, loading } = useAxiosData(proApi.getBalance, {
    group_id: active ? Number(active) : null,
  });

  const { data: groupsData, } = useAxiosData(proApi.getGroupsId, {
    group_id: active ? Number(active) : null,
  });

  const groups:Array<any> = useMemo(() => {
    let newGroups: Array<any> = [{
      value: '-1',
      label:tr('all')
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

  const data = useMemo(() => {
    return {
      result: balanceData?.address_balance_list || [],
      epoch_time: balanceData?.epoch_time,
    };
  }, [balanceData]);

  return (
    <div className='overflow-auto'>
      <div className='flex justify-between items-center'>
        <div className='flex  flex-col'>
          <span className='w-full text-lg font-semibold font-PingFang	'>
            {tr(selectedKey)}
          </span>
          <span className='text-xs text_des'>
            <span>{tr('last_time')}</span>
            <span className='ml-2'>
              {formatDateTime(data?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects
            value={active}
            options={groups}
            onChange={(value: string) => {
              setActive(value);
            }}
          />
          <ExportExcel
            columns={columns}
            data={data.result}
            fileName={tr(selectedKey)}
          />
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table
          data={data?.result || []}
          columns={columns}
          loading={loading}
          // onChange={handleChange}
        />
      </div>
    </div>
  );
};
