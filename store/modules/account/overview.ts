import { minerOverview } from "@/store/ApiUrl";
import { RequestResult, axiosServer } from "@/store/axiosServer";
import { makeObservable, observable, runInAction } from "mobx";

class OverviewStore {
  overviewData: Record<string,any>;
  loading: boolean;
  constructor() {
    this.overviewData = {}
    this.loading= true;
    makeObservable(this, {
      overviewData: observable,
      loading:observable
    });

  }

  async getOverViewData(groupId: number) {
    runInAction(()=>{
      this.loading = true;
    })
    const result: RequestResult = await axiosServer(minerOverview, {group_id:groupId});
    runInAction(() => {
      this.loading = false;
      this.overviewData = result?.data || {};
    })
  }
}

const overviewStore = new OverviewStore();

export default overviewStore;