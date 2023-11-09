import messageManager from "@/packages/message";
import { deleteRules, getRules, minerCategory, rulesActive, saveRules } from "@/store/ApiUrl";
import { axiosServer } from "@/store/axiosServer";
import { makeObservable, observable, runInAction } from "mobx";

const defaultPayload:Record<string,any>= {
  ExpireSectorMonitor: {
    monitor_type:'ExpireSectorMonitor',
    group_id_or_all: -1,
    miner_or_all: '',
    miner_tag:''
  },
  BalanceMonitor:{
    category:undefined,
    operand: '',
    addr: '',
    balance:'',
    placeholder: 'sector_ruler_placeholder',
    warning: false,
    operator:'<=',
    warningText:'sector_ruler_warningText',
  }

}

const defaultMiners = {
  beneficiary: 'beneficiary_balance',
  owner: 'owner_balance',
  worker: 'worker_balance',
}
class MonitorStore {
  saveLoading: boolean;
  rulesLoading: boolean;
  rules: Array<any>;
  minersCategory: Record<string, any>;
  constructor() {
    this.saveLoading = false;
    this.rulesLoading = false;
    this.minersCategory = {};
    this.rules = [];
    makeObservable(this, {
      saveLoading: observable,
      rulesLoading: observable,
      rules: observable,
      minersCategory:observable
    })
  }

  async getMinerCategory(miner_id:string) {
    const result: any = await axiosServer(minerCategory, { miner_id });
    console.log('===0033',result)
    runInAction(() => {
      this.minersCategory = {
        [miner_id]:result?.data?.miner_detail?.accounts || []
      }
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

  async saveUserRules(payload: any,) {
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

  async ruleActive(payload:any) {
    await axiosServer(rulesActive, { ...payload });
    return true
  }
  async deleteRules(payload: any) {
    const result = await axiosServer(deleteRules, { ...payload });
    if (!result.error) {
      messageManager.showMessage({
        type: 'success',
        content: 'Delete Rule successfully',
      });
    }
    return true
  }
}
const monitorStore = new MonitorStore();

export default monitorStore;