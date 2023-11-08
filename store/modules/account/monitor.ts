import messageManager from "@/packages/message";
import { getRules, rulesActive, saveRules } from "@/store/ApiUrl";
import { axiosServer } from "@/store/axiosServer";
import { makeObservable, observable, runInAction } from "mobx";

const defaultPayload:Record<string,any>= {
  ExpireSectorMonitor: {
    monitor_type:'ExpireSectorMonitor',
    group_id_or_all: -1,
    miner_or_all:'all',
  },

}

class MonitorStore {
  saveLoading: boolean;
  rulesLoading: boolean;
  rules: Array<any>;
  constructor() {
    this.saveLoading = false;
    this.rulesLoading = false;
    this.rules = [];
    makeObservable(this, {
      saveLoading: observable,
      rulesLoading: observable,
      rules:observable
    })
  }

  async getUserRules(payload: any) {
    runInAction(() => {
      this.rulesLoading = true;
    })
    const result = await axiosServer(getRules, { ...payload });
    runInAction(() => {
      this.rulesLoading = false;
      this.rules = result?.data?.items ||[]
    })

  }

  async saveUserRules(payload: any) {
    runInAction(() => {
      this.saveLoading = true;
    })
    const result = await axiosServer(saveRules, { Items: payload });
    runInAction(() => {
      this.saveLoading = false;
    })
    if (!result.error) {
      messageManager.showMessage({
        type: 'success',
        content: 'Save Rules successfully',
      });
    }
    return true
  }

  async ruleActive(payload:any,type:string) {
    const result = await axiosServer(rulesActive, { ...payload });
    if (!result.error) {
      this.getUserRules(defaultPayload[type]);
    }
  }
}
const monitorStore = new MonitorStore();

export default monitorStore;