const mainUrl = process.env.APP_BASE_URL;
// const testUrl = 'http://192.168.19.80:17000/api/v1'
const proUrl = process.env.APP_BASE_URL_PRO || 'http://192.168.1.177:27000/pro/v1';
export const fvmUrl = process.env.FVM_URL;

//用户信息
export const userInfo = proUrl + '/UserInfo'
//节点管家
export const countMiners = proUrl + '/CountUserMiners';
export const UserGroups = proUrl + '/GetUserGroups';
export const saveMiner = proUrl + '/SaveUserMiners';
export const delGroup = proUrl + '/DeleteGroup';
export const saveGroup =proUrl + '/SaveGroupMiners'
