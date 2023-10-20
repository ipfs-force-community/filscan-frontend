import { makeObservable, observable } from "mobx";

class WalletStore {
  walletCard= {
    wallet: '',
    account:''
  }
  constructor() {
    makeObservable(this, {
      walletCard: observable,
    });
  }

  setWallet(walletItem:any) {
    this.walletCard = walletItem;
  }

}

const walletStore = new WalletStore();

export default walletStore;