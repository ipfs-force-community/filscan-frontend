import { makeObservable, observable } from 'mobx'

class FilscanStore {
  theme = 'light'
  lang = 'zh'

  constructor() {
    makeObservable(this, {
      theme: observable,
      lang: observable,
    })
  }

  setTheme(theme: string) {
    this.theme = theme
  }
  setLang(lang: string) {
    this.lang = lang
  }
}

const filscanStore = new FilscanStore()

export default filscanStore
