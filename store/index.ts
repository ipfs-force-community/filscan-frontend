//@ts-ignore
const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules = modulesFiles
  .keys()
  .reduce((modules: any, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    // @ts-ignore
    modules[moduleName] = value.default
    return modules
  }, {})

export default modules
