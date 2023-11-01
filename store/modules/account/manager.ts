import { minerOverview } from "@/store/ApiUrl";
import { RequestResult, axiosServer } from "@/store/axiosServer";
import { makeObservable, observable, runInAction } from "mobx";

class ManagerStore {
  overviewData: Record<string,any>;
  constructor() {
    this.overviewData = {}
    makeObservable(this, {
      overviewData: observable
    });

  }

  async getOverViewData(groupId:number) {
    const result: RequestResult = await axiosServer(minerOverview, {group_id:groupId});
    runInAction(()=>{
      this.overviewData = result?.data || {};
    })
  }
}

const managerStore = new ManagerStore();

export default managerStore;