/** @format */

import { Translation } from '@/components/hooks/Translation';
import Table from '@/packages/Table';
import { useMemo, useState } from 'react';
import { account_reward } from '@/contents/account';
import { proApi } from '@/contents/apiUrl';
import Selects from '@/packages/selects';
import ExportExcel from '@/packages/exportExcel';
import useAxiosData from '@/store/useAxiosData';
import DateTime from '@/src/account/DateTIme';
import { formatDateTime } from '@/utils';
import { useHash } from '@/components/hooks/useHash';
import Detail from './Detail';

export default ({
  selectedKey,
}: {
  selectedKey: string;
}) => {
  const { tr } = Translation({ ns: 'account' });
  const { hashParams } = useHash();
  const [active, setActive] = useState<string | number>(0);
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
    return account_reward.columns(tr).map((item) => {
      return { ...item, title: tr(item.title) };
    });
  }, [tr]);

  //proApi.getReward
  const { data: rewardData, loading } = useAxiosData(proApi.getReward, {
    group_id: active ? Number(active) : 0,
    start_date: date.startTime,
    end_date: date.endTime,
  });

  const data = useMemo(() => {
    return rewardData?.reward_detail_list || [];
  }, [rewardData]);

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
    return <Detail miner={hashParams.miner} data={rewardData} selectedKey={selectedKey}/>;
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
              {formatDateTime(rewardData?.epoch_time)}
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
        <Table
          data={rewardData?.reward_detail_list || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </>
  );
};
