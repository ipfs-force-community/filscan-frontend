//监控管理

import {
  UserGroups,
  countMiners,
  delGroup,
  saveGroup,
  saveMiner,
} from '@/store/ApiUrl'
import { RequestResult, axiosServer } from '@/store/axiosServer'
import { makeObservable, observable, runInAction } from 'mobx'
import { GroupInfoList } from './type'

class AccountStore {
  countMiners = {
    miners_count: 0,
    max_miners_count: 0,
    loading: true,
  }
  groupMiners?: GroupInfoList[]
  defaultGroup?: GroupInfoList
  constructor() {
    this.groupMiners = undefined
    this.defaultGroup = undefined
    makeObservable(this, {
      countMiners: observable,
      groupMiners: observable,
      defaultGroup: observable,
    })
    this.getAccountMinersNumber()
    this.getAccountGroup()
  }

  //用户名下节点数
  async getAccountMinersNumber() {
    const result: RequestResult = await axiosServer(countMiners)
    runInAction(() => {
      this.countMiners =
        {
          ...result.data,
          loading: false,
        } || {}
    })
  }
  //用户名下分组
  async getAccountGroup() {
    const result: RequestResult = await axiosServer(UserGroups)
    if (!result.error) {
      this.getAccountMinersNumber()
    }
    runInAction(() => {
      this.groupMiners = (result?.data?.group_info_list || []).map(
        (groups: GroupInfoList) => {
          // const miners = (groups?.miners_info||[]).map(v => {
          //   return {...v,label:String(v.miner_id),value:String(v.miner_id)}
          // })
          return {
            ...groups,
            label: groups.group_name,
            value: String(groups.group_id),
          }
        },
      )
      this.defaultGroup = result?.data?.group_info_list?.find(
        (v: GroupInfoList) => v.is_default,
      )
    })
  }
  //修改保存名下节点
  async saveMiners(groupItem: GroupInfoList[]) {
    const result: RequestResult = await axiosServer(saveMiner, groupItem)
    if (!result.error) {
      this.getAccountGroup()
      return true
    }
  }
  //保存分组
  async saveGroups(payload: any) {
    const result: RequestResult = await axiosServer(saveGroup, payload)
    if (!result.error) {
      if (!result?.data?.code) {
        this.getAccountGroup()
        return {
          error: null,
        }
      } else {
        return {
          ...result.data,
          error: 'error saving',
        }
      }
    }
  }
  //删除某个分组
  async delGroups(group_id: number) {
    const result: RequestResult = await axiosServer(delGroup, { group_id })
    if (!result.error) {
      this.getAccountGroup()
    }
  }
}

const accountStore = new AccountStore()

export default accountStore
