import { makeObservable, observable, runInAction } from 'mobx'
import { Router } from 'next/router'

class FilscanStore {
  theme: string
  lang: string
  headerShow: boolean
  constructor() {
    this.headerShow = true
    this.lang = 'zh'
    this.theme = 'light'
    makeObservable(this, {
      theme: observable,
      lang: observable,
      headerShow: observable,
    })
  }

  setTheme(theme: string) {
    runInAction(() => {
      this.theme = theme
    })
  }
  setLang(lang: string) {
    runInAction(() => {
      this.lang = lang
    })
  }

  setHeaderShow(show: boolean) {
    runInAction(() => {
      this.headerShow = show
    })
  }
}

const filscanStore = new FilscanStore()

export default filscanStore
