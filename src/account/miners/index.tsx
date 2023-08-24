/** @format */

import { Translation } from '@/components/hooks/Translation';
import MinerAdd from './Add';
import { useHash } from '@/components/hooks/useHash';
import { proApi } from '@/contents/apiUrl';
import { useEffect, useMemo, useState } from 'react';
import { getSvgIcon } from '@/svgsIcon';
import { Collapse } from 'antd';
import Link from 'next/link';
import GroupAdd from './GroupAdd';
import { Group, MinerNum, groupsItem } from '../type';
import useAxiosData from '@/store/useAxiosData';
import { GroupsStoreContext } from './content';

export default ({ minersNum }: { minersNum: MinerNum }) => {
  const { hashParams } = useHash();
  const { type, group } = hashParams || {};
  const { tr } = Translation({ ns: 'account' });
  const [groups, setGroups] = useState<Array<groupsItem>>([]);
  const [defaultGroupsId, setDefaultGroupsId] = useState();
  const [showGroup, setShowGroup] = useState<Record<string, boolean>>({});
  const [editOpen, setEditOpen] = useState<groupsItem>();

  const { data: groupsData, loading: loading } = useAxiosData(proApi.getGroups);

  useEffect(() => {
    console.log('==---3groupsData', groupsData);
    calcGroups(groupsData?.group_info_list || []);
  }, [groupsData]);

  const calcGroups = (groupResult: Array<groupsItem>) => {
    const new_data: any = [];
    let default_groups_id;
    groupResult?.forEach((item: groupsItem) => {
      if (item.group_name === 'default_group') {
        default_groups_id = item.group_id;
      }
      new_data.push({
        ...item,
        label: tr(item.group_name),
        value: item.group_id,
      });
    });
    setDefaultGroupsId(default_groups_id);
    setGroups(new_data);
  };

  const groupDetail = useMemo(() => {
    if (group) {
      const file = groups?.find((v: any) => v.group_id === Number(group));
      return file;
    }
    return undefined;
  }, [group, groups]);

  console.log('---3', groups, groupsData);
  const renderChildren = () => {
    if (type === 'miner_add') {
      return (
        <MinerAdd
          groups={groups}
          defaultId={defaultGroupsId}
          minersNum={minersNum}
        />
      );
    }

    if (type === 'miners_group' && groupDetail) {
      return (
        <GroupAdd
          groupId={group}
          groupDetail={groupDetail}
          minersNum={minersNum}
        />
      );
    }
    return (
      <>
        <p className='w-full mb-5 flex align-baseline justify-between	'>
          <span className='font-semibold text-lg	 font-PingFang'>
            {tr('miners')}
            <span className='text_des text-sm ml-2 font-DIN'>
              {minersNum?.miners_count}/{minersNum?.max_miners_count}
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
          {groups.map((item: any, index: number) => {
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
                              value: item?.miners_info?.length || 0,
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
                        {item?.miners_info?.length > 0 && (
                          <div>
                            {(item?.miners_info || [])?.map(
                              (minerItem: any) => {
                                return (
                                  <span key={minerItem.miner_id}>
                                    {minerItem.miner_id || ''}
                                  </span>
                                );
                                // return (
                                //   <li>
                                //     <span>{minerItem.miner_id || ''}</span>
                                //     {/* <span>{minerItem.minerTag || ''}</span> */}
                                //   </li>
                                // );
                              }
                            )}
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
      </>
    );
  };

  return (
    <GroupsStoreContext.Provider
      value={{
        groups,
        setGroups: (groupsArr: Array<groupsItem>) => {
          calcGroups(groupsArr);
        },
      }}>
      {renderChildren()}
    </GroupsStoreContext.Provider>
  );
};
