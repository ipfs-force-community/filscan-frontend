/** @format */

import { Translation } from '@/components/hooks/Translation';
import NoMiner from '../NoMiner';
import Table from '@/packages/Table';
import { useMemo, useState } from 'react';
import { account_expired } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import { formatDateTime } from '@/utils';
import { Collapse } from 'antd';
import { useHash } from '@/components/hooks/useHash';
import Detail from './Detail';
import useAxiosData from '@/store/useAxiosData';

export default ({
  selectedKey,
}: {
  selectedKey: string;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string>('0');
  const { hashParams } = useHash();

  const columns = useMemo(() => {
    return account_expired.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  //proApi
  const { data: expiredData, loading } = useAxiosData(proApi.getSector, {
    group_id: active ? Number(active) : '',
  });

  const { data: groupsData, } = useAxiosData(proApi.getGroupsId, {
    group_id: active ? Number(active) : null,
  });
  const groups:Array<any> = useMemo(() => {
    let newGroups: Array<any> = [{
      value: '0',
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

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} data={expiredData} selectedKey={ selectedKey} />;
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
        <ul className='flex mb-5 card_shadow border border_color rounded-xl px-10 py-5 text-sm text_des font-medium '>
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
                className='card_shadow custom_Collapse mb-2.5'
                expandIconPosition='end'
                defaultActiveKey={[1]}
                items={[
                  {
                    key: index,
                    label: (
                      <ul className='flex text-base font-semibold px-10'>
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
                        loading={loading}
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
