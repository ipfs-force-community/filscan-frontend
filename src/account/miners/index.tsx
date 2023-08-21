/** @format */

import { Translation } from '@/components/hooks/Translation';
import MinerAdd from './Add';
import { useHash } from '@/components/hooks/useHash';
import { proApi } from '@/contents/apiUrl';
import { Option_Item } from '@/contents/type';
import fetchData from '@/store/server';

import { useEffect, useMemo, useState } from 'react';
import { spawn } from 'child_process';
import { getSvgIcon } from '@/svgsIcon';
import { Button, Collapse } from 'antd';
import Link from 'next/link';
import GroupAdd from './GroupAdd';
import { Group } from '../type';

const maxGroups = 5;

export default () => {
  const { hashParams } = useHash();
  const { type, group } = hashParams || {};
  const { tr } = Translation({ ns: 'account' });
  const [groups, setGroups] = useState<Array<Group>>([]);
  const [showGroup, setShowGroup] = useState<Record<string, boolean>>({});
  const [editOpen, setEditOpen] = useState<Group>();

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    const groups: any = await fetchData(proApi.getGroups);
    const data =
      groups?.group_info_list?.map((item: Group) => {
        return { ...item, label: tr(item.group_name), value: item.group_id };
      }) || [];
    setGroups(data);
  };

  const groupDetail = useMemo(() => {
    if (group) {
      const file = groups.find((v) => v.group_id === Number(group));
      return file;
    }
    return undefined;
  }, [group, groups]);

  if (type === 'miner_add') {
    return <MinerAdd groups={groups} />;
  }

  if (type === 'miners_group') {
    return <GroupAdd groupId={group} groupDetail={groupDetail} />;
  }

  console.log('====3', showGroup);
  return (
    <div>
      <p className='w-full mb-5 flex align-baseline justify-between	'>
        <span className='font-semibold text-lg	 font-PingFang'>
          {tr('miners')}
          <span className='text_des text-sm ml-2 font-DIN'>
            {groups.length}/{maxGroups}
          </span>
        </span>
        <Link
          href={`/account#miners?type=miner_add`}
          scroll={false}
          className='confirm_btn flex rounded-[5px] items-center gap-x-5 text_color'>
          {getSvgIcon('addIcon')}
          {tr('miners_add')}
        </Link>
      </p>

      <ul className='flex gap-y-5 flex-col '>
        {groups.map((item, index) => {
          return (
            <Collapse
              collapsible='header'
              className='card_shadow custom_Collapse '
              expandIconPosition='end'
              defaultActiveKey={[1]}
              items={[
                {
                  key: index,
                  label: (
                    <li
                      className='custom_Collapse_item cursor-pointer w-full rounded-xl h-[38px] flex items-center justify-between'
                      key={item.group_id}>
                      <span className='flex gap-x-5 items-center'>
                        <span className='des_bg_color flex items-center text-xs border_color border text_des w-fit px-1 rounded-[5px] '>
                          {tr(item.label)}
                        </span>
                        <span>
                          {tr('item_value', {
                            value: item?.miners_id?.length || 0,
                          })}
                        </span>
                      </span>
                      <div className='flex gap-x-5 items-center'>
                        <Link
                          href={`/account#miners?type=miners_group&group=${item.group_id}`}
                          className='cursor-pointer text_color'
                          onClick={() => {
                            setEditOpen(item);
                          }}>
                          {getSvgIcon('editIcon')}
                        </Link>
                      </div>
                    </li>
                  ),
                  children: (
                    <>
                      {item?.miners_id?.length > 0 && (
                        <div>
                          {(item?.miners_id || [])?.map((minerItem) => {
                            return <span>{minerItem}</span>;
                            return (
                              <li>
                                <span>{minerItem.minerId || ''}</span>
                                <span>{minerItem.minerTag || ''}</span>
                              </li>
                            );
                          })}
                        </div>
                      )}
                    </>
                  ),
                },
              ]}
            />
          );
        })}
      </ul>
    </div>
  );
};
