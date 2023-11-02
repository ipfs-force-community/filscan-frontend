/** @format */

import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useEffect, useMemo, useState } from 'react';
import { account_expired } from '@/contents/account';
import { formatDateTime } from '@/utils';
import { Collapse } from 'antd';
import { useHash } from '@/components/hooks/useHash';
import Detail from './Detail';
import manageStore from '@/store/modules/account/manage';
import Groups from '../../Groups';
import { observer } from 'mobx-react';

interface Props {
selectedKey:string
}
export default observer((props: Props) => {
  const { selectedKey } = props;
  const { tr } = Translation({ ns: 'account' });
  const { expiredData,expiredLoading } = manageStore;
  const [active, setActive] = useState<string>('-1');
  const { hashParams } = useHash();

  const columns = useMemo(() => {
    return account_expired.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  useEffect(() => {
    load()
  },[])

  const load = (value?: string) => {
    const group_id = value ? Number(value) : Number(active);
    manageStore.getExpiredData({
      group_id: group_id })
  }

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} selectedKey={ selectedKey} />;
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
          <Groups selectGroup={active} onChange={(value: string) => {
            load(value)
            setActive(value);
          }}/>
          {/* <ExportExcel columns={columns} data={expiredData} /> */}
        </div>
      </div>
      <div className='mt-5'>
        <ul className='flex mb-5 card_shadow border border_color rounded-xl px-10 py-4 text-sm text_des font-medium '>
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
                className='card_shadow custom_Collapse  !rounded-xl mb-2.5'
                expandIconPosition='end'
                items={[
                  {
                    key: index,
                    label: (
                      <ul className='flex font-semibold pl-7'>
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
                        loading={expiredLoading}
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
});