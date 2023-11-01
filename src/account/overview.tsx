/** @format */

import { Translation } from '@/components/hooks/Translation';
import Loading from '@/components/loading';
import { overview } from '@/contents/account';
import Table from '@/packages/Table';
import ExportExcel from '@/packages/exportExcel';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime } from '@/utils';
import { useEffect, useMemo, useState } from 'react';
import Groups from './Groups';
import managerStore from '@/store/modules/account/manager';
import { observer } from 'mobx-react';

interface Props {
selectedKey:string
}

export default observer((props: Props) => {
  const {selectedKey } = props;
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string>('-1');
  const { overviewData = {},} = managerStore;
  const columns = useMemo(() => {
    return overview.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  useEffect(() => {
    load()
  },[])

  const load = (value?: string) => {
    console.log('------3',value)
    const groupId = value ? Number(value): Number(active)
    managerStore.getOverViewData(Number(groupId))
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
              {formatDateTime(overviewData?.epoch_time, 'YYYY/MM/DD HH:mm')}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Groups selectGroup={active} onChange={(value: string) => {
            load(value)
            setActive(value);
          }}/>
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
                    className='flex flex-1 p-6 card_shadow border border_color  rounded-xl justify-between items-start'>
                    {showValue}
                    { icon && <span>{ getSvgIcon(icon)}</span>}
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
          loading={false}
          // onChange={handleChange}
        />
      </div>
    </>
  );
});
