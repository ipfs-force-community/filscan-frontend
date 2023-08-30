/*

什么时候需要上传MetaData文件?
1. 多文件合约
2. 合约内import的层级目录为原生状态且与metadata文件中sources下的路径相同 (若合约内import的层级目录为当前文件夹则不需要上传metadata文件)
如何获取metaData文件？
1. 通过使用Solidity编译器（solc）获取：
    solc --metadata MainContract.sol -o metadata.json
2. 通过使用Remix IDE下载：
    在Remix网页端发布之后有提供metadata.json的下载按钮
*/

const contract = {

  overview: '概览',
  market: 'Market',

  look_adres: '查看地址',
  gohome:'返回首页',
  reset_ver:'重新验证',
  next: '下一步',
  reset: '重置',
  confirm: '验证并发布',
  back: '返回',
  file_name: '选择 *.sol 文件',
  file_name_json: '选择 *.json 文件',
  config_file_name: '选择 Metadata 文件',
  config_file_des1: '> 什么时候需要上传metadata文件?',
  config_file_des1_1: '1. metadata文件包含了编译器的各种设置，如果您使用了高级优化参数，或者编译时使用了编译配置文件（e.g. remix中编译时的compiler_config.json文件），那么您需要上传metadata文件进行验证',
  config_file_des1_2: '2. 合约内import的层级目录为初始格式(e.g. import "@openzeppelin/contracts/access/Ownable.sol")并与metadata文件中sources下的路径相同 (若合约内import的层级目录为当前文件夹则不需要上传metadata文件)',
  config_file_des2: '> 如何获取metadata文件?',
  config_file_des2_1: '1. 通过使用Solidity编译器（solc）获取：solc --metadata MainContract.sol -o metadata.json',
  config_file_des2_2: '2. 通过使用Remix IDE下载：在Remix网页端发布之后有提供metadata.json的下载按钮',

  verify_title: '验证并发布合约源代码',
  verify_des: '编译器类型和版本选择',
  content_des: `源代码验证为与智能合约交互的用户提供了透明度。通过上传源代码，Filscan 将编译后的代码与区块链上的代码进行匹配。就像合同一样，“智能合同”应该为最终用户提供更多关于他们“数字签名”的目的的信息，并让用户有机会审核代码以独立验证它是否确实做了它应该做的事情。通过上传hardhat “artifacts/build-info/”目录中的json文件，可以快速进行合约验证。
Hardhat 将编译输出存储在项目内的“artifacts/build-info/”目录中。 该目录包含一个 .json 文件，其中包含所有合约的Standard JSON Input-Outpu，这是与 Solidity 编译器交互的推荐方法，特别是在高级和自动化配置中。 所有编译器发行版都统一支持此 JSON 输入输出接口`,
  address: '请输入您要验证的合约地址',
  address_placeholder: '请输入您要验证的合约地址',
  verify_address: '请选择编译版本',
  verify_address_placeholder: '请选择',
  verify_model: '请选择编译类型',
  verify_model_placeholder:'请选择编译类型',

  license_type: '请输入开源许可证类型',
  content_des1: '1. 如果合同在 REMIX 处编译正确，则此处也应编译正确',
  content_des2: '2. 我们对验证由另一个合约创建的合约的支持有限，编译的每个合约的超时时间最多为45秒',
  content_des3: '3. 对于编程合同验证，请查看合同 API 端点',
  checkbox_service: '我同意服务条款',
  verify_select_placeholder: '请选择',

  //logs
  ver_sucess: 'Success: 验证成功',
  ver_err: 'Error: 验证失败',
  has_been_verified:'Error:合约已验证',
  byte_code: '编译日志',
  contract_name:'合约名',
  local_byte_code: '合约字节码',
  compiler:'编译器版本',
  //step1
  address_verify: '合约地址',
  step1_verify_des: '请选择单个或多个 *.SOL 文件',
  source_code: '合约源码',
  compile_version: '编译器',
  compile_output: '编译输出',
  Optimizations: '优化参数',
  run_optimizer: '运行(优化器)',
  arguments: '构造函数参数',
  optimize: '优化开启',
  optimize_runs: 'RUNS',

  // 已验证合约
  Verify_code: 'Code',
  Verify_read: 'Read Contract',
  Verify_write:'Write Contract',

  //token list
  token_list:'全部通证',
  token_name: 'Token',
  vol_24: '成交量(24h)',

  transfer_total:'共 {{value}} 条消息',
  owner_total:'总共 {{value}} 人持有',
  dex_total: '共 {{value}} 条交易',
  nfts_total:'共 {{value}} 条 NFTs',
  //nft list
  nfts_list:'全部 NFTs',
  trading_volume: '全部成交量',
  nfts_trans: 'NFT代币转移',

  // ft /fns dashborad
  'total_supply': '供应量',
  'total_supply_tip':'该数据为合约ERC20标准方法返回值',
  'owners': '持有人',
  'transfers': '总共转移',
  latest_price: '价格',
  market_value: '市值',
  token_contract: '通证合约',
  transfer: '转移',
  owner: '拥有者',
  owner_nft:'拥有者',
  domain: '合约',
  dex: 'DEX 交易',

  //list
  message_cid: '消息ID',
  method: 'Method',
  time: '时间',
  from: '发送地址',
  to: '接收地址',
  amount: '数量',
  //拥有者
  rank: '排行',
  percentage: '占比',

  //dex
  platform: '交易平台',
  Txn_Value: 'Txn Value',
  'swapped_Rate': 'Swapped Rate',
  'Token_Amount_in': 'Token Amount(In)',
  'Token_Amount_out': 'Token Amount(Out)',
  Action: 'Action',

  //合约列表
  contract_list:'已验证合约',
  contract_address: '地址',
  language: '语言',
  license: '许可证',

  //合约详情
  contract_list_total:'共 {{value}} 个合约',
  byte_code_no_verify: '合约未验证，去',
  go_to_verify:'验证合约',
  verify_contract: '合约源代码已通过验证',
  source_code: '合约源代码',
  source_code_create:'合约创建代码',
  source_abi: '合约ABI',
  source_abi_default: '导出ABI',
  nfts_list: 'NFTs List',
  item: 'Item',
  Items: '数量',
  controller: '域名注册人',

  //rank
  contract_rank_des:'上次更新时间为:{{value}}',
  contract_rank_total:"共 {{value}} 个合约 ",
  contract_rank: '合约排行',
  rank:'排名',
  actor_id: 'actorID',
  ver_address:'待验证',
  actor_address: 'actorAddress',
  transaction_count: '交易数量',
  user_count: '交易地址',
  actor_balance: 'Balance',
  gas_cost: 'Gas消耗',

  //log
  epoch: '高度',
  cid: '消息ID',
  event_name: '方法',
  topics: '主题',
  coompoent_data: '参数',
  log_index: '序号',
  removed:'移除'
}
export default contract

