
const mianUrl = process.env.APP_BASE_URL;
const proUrl = process.env.APP_BASE_URL_PRO;
export const fvmUrl = process.env.FVM_URL;

export interface API { 
    home_meta: string;
    line_trend: string;
    static_gas: string;
    rank_pool: string;
    rank_provider: string;
    tipset_chain: string;
    tipset_message_opt: string;
    tipset_message: string;
}

export const proApi = {
    //登录注册
    mail_exists: proUrl + '/MailExists',
    send_code: proUrl + '/SendVerificationCode',
    byCode: proUrl + '/ResetPasswordByCode',
    login: proUrl + '/Login',
    userInfo: proUrl + '/UserInfo',
    updateInfo: proUrl + '/UpdateUserInfo',
    getOverview: proUrl + '/MinerInfoDetail',
    getGroups: proUrl + '/GetUserGroups',
    getGroupsId: proUrl + '/GetGroup',
    createGroup: proUrl + '/CreateGroup',
    saveGroup: proUrl + '/SaveGroupMiners',
    delGroup:   proUrl + '/DeleteGroup',
    getLucky: proUrl + '/LuckyRateDetail',
    getBalance: proUrl + '/BalanceDetail',
    getReward: proUrl + '/RewardDetail',
    getGas: proUrl + '/GasCostDetail',
    getPower: proUrl + '/PowerDetail',
    getSector:proUrl + '/SectorDetail',
    account_miners: proUrl + '/CountUserMiners',
    saveMiner: proUrl + '/SaveUserMiners'

}

export const apiUrl: API | any = {
    fvm_hot: mianUrl + '/GetFEvmHotItems',
    fvm_category:mianUrl + '/GetFEvmCategory',
    fvm_items:mianUrl + '/GetFEvmItemsByCategory',
    home_banner:mianUrl+'/GetBannerList',
    searchInfo:mianUrl+'/SearchInfo',
    home_meta: mianUrl + '/TotalIndicators',
    line_trend: mianUrl + '/BaseLineTrend',
    static_gas: mianUrl + '/BaseFeeTrend',
    static_gas_24: mianUrl + '/GasDataTrend',
    static_fil_chart:mianUrl +'/FilCompose',
    static_block_trend: mianUrl + '/BlockRewardTrend',
    static_active_miner: mianUrl + '/ActiveMinerTrend',
    static_message_trend:mianUrl+'/MessageCountTrend',
    rank_pool: mianUrl + '/OwnerRank',
    rank_provider: mianUrl + '/MinerRank',
    rank_growth: mianUrl + "/MinerPowerRank",
    rank_rewards:mianUrl+'/MinerRewardRank',
    tipset_chain: mianUrl + '/LatestBlocks',
    tipset_chain_FinalHeight: mianUrl + '/FinalHeight', 
    tipset_BlockDetails: mianUrl + '/BlockDetails',
    tipset_Block_meaages: mianUrl + '/MessagesByBlock',
    tipset_message_opt: mianUrl + '/AllMethods',
    tipset_message_pool_opt:mianUrl +'/AllMethodsByMessagePool',
    tipset_block_message_opt:mianUrl +'/AllMethodsByBlock',
    tipset_message: mianUrl + '/LatestMessages',
    tipset_address: mianUrl + '/RichAccountRank',
    tipset_transfer: mianUrl + '/LargeTransfers',
    tipset_Dsn: mianUrl + '/SearchMarketDeals',
    tipset_pool: mianUrl + '/MessagesPool',
    detail_account: mianUrl + '/AccountInfoByID',
    detail_owner:mianUrl +'/AccountOwnerByID',
    detail_message: mianUrl + '/MessageDetails',
    detail_message_event: mianUrl + '/EventsInMessage',
    detail_message_trans: mianUrl + '/InternalTransfer',

    detail_miner_list: mianUrl,
    detail_list_method: mianUrl + '/AllMethodByAccountID',
    detail_message_list: mianUrl + '/MessagesByAccountID',
    detail_block_list: mianUrl + '/BlocksByAccountID',
    detail_trance_list:mianUrl+'/TracesByAccountID',
    detail_deal:mianUrl +'/DealDetails',
    account_change: mianUrl + '/BalanceTrendByAccountID',
    account_trend: mianUrl + '/PowerTrendByAccountID',
    detail_Indicators: mianUrl + '/IndicatorsByAccountID',
    contract_verify: mianUrl + '/VerifyContract',
    contract_hard_verify: mianUrl + '/VerifyHardhatContract',
    contract_verify_list: mianUrl + '/VerifiedContractList',
    contract_verify_logs: mianUrl + '/ActorEventsList',

    contract_rank: mianUrl + '/EvmContractList',
    contract_verify_des :mianUrl + '/VerifiedContractByActorID',
    contract_solidity: mianUrl + '/SolidityVersions',
    contract_Licenses: mianUrl + '/Licenses',

    contract_transferInMessage: mianUrl + '/ERC20TransferInMessage',
    contract_transferInMessageNft:mianUrl + '/NFTMessageTransfers',
    contract_swap: mianUrl + '/SwapInfoInMessage',
    contract_ERC20List: mianUrl + '/ERC20List',
    contract_ERC20TokenList: mianUrl + '/ERC20OwnerTokenList',
    contract_ERC20Transfers: mianUrl + '/ERC20AddrTransfers',
    contract_ERC20Summary: mianUrl + '/ERC20Summary',
    contract_ERC20Market: mianUrl + '/ERC20Market',
    contract_detailList: mianUrl,
    contract_nfts: mianUrl + '/NFTTokens',
    contract_fnsUrl: mianUrl + '/FnsBindDomains',
    contract_FnsSummary: mianUrl + '/NFTSummary',
    contract_domain: mianUrl + '/FnsDomainDetail',
    contract_domain_address: mianUrl + '/FnsAddressDomains',

    fevm_defiSummary: mianUrl + '/DefiSummary',
    fevm_defiList:mianUrl +'/DefiProtocolList'
}