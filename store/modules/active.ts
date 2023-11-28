import { makeObservable, observable, runInAction } from 'mobx'
import { RequestResult, axiosServer } from '../axiosServer'
import { eventsList } from '../ApiUrl'

class Active {
  activeList: Array<any>
  constructor() {
    this.activeList = []
    makeObservable(this, {
      activeList: observable,
    })
    this.getActiveList()
  }

  async getActiveList() {
    const result: RequestResult = await axiosServer(eventsList)
    runInAction(() => {
      this.activeList = result?.data?.items || []
    })
  }
}

const active = new Active()
export default active
