import { makeObservable, observable } from 'mobx'

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
    this.theme = theme
  }
  setLang(lang: string) {
    this.lang = lang
  }

  setHeaderShow(show: boolean) {
    this.headerShow = show
  }
}

const filscanStore = new FilscanStore()

export default filscanStore
