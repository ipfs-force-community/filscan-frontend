/** @format */

import React, { useEffect, useMemo, useState } from 'react';
import { Translation } from '@/components/hooks/Translation';
import { account_manager } from '@/contents/account';
import { useHash } from '@/components/hooks/useHash';
import useAnchorLink from '@/components/hooks/useAnchorLink';
import Overview from '@/src/account/overview';
import Miners from '@/src/account/miners';
import Personal from '@/src/account/personal';
import Lucky from '@/src/account/lucky';
import Balance from '@/src/account/balance';
import Reward from '@/src/account/reward';
import fetchData from '@/store/server';
import { proApi } from '@/contents/apiUrl';
import NoMiner from '@/src/account/NoMiner';

const Account: React.FC = () => {
  const { tr } = Translation({ ns: 'account' });
  const { hash } = useHash();

  const rootSubmenuKeys: Array<string> = [];
  const navigateWithNoScroll = useAnchorLink();
  const [minersNum, setMinersNum] = useState<any>({});
  const [groups, setGroups] = useState<any>([]);

  const selectedKey = useMemo(() => {
    if (hash) {
      return hash;
    }
    return 'overview';
  }, [hash]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const result = await fetchData(proApi.account_miners);
    setMinersNum(result || {});
    const groups: any = await fetchData(proApi.getGroupsId);
    const groupsOptions = (groups?.group_list || [])?.map((v: any) => {
      return { ...v, value: v?.group_id, label: tr(v?.group_name) };
    });

    setGroups([
      { label: tr('all'), value: '0', group_id: '0' },
      ...groupsOptions,
    ]);
  };

  function getChildren(arr: Array<any>) {
    return arr.map((v) => {
      return { ...v, label: tr(v.label) };
    });
  }
  const menuData = useMemo(() => {
    let itemsArr: any = [];
    account_manager.forEach((item) => {
      rootSubmenuKeys.push(item.key);
      let others = [];
      const obj = { ...item, label: item.label };
      delete obj.children;
      if (item?.children) {
        others = getChildren(item?.children || []);
        itemsArr.push({ ...obj });
        itemsArr.push(...others);
      } else {
        itemsArr.push({ ...obj });
      }
    });
    return itemsArr;
  }, []);

  return (
    <div className='main_contain !py-6 '>
      <div className='w-full h-full flex rounded-xl border card_shadow border_color '>
        <div className='w-[210px] border-r border_color  py-10'>
          <div className='w-full px-5 mb-10 font-semibold font-PingFang	'>
            {tr('account_title')}
          </div>
          <ul className='list-none px-4'>
            {menuData.map((parent: any) => {
              return (
                <li
                  key={parent.label}
                  className={`cursor-pointer  flex gap-x-2 items-center p-2.5 rounded-[5px] hover:text-primary ${
                    parent?.icon ? 'font-medium' : 'ml-5 font-normal'
                  } ${
                    selectedKey === parent.key ? 'text-primary bg-bg_hover' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateWithNoScroll(`/account#${parent.key}`);
                  }}>
                  {parent.icon}
                  {tr(parent.label)}
                </li>
              );
            })}
          </ul>
        </div>
        <div
          className='flex-grow flex flex-col px-5 py-10 w_account'
          style={{ height: 'inherit' }}>
          {!minersNum?.miners_count ? (
            <NoMiner selectedKey={selectedKey} />
          ) : (
            <>
              {selectedKey === 'overview' && (
                <Overview selectedKey='overview' />
              )}
              {selectedKey === 'miners' && <Miners />}
              {selectedKey === 'lucky' && (
                <Lucky
                  selectedKey={'overview_' + selectedKey}
                  groups={groups}
                />
              )}
              {selectedKey === 'balance' && (
                <Balance
                  selectedKey={'overview_' + selectedKey}
                  groups={groups}
                />
              )}
              {selectedKey === 'reward' && (
                <Reward
                  selectedKey={'overview_' + selectedKey}
                  groups={groups}
                />
              )}

              {selectedKey === 'personal' && <Personal />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account; //已登录/注册
