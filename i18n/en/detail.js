// pool-detail
const detail = {
  '24h': '24H',
  '7d': '7D',
  '30d': '30D',
  '1year': '1Y',
  all: 'All Methods',
  all_token: 'All Tokens',
  //owner
  owner_title: 'Pool Detail',
  owner_title_tip: 'The data of mine pool is collected from the data of nodes.',
  account: 'Account',
  account_title: 'Account',

  owner_address: 'Owner Address',
  owned_miners: 'Nodes',
  account_id: 'Account Address',
  look_all: 'View All Data',
  transfer_records: 'Transfer records',

  //account_type
  miner: 'Miner',
  evm: 'EVM',
  ethaddress: 'ETHAddress',
  ethaccount: 'ETHAccount',

  account_name: 'Account',
  latest_transfer_time: 'Latest Transaction',
  multisig: 'MultiSign Account',
  from_ath: 'From',
  to_ath: 'To',

  //概览
  owner_overview_title: 'Pool Overview',
  balance: 'Total Balance',
  available_balance: 'Available',
  init_pledge: 'Initial Pledge',
  pre_deposits: 'PreCommitDeposits',
  locked_balance: 'Locked Rewards',
  balance_tip:
    'Total Balance=Available+InitialPledge+PreCommitDeposits+Locked Rewards',
  available_balance_tip:
    'Available spendable amount in the account excluding initial pledge and locked rewards',
  init_pledge_tip:
    'The actual amount pledged after the successful completion of the second phase of Proof of Replication',
  pre_deposits_tip:
    'The PreCommit Deposits amount during the first phase of Proof of Replication will be adjusted based on the actual pledged amount per sector after successfully submitting the proof within the specified time during the second phase; otherwise, if the proof is not submitted within the given timeframe, a penalty will be imposed',
  locked_balance_tip:
    'The unreleased portion of block rewards will be linearly released over time',
  sector_count: 'Total',
  live_sector_count: 'Active',
  fault_sector_count: 'Faults',
  recover_sector_count: 'Recoveries',
  eth_address: 'ETH Address',
  eth_message: 'ETH Hash',
  stable_address: 'Stable Address',
  showContract: 'Contract: {{value}}',
  showAddress: 'Address: {{value}}',

  account_detail: 'Account Detail',
  contract_name: 'Contract Name',

  //统计指标
  indicators: 'Statistical Indicator',
  power_increase_indicators: 'Power Increase',
  power_ratio: 'Power Growth Rate',
  sector_increase: 'Sector Increase',
  precommit_deposits: 'PreCommitDeposits Increase',
  gas_fee: 'Gas Fee',
  block_rewards: 'Block Rewards',
  block_count: 'Block',
  block_count_tip: 'Block= The sum of the blocks mined',
  mining_efficiency: 'Efficiency',
  mining_efficiency_tip:
    "The ratio of node's cumulative block reward to the adjusted storage power in the selected period.",
  lucky: 'Lucky',
  lucky_tip:
    'The ratio of the actual number of block reward to the expected number of block reward. If the QualityAdjPower is less than 1 PiB, this value has significant randomness and should be taken as a reference only',
  sector_ratio: 'Sector Rate',
  win_count: 'Winner Rewards',
  windowPost_gas: 'Maintain computing power consumption',
  win_count_tip:
    'In Filecoin mining model, there may be multiple blocks under a tipset, and each block may receive multiple win counts.',
  net_profit_per_tb: 'Gas Consumption/T',
  net_profit_per_tb_tip:
    'The gas consumption for sealing a single sector of size T within a selected period',

  //账户变化
  account_change: 'Account Change',
  power: 'Pool Overview',
  power_increase: 'QualityAdjPower Increase',
  quality_adjust_power: 'QualityAdjPower',
  quality_power_rank: 'Ranking',
  raw_power_percentage: 'Power Rate',
  raw_power: 'RawBytePower',
  total_block_count: '30D  Blocks',
  total_block_count_tip: 'Total Blocks in the past 30 days',
  total_reward: '30D  Reward',
  total_reward_tip: 'Total Reward in the past 30 days',
  total_win_count: '30D  Wincount',
  total_win_count_tip: 'Total Wincount in the past 30 days',
  total_balance_tip:
    'Total Balance=Available+Initial Pledge+PreCommitDeposits+Locked Rewards',
  sector_size: 'Sector Size',
  sector_status: 'Sector Status',
  contract_verify: 'Contract',
  peer_detail: 'Miner Detail',
  miner_owner: 'Owner',
  no_area: 'Unknown',

  //账户总览
  account_overview: 'Account Overview',
  create_time: 'Create Time',
  account_type: 'Type',
  peer_id: 'Peer ID',
  account_address: 'Address',
  // eslint-disable-next-line no-dupe-keys
  owner_address: 'Owner',
  area: 'Region',
  worker_address: 'Worker',
  controllers_address: 'Controller',
  beneficiary_address: 'Beneficiary',
  code_cid: 'CODE CID',
  nonce: 'Nonce Count',

  // message
  message_overview_detail: 'Transaction Details',
  trade: 'Internal Transaction',
  message_detail: 'Overview',
  event_log: 'Log',
  message_overview: 'Message Overview',
  cid: 'Message ID',
  height: 'Height',
  time: 'Time',
  blk_cids: 'Block Cid',
  value: 'Value',
  from: 'From',
  to: 'To',
  status: 'Status',
  method_name: 'Method',
  message_other: 'Others',
  version: 'Version',
  // eslint-disable-next-line no-dupe-keys
  nonce: 'Nonce',
  gas_fee_cap: 'Gas Fee Cap',
  gas_premium: 'Gas Premium',
  gas_limit: 'Gas Limit',
  gas_used: 'Gas Used',
  base_fee: 'BaseFee',
  all_gas_fee: 'Gas Fee',
  params: 'Params',
  returns: 'Returns',
  message_tranf: 'Transactions',
  from_tranf: 'From',
  to_tranf: 'To',
  consume_type: 'Type',
  MinerTip: 'Miner Tip',
  BaseFeeBurn: 'BaseFee Burn',
  Transfer: 'Transfer',
  Burn: 'Burn',
  exit_code: 'Status',
  err_message: 'Error Message',
  replaced: 'Cid is overwritten',
  replaced_detail: 'CID "{{value}}" has been overwritten by "{{newValue}}"',
  base_cid: 'Overridden CID',

  //内部交易
  amount: 'Value',
  method: 'Method',
  topic: 'Topics',

  //通证转移
  message_ERC20Trans: 'Tokens Transferred',
  message_NftTrans: 'NFTS Transferred',
  // 出块列表
  block_cid: 'Block Cid',
  block_height: 'Height',
  block_time: 'Time',
  block_messages_count: 'Messages',
  block_miner_id: 'Storage Provider',
  block_mined_reward: 'Rewards',
  //miner
  message_list: 'Message',
  block_list: 'Block',
  traces_list: 'Transaction',
  message_list_total: 'Total of {{value}} Messages',
  block_list_total: 'Total of  {{value}} Blocks',
  traces_list_total: 'Total of {{value}} Messages',
  erc20_transfer_total: 'Total of {{value}} Transactions',
  // contract_token_list_total: 'Total of {{value}} Token',

  //general
  general_overview_title: 'Account',
  base_account_id: 'ID',
  tokenList: 'Token Holdings',

  //dns detail
  deal_details: 'dsn Detail',
  deal_id: 'Dsn ID',
  epoch: 'Block',
  service_start_time: 'Create Time',
  message_cid: 'Message',
  piece_cid: 'Piece CID',
  verified_deal: 'Verified',
  deal_hosting: 'Storage Detail',
  deal_left_title: 'Client',
  deal_right_title: 'Provider',
  deal_value: 'Provider',
  deal_cash: 'Storage Cost',
  deal_time: 'to',
  user_count: 'User Count',
  transfer_count: 'Transfer Count',
  go_verify: 'To Verify',
  //Token
  contract_token_list: 'Field',
  token_name: 'Token Name',
  contract_id: 'Contract Id',
  amount: 'Amount',

  //erc20 transfer
  erc20_transfer: 'Token Transactions',
  platform: 'Platform',
  power_change: 'Power Change',
  owned_active_miners: 'Active Miners',

  //height
  blcok_time: 'Block Time',
  message_count_deduplicate: 'Block Message (Deduplication) ',
  miner_id: 'Miner',
  messages_count: 'Message',
  reward: 'Reward',
  //cid detail
  block_list: 'Block List',
  blocks_cid: 'Cid',
  blocks_miner: 'Miner',
  blocks_messages: 'Message',
  blocks_reward: 'Reward',
  win_count: 'WinCount',
  blk_cids_message: 'Block Message',
  //cid_details
  message_list_total: 'Total of {{value}} messages',
  chain_cid_detail: 'Block Details',
  cid_height: 'Height',
  parent_weight: 'Parent Weight',
  parents_cid: 'Parent CID',
  parent_base_fee: 'Parent Basefee',
  ticket_value: 'Ticket',
  state_root: 'State Root',
  message_count: 'Message Count',

  //pendingMsg
  pending_title: 'Pending Messages',
  pending_total: 'Total of {{value}} messages to be processed',
}
export default detail
