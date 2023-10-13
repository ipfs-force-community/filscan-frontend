const contract = {
  overview: '개요',
  market: '마켓',

  look_adres: '주소 확인',
  gohome:'홈으로',
  reset_ver:'재검증',
  next: '다음',
  reset: '리셋',
  confirm: '검증 및 발표',
  back: '뒤로 가기',
  file_name: '*.sol 파일 선택',
  config_file_name: 'Metadata 파일 선택',
  file_name_json: '*.json 파일 선택',
  config_file_des1: '> 언제 메타데이터 파일을 업로드 할겁니까?',
  config_file_des1_1: '1. 메타데이터 파일에는 다양한 컴파일러 설정이 포함되어 있습니다. 고급 최적화 매개변수를 사용했거나 컴파일 구성 파일(예: Remix의 compiler_config.json)로 코드를 컴파일한 경우 확인을 위해 메타데이터 파일을 업로드해야 합니다.',
  config_file_des1_2: '2. 계약 안에 있는 import 계층 디렉터리는 초기화 형식(예: import "@openzeppelin/contracts/access/Ownable.sol")이며 메타데이터 파일중 sources 아래의 경로와 동일합니다(계약에 있는 import 계층 디렉터리는 현재 폴더이면 메타데이터 파일을 업로드할 필요가 없음)',
  config_file_des2: '> 메타데이터 파일은 어떻게 얻나요?',
  config_file_des2_1: '1. Solidity 컴파일러(solc)를 사용하여 획득: solc --metadata MainContract.sol -o metadata.json',
  config_file_des2_2: '2. Remix IDE를 사용하여 다운로드: Remix 웹 페이지가 게시된 후 metadata.json에 대한 다운로드 버튼이 있을겁니다.',
  verify_title: '컨트랙트 소스 코드 검증 및 발표',
  verify_des: '컴파일러 유형 및 버전 선택',
  verify_content:`소스 코드 검증은 스마트 컨트랙트와 상호작용하는 사용자에게 투명성을 제공합니다. 소스 코드를 업로드를 통하여 Filscan이 컴파일된 코드를 블록체인 상의 코드와 매칭시킵니다. 계약서 처럼 "스마트 컨트랙트"는 최종 사용자에게 "디지털 서명"의 목적에 대한 더 많은 정보를 제공하고 사용자가 코드를 검토하여 그것이 정말로 해야 할 일을 수행했는지 독립적으로 감증할 수 있도록 합니다.`,
  content_des: `소스 코드 검증은 스마트 컨트랙트와 상호작용하는 사용자에게 투명성을 제공합니다. 소스 코드를 업로드를 통하여 Filscan이 컴파일된 코드를 블록체인 상의 코드와 매칭시킵니다. 계약서 처럼 "스마트 컨트랙트"는 최종 사용자에게 "디지털 서명"의 목적에 대한 더 많은 정보를 제공하고 사용자가 코드를 검토하여 그것이 정말로 해야 할 일을 수행했는지 독립적으로 감증할 수 있도록 합니다."artifacts/build-info/" 디렉터리에 JSON 파일을 업로드하면 계약 검증을 빠르게 수행할 수 있습니다.
Hardhat은 컴파일 출력을 프로젝트 내의 "artifacts/build-info/" 디렉토리에 저장합니다. 디렉터리에는 특히 고급 및 자동화 구성에서 Solidity 컴파일러와 상호 작용하는 데 권장되는 접근 방식인 모든 계약에 대한 표준 JSON 입력-출력이 포함된 .json 파일이 포함되어 있습니다. 이 JSON 입출력 인터페이스는 모든 컴파일러 배포에서 균일하게 지원됩니다.`,
  address: '검증할 컨트랙트 주소를 입력하세요',
  address_placeholder: '컨트랙트 주소를 입력하세요',
  verify_address: '검증할 컴파일러 버전을 선택하세요',
  verify_address_placeholder: '선택하세요',
  verify_model: '편집 유형을 선택하십시오',
  verify_model_placeholder:'편집 유형을 선택하십시오',
  license_type: '오픈 소스 라이선스 유형을 입력하세요',
  content_des1: '1. 만약 컨트랙트가 REMIX에서 올바르게 컴파일 된 경우, 여기에도 올바르게 컴파일될 겁니다.',
  content_des2: '2. 다른 컨트랙트에서 생성된 컨트랙트를 검증하는 서포트는 제한되어있습니다. 각 컨트랙트의 컴파일 제한 시간은 최대 45초입니다.',
  content_des3: '3. 프로그래밍 컨트랙트 검증은 컨트랙트 API 엔드포인트를 확인하세요.',
  checkbox_service: '서비스 약관에 동의합니다',
  verify_select_placeholder: '선택하세요',

  //logs
  ver_sucess: '성공: 검증 완료',
  ver_err: '오류: 검증 실패',
  has_been_verified:'오류: 계약이 이미 검증되었습니다',
  byte_code: '컴파일 로그',
  contract_name:'계약 이름',
  local_byte_code: '컨트랙트 바이트 코드',
  compiler:'컴파일러 버전',
  //step1
  address_verify: '계약 주소',
  step1_verify_des: '*.sol 파일을 선택하세요',
  source_code: '컨트랙트 소스 코드',
  compile_version: '컴파일러',
  compile_output: '컴파일러 출력',
  Optimizations: '최적화 매개변수',
  run_optimizer: '실행（옵티마이저）',
  arguments: 'Constructor 매개변수',
  optimize: '최적화 활성화',
  optimize_runs: 'RUNS',

  // 已验证合约
  Verify_code: 'Code',
  Verify_read: 'Read Contract',
  Verify_write:'Write Contract',
  contract_verify:'계약 검증',
  contract_verify_tips:'계약 확인은 PC에서 확인하십시오.',

  //token list
  token_list:'전체 토큰',
  token_name: '토큰',
  vol_24: '24시간 거래량',

  transfer_total:'총 {{value}} 건 메시지',
  owner_total:'총 {{value}}명 보유',
  dex_total: '총 {{value}} 건 거래',

  //nft list
  nfts_list:'전체 NFTs',
  trading_volume:'전체 거래량',

  // ft /fns dashborad
  'total_supply': '유통 공급량',
  'total_supply_tip':'이 데이터는 계약 ERC20에 대한 표준 메서드 반환 값입니다',
  'owners': '보유자',
  'transfers': '총 전송 수',
  latest_price: '최신 가격',
  market_value: '시가',
  token_contract: '토큰 계약',
  transfer: '전송',
  owner: '소유자',
  owner_nft:'오너',
  domain: '계약',
  dex: 'DEX 거래',

  //list
  message_cid: '메시지ID',
  method: '메소드',
  time: '시간',
  from: '보내는 주소',
  to: '받는 주소',
  amount: '수량',
  //拥有者
  //소유자
  rank: '순위',
  percentage: '비율',

  //DEX
  platform: '거래소',
  Txn_Value: 'Txn 값',
  'swapped_Rate': '교환 비율',
  'Token_Amount_in': 'Token 수량(들어옴)',
  'Token_Amount_out': 'Token 수량(나감)',
  Action: '액션',

  //계약 목록
  contract_list:'검증된 계약',
  contract_address: '주소',
  language: '언어',
  license: '라이선스',

  //合约详情
  contract_list_total:'총 {{value}}개의 계약',
  byte_code_no_verify: '계약이 검증되지 않았습니다. 이동하러 가기',
  go_to_verify:'계약 검증',
  verify_contract: '계약 소스 코드가 검증되었습니다',
  source_code: '계약 소스 코드',
  source_code_create:'계약 생성 코드',
  source_abi: '계약 ABI',
  source_abi_default: 'ABI 도출하기',
  nfts_list: 'NFT 목록',
  item: '아이템',
  Items: '수량',
  pleaseCheckContractWithPC :"PC측에서 계약내역을 확인해주세요~",

  //rcontract_rank_des:'上次更新时间为:{{value}}',
  contract_rank_des:'마지막 업데이트 시간: {{value}}',
  contract_rank_total:"총 {{value}}개의 계약 ",
  contract_rank: '계약 랭킹',
  rank:'랭킹',
  actor_id: 'actorID',
  ver_address:'검증 대기중',
  actor_address: 'actorAddress',
  transaction_count: '거래 수',
  user_count: '거래 주소',
  actor_balance: '잔액',
  gas_cost: 'Gas 소비량',
  see_more:'더보기',

  //log
  epoch: '높이',
  cid: '메시지 ID',
  event_name: '메소드',
  topics: '토픽',
  coompoent_data: '매개변수',
  log_index: '인덱스',
  removed:'제거됨'

}
export default contract