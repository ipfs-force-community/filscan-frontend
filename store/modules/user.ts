import { RequestResult, axiosServer } from '@/store/axiosServer'
import { login, resetPassword, userInfo, verifyCode } from '@/store/ApiUrl'
import { makeObservable, observable, runInAction } from 'mobx'
import messageManager from '@/packages/message'
import router from 'next/router'

const defaultUser = {
  name: '',
  mail: '',
  last_login: 0,
  superVip: true,
}

class UserStore {
  userInfo: Record<string, any>
  verifyCode: string
  vipModal: boolean
  constructor() {
    this.userInfo = {
      ...defaultUser,
      loading: true,
    }
    this.verifyCode = ''
    this.vipModal = false
    makeObservable(this, {
      userInfo: observable,
      vipModal: observable,
    })
    this.getUserInfo()
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
      router.push('/admin.login')
    }
  }

  //获取用户登录信息
  async getUserInfo() {
    const userData: RequestResult = await axiosServer(userInfo)
    runInAction(() => {
      this.userInfo = {
        ...(userData?.data || {}),
        superVip: true,
        last_login: userData?.data?.last_login_at || '',
        loading: false,
      }
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
      localStorage.setItem('token', userData.data?.token)
      this.getUserInfo()
      messageManager.showMessage({
        type: 'success',
        content: 'login successful',
      })
      router.push('/account#overview')
    }
  }

  setUserInfo(user?: any) {
    runInAction(() => {
      if (!user) {
        this.userInfo = {
          ...defaultUser,
          loading: false,
        }
      } else {
        this.userInfo = {
          ...(user || {}),
          superVip: true,
          last_login: user?.last_login_at || '',
          loading: false,
        }
      }
    })
  }
}

const userStore = new UserStore()

export default userStore
