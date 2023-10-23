import { RequestResult, axiosServer } from "@/store/axiosServer";
import { userInfo } from "@/store/ApiUrl";
import { makeObservable, observable, runInAction } from "mobx";

const defaultUser = {
  name: "",
  mail: '',
  last_login: 0,

}

class UserStore {
  userInfo= {
    ...defaultUser,
    loading:true
  }
  constructor() {
    makeObservable(this, {
      userInfo: observable,
    });
    this.getUserInfo();
  }

  //获取用户登录信息
  async getUserInfo() {
    const userData: RequestResult = await axiosServer(userInfo);
    runInAction(()=>{
      this.userInfo = {
        ...userData?.data || {},
        last_login: userData?.data?.last_login_at||"",
        loading:false
      }
    })

  }

  setUserInfo(user?: any) {
    if (!user) {
      this.userInfo = {
        ...defaultUser,
        loading: false
      }
    } else {
      this.userInfo = {
        ...user || {},
        last_login: user?.last_login_at||"",
        loading:false
      }
    }

  }

  // 退出登录
  logoutUser() {
    this.userInfo = {
      ...defaultUser,

      loading: false
    }
  }

}

const userStore = new UserStore();

export default userStore;