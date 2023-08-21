
// pool-detail 
const detail = {
    "24h": '24时',
    '7d':'7天',
    "30d": '30天',
    "1year": '1年',
    look_all:'查看全部数据',
    //owner
    'owner_title': '存储池详情',
    'owner_title_tip': '存储池详情：存储池数据由名下节点数据,汇总而成',
    all: '全部方法',
    account: '账户',
    owner_address: 'Owner地址',
    owned_miners: '名下节点',
    owned_active_miners: "名下活跃节点",
    miner: 'Miner',
    evm: 'EVM',
    ethaddress: 'ETHAddress',
    ethaccount: 'ETHAccount',
    
    //account_type
    account_name: '账户',
    latest_transfer_time: '最新交易时间',
    multisig: '多签账户',
    account_detail: '储存池详情',
    from_ath: '发送方',
    to_ath:'接受方',
    account_id:'账户地址',
    //概览
    owner_overview_title: '存储池概览',
    balance: '账户余额',
    available_balance: '可用余额',
    init_pledge: '扇区质押',
    pre_deposits: '预存款',
    locked_balance: '锁仓奖励',
    sector_count: '全部',
    live_sector_count:'有效',
    fault_sector_count: '错误',
    recover_sector_count: '恢复',
    eth_address: 'ETH Address',
    stable_address: '稳定地址',
    tokenList: '持有Tokens',
    showContract:'合约: {{value}}',
    showAddress:'地址: {{value}}',

    //统计指标
    indicators:'统计指标',
    power_increase_indicators: '算力增量',
    power_ratio: '算力增速',
    sector_increase: '扇区增量',
    precommit_deposits: '扇区抵押',
    gas_fee: 'Gas消耗',
    block_rewards: '出块奖励',
    block_count: '出块数量',
    block_count_tip: '出块数 = 出块数量（block）的总和',
    mining_efficiency: '效率',
    mining_efficiency_tip:'选定周期内，节点累计出块奖励与有效算 力的比值',
    lucky: '幸运值',
    sector_ratio: '扇区增速',
    sector_ratio_tip:'',
    win_count: '赢票数量',
    win_count_tip:'Filecoin经济模型中，一个高度 （tipset）下可能有多个区块（block），每 个区块可能获得多份奖励（win count）。 累计出块份数=每次出块获得奖励份数的总和',
    net_profit_per_tb:'单T消耗',
    net_profit_per_tb_tip:'选定周期内单T封装扇区大小Gas消耗',
    //账户变化
    owner_account_change:'账户变化',
    power:'有效算力',
    power_increase:'有效算力增长',
    quality_adjust_power: '有效算力',
    quality_power_rank: '排名',
    raw_power_percentage:'算力占比',
    raw_power: '原值算力',
    total_block_count: '30天出块数',
    total_block_count_tip: '近30天总出块数',
    total_reward: '30天奖励',
    total_reward_tip:'近30天奖励',
    total_win_count: '30天赢票',
    total_win_count_tip:'近30天总赢票',
    sector_size:'扇区大小',
    sector_status: '扇区状态',
    
    //账户总览
    account_overview:'账户总览',
    create_time: '创建时间',
    account_type: '账户类型',
    peer_id: '节点标识',
    account_address:'地址',
    // eslint-disable-next-line no-dupe-keys
    owner_address: 'Owner',
    area:'地区',
    worker_address: 'Worker',
    controllers_address: 'Controller',
    beneficiary_address: 'Beneficiary',
    code_cid: '代码 CID',
    nonce: 'Nonce 数',
    contract_verify: '合约',
    contract_name:'合约名称',
    //miner 
    //pool_overview_title:'账户',

    // message
    message_overview_detail: '交易明细',
    trade: '内部交易',
    message_detail: '概况',
    event_log:'事件日志',
    message_overview: '消息概览',
    eth_message:'ETH Hash',
    cid: '消息ID',
    height: '高度',
    time: '时间',
    blk_cids: '区块',
    value: '金额',
    from: '发送地址',
    to: '接收地址',
    status: '状态',
    method_name: '方法',
    message_other: '其他信息',
    version: '版本编号',
    // eslint-disable-next-line no-dupe-keys
    nonce: 'Nonce',
    gas_fee_cap:'手续费率上限',
    gas_premium: '节点小费费率',
    gas_limit: 'Gas用量上限',
    gas_used: 'Gas实际用量',
    base_fee: '基础手续费率',
    all_gas_fee:'手续费',
    params: '参数',
    returns: '返回值',
    message_tranf: '转账信息',
    from_tranf: '发送方',
    to_tranf: '接受方',
    consume_type:'类型',
    MinerTip: '节点手续费',
    BaseFeeBurn: '销毁手续费',
    Transfer: '转账',
    Burn: '销毁聚合费用',
    exit_code: '状态',
    
    //内部交易
    amount:'价值',
    method: '方法',
    topic:'主题',
    //通证转移
    message_ERC20Trans: '通证转移',
    message_NftTrans:'NFTs 转移',

    // 出块列表
    block_cid:'区块Cid',
    block_height: '区块高度',
    block_time: '出块时间',
    block_messages_count: '消息数',
    block_miner_id: '节点地址',
    block_mined_reward:'出块奖励',
    //miner
    message_list: '消息列表',
    block_list: '出块列表',
    traces_list: '转账列表',
    event_log:'事件日志',

    message_list_total:'共 {{value}} 条消息',
    block_list_total: '总计 {{value}} 区块',
    traces_list_total: "总计 {{value}} 条消息",
    contract_token_list_total: '总计 {{value}} 条代币',
    erc20_transfer_total:'总计 {{value}} 条转账',
    //general 
    general_overview_title:'账户概览',
    base_account_id: '账户ID',
    
    //dns detail 
    deal_details:'订单详情',
    deal_id: '交易ID',
    epoch:'所属区块',
    service_start_time: '创建时间',
    message_cid: '所属消息',
    piece_cid:'Piece CID',
    verified_deal: '已验证',
    deal_hosting: '托管详情',
    deal_left_title: '客户',
    deal_right_title:'托管节点',
    deal_value: '质押金额',
    deal_cash: '托管费用',
    deal_time: '至',
    user_count: '交易地址',
    transfer_count:'交易次数',
        go_verify:'去验证',

    contract_token_list: '代币',
    token_name: 'Token Name',
    contract_id: 'Contract Id',
    amount: "Amount",

    //erc20 transfer
    erc20_transfer:'代币交易',
    platform:'交易平台'

    
}
export default detail