const contract = {
  overview: 'Overview',
  market: 'Market',
  look_adres: 'View Account',
  gohome:'Go Home',
  reset_ver:'Revalidate',
  next: 'Continue',
  reset: 'Reset',
  confirm: 'Verify&Publish',
  back:'Return to Main',
  file_name: 'SELECT *.SOL FILES',
  file_name_json: 'SELECT *.JSON FILES',
  config_file_name: 'SELECT Metadata FILES',
  config_file_des1: '> When do I need to upload a metadata file?',
  config_file_des1_1: '1. The metadata file contains various compiler settings. If you have used advanced optimization parameters or compiled your code with a compilation configuration file (e.g. compiler_config.json in Remix), you will be required to upload the metadata file for verification.',
  config_file_des1_2: "2. The hierarchical directory of imports in the contract is in the initial format (e.g. import '@openzeppelin/contracts/access/Ownable.sol') and is the same as the path under 'sources' in the metadata file. You don't need to upload the metadata file (if the hierarchical directory of import in the contract is point to the current folder)",
  config_file_des2: '> How can I obtain the metadata file?',
  config_file_des2_1: '1. By using the Solidity Compiler (solc):  solc --metadata Contract.sol -o metadata.json',
  config_file_des2_2: '2. Download it using Remix IDE: There is a download button for metadata.json after deployed on the Remix website.',
  verify_title: 'Verify & Publish Contract Source Code',
  verify_des: 'COMPILER TYPE AND VERSION SELECTION',
  content_des:`Source code verification provides transparency for users interacting with smart contracts. By uploading the source code, Filscan will match the compiled code with that on the blockchain. Just like contracts, a "smart contract" should provide end users with more information on what they are "digitally signing" for and give users an opportunity to audit the code to independently verify that it actually does what it is supposed to do. Contract verification can be performed quickly by uploading the JSON file in the "artifacts/build-info/" directory.
Hardhat stores the compilation outputs in the "artifacts/build-info/" directory within the project. The directory includes a .json file that contains the Standard JSON Input-Output for all contracts, which is the recommended approach for interacting with the Solidity compiler, especially in advanced and automated configurations. This JSON-input-output interface is uniformly supported across all compiler distributions.`,
  address: 'Please Enter Contract Address to Verify',
  address_placeholder: 'Please enter the Contract Address',
  verify_model:'Compiler Type',
  verify_model_placeholder:'Please select Compiler Type',
  verify_address: 'Please Enter Complier Version to Verify',
  verify_address_placeholder:'Please select',
  license_type: 'Please select Open Source License Type',
  content_des1: '1. If the contract compiles correctly at REMIX, it should also compile correctly here.',
  content_des2: '2. We have limited support for verifying contracts created by another contract and there is a timeout of up to 45 seconds for each contract compiled.',
  content_des3: '3. For programatic contract verification, check out the Contract API Endpoint.',
  checkbox_service: 'I agree to the terms of service',
  verify_select_placeholder: 'Please select',

  //logs
  ver_sucess: 'Success',
  ver_err: 'Error',
  has_been_verified:'Error:Has Been Verified',
  byte_code: 'Compilation log',
  contract_name:' Contract Name ',
  local_byte_code: 'Contract Bytecode',
  compiler:'Complier Verison',

  //step1
  address_verify:'Contract Address',
  step1_verify_des: 'SELECT ONE OR MORE *.SOL FILES',
  source_code: 'Contract Source Code',
  compile_version:'Complier',
  compile_output: 'Complier Output',
  Optimizations: 'Optimizations',
  run_optimizer:'Runs(Optimizer)',
  arguments: 'Constructor Argument',
  optimize: 'Optimization Enabled',

  //token list
  token_list:'All Tokens',
  token_name: 'Token',
  vol_24: 'Trading Volume(24h)',

  transfer_total:'Total Messages of {{value}}',
  owner_total:'From a total of {{value}} Hodlers',
  dex_total: 'Total Message of {{value}} Transactions ',
  nfts_total: 'Total Nfts of {{value}} Transactions ',

  // 已验证合约
  Verify_code: 'Code',
  Verify_read: 'Read Contract',
  Verify_write: 'Write Contract',
  byte_code_no_verify: 'The contract is not verified go to',
  go_to_verify:'verify the contract',

  //nft list
  nfts_list:'All NFTs',
  trading_volume: 'Trading Volume',
  nfts_trans: 'NFTs Transfer',

  // ft /fns dashborad
  'total_supply': 'Circulating Supply',
  'total_supply_tip':'This data is the standard method return value for the contract ERC20',
  'owners': 'Hodlers',
  'transfers': 'Total Transfers',
  latest_price: 'Price',
  market_value: 'Market Cap',
  token_contract: 'Token Contract',
  transfer: 'Transfers',
  owner: 'Hodlers',
  domain: 'Contract',
  dex: 'Dex Trades',

  //list
  message_cid: 'Message ID',
  method: 'Method',
  time: 'Time',
  from: 'From',
  to: 'To',
  amount: 'Amount',
  //拥有者
  rank: 'Rank',
  percentage: 'Percentage',

  //dex
  platform: 'Platform',
  Txn_Value: 'Txn Value',
  'swapped_Rate': 'Swapped Rate',
  'Token_Amount_in': 'Token Amount(In)',
  'Token_Amount_out': 'Token Amount(Out)',
  Action: 'Action',

  //合约列表
  contract_list:'Verified Contracts',
  contract_address: 'Address',
  language: 'Language',
  license: 'License',

  //合约详情
  contract_list_total:'Total of {{value}} Contracts',
  verify_contract: 'Contract Source Code Verified',
  source_code: 'Contract Source Code',
  source_code_create:'Contract Creation Code',
  source_abi: 'Contract ABI',
  source_abi_default: 'Export ABI',
  nfts_list:'NFTs List',
  owner_nft: 'Owner',
  item: 'Item',
  controller: 'Registrant',

  //rank
  contract_rank_des:'Latest Update on:{{value}}',
  contract_rank_total:"Total of {{value}} Contracts",
  contract_rank:'Contract Rank',
  actor_id: 'actorID',
  actor_address: 'actorAddress',
  transaction_count: 'Transaction Count',
  user_count: 'Transaction Address',
  actor_balance: 'Balance',
  gas_cost: 'Gas Cost',
  ver_address: 'Pending Verification',
  see_more:'See More',

  //log
  epoch: 'Height',
  cid: 'CID',
  event_name: 'Method',
  topics: 'Topics',
  coompoent_data: 'Params',
  log_index: 'Index',
  removed:'Removed'

}
export default contract