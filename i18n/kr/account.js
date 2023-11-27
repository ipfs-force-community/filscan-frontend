const account = {
  date: '날짜',
  confirm: 'Confirm',
  cancel: 'Cancel',
  go_home: '홈으로',
  go_login: '로그인하다',
  login: '노드 관리자',
  back: '뒤로',
  account_title: '마이너 지표',
  overview: '데이터 개요',
  miners: '노드 관리',
  data_details: '데이터 세부정보',
  monitor: '감시 관리',
  monitor_sector: '만료 모니터링',
  monitor_balance: '잔액 모니터링',
  monitor_power: '전력 모니터링',
  personal: 'Personal',
  logout: 'Logout',
  default_group: '기본 그룹',
  welcome: 'Welcome to Filscan!',
  welcome_text1:
    '축하합니다! 회원 가입이 성공적으로 이루어졌습니다. 이메일 주소와 비밀번호를 사용하여 계속해서 로그인하실 수 있습니다.',
  welcome_text2: '계정에 로그인하세요!',
  last_time: '최신 업데이트 시간',
  all: '전체',
  all_groups: 'All Groups',
  all_miners: 'All Miners',
  all_tags: 'All Tags',
  edit: '편집하다',
  miner_add: '추가하다',
  //个人账户
  register_success: '축하합니다! 회원 가입이 성공적으로 완료되었습니다',
  register_btn: '활성화하다',

  edit: '작업',
  miner_add: '添加',
  edit_write: '수정',
  edit_delete: '삭제',
  created_at: '创建时间',

  //数据概览
  overview_power: '해시파워 개요',
  overview_gas: 'Gas 소비',
  overview_expired: '만기 섹터',
  overview_reward: '블록 보상',
  overview_lucky: '행운값',
  overview_balance: '잔액',
  no_node_data: '노드가 아직 추가되지 않았습니다',
  miners_add: '노드 추가',
  group_add: '그룹 추가',
  miners_group_manage: '그룹 설정',
  total_out_come_gas: '일일 비용/Gas 소비량',
  pledge_amount_24: '플레지/일일 변동',
  balance_24: '계정 잔액/일일 변동',
  quality_power_24: '파워/일일 변동',

  //节点管理
  delete_group: '그룹 삭제',
  delete_record_group: '그룹을 삭제하시겠습니까?',
  delete_group_text: '삭제 후에는 해당 그룹이 목록에 표시되지 않습니다',

  delete_miner: '마이너 삭제',
  delete_record_miner: '마이너 {{value}}를 삭제하시겠습니까?',
  delete_miner_text: '삭제 후에는 해당 노드가 그룹에 표시되지 않습니다',

  //添加节点
  custom_tag: 'Tag',
  miner_add_placeholder: '노드 계정 ID를 입력하세요',
  miner_select_group_placeholder:
    "그룹 선택 (그룹을 선택하지 않으면 추가한 노드는 '기본 그룹'으로 모두 들어갑니다)",

  //分组
  create_group: '그룹 생성',
  create_group_holder: '생성하려는 그룹의 이름을 입력하세요',
  item_value: '해당 그룹에는 {{value}} 명의 miner가 있습니다',
  group_name: '그룹 이름',

  //幸运值
  all: '전체',
  '24h_lucky': '24H 행운값 ',
  '7d_lucky': '7D 행운값',
  '30d_lucky': '30D 행운값',
  '1year_lucky': '1년',
  tag: 'Tag',
  miner_id: 'Miner ID',

  //地址余额
  miner_balance: 'Miner 잔액/일일 변동',
  owner_balance: 'Owner 잔액/일일 변동',
  worker_balance: 'Worker 잔액/일일 변동',
  controller_0_balance: 'Controller0 잔액/일일 변동',
  controller_1_balance: 'Controller1 잔액/일일 변동',
  controller_2_balance: 'Controller2 잔액/일일 변동',
  beneficiary_balance: 'Beneficiary 잔액/일일 변동',
  market_balance: 'Market 잔액/일일 변동',

  //奖励
  block_count: '블록 수',
  win_count: '윈 카운트',
  block_reward: '블록 보상',
  total_reward: '전체 블록 보상',
  total_reward_24: '총 보상/24시간 보상',

  //算力概览
  quality_power: '유효 체굴 파워',
  dc_power: 'DC 파워',
  raw_power: '로우바이트 체굴 파워',
  cc_power: 'CC 파워',
  sector_size: '섹터 크기',
  sector_power_change: '팬섹터 변화',
  sector_power_count: 'Sector Count',
  sector_count_change: '팬섹터 수량 변화',
  pledge_changed: '플레지 변경',
  pledge_changed_per_t: '플레지 변경/T',
  penalty: '벌칙',
  fault_sectors: '오류',

  sector_power_change_tip: '섹터 수/로우바이트 체굴 파워  추가 및 종료의 합계',
  pledge_changed_tip: ' 섹터 수 추가 및 종료에 대한 예치금 변동의 합계',
  pledge_changed_per_t_tip: '예치금 변동을 섹터 변동으로 나눈 값.',
  penalty_tip: '처벌받은 FIL 수량',
  fault_sectors_tip: '신규 추가된 오류 섹터의 수',
  total_gas_cost_tip: '모든 유형에 대한 가스 소비의 총합',
  seal_gas_cost_tip:
    '섹터 봉인을 위한 가스 비용의 총합(PreCommitSector+ProveCommitSector+PreCommitSectorBatch+ProveCommitAggregate+PreCommit Net Fee+ProveCommit Net Fee)',
  seal_gas_per_t_tip: '신규 봉인된 섹터당 가스 소비량 (TiB)',
  deal_gas_cost_tip: 'DC PublishStorageDeals 의 소비량',
  wd_post_gas_cost_tip: 'SubmitWindowedPoSt의 소비량',
  wd_post_gas_per_t_tip:
    'SubmitWindowedPoSt 비용을 RawBytePower(TiB)로 나눈 값',
  //gas

  total_gas_cost: '가스 총 소비량',
  seal_gas_cost: 'Seal Gas',
  seal_gas_per_t: 'Seal Gas/T',
  deal_gas_cost: 'PublishStorageDeals Gas',
  wd_post_gas_cost: 'WindowedPoSt Gas',
  wd_post_gas_per_t: 'WindowedPoSt Gas/T',

  //到期扇区 만기 섹터
  exp_month: '{{year}}年{{month}}月到期',
  exp_time: '만료 시간',
  miner_count: '노드 수',
  exp_power: '만료 파워',
  sector_count: '만기 섹터',
  exp_dc: '만료 DC',
  exp_pledge: '만료 플레지',
  //个人中心
  default_user: '일반 사용자',
  last_login: '최근 로그인 시간',
  personal_setting: '계정 설정',
  personal_name: '계정 이름',
  old_placeholder: '기존 비밀번호를 입력하세요',
  old_password: '기존 비밀번호',
  new_password: '새 비밀번호',
  new_placeholder: '새로운 비밀번호를 입력해주세요',
  confirm_password: '비밀번호를 확인해주세요',
  confirm_placeholder: '새 비밀번호를 다시 입력해주세요',
  personal_name_holder: '계정을 입력해주세요',

  //余额监控
  miner: 'Miner 잔액',
  owner: 'Owner 잔액',
  worker: 'Worker 잔액',
  controller_0: 'Controller0 잔액',
  controller_1: 'Controller1 잔액',
  controller_2: 'Controller2 잔액',
  beneficiary: 'Beneficiary 잔액',

  //监控
  add_rules: '규칙 추가',
  examination: '규칙',
  alarm: '알람 모드',
  status: '상태',
  rules_more: '单个弹框最多添加10组规则，如还需添加请保存后再继续',
  warn_more: '最多支持添加3个',
  monitor_mobile_edit_tip: '监控增删改操作请前往PC端完成',
  //告警方式
  warn_title: '알람 모드',
  warn_title_des:
    ' 실제 상황에 따라 하나 또는 여러 가지의 경보 방법을 선택할 수 있습니다',
  email_warn: '이메일 알림',
  email_warn_placeholder: '알림 이메일 주소를 입력해주세요',
  email_warn_warning: '알림 이메일 주소를 입력해주세요',
  email_warn_des:
    '현재 계정에 등록된 이메일 주소는 자동으로 전송되므로 다시 제출할 필요가 없습니다',
  message_warn: '문자 메시지 알림',
  message_warn_placeholder: '통지를 받을 전화번호를 입력해주세요',
  message_warn_warning: '통지를 받을 전화번호를 입력해주세요',

  phone_warn: ' 전화 알림',
  phone_warn_placeholder: '통지를 받을 전화번호를 입력해주세요',
  phone_warn_warning: '통지를 받을 전화번호를 입력해주세요',

  //监控
  ExpireSectorMonitor: '섹터 만료일',
  edit_status: '규칙 닫기',
  edit_status_content: '您确定关闭此监控吗？关闭后将无法及时收到相关告警',
  delete_rule: '규칙 삭제',
  delete_rule_content: '이 모니터링을 삭제하시겠습니까?',

  //扇区监控
  reset_button: '초기화',
  edit_rules: '修改规则',
  rule_detail: '规则详情',
  edit_write_warn: '告警方式',
  sector_rule_title: '섹터 만료일',
  sector_rule_des: ' 사용자 정의 가능; 30보다 큰 값이 권장됩니다',
  sector_ruler_placeholder: '请输入正整数',
  sector_ruler_warningText: '请输入正整数',
  '<=': '이하',
  '>=': '大于等于',
  //余额监控
  balance_category_placeholder: '请选择余额类目',
  balance_rule_des: '当前 {{value}} FIL',
  //算力监控
  power_rules_1: '1. 扇区发生错误',
  power_rules_2: '2. 扇区主动终止',
  power_rules_3: '3. 扇区正常到期',
}

export default account
