/** @format */

import React, { useEffect, useMemo } from 'react';
import { Translation } from '@/components/hooks/Translation';
import { account_manager } from '@/contents/account';
import { useHash } from '@/components/hooks/useHash';
import Overview from '@/src/account/overview';
import Miners from '@/src/account/miners';
import Personal from '@/src/account/personal';
import Lucky from '@/src/account/lucky';
import Balance from '@/src/account/balance';
import Reward from '@/src/account/reward';
import { proApi } from '@/contents/apiUrl';
import NoMiner from '@/src/account/NoMiner';
import useAxiosData from '@/store/useAxiosData';
import Power from '@/src/account/power';
import Gas from '@/src/account/gas';
import Expired from '@/src/account/expired';
import { Skeleton } from 'antd';
import { UserInfo } from '@/store/UserStore';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Account: React.FC = () => {
  const { tr } = Translation({ ns: 'account' });
  const { hash, hashParams } = useHash();
  const rootSubmenuKeys: Array<string> = [];
  const userInfo = UserInfo();
  const router = useRouter();
  const selectedKey = useMemo(() => {
    if (hash) {
      return hash;
    }
    return 'overview';
  }, [hash]);

  const { data: minersNum, loading: minerLoading } =
    useAxiosData(proApi.account_miners) || {};
  const { data: groupsData, loading: groupsLoading } = useAxiosData(
    proApi.getGroupsId
  );

  const groups = useMemo(() => {
    const newGroups: any = [{ label: tr('all'), value: '0', group_id: '0' }];
    if (groupsData && groupsData.group_list) {
      (groupsData.group_list || []).forEach((group: any) => {
        newGroups.push({
          ...group,
          value: String(group.group_id),
          label: tr(group?.group_name),
        });
      });
    }

    return newGroups;
  }, [groupsData]);

  function getChildren(arr: Array<any>) {
    return arr.map((v) => {
      return { ...v, label: tr(v.label) };
    });
  }
  const menuData = useMemo(() => {
    let itemsArr: any = [];
    account_manager.forEach((item) => {
      if (item.key !== 'logout') {
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
      }
    });
    return itemsArr;
  }, []);

  useEffect(() => {
    if (!userInfo.mail && !localStorage.getItem('token')) {
      router.push('/account/login');
    }
  }, [userInfo.mail]);

  if (minerLoading) {
    return (
      <div className='mt-10'>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }
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
                <Link
                  key={parent.label}
                  href={`/account#${parent.key}`}
                  scroll={false}
                  className={`cursor-pointer  flex gap-x-2 items-center p-2.5 text_color rounded-[5px] hover:text-primary ${
                    parent?.icon ? 'font-medium' : 'ml-5 font-normal'
                  } ${
                    selectedKey === parent.key ? 'text-primary bg-bg_hover' : ''
                  }`}>
                  <span className='flex items-center gap-x-2 px-4'>
                    {parent.icon}
                    {tr(parent.label)}
                  </span>
                </Link>
              );
            })}
          </ul>
        </div>
        <div
          className='flex-grow flex flex-col px-5 py-10 w_account'
          style={{ height: 'inherit' }}>
          {minersNum?.miners_count === 0 &&
          hashParams.type !== 'miner_add' &&
          selectedKey !== 'personal' ? (
            <NoMiner selectedKey={selectedKey} />
          ) : (
            <>
              {selectedKey === 'overview' && (
                <Overview selectedKey='overview' groups={groups} />
              )}
              {selectedKey === 'miners' && <Miners minersNum={minersNum} />}
              {selectedKey === 'lucky' && (
                <Lucky
                  selectedKey={'overview_' + selectedKey}
                  groups={groups}
                />
              )}
              {selectedKey === 'power' && (
                <Power
                  selectedKey={'overview_' + selectedKey}
                  groups={groups}
                />
              )}
              {selectedKey === 'gas' && (
                <Gas selectedKey={'overview_' + selectedKey} groups={groups} />
              )}
              {selectedKey === 'balance' && (
                <Balance
                  selectedKey={'overview_' + selectedKey}
                  groups={groups}
                />
              )}
              {selectedKey === 'expired' && (
                <Expired
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
