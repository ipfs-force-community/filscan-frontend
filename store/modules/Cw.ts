import { makeObservable, observable, runInAction } from 'mobx'

class CWStore {
  finalHeight: number
  constructor() {
    this.finalHeight = 0
    makeObservable(this, {
      finalHeight: observable,
    })
  }

  setFinalHeight(value: number) {
    runInAction(() => {
      this.finalHeight = value
    })
  }
}

const cwStore = new CWStore()
export default cwStore
