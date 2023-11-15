/** @format */

import React, { useEffect, useMemo } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { account_manager, account_power_mobile } from '@/contents/account'
import { useHash } from '@/components/hooks/useHash'
import Overview from '@/src/account/overview'
import Miners from '@/src/account/miners'
import Personal from '@/src/account/personal'
import Lucky from '@/src/account/manage/lucky'
import Balance from '@/src/account/manage/balance'
import Reward from '@/src/account/manage/reward'
import NoMiner from '@/src/account/NoMiner'
import Power from '@/src/account/manage/power'
import Gas from '@/src/account/manage/gas'
import Expired from '@/src/account/manage/expired'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Loading from '@/components/loading'
import MonitorBalance from '@/src/account/monitor/balance'
import MonitorSector from '@/src/account/monitor/sector'
import MonitorPower from '@/src/account/monitor/power'
import accountStore from '@/store/modules/account'
import userStore from '@/store/modules/user'
import { Menu } from 'antd'
import { observer } from 'mobx-react'
import { BrowserView, MobileView } from '@/components/device-detect'

const Account: React.FC = () => {
  const { tr } = Translation({ ns: 'account' })
  const { userInfo } = userStore
  const { countMiners } = accountStore
  const { miners_count, loading } = countMiners
  const { hash, hashParams } = useHash()
  const router = useRouter()
  const selectedKey = useMemo(() => {
    if (hash) {
      return hash
    }
    return 'overview'
  }, [hash])

  useEffect(() => {
    if (!userInfo.mail || !localStorage.getItem('token')) {
      router.push('/account/login')
      return
    } else {
      accountStore.getAccountMinersNumber()
      accountStore.getAccountGroup()
    }
  }, [userInfo.mail])

  if (loading) {
    return <Loading />
  }

  const renderMenuItem = (item: any) => {
    if (item.label === 'logout') {
      return null
    }
    if (item.children) {
      return (
        <Menu.SubMenu key={item.key} icon={item.icon} title={tr(item.label)}>
          {item.children.map(renderMenuItem)}
        </Menu.SubMenu>
      )
    }

    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link href={`/account#${item.key}`} scroll={false}>
          {tr(item.label)}
        </Link>
      </Menu.Item>
    )
  }

  const childrenData: Record<string, JSX.Element> = {
    overview: <Overview selectedKey="overview" />,
    miners: <Miners />,
    lucky: <Lucky selectedKey={'overview_lucky'} />,
    power: <Power selectedKey={'overview_power'} />,
    gas: <Gas selectedKey={'overview_gas'} />,
    balance: <Balance selectedKey={'overview_balance'} />,
    expired: <Expired selectedKey={'overview_expired'} />,
    reward: <Reward selectedKey={'overview_reward'} />,
    monitorBalance: <MonitorBalance />,
    monitorSector: <MonitorSector />,
    monitorPower: <MonitorPower />,
    personal: <Personal />,
  }

  return (
    <>
      <BrowserView>
        <div className="main_contain !py-6 ">
          <div className="card_shadow border_color flex h-full w-full rounded-xl border ">
            <div className="border_color w-[210px] border-r  py-10">
              <div className="mb-10 w-full px-5 font-PingFang text-lg font-semibold	">
                {tr('account_title')}
              </div>
              <Menu
                mode="inline"
                className="custom_menu"
                selectedKeys={[selectedKey]}
                // defaultOpenKeys={['data_details', 'monitor']}
              >
                {account_manager.map(renderMenuItem)}
              </Menu>
            </div>
            <div
              className="w_account flex min-h-full flex-grow flex-col px-5 py-10"
              style={{ height: 'inherit' }}
            >
              {!miners_count &&
              hashParams.type !== 'miner_add' &&
              selectedKey !== 'personal' &&
              selectedKey !== 'miners' ? (
                <NoMiner selectedKey={selectedKey} />
              ) : (
                childrenData[selectedKey]
              )}
            </div>
          </div>
        </div>
      </BrowserView>
      <MobileView>
        <div>
          {!miners_count &&
          hashParams.type !== 'miner_add' &&
          selectedKey !== 'personal' &&
          selectedKey !== 'miners' ? (
            <NoMiner selectedKey={selectedKey} />
          ) : (
            childrenData[selectedKey]
          )}
        </div>
      </MobileView>
    </>
  )
}

export default observer(Account) //已登录/注册
