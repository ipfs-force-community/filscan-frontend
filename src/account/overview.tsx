/** @format */

import { Translation } from '@/components/hooks/Translation';
import { overview } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Table from '@/packages/Table';
import ExportExcel from '@/packages/exportExcel';
import Selects from '@/packages/selects';
import useAxiosData from '@/store/useAxiosData';
import { formatDateTime } from '@/utils';
import { Skeleton } from 'antd';
import { data } from 'autoprefixer';
import { useMemo, useState } from 'react';

export default ({
  selectedKey,
  groups,
}: {
  selectedKey: string;
  groups: Array<any>;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string>('0');

  const columns = useMemo(() => {
    return overview.columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  //proApi
  const { data: overviewData, loading } = useAxiosData(proApi.getOverview, {
    group_id: active ? Number(active) : '',
  });

  if (loading) {
    return (
      <div className='mt-10'>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
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
              {formatDateTime(overviewData?.epoch_time, 'YYYY/MM/DD hh:mm')}
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
            data={overviewData?.miner_info_detail_list || []}
            fileName={'expired'}
          />
        </div>
      </div>
      <div className='mt-5 flex flex-col gap-y-5'>
        {overview.headerList.map((itemArray, index) => {
          return (
            <ul className={`flex flex-wrap gap-x-5 min-h-[133px]`} key={index}>
              {itemArray.map((item) => {
                const { icon, dataIndex, render } = item;
                const showValue = render(
                  overviewData && overviewData[dataIndex],
                  overviewData,
                  tr
                );
                return (
                  <li
                    key={item.dataIndex}
                    className='flex flex-1 p-6 card_shadow border border_color rounded-xl justify-between items-start'>
                    {showValue}
                    <span>{icon && icon}</span>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5 overflow-auto'>
        <Table
          data={overviewData?.miner_info_detail_list || []}
          columns={columns}
          loading={loading}
          // onChange={handleChange}
        />
      </div>
    </>
  );
};
