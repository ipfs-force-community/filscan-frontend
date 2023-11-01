import { balanceData, expiredData, gasData, luckyData, minerOverview, powerData, rewardData } from "@/store/ApiUrl";
import { RequestResult, axiosServer } from "@/store/axiosServer";
import { makeObservable, observable, runInAction } from "mobx";

interface Payload {
              group_id: number
      end_date: string
      start_date: string
}

interface PayloadDetail {
miner_id: number|string,
      end_date: string
      start_date: string
}

class ManageStore {
  powerData: Record<string, any>;
  powerDetailData: Record<string, any>;
  gasData: Record<string, any>;
  gasDetailData: Record<string, any>;
  expiredData: Record<string, any>;
  expiredDetailData: Record<string, any>;
  rewardData: Record<string, any>;
  rewardDetailData: Record<string, any>;
  luckyData: Record<string, any>;
  balanceData: Record<string, any>;

  expiredLoading: boolean;
  powerLoading: boolean;
  powerDetailLoading: boolean ;
  gasLoading: boolean;
  gasDetailLoading: boolean;
  expiredDetailLoading: boolean;
  rewardLoading: boolean;
  rewardDetailLoading: boolean;
  luckyLoading: boolean;
  balanceLoading: boolean;

  constructor() {
    this.powerData = {};
    this.powerDetailData = {};
    this.gasData = {}
    this.gasDetailData = {};
    this.expiredData = {}
    this.expiredDetailData = {}
    this.rewardData = {}
    this.rewardDetailData = {}
    this.luckyData = {}
    this.balanceData = {}
    this.powerLoading = true;
    this.powerDetailLoading = true;
    this.gasLoading = true;
    this.gasDetailLoading = true
    this.expiredLoading = true
    this.expiredDetailLoading = true
    this.rewardLoading = true
    this.rewardDetailLoading = true
    this.luckyLoading = true
    this.balanceLoading=true
    makeObservable(this, {
      powerData: observable,
      powerDetailData: observable,
      gasData: observable,
      expiredData: observable,
      expiredDetailData: observable,
      rewardData: observable,
      rewardDetailData:observable,
      luckyData: observable,
      balanceData:observable,
      powerLoading: observable,
      powerDetailLoading: observable,
      gasLoading: observable,
      gasDetailLoading: observable,
      expiredLoading: observable,
      expiredDetailLoading: observable,
      rewardLoading: observable,
      rewardDetailLoading: observable,
      luckyLoading: observable,
      balanceLoading:observable
    });

  }

  async getPowerData(payload: Payload) {
    runInAction(() => {
      this.powerLoading=true
    })
    const result: RequestResult = await axiosServer(powerData, { ...payload });
    runInAction(() => {
      this.powerData = result?.data || {};
      this.powerLoading=false
    })
  }

  async getPowerDetailData(payload: PayloadDetail) {
    runInAction(() => {
      this.powerDetailLoading=true
    })
    const result: RequestResult = await axiosServer(powerData, { ...payload });
    runInAction(() => {
      this.powerDetailData = result?.data || {};
      this.powerDetailLoading=false
    })
  }

  //gas
  async getGasData(payload: Payload) {
    runInAction(() => {
      this.gasLoading=true
    })
    const result: RequestResult = await axiosServer(gasData, { ...payload });
    runInAction(() => {
      this.gasData = result?.data || {};
      this.gasLoading=false
    })
  }
  async getGasDetailData(payload: PayloadDetail) {
    runInAction(() => {
      this.gasDetailLoading=true
    })
    const result: RequestResult = await axiosServer(gasData, { ...payload });
    runInAction(() => {
      this.gasDetailData = result?.data || {};
      this.gasDetailLoading=false
    })
  }
  //expired
  async getExpiredData(payload:Record<string,number|string>) {
    runInAction(() => {
      this.expiredLoading=true
    })
    const result: RequestResult = await axiosServer(expiredData, {...payload });
    runInAction(() => {
      this.expiredData = result?.data || {};
      this.expiredLoading=false
    })
  }
  async getExpiredDetailData(payload:Record<string,number|string>) {
    runInAction(() => {
      this.expiredDetailLoading=true
    })
    const result: RequestResult = await axiosServer(gasData, { ...payload });
    runInAction(() => {
      this.expiredDetailData = result?.data || {};
      this.expiredDetailLoading=false
    })
  }
  //reward
  async getRewardData(payload: Payload) {
    runInAction(() => {
      this.rewardLoading=true
    })
    const result: RequestResult = await axiosServer(rewardData, { ...payload });
    runInAction(() => {
      this.rewardData = result?.data || {};
      this.rewardLoading=false
    })
  }

  async getRewardDetailData(payload: PayloadDetail) {
    runInAction(() => {
      this.rewardDetailLoading=true
    })
    const result: RequestResult = await axiosServer(rewardData, { ...payload });
    runInAction(() => {
      this.rewardDetailData = result?.data || {};
      this.rewardDetailLoading=false
    })
  }

  //lucky
  async getLuckyData(payload:Record<string,number|string>) {
    runInAction(() => {
      this.luckyLoading=true
    })
    const result: RequestResult = await axiosServer(luckyData, {...payload });
    runInAction(() => {
      this.luckyData = result?.data || {};
      this.luckyLoading=false
    })
  }
  //balance
  async getBalanceData(payload:Record<string,number|string>) {
    runInAction(() => {
      this.balanceLoading=true
    })
    const result: RequestResult = await axiosServer(balanceData, {...payload });
    runInAction(() => {
      this.balanceData = result?.data || {};
      this.balanceLoading=false
    })
  }
}

const manageStore = new ManageStore();

export default manageStore;