import { RequestResult, axiosServer } from '@/store/axiosServer'
import {
  inviteCode,
  inviteList,
  login,
  resetPassword,
  updateInfo,
  userInfo,
  verifyCode,
} from '@/store/ApiUrl'
import { computed, makeObservable, observable, runInAction } from 'mobx'
import messageManager from '@/packages/message'
import Router from 'next/router'
import { formatTime } from '@/utils'

const defaultUser = {
  name: '',
  mail: '',
  last_login: 0,
  superVip: false,
  membership_type: '',
  expired_time: '',
}

class UserStore {
  userInfo: Record<string, any>
  verifyCode: string
  vipModal: boolean
  recordList: Array<any>
  showMemberWarn: boolean
  memberWarn: boolean
  firstWarn: boolean
  inviteCode: string
  constructor() {
    this.userInfo = {
      ...defaultUser,
      loading: true,
    }
    this.verifyCode = ''
    this.vipModal = false
    this.recordList = []
    this.showMemberWarn = false
    this.memberWarn = false
    this.firstWarn = false
    this.inviteCode = ''
    makeObservable(this, {
      isLogin: computed,
      inviteCode: observable,
      userInfo: observable,
      verifyCode: observable,
      vipModal: observable,
      recordList: observable,
      showMemberWarn: observable,
      memberWarn: observable,
      firstWarn: observable,
    })
    this.getUserInfo()
  }

  get isLogin() {
    return !(
      !this.userInfo.mail ||
      !localStorage.getItem(`token-${this.userInfo.mail}`)
    )
  }

  setMemberWarn(isShow: boolean) {
    runInAction(() => {
      this.showMemberWarn = isShow
    })
  }
  // 关闭第一次弹窗
  setFirstWarn(value: boolean) {
    runInAction(() => {
      this.firstWarn = value
    })
  }

  setVipModal(isShow: boolean) {
    runInAction(() => {
      this.vipModal = isShow
    })
  }

  //验证码登录，获取验证码
  async getVerifyCode(mail: string) {
    const result: RequestResult = await axiosServer(verifyCode, { mail: mail })
    localStorage.setItem('send_code', result?.data?.token)
    runInAction(() => {
      this.verifyCode = result?.data?.token
    })
  }

  //重置密码
  async resetPassword(payload: any) {
    const userData: RequestResult = await axiosServer(resetPassword, {
      ...payload,
    })
    if (userData.error) {
      return false
    }
    if (!userData.error) {
      if (typeof window !== 'undefined') {
        // 使用 router 进行路由导航等操作
        Router.push('/admin/login')
      }
    }
  }

  //更新用户信息
  async resetUser(payload: any) {
    const userData: RequestResult = await axiosServer(updateInfo, {
      ...payload,
    })
    if (userData.error) {
      return false
    } else {
      this.clearUserInfo()
      messageManager.showMessage({
        type: 'success',
        content: 'Update successful',
      })
    }
    return true
  }

  //获取用户登录信息
  async getUserInfo() {
    const userData: RequestResult = await axiosServer(userInfo)
    if (!userData.error) {
      this.getUserCode()
      this.getInviteList()
    }
    if (!userData.error) {
      runInAction(() => {
        const superVip =
          userData?.data?.membership_type?.startsWith('Enterprise')
        if (
          superVip &&
          userData.data.expired_time &&
          formatTime(userData.data.expired_time * 1000).days > -15 &&
          formatTime(userData.data.expired_time * 1000).days < 0
        ) {
          //会员还有不超过15天到期
          this.showMemberWarn = true
          this.memberWarn = true
        }
        this.userInfo = {
          ...(userData?.data || {}),
          superVip:
            superVip && formatTime(userData.data.expired_time * 1000).days < 0,
          last_login: userData?.data?.last_login_at || '',
          loading: false,
        }
      })
    } else {
      runInAction(() => {
        this.userInfo = {
          ...defaultUser,
          loading: false,
        }
      })
    }
  }

  //获取我的邀请码
  async getUserCode() {
    const userData: RequestResult = await axiosServer(inviteCode)
    runInAction(() => {
      this.inviteCode = userData?.data?.invite_code || ''
    })
  }

  //邀请记录
  async getInviteList() {
    const list: RequestResult = await axiosServer(inviteList)
    runInAction(() => {
      this.recordList = list?.data?.items || []
    })
  }
  async loginUserInfo(payload: Record<string, any>) {
    const userData: any = await axiosServer(login, payload)
    if (userData?.data?.code) {
      return messageManager.showMessage({
        type: 'error',
        content: userData?.data?.message || '',
      })
    }
    if (!userData.error && !userData?.data?.code) {
      localStorage.setItem(`mail`, userData.data?.mail)
      localStorage.setItem(`token-${userData.data.mail}`, userData.data?.token)
      await this.getUserInfo()
      if (!userData.data.is_activity) {
        this.setFirstWarn(true)
      }

      if (typeof window !== 'undefined') {
        // 使用 router 进行路由导航等操作
        Router.push('/account#overview')
      }
      messageManager.showMessage({
        type: 'success',
        content: 'login successful',
      })
    }
  }

  //退出登录
  clearUserInfo() {
    runInAction(() => {
      this.userInfo = {
        ...defaultUser,
        loading: false,
      }
    })
    if (typeof window !== 'undefined') {
      // 使用 router 进行路由导航等操作
      Router.push('/admin/login')
    }
  }
}

const userStore = new UserStore()

export default userStore
