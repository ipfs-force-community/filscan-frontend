import { makeObservable, observable, runInAction } from "mobx";

class CWStore {

  finalHeight: number;
  constructor() {
    this.finalHeight = 0;
    makeObservable(this, {
      finalHeight: observable,
    });
  }

  setFinalHeight(value: number) {
<<<<<<< HEAD
    // console.log('===3',value)
=======
    console.log('===3',value)
>>>>>>> 7910c2db (fix: cw)
    runInAction(()=>{
      this.finalHeight = value;
    })
  }
}

const cwStore = new CWStore();
export default cwStore;