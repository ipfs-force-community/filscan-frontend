const home = {
  seconds: '초',
  minutes: '분',
  hours: '시간',
  day: '일',
  base_gas: '24시간 기본 수수료 추세',

  //meta
  meta_title: '전체 네트워크 데이터 지표',
  mata_show: '펼치기',
  mata_show_false: '접기',
  latest_height: '최신 블록 높이',
  latest_block_time: '최신 블록 시간',
  total_blocks: '전체 블록 생성 수',
  total_rewards: '전체 블록 보상',
  total_quality_power: '전체 유효 체굴파워',
  total_quality_power_tip: '현재 전체 유효 컴퓨팅 파워(유효 저장 공간)의 총합',
  base_fee: '현재 기본 요금',
  miner_initial_pledge: '현재 섹터 저당 양',
  power_increase_24h: '최근 24시간 동안 파워 증가량',
  rewards_increase_24h: '최근 24시간 동안 생성된 블록 보상',
  fil_per_tera_24h: '최근 24시간 동안 생성 효율',
  fil_per_tera_24h_tip: '최근 24시간 동안 전체 블록 보상과 유효 체굴 파워의 비율',
  gas_in_32g: ' 최근 24시간 동안 1TiB 용량의 32GiB 섹터를 봉인하기 위해 필요한 가스입니다',
  gas_in_32g_meta:'32GiB 섹터의 가스 소비량',
  gas_in_32g_tip: '최근 24시간 동안 밀봉된 32G 섹터당 소비된 가스량(TB당)',
  add_power_in_32g: '32GiB 섹터 새로 추가한 파워 비용',
  add_power_in_32g_tip: '최근 24시간 동안 32G 섹터 새로 추가한 파워를 위해 필요한 비용(섹토 저당 및 밀봉 수수료 포함)',
  gas_in_64g: '지난 24시간 동안 1TiB 용량의 64GiB 섹터를 봉인하기 위해 필요한 가스입니다',
  gas_in_64g_meta:'64GiB 섹터의 가스 소비량',
  gas_in_64g_tip: '최근 24시간 동안 밀봉된 64G 섹터당 소비된 가스량(TB당)',
  add_power_in_64g: '64GiB 섹터 새로 추가한 파워 비용',
  add_power_in_64g_tip: '최근 24시간 동안 64G 섹터 새로 추가한 파워를 위해 필요한 비용(섹토 저당 및 밀봉 수수료 포함)',
  win_count_reward: '각 티켓당 블록 보상',
  win_count_reward_tip: '최신 높이에서 각 블록의 보상 (높이마다 여러 블록이 있으며 모두 보상을 획득할 수 있음)',
  avg_block_count: '한 높이당 평균 블록 수',
  avg_block_count_tip: '최근 24시간 동안 한 높이당 평균 블록 수',
  avg_message_count: '한 높이당 평균 메시지 수',
  avg_message_count_tip: '최근 24시간 동안 한 높이당 평균 메시지 수',
  active_miners: '액티브한 노드 수',
  burnt: '소각된 토큰 수',
  circulating_percent: '유통 비율',
  rank: '순위',
  footer_text: 'Filscan 브라우저는 Filecoin 블록체인 브라우저 및 데이터 서비스 플랫폼입니다. Filecoin 기반의 수익 랭킹, 블록체인 데이터 조회, 시각화 차트 등의 데이터 서비스를 제공합니다.',
  footer_outlook: '이메일',
  footer_detail_a: '판권 소유 © Filecoin 개발 보조 계획을 따르며 ',
  footer_detail_b: ' 및 ',
  footer_detail_c: '저작권 계약',
  search_notFound: '검색 결과 없음',
  warn_text: '죄송합니다. 입력한 문자에 대한 결과가 없습니다',
  warn_details: '죄송합니다. 유효하지 않은 문자열입니다.',
  go_home: '홈으로 돌아가기',
  blockchain_browser: '블록 탐색기',
  'quality_power/increase_24h': '전체 유효 체굴파워',
  'total_contract': '활성 계약',
  'total_contract_24h_contract': '활성 계약 수/24시간',
  'total_contract/24h_contract': '활성 계약 수/24시간',
  verified_contracts: '검증된 스마트 계약 리스트',
  "contract_address_24h_change": '계약 거래 주소는 24시간 변경됩니다',
  'contract_transaction': '계약 거래 수',
  'contract_transaction_24h_change': '활성 계약 수 24시간 변동',
  'contract_transaction/24h_change': '계약 거래 수 24시간 변동',
  'contract_address': '거래 주소',
  "contract_address/24h_change": '계약 거래 주소 24시간 ',
  "contract_address/24h_change": '계약 거래 주소 /24시간 ',
  'total_contract/24h_contract_tip':'네트워크에서 거래가 이루어진 계약의 총 수',
  gas_24: '24시간 Gas 사용',
   proportion_64G:'32GiB 섹터의 품질 조정된 파워 비율',
  proportion_32G:'64GiB 섹터의 품질 조정된 파워 비율',
  contract_gas: '계약 가스 비용',
  quality_power_Cc:'Commited Capacity (CC)',
  quality_power_Dc:'DataCap (DC)',
  see_more:'더보기',
}
export default home