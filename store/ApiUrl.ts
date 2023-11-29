const mainUrl = process.env.APP_BASE_URL
const testUrl = 'http://192.168.19.80:27000/pro/v1'
const test1Url = 'http://192.168.19.80:17000/pro/v1'

const proUrl = process.env.APP_BASE_URL_PRO
export const fvmUrl = process.env.FVM_URL

//用户信息
export const login = proUrl + '/Login'
export const userInfo = proUrl + '/UserInfo'
export const verifyCode = proUrl + '/SendVerificationCode'
export const resetPassword = proUrl + '/ResetPasswordByCode'
export const inviteCode = proUrl + '/UserInviteCode'
export const inviteList = proUrl + '/UserInviteRecord'

//活动
export const eventsList = mainUrl + '/GetEventsList'
//节点管家
export const countMiners = proUrl + '/CountUserMiners'
export const UserGroups = proUrl + '/GetUserGroups'
export const saveMiner = proUrl + '/SaveUserMiners'
export const delGroup = proUrl + '/DeleteGroup'
export const saveGroup = proUrl + '/SaveGroupMiners'
export const minerOverview = proUrl + '/MinerInfoDetail'
export const powerData = proUrl + '/PowerDetail'
export const gasData = proUrl + '/GasCostDetail'
export const expiredData = proUrl + '/SectorDetail'
export const rewardData = proUrl + '/RewardDetail'
export const luckyData = proUrl + '/LuckyRateDetail'
export const balanceData = proUrl + '/BalanceDetail'
export const minerCategory = proUrl + '/GetRuleMinerInfo'
export const saveRules = proUrl + '/SaveUserRules'
export const getRules = proUrl + '/GetUserRules'
export const rulesActive = proUrl + '/UpdateRuleActiveState'
export const deleteRules = proUrl + '/DeleteUserRule'
export const deleteMiners = proUrl + '/DeleteGroupMiners'
