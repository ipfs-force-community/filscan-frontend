/** @format */

import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useMemo, useState } from 'react';
import { account_power } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';
import useAxiosData from '@/store/useAxiosData';
import DateTime from '@/src/account/DateTIme';
import { formatDateTime } from '@/utils';
import { useHash } from '@/components/hooks/useHash';
import Detail from './Detail';
import Tooltip from '@/packages/tooltip';

export default ({
  selectedKey,
}: {
  selectedKey: string;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const { hashParams } = useHash();
  const [active, setActive] = useState<string | number>('-1');
  const [date, setDate] = useState({
    startTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ'
    ),
    endTime: formatDateTime(
      new Date().getTime() / 1000,
      'YYYY-MM-DDTHH:mm:ssZ'
    ),
  });

  const columns = useMemo(() => {
    return account_power.columns(tr).map((item) => {
      if (item.titleTip) {
        item.excelTitle= item.dataIndex === 'sector_count_change'? `${tr('raw_power')}/${tr('sector_power_count')}`:tr(item.title),
        item.title = <span className='flex items-center gap-x-1'>
          {tr(item.title)}
          <Tooltip context={tr(item.titleTip)} />
        </span>
      } else {
        item.title= tr(item.title)
      }
      return { ...item };

    });
  }, [tr]);

  //proApi
  const { data: powerData, loading } = useAxiosData(proApi.getPower, {
    group_id: active ? Number(active) : 0,
    start_date: date.startTime,
    end_date: date.endTime || date.startTime,
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
    return powerData?.power_detail_list || [];
  }, [powerData]);

  if (hashParams?.miner) {
    return <Detail miner={hashParams.miner} selectedKey={selectedKey } />;
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
              {formatDateTime(powerData?.epoch_time)}
            </span>
          </span>
        </div>
        <div className='flex gap-x-2.5'>
          <Selects
            value={String(active)}
            options={groups}
            onChange={(v: string) => {
              setActive(v);
              // load(v);
            }}
          />
          <DateTime
            defaultValue={[date.startTime, date.endTime]}
            onChange={(start, end) => {
              setDate({
                startTime: start,
                endTime: end,
              });
            }}
          />
          <ExportExcel columns={columns} data={data} fileName={tr(selectedKey)}/>
        </div>
      </div>
      <div className='card_shadow border border_color rounded-xl p-4 mt-5'>
        <Table data={data} columns={columns} loading={loading} />
      </div>
    </>
  );
};
