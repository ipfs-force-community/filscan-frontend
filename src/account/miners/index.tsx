/** @format */

import { Translation } from '@/components/hooks/Translation';
import { useHash } from '@/components/hooks/useHash';
import { proApi } from '@/contents/apiUrl';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import GroupAdd from './GroupAdd';
import Groups from './Groups';

export default observer(() => {
  const { hashParams } = useHash();
  const { type, group } = hashParams || {};
  const { tr } = Translation({ ns: 'account' });
  const { countMiners,groupMiners,defaultGroup } = accountStore;
  const { miners_count, max_miners_count } = countMiners;

  const selectGroupsItems = useMemo(() => {
    const newGroups:Array<any>=[]
    if (groupMiners) {
      groupMiners.forEach(item => {
        newGroups.push({
          group_id: item.group_id,
          is_default: item.is_default,
          name:item.group_name,
          label: item.is_default ? tr('default_group') : item.group_name,
          value: item.group_id,
        })
      })
    }
    return newGroups
  }, [groupMiners])

  const groupDetail = useMemo(() => {
    let selectGroup:any = {};
    if (group && groupMiners ) {
      selectGroup = groupMiners?.find(v=>v.group_id === Number(group))
    }
    return selectGroup
  },[group,groupMiners])

  const renderChildren = () => {
    if (type === 'miner_add') {
      return (
        <MinerAdd
          groups={selectGroupsItems}
          defaultId={defaultGroup?.group_id}
          minersNum={countMiners}
        />
      );
    }
    //添加分组
    if (type === 'group_add' ) {
      return (
        <GroupAdd
          groupId={group}
          //groupDetail={groupDetail}
          minersNum={countMiners}
        />
      );
    } else if (group) {
      //编辑分组
      return <GroupAdd
        groupId={group}
        groupDetail={groupDetail}
        minersNum={countMiners}
      />
    }
    return <Groups />;
  };

  return (
    <>
      <p className='w-full mb-5 flex align-baseline justify-between	'>
        <span className='font-semibold text-lg	 font-PingFang'>
          {tr('miners')}
          <span className='text_des text-sm ml-2 font-DIN'>
            {miners_count}/{max_miners_count}
          </span>
        </span>
        <div className='flex gap-x-2.5 items-center'>
          <Link
            href={`/account#miners?type=group_add`}
            scroll={false}
            className={ `flex rounded-[5px] border border-color  items-center gap-x-2.5 text_color ${type === 'group_add' ?'confirm_btn':'cancel_btn'}`}>
            {/* {getSvgIcon('addIcon')} */}
            {tr('group_add')}
          </Link>
          <Link
            href={`/account#miners?type=miner_add`}
            scroll={false}
            className={ `cancel_btn  border border-color flex rounded-[5px] items-center gap-x-2.5 text_color ${type === 'miner_add' ?'confirm_btn':'cancel_btn'}`}>
            {/* {getSvgIcon('addIcon')} */}
            {tr('miners_add')}
          </Link>
        </div>

      </p>
      { renderChildren() }
    </>
  );
});

