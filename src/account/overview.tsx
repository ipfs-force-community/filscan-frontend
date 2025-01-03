/** @format */

import { Translation } from '@/components/hooks/Translation';
import Loading from '@/components/loading';
import { overview } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Table from '@/packages/Table';
import ExportExcel from '@/packages/exportExcel';
import Selects from '@/packages/selects';
import useAxiosData from '@/store/useAxiosData';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime } from '@/utils';
import { useMemo, useState } from 'react';

export default ({
  selectedKey,
}: {
  selectedKey: string;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const [active, setActive] = useState<string>('-1');

  const columns = useMemo(() => {
    return overview.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  //proApi
  const { data: overviewData, loading } = useAxiosData(proApi.getOverview, {
    group_id: active ? Number(active) : '',
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
  }, [groupsData?.group_list, tr])

  if (loading) {
    return <Loading />
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
          loading={loading}
          // onChange={handleChange}
        />
      </div>
    </>
  );
};
