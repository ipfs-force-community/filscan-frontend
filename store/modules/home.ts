import { action, makeObservable, observable } from 'mobx';
import fetchData from '../server';
import { apiUrl } from '@/contents/apiUrl';

class HomeStore {
  meta = {
    power_increase_24h:'0'
  };

  constructor() {
    makeObservable(this, {
      meta: observable,
      fetchHomeMeta: action,
    });
  }
  SET_META(data: any) {
    this.meta = data;
  }
  async fetchHomeMeta() {
    try{
      const res = await fetchData(apiUrl.home_meta)
      console.log(res,'eeeee')
    }catch(error){
      console.log('fetchHomeMeta error');

    }
  }
}

const homeStore = new HomeStore();

export default homeStore;
