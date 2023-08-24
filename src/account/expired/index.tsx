/** @format */

import { Translation } from '@/components/hooks/Translation';
import NoMiner from '../NoMiner';
import Table from '@/packages/Table';
import { useEffect, useMemo, useState } from 'react';
import { account_expired, account_lucky } from '@/contents/account';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';
import useAxiosData from '@/store/useAxiosData';
import { formatDateTime } from '@/utils';
import { Collapse } from 'antd';
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
  const [active, setActive] = useState<string>('0');
  const { hashParams } = useHash();

  console.log('---hashParams', hashParams);

  const columns = useMemo(() => {
    return account_expired.columns.map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, []);

  //proApi
  const { data: expiredData, loading } = useAxiosData(proApi.getSector, {
    group_id: active ? Number(active) : '',
  });

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} data={expiredData} />;
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
              {formatDateTime(expiredData?.epoch_time, 'YYYY/MM/DD HH:mm')}
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
          {/* <ExportExcel columns={columns} data={expiredData} /> */}
        </div>
      </div>
      <div className='mt-5'>
        <ul className='flex mb-5 card_shadow border border_color rounded-xl px-16 py-5 text-sm text_des font-medium'>
          {account_expired?.headerList.map((titleItem, index) => {
            let showTitle = titleItem.title;
            if (showTitle === 'exp_month') {
              showTitle = 'exp_time';
            }
            return (
              <li key={index} style={{ width: titleItem.width }}>
                {tr(showTitle)}
              </li>
            );
          })}
        </ul>
        {expiredData?.sector_detail_month?.map(
          (sector_item: any, index: number) => {
            return (
              <Collapse
                key={index}
                collapsible='header'
                className='card_shadow custom_Collapse '
                expandIconPosition='end'
                defaultActiveKey={[1]}
                items={[
                  {
                    key: index,
                    label: (
                      <ul className='flex text-base font-semibold'>
                        {account_expired?.headerList.map((item: any) => {
                          const { dataIndex, width, title, render } = item;
                          const value = sector_item[dataIndex];
                          const showValue = render
                            ? render(value, sector_item, tr)
                            : value;
                          return (
                            <li key={index} style={{ width: width }}>
                              {showValue}
                            </li>
                          );
                        })}
                      </ul>
                    ),
                    children: (
                      <Table
                        data={sector_item?.sector_detail_list || []}
                        columns={columns}
                        loading={false}
                      />
                    ),
                  },
                ]}
              />
            );
          }
        )}
      </div>
    </>
  );
};