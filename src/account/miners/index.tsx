/** @format */

import { Translation } from '@/components/hooks/Translation'
import { useHash } from '@/components/hooks/useHash'
import { useMemo } from 'react'
import Link from 'next/link'
import GroupAdd from './GroupAdd'
import Groups from './Groups'
import MinerAdd from './Add'
import { observer } from 'mobx-react'
import accountStore from '@/store/modules/account'
import userStore from '@/store/modules/user'
import Vip from '@/assets/images/member/vip.svg'

export default observer(() => {
  const { hashParams } = useHash()
  const { type, group } = hashParams || {}
  const { tr } = Translation({ ns: 'account' })
  const { countMiners, groupMiners, defaultGroup } = accountStore
  const { miners_count, max_miners_count } = countMiners

  const selectGroupsItems = useMemo(() => {
    const newGroups: Array<any> = []
    if (groupMiners) {
      groupMiners.forEach((item) => {
        newGroups.push({
          group_id: item.group_id,
          is_default: item.is_default,
          name: item.group_name,
          label: item.is_default ? tr('default_group') : item.group_name,
          value: item.group_id,
        })
      })
    }
    return newGroups
  }, [groupMiners])

  const groupDetail = useMemo(() => {
    let selectGroup: any = {}
    if (group && groupMiners) {
      selectGroup = groupMiners?.find((v) => v.group_id === Number(group))
    }
    return selectGroup
  }, [group, groupMiners])

  const renderChildren = () => {
    if (type === 'miner_add') {
      return (
        <MinerAdd
          groups={selectGroupsItems}
          defaultId={defaultGroup?.group_id}
          minersNum={countMiners}
        />
      )
    }
    //添加分组
    if (type === 'group_add') {
      return (
        <GroupAdd
          groupId={group}
          //groupDetail={groupDetail}
          minersNum={countMiners}
        />
      )
    } else if (group) {
      //编辑分组
      return (
        <GroupAdd
          groupId={group}
          groupDetail={groupDetail}
          minersNum={countMiners}
        />
      )
    }
    return <Groups />
  }

  return (
    <>
      <p className="mb-5 flex w-full justify-between align-baseline	">
        <div className="flex items-center gap-x-2 ">
          <span className="font-PingFang text-lg font-semibold">
            {tr('miners')}
            <span className="text_des ml-2 font-DIN text-sm">
              {miners_count}/
              {max_miners_count > 100 ? '100+' : max_miners_count}
            </span>
          </span>
          {miners_count >= max_miners_count && (
            <span
              className="flex cursor-pointer items-center gap-x-1 text-xs font-normal text-warnColor"
              onClick={() => {
                userStore.setVipModal(true)
              }}
            >
              <Vip />
              {tr('member_miner_warn')}
            </span>
          )}
        </div>

        <div className="flex items-center gap-x-2.5">
          <Link
            href={`/account#miners?type=group_add`}
            scroll={false}
            className={`border-color text_color flex items-center  gap-x-2.5 rounded-[5px] border ${
              type === 'group_add' ? 'confirm_btn' : 'cancel_btn'
            }`}
          >
            {/* {getSvgIcon('addIcon')} */}
            {tr('group_add')}
          </Link>
          <Link
            href={`/account#miners?type=miner_add`}
            scroll={false}
            className={`cancel_btn  border-color text_color flex items-center gap-x-2.5 rounded-[5px] border ${
              type === 'miner_add' ? 'confirm_btn' : 'cancel_btn'
            }`}
          >
            {/* {getSvgIcon('addIcon')} */}
            {tr('miners_add')}
          </Link>
        </div>
      </p>
      {renderChildren()}
    </>
  )
})
