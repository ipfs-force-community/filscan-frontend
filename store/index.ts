//@ts-ignore
const modulesFiles = import.meta.glob('./modules/*ts');
const modules: Record<string, any> = {};

for (const path in modulesFiles) {
  if (Object.prototype.hasOwnProperty.call(modulesFiles, path)) {
    const moduleName = path.replace(/^\.\/(.*)\.\w+$/, '$1');
    modules[moduleName] = (modulesFiles[path]()).default;
  }
}

export default modules;

