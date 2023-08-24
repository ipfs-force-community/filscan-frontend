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
import { account_miners } from '@/contents/account';
import Drag from '@/packages/drag';
import Groups from './Groups';
import GroupsT from './Groups';

export default ({ minersNum }: { minersNum: MinerNum | any }) => {
  const { hashParams } = useHash();
  const { type, group } = hashParams || {};
  const { tr } = Translation({ ns: 'account' });
  const [groups, setGroups] = useState<Array<groupsItem>>([]);
  const [defaultGroupsId, setDefaultGroupsId] = useState();

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
    return <Groups groups={groups} />;
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
