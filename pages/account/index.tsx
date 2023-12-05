/** @format */

import React, { useEffect, useMemo } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { account_manager } from '@/contents/account'
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
import Vip from '@/assets/images/member/vip.svg'
import { BrowserView, MobileView } from '@/components/device-detect'
import style from './index.module.scss'
import Active from '@/src/account/active'
import Warn from '@/src/user/Warn'

const Account: React.FC = () => {
  const { tr } = Translation({ ns: 'account' })
  const { userInfo, showMemberWarn } = userStore
  const { superVip } = userInfo
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
    if (!userInfo.mail || !localStorage.getItem(`token-${userInfo.mail}`)) {
      router.push('/admin/login')
      return
    } else {
      accountStore.getAccountMinersNumber()
      accountStore.getAccountGroup()
    }
  }, [userInfo.mail])

  if (loading) {
    return <Loading />
  }

  const handleChange = (openKeys: any, item: any) => {
    if (item.vip && !superVip) {
      userStore.setVipModal(true)
    }
  }

  const renderMenuItem = (item: any) => {
    if (item.label === 'logout') {
      return null
    }
    if (item.children) {
      return (
        <Menu.SubMenu
          key={item.key}
          icon={item.icon}
          title={
            <span className={style.submenu_title}>
              {tr(item.label)}
              {item.vip && (
                <span className={style.submenu_title_vip}>
                  <Vip />
                </span>
              )}
              {item.sufIcon}
            </span>
          }
          onTitleClick={({ key }) => {
            handleChange(key, item)
          }}
        >
          {item.vip && !superVip ? <></> : item.children.map(renderMenuItem)}
        </Menu.SubMenu>
      )
    }

    return (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link href={`/account#${item.key}`} scroll={false}>
          <span className={style.submenu_title}>
            {tr(item.label)}
            <span className={style.submenu_title_icon}>{item.sufIcon}</span>
          </span>
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
    active: <Active />,
  }

  const noMiners = ['miner_add', 'person', 'miners', 'active']
  return (
    <>
      <BrowserView>
        <div className="main_contain !py-6 ">
          {showMemberWarn && (
            <div className="mb-5 flex w-full items-center justify-center text-warnColor">
              <span
                className="cursor-pointer"
                onClick={() => {
                  userStore.setVipModal(true)
                }}
              >
                <i className="ri-error-warning-line mr-1"></i>
                {tr('member_warn')}
              </span>

              <span
                className="ml-4 cursor-pointer"
                onClick={() => {
                  userStore.setMemberWarn(false)
                }}
              >
                <i className="ri-close-line"></i>
              </span>
            </div>
          )}
          <div className="card_shadow border_color flex h-full w-full rounded-xl border ">
            <div className="border_color w-[210px] border-r  py-10">
              <div className="mb-10 w-full px-5 font-HarmonyOS text-lg font-semibold	">
                {tr('account_title')}
              </div>
              <Menu
                mode="inline"
                className="custom_menu"
                selectedKeys={[selectedKey]}
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
              !noMiners.includes(selectedKey) ? (
                <NoMiner selectedKey={selectedKey} />
              ) : (
                childrenData[selectedKey]
              )}
            </div>
          </div>
        </div>
        <Warn />
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
