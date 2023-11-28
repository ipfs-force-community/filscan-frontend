/** @format */

import { Translation } from '@/components/hooks/Translation'
import MinerAdd from './Add'
import { useHash } from '@/components/hooks/useHash'
import { proApi } from '@/contents/apiUrl'
import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import GroupAdd from './GroupAdd'
import { MinerNum, groupsItem } from '../type'
import useAxiosData from '@/store/useAxiosData'
import Vip from '@/assets/images/member/vip.svg'
import Groups from './Groups'
import accountStore from '@/store/modules/account'

export default () => {
  const { hashParams } = useHash()
  const { type, group } = hashParams || {}
  const { tr } = Translation({ ns: 'account' })
  const { countMiners } = accountStore
  const { miners_count, max_miners_count } = countMiners
  const [groups, setGroups] = useState<Array<groupsItem>>([])
  const [defaultGroupsId, setDefaultGroupsId] = useState()
  // const {setAllNum } = useMinerStore();
  const { data: groupsData, loading, error } = useAxiosData(proApi.getGroups)
  const { axiosData } = useAxiosData()

  // useEffect(() => {
  //   loadMinersNum()
  // }, []);

  // const loadMinersNum = async () => {
  //   const result = await axiosData(proApi.account_miners, {}, { isCancel: false });
  //   setMinerNum(result)
  // }

  useEffect(() => {
    calcGroups(groupsData?.group_info_list || [])
  }, [groupsData])

  //组成公共select item
  const calcGroups = (groupResult: Array<groupsItem>) => {
    const new_data: any = []
    let default_groups_id
    groupResult?.forEach((item: groupsItem) => {
      if (item.is_default) {
        default_groups_id = item.group_id
      }
      new_data.push({
        ...item,
        label: item.is_default ? tr('default_group') : item.group_name,
        value: item.group_id,
      })
    })
    setDefaultGroupsId(default_groups_id)
    setGroups(new_data)
  }

  const groupDetail = useMemo(() => {
    if (group) {
      const file = groups?.find((v: any) => v.group_id === Number(group))
      return file
    }
    return undefined
  }, [group, groups])

  const renderChildren = () => {
    if (type === 'miner_add' && groupsData) {
      return (
        <MinerAdd
          groups={groups}
          defaultId={defaultGroupsId}
          minersNum={countMiners}
        />
      )
    }

    if (type === 'group_add') {
      return (
        <GroupAdd
          groupId={group}
          groupDetail={groupDetail}
          minersNum={countMiners}
        />
      )
    }
    if (group && groupDetail) {
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
        <span className="font-PingFang text-lg	 font-semibold">
          {tr('miners')}
          <span className="text_des ml-2 font-DIN text-sm">
            {miners_count}/{max_miners_count}
          </span>
          {miners_count >= max_miners_count && (
            <span>
              <Vip />
              {tr('member_miner_warn')}
            </span>
          )}
        </span>
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
}
