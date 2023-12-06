//监控管理

import {
  UserGroups,
  countMiners,
  delGroup,
  deleteMiners,
  saveGroup,
  saveMiner,
} from '@/store/ApiUrl'
import { RequestResult, axiosServer } from '@/store/axiosServer'
import { makeObservable, observable, runInAction } from 'mobx'
import { GroupInfoList } from './type'
import messageManager from '@/packages/message'

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
      await this.getAccountMinersNumber()
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
      await this.getAccountGroup()
      return true
    }
  }
  //保存分组
  async saveGroups(payload: any) {
    const result: RequestResult = await axiosServer(saveGroup, payload)
    if (!result.error) {
      if (!result?.data?.code) {
        await this.getAccountGroup()
        return {
          error: null,
        }
      } else {
        messageManager.showMessage({
          type: 'error',
          content: result?.data?.message || '',
        })
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
      await this.getAccountGroup()
    }
  }
  //删除某个分组内节点
  async delMiners(miner_id: string) {
    const result: RequestResult = await axiosServer(deleteMiners, { miner_id })
    if (!result.error) {
      await this.getAccountGroup()
      return messageManager.showMessage({
        type: 'success',
        content: 'delete miner successfully',
      })
    } else {
      return messageManager.showMessage({
        type: 'error',
        content: 'delete miner error',
      })
    }
  }
}

const accountStore = new AccountStore()

export default accountStore
