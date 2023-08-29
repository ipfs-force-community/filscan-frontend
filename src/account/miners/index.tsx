/** @format */

import { Translation } from '@/components/hooks/Translation';
import MinerAdd from './Add';
import { useHash } from '@/components/hooks/useHash';
import { proApi } from '@/contents/apiUrl';
import { useEffect, useMemo, useState } from 'react';
import { getSvgIcon } from '@/svgsIcon';
import Link from 'next/link';
import GroupAdd from './GroupAdd';
import { MinerNum, groupsItem } from '../type';
import useAxiosData from '@/store/useAxiosData';
import { GroupsStoreContext } from './content';
import Groups from './Groups';

export default ({ minersNum }: { minersNum: MinerNum | any }) => {
  const { hashParams } = useHash();
  const { type, group } = hashParams || {};
  const { tr } = Translation({ ns: 'account' });
  const [groups, setGroups] = useState<Array<groupsItem>>([]);
  const [defaultGroupsId, setDefaultGroupsId] = useState();
  const [minerNum, setMinerNum] = useState(minersNum);

  const { data: groupsData, loading, error } = useAxiosData(proApi.getGroups);

  useEffect(() => {
    setMinerNum(minersNum);
  }, [minersNum]);

  useEffect(() => {
    calcGroups(groupsData?.group_info_list || []);
  }, [groupsData]);

  //组成公共select item
  const calcGroups = (groupResult: Array<groupsItem>) => {
    const new_data: any = [];
    let default_groups_id;
    groupResult?.forEach((item: groupsItem) => {
      if (item.is_default) {
        default_groups_id = item.group_id;
      }
      new_data.push({
        ...item,
        label: item.is_default ? tr('default_group') : item.group_name,
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

  const renderChildren = () => {
    if (type === 'miner_add' && groupsData) {
      return (
        <MinerAdd
          groups={groups}
          defaultId={defaultGroupsId}
          minersNum={minerNum}
        />
      );
    }

    if (group && groupDetail) {
      return (
        <GroupAdd
          groupId={group}
          groupDetail={groupDetail}
          minersNum={minerNum}
        />
      );
    }
    return <Groups groups={groups} />;
  };

  return (
    <GroupsStoreContext.Provider
      value={{
        groups,
        setMinerNum: (mineNum) => {
          setMinerNum(mineNum);
        },
        setGroups: (groupsArr: Array<groupsItem>) => {
          calcGroups(groupsArr);
        },
      }}>
      <p className='w-full mb-5 flex align-baseline justify-between	'>
        <span className='font-semibold text-lg	 font-PingFang'>
          {tr('miners')}
          <span className='text_des text-sm ml-2 font-DIN'>
            {minerNum?.miners_count}/{minerNum?.max_miners_count}
          </span>
        </span>
        <Link
          href={`/account#miners?type=miner_add`}
          scroll={false}
          className='confirm_btn flex rounded-[5px] items-center gap-x-2.5 text_color'>
          {getSvgIcon('addIcon')}
          {tr('miners_add')}
        </Link>
      </p>
      {renderChildren()}
    </GroupsStoreContext.Provider>
  );
};
