const mainUrl = process.env.APP_BASE_URL
const testUrl = 'http://192.168.19.80:27000/pro/v1'
const test1Url = 'http://192.168.19.80:17000/pro/v1'

const proUrl = process.env.APP_BASE_URL_PRO
export const fvmUrl = process.env.FVM_URL

//用户信息
export const login = proUrl + '/Login'
export const userInfo = proUrl + '/UserInfo'

//节点管家
export const countMiners = proUrl + '/CountUserMiners'
export const UserGroups = proUrl + '/GetUserGroups'
export const saveMiner = proUrl + '/SaveUserMiners'
export const delGroup = proUrl + '/DeleteGroup'
export const saveGroup = testUrl + '/SaveGroupMiners'
export const minerOverview = proUrl + '/MinerInfoDetail'
export const powerData = proUrl + '/PowerDetail'
export const gasData = proUrl + '/GasCostDetail'
export const expiredData = proUrl + '/SectorDetail'
export const rewardData = proUrl + '/RewardDetail'
export const luckyData = proUrl + '/LuckyRateDetail'
export const balanceData = proUrl + '/BalanceDetail'
export const minerCategory = proUrl + '/GetMinerInfo'
export const saveRules = testUrl + '/SaveUserRules'
export const getRules = testUrl + '/GetUserRules'
export const rulesActive = testUrl + '/UpdateActiveState'
export const deleteRules = testUrl + '/DeleteUserRule'
