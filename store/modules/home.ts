import { action, computed, makeObservable, observable } from 'mobx';
import fetchData from '../server';
import { apiUrl } from '@/contents/apiUrl';
import { get } from 'lodash';
import { unitConversion } from '@/utils';
import { metaModel } from '@/models/metaModel';
import { DefiProtocol } from '../homeData';

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
  constructor() {
    this.defiData = undefined
    makeObservable(this, {
      meta: observable,
      fee: observable,
      formatMeta:computed,
      defiData:observable,
      fetchHomeMeta: action,
    });
  }
  get formatMeta (){
    const [power_increase_24h, power_increase_24h_unit] = unitConversion(this.meta.power_increase_24h, 2).split(' ');
    const meta:metaModel={
      power_increase_24h,
      power_increase_24h_unit,
      power_increase_24h_increase:'',
      power_increase_24h_in_count:'0',

      add_power_in_32g:'0',
      add_power_in_32g_unit:'0',

      miner_initial_pledge:'0',
      miner_initial_pledge_unit:'0',

      fil_per_tera_24h:'0',
      fil_per_tera_24h_unit:'0',

      total_contract:'0',
      total_contract_increase:'',
      total_contract_in_count:'0',

      contract_transaction:'0',
      contract_transaction_increase:'',
      contract_transaction_in_count:'0',

      contract_address:'0',
      contract_address_increase:'',
      contract_address_in_count:'0',

      gas_24:'0',
      gas_24_unit:'0',
    }
    return meta
  }

  SET_META(data: any) {
    this.meta = data;
  }
  SET_FEE(data:any[]){
    this.fee = data
  }

  async fetchHomeMeta() {
    try{
      const res = await fetchData(apiUrl.home_meta)
      const power_increase_24h:string = get(res,'total_indicators.power_increase_24h')??'0'
      const add_power_in_32g:string = get(res,'total_indicators.add_power_in_32g')??'0';
      const miner_initial_pledge:string = get(res,'total_indicators.miner_initial_pledge')??'0';
      const fil_per_tera_24h:string = get(res,'total_indicators.fil_per_tera_24h')??'0';
      const total_contract:string = get(res,'total_indicators.total_contract')??'0';
      const contract_transaction:string = get(res,'total_indicators.contract_transaction')??'0';
      const contract_address:string = get(res,'total_indicators.contract_address')??'0';
      const gas_24:string = get(res,'total_indicators.gas_24')??'0';

      this.SET_META({
        power_increase_24h,
        add_power_in_32g,
        miner_initial_pledge,
        fil_per_tera_24h,
        total_contract,
        contract_transaction,
        contract_address,
        gas_24
      })
    }catch(error){
      console.log('fetchHomeMeta error');
    }
  }

  fetchFeeData(){
    return new Promise(async (resolve,reject)=>{
      const res = await fetchData(apiUrl.static_gas, { interval:'24h' })
      const list = get(res,'list')??[]
      this.SET_FEE(list.reverse())
      resolve(list)
    })
  }

  /**
   *
   * @param psrams
   */
  async fetchHomeDefi(params:{page:number,limit:number,field?:string,reverse?:boolean}) {
    params.page = params.page - 1
    const result:any = await fetchData(apiUrl.fevm_defiList, params);
    if (!result.error) {
      this.defiData = result
    }
  }
}

const homeStore = new HomeStore();

export default homeStore;
