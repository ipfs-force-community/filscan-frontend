
const statistic = {
  gas_total:'Gas 统计',
  show_more: '更多',
  '24h': '24时',
  '7d': '7天',
  '30d': '30天',
  '1year':'1年',
  // power
  "power": '算力走势',
  power_tips: '基线标准即是Filecoin网络要求的网络增长规模，主网上线时2.5EiB，每年100%增长率。',
  trend_24: '24h基础手续费走势',
  total_raw_byte_power: '原值算力',
  base_line_power: '基线走势',
  power_increase: '算力净增',
  power_decrease:'算力损失',
  change_quality_adj_power: '环比有效算力变化',
  total_quality_adj_power:'有效算力',
  gas: '基础手续费走势',
  base_fee: '基础手续费',
  gas_in_32g: '32GiB 扇区Gas消耗',
  gas_in_64g: '64GiB 扇区Gas消耗',
  //24_gas
  gas_24:'24h Gas 数据',
  method_name: '消息类型',
  avg_gas_premium:'Gas Premium',
  avg_gas_limit: '平均Gas限额',
  avg_gas_used: '平均Gas消耗',
  avg_gas_fee: '平均手续费',
  'sum_gas_fee/ratio': '手续费合计/占比',
  'message_count/ratio': '消息数合计/占比',
  //fil
  TokenRules:'Filecoin通证分配细则',
  FilecoinFoundation: 'Filecoin基金会',
  FundraisingRemainder: '募资 – 剩余通证',
  FundraisingSAFT: '募资 – 未来通证简单协议',
  MiningReserve: '为存储服务提供者预留通证',
  TokenAllocation: '存储提供者通证分配',
  ReservedTokens: '存储提供者预留通证',
  Fundraising: '募资形式 – 未来通证简单协议 2017',
  Funds: '募资形式 – 剩余资金',
  protocolLab: '协议实验室',
  Contributors: "协议实验室团队和贡献者",
  Allocation: '分配项目',
  value: '数额',
  description: '具体用途',
  filBase: 'FIL的基础发放',
  filBase_des: '网络FIL铸造上限',
  ReservedTokens_des: '为未来Filecoin经济增长而预留的通证储备，具体未来使用方案由Filecoin社区决定',
  TokenAllocation_des: '通过区块奖励、网络初始化等方式分给存储提供者的通证奖励',
  FilecoinFoundation_des:'作为长期社区建设，网络管理费用等',
  Fundraising_des: '2017年出售的通证',
  Funds_des: '用作生态发展和后续融资',
  protocolLab_des: '用作协议实验室的相关工作',
  Contributors_des: '4.5%给协议实验室团队和贡献者',

  //chartsnav
  cc_dc_power: 'CC/DC算力走势',
  static_overview: '图表统计',
  contract_trend: '合约交易',

  //charts
  pie_title: '图表统计',
  fil_overview: 'FIL概览',
  block_trend: '区块奖励',
  block_reward_per_TiB: '产出效率',
  acc_block_rewards: '累计区块奖励',
  active_nodes: '活跃节点数',
  active_miner_count: '节点数量',
  messages_trend: '消息数走势图',
  message_count:'区块平均消息走势',
  all_message_count: '总消息走势',
  pie_title_a: '当前FIL的用途分布统计',
  pie_title_a_tip:'已提供存储者奖励的Fil + 已释放锁仓奖励的Fil + 已分配保留部分的Fil = 当前已释放的Fil',
  pie_title_b: '当前已释放的Fil用途统计',
  charts_title:'Fil分配细则',
  mined: '已提供存储者奖励的Fil',
  remaining_mined: '剩余存储者奖励的Fil',
  vested: '已释放锁仓奖励的Fil	',
  remaining_vested: '剩余锁仓奖励的Fil',
  reserve_disbursed: '已分配保留部分的Fil(测试网奖励)',
  remaining_reserved: '剩余保留部分的Fil',
  locked: '扇区抵押的Fil',
  burnt: '已销毁的Fil',
  circulating: '可交易流通的Fil',
  dc_trend: 'DC',
  cc_trend: 'CC',
  networks_overview: '全网指标',
  contract_con: '合约部署走势',
  contract_counts:'合约部署',
  contract_gas: '合约Gas消耗',
  contract_addr: '合约交易地址',
  contract_balance: '合约余额走势',
  contract_total_balance: '合约余额',

}

export default statistic