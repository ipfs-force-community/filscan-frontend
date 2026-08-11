const mainUrl = process.env.APP_BASE_URL
const testUrl = 'http://192.168.19.80:27000/pro/v1'
const test1Url = 'http://192.168.19.80:17000/pro/v1'

const proUrl = process.env.APP_BASE_URL_PRO

// 静态资源基地址（images 等资源的根目录），通过 .env 的 NEXT_PUBLIC_STATIC_URL 配置：
//   - 留空：使用本地资源（相对路径 /images/xxx，资源放 public/images 或由 nginx 提供）
//   - OSS：https://filscan-v2.oss-accelerate.aliyuncs.com/fvm_manage
//   - CDN：https://cdn.filscan.io/fvm_manage
export const staticUrl = process.env.NEXT_PUBLIC_STATIC_URL || ''

//用户信息
export const login = proUrl + '/Login'
export const userInfo = proUrl + '/UserInfo'
export const verifyCode = proUrl + '/SendVerificationCode'
export const resetPassword = proUrl + '/ResetPasswordByCode'
export const inviteCode = proUrl + '/UserInviteCode'
export const inviteList = proUrl + '/UserInviteRecord'
export const ValidInvite = proUrl + '/ValidInvite'
export const updateInfo = proUrl + '/UpdateUserInfo'

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
