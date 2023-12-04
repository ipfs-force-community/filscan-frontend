import { makeObservable, observable } from 'mobx'

class WalletStore {
  // walletCard = {
  //   wallet: '',
  //   account: '',
  // }
  wallet: string
  account: string
  constructor() {
    this.wallet = ''
    this.account = ''
    makeObservable(this, {
      //walletCard: observable,
      wallet: observable,
      account: observable,
    })
  }

  setWallet(walletItem: any) {
    //  this.walletCard = walletItem
    this.wallet = walletItem?.wallet
    this.account = walletItem?.account
  }
}

const walletStore = new WalletStore()

export default walletStore
