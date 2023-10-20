import { RequestResult, axiosServer } from "@/store/axiosServer";
import { userInfo } from "@/store/ApiUrl";
import { makeObservable, observable } from "mobx";

const defaultUser = {
  name: "",
  mail: '',
  last_login_at: 0,

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
    this.userInfo = {
      ...userData?.data || {},
      loading:false
    }
  }

  setUserInfo(user:any) {
    this.userInfo = {
      ...user|| {},
      loading:false
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