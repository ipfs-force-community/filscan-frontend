import { RequestResult, axiosServer } from '@/store/axiosServer'
import { login, userInfo } from '@/store/ApiUrl'
import { makeObservable, observable, runInAction } from 'mobx'
import messageManager from '@/packages/message'
import router from 'next/router'

const defaultUser = {
  name: '',
  mail: '',
  last_login: 0,
}

class UserStore {
  userInfo: Record<string, any>
  constructor() {
    this.userInfo = {
      ...defaultUser,
      loading: true,
    }
    makeObservable(this, {
      userInfo: observable,
    })
    this.getUserInfo()
  }

  //获取用户登录信息
  async getUserInfo() {
    const userData: RequestResult = await axiosServer(userInfo)
    runInAction(() => {
      this.userInfo = {
        ...(userData?.data || {}),
        last_login: userData?.data?.last_login_at || '',
        loading: false,
      }
    })
  }

  async loginUserInfo(payload: Record<string, any>) {
    const userData: any = await axiosServer(login, payload)
    if (!userData.error) {
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
          last_login: user?.last_login_at || '',
          loading: false,
        }
      }
    })
  }
}

const userStore = new UserStore()

export default userStore
