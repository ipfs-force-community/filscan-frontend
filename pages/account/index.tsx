/** @format */

import React, {useEffect, useMemo } from 'react';
import { Translation } from '@/components/hooks/Translation';
import { account_manager } from '@/contents/account';
import { useHash } from '@/components/hooks/useHash';
import Overview from '@/src/account/overview';
import Miners from '@/src/account/miners';
import Personal from '@/src/account/personal';
import Lucky from '@/src/account/manage/lucky';
import Balance from '@/src/account/manage/balance';
import Reward from '@/src/account/manage/reward';
import NoMiner from '@/src/account/NoMiner';
import Power from '@/src/account/manage/power';
import Gas from '@/src/account/manage/gas';
import Expired from '@/src/account/manage/expired';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Loading from '@/components/loading';
import MonitorBalance from '@/src/account/monitor/balance';
import MonitorSector from '@/src/account/monitor/sector'
import accountStore from '@/store/modules/account';
import userStore from '@/store/modules/user';
import { Menu } from 'antd';
import { observer } from 'mobx-react';

const Account: React.FC = () => {
  const { tr } = Translation({ ns: 'account' });
  const {userInfo } = userStore;
  const { countMiners } = accountStore;
  const { miners_count,loading } = countMiners;
  const { hash, hashParams } = useHash();
  const router = useRouter()
  const selectedKey = useMemo(() => {
    if (hash) {
      return hash;
    }
    return 'overview';
  }, [hash]);

  useEffect(() => {
    if (!userInfo.mail || !localStorage.getItem('token')) {
      router.push('/account/login');
      return
    } else { 
      accountStore.getAccountMinersNumber()
    }
  }, [userInfo.mail]);
  
  if (loading) {
    return <Loading />
  }

  const renderMenuItem = (item:any) => {
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={tr(item.label)}>
          {item.children.map(renderMenuItem)}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.key} icon={item.icon} >
        <Link
          href={`/account#${item.key}`}
          scroll={false}>
          {tr(item.label)}
        </Link>
      </Menu.Item>
    );
  };

  return (
    <div className='main_contain !py-6 '>
      <div className='w-full h-full flex rounded-xl border card_shadow border_color '>
        <div className='w-[210px] border-r border_color  py-10'>
          <div className='w-full px-5 mb-10 text-lg font-semibold font-PingFang	'>
            {tr('account_title')}
          </div>
          <Menu mode="inline"
            className='custom_menu'
            selectedKeys={[selectedKey] }
            defaultOpenKeys={['data_details', 'monitor']}>
            {account_manager.map(renderMenuItem)}
          </Menu>
        </div>
        <div
          className='flex-grow flex flex-col px-5 py-10 w_account min-h-full'
          style={{ height: 'inherit' }}>
          {!miners_count&&
          hashParams.type !== 'miner_add' &&
          selectedKey !== 'personal' && selectedKey !== 'miners' ? (
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
                  />
                )}
                {selectedKey === 'power' && (
                  <Power
                    selectedKey={'overview_' + selectedKey}

                  />
                )}
                {selectedKey === 'gas' && (
                  <Gas selectedKey={'overview_' + selectedKey} />
                )}
                {selectedKey === 'balance' && (
                  <Balance
                    selectedKey={'overview_' + selectedKey}

                  />
                )}
                {selectedKey === 'expired' && (
                  <Expired
                    selectedKey={'overview_' + selectedKey}

                  />
                )}
                {selectedKey === 'reward' && (
                  <Reward
                    selectedKey={'overview_' + selectedKey}

                  />
                )}
                {selectedKey === 'monitorBalance' && (
                  <MonitorBalance selectedKey={'monitor_balance'}/>
                )}
                {selectedKey === 'monitorSector' && (
                  <MonitorSector />
                )}
                {selectedKey === 'personal' && <Personal />}
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default observer(Account); //已登录/注册
