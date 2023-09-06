import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import fetchData from '../server';
import { apiUrl } from '@/contents/apiUrl';
import { get } from 'lodash';
import { unitConversion } from '@/utils';
import { DefiProtocol, EvmContractData, MinerPowerRankData } from '../homeData';
import { data } from 'autoprefixer';

class HomeStore {
  meta = {
    power_increase_24h:'0',
    add_power_in_32g:'0',
    miner_initial_pledge:'0',
    fil_per_tera_24h:'0',
    total_contract:'0',
    contract_transaction:'0',
    contract_address:'0',
    gas_24:'0'
  }
  fee :any[]= []

  defiData?:{
    total:number,
    items:DefiProtocol[]
  }

  contractData?:EvmContractData
  minerPowerRankData?: MinerPowerRankData
  constructor() {
    this.defiData = undefined
    this.contractData = undefined
    this.minerPowerRankData = undefined
    makeObservable(this, {
      meta: observable,
      fee: observable,
      defiData:observable,
      contractData:observable,
      minerPowerRankData:observable,
      fetchContractRank:action,
    });
  }

  /**
   *
   * @param params
   */
  async fetchHomeDefi(params:{page:number,limit:number,field?:string,reverse?:boolean}) {
    params.page = params.page - 1
    const result:any = await fetchData(apiUrl.fevm_defiList, params);
    if (!result.error) {
      this.defiData = result
    }
  }

  async fetchContractRank(data:{
    page:number,
    limit:number,
    sort:string,
    field:string
  }){
    data.page = data.page - 1
    const res: any = await fetchData(apiUrl.contract_rank, data);
    if (!res.error) {
      runInAction(()=>{
        this.contractData = res;
      })
    }
  }

  async fetchMinerPowerRank(data:{
    index:number,
    limit:number,
    interval:string,
    order:{field:string,sort:string},
    sector_size?:string | null
  }){
    data.index = data.index - 1
    const res: any = await fetchData(apiUrl.rank_growth,data)
    if (!res.error) {
      runInAction(()=>{
        this.minerPowerRankData = res;
      })
    }
  }
}

const homeStore = new HomeStore();

export default homeStore;
