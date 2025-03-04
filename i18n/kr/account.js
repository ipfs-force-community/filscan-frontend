const account = {
  date: '날짜',
  day: '일',
  copy: 'Copy',
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
  monitorSector: '만료 모니터링',
  monitorBalance: '잔액 모니터링',
  monitorPower: '전력 모니터링',
  personal: '계좌 정보',
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
  select_group: '그룹을 선택하세요',
  select_miner: '채굴자를 선택해 주세요',
  select_miner_tag: '请选择标签',
  //个人账户
  register_success: '축하합니다! 회원 가입이 성공적으로 완료되었습니다',
  register_btn: '활성화하다',

  edit: '작업',
  miner_add: '添加',
  edit_write: '수정',
  edit_delete: '삭제',
  created_at: '생성 시간',

  //数据概览
  power: '해시파워 개요',
  gas: 'Gas 소비',
  expired: '만기 섹터',
  reward: '블록 보상',
  lucky: '행운값',
  balance: '잔액',
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
  rules_more:
    '단일 대화 상자에는 최대 10개의 규칙 세트를 추가할 수 있습니다. 더 추가해야하는 경우 변경 내용을 저장한 후 계속하십시오',
  warn_more: '최대 3개까지 추가할 수 있습니다',
  monitor_mobile_edit_tip:
    '모니터링 추가, 삭제 및 수정과 같은 작업은 PC 버전에서 진행해 주세요',
  //告警方式
  warn_title: '알람 모드',
  warn_title_des:
    ' 실제 상황에 따라 하나 또는 여러 가지의 경보 방법을 선택할 수 있습니다',
  email_warn: '이메일 알림',
  email_warn_placeholder: '올바른 이메일 주소를 입력해주세요',
  email_warn_warning: '알림 이메일 주소를 입력해주세요',
  email_warn_des:
    '현재 계정에 등록된 이메일 주소는 자동으로 전송되므로 다시 제출할 필요가 없습니다',
  message_warn: '문자 메시지 알림',
  message_warn_placeholder: '통지를 받을 전화번호를 입력해주세요',
  message_warn_warning: '올바른 수신 번호를 입력해주세요',

  phone_warn: ' 전화 알림',
  phone_warn_placeholder: '통지를 받을 전화번호를 입력해주세요',
  phone_warn_warning: '통지를 받을 전화번호를 입력해주세요',

  //监控
  ExpireSectorMonitor: '섹터 만료일',
  edit_status: '규칙 닫기',
  edit_status_content:
    '이 모니터링을 비활성화하시겠습니까? 비활성화되면 관련된 경고를 즉시 받을 수 없게 됩니다.',
  delete_rule: '규칙 삭제',
  delete_rule_content: '이 모니터링을 삭제하시겠습니까?',

  //扇区监控
  reset_button: '초기화',
  edit_rules: '규칙 수정',
  rule_detail: '규칙 세부정보',
  edit_write_warn: '알람 모드',
  sector_rule_title: '섹터 만료일',
  sector_rule_des: ' 사용자 정의 가능; 30보다 큰 값이 권장됩니다',
  sector_ruler_placeholder: '양의 정수를 입력해주세요',
  sector_ruler_warningText: '양의 정수를 입력해주세요',
  '<=': '이하',
  '>=': '이상',
  //余额监控
  balance_category_placeholder: ' 잔액 카테고리',
  balance_rule_des: '현재의 {{value}} FIL',
  //算力监控
  power_rules_1: '1. 섹터에 오류가 발생했습니다',
  power_rules_2: '2. 섹터가 자발적으로 종료되었습니다',
  power_rules_3: '3. 섹터가 정상적으로 만료되었습니다',
  //会员
  member_miner_warn:
    '현재 노드 개수가 한도에 도달했습니다. 멤버십을 업그레이드하여 더 많은 혜택을 누려보세요.',
  member_warn:
    '회원님의 멤버십 혜택이 곧 만료될 예정입니다. 정상적인 이용을 위해 적시에 갱신해 주세요.',
  member_header: '다음과 같은 문제에 대해 걱정되거나 경험한 적이 있다면:',
  power_title: '컴퓨팅 파워 하락',
  power_text:
    '대량의 섹터 오류로 인해 컴퓨팅 파워가 급격히 감소하며, 채굴 보상 손실이 심각해질 수 있습니다. 그러나 이를 적시에 알 수 없습니다.',
  balance_title: '계정 잔액 부족',
  balance_text:
    '계정 잔액이 부족하지만 적시에 정보를 얻을 수 없어 섹터 봉인 또는 유지에 실패할 수 있습니다.',
  sector_title: '섹터 만료',
  sector_text:
    '섹터가 만료되면 컴퓨팅 파워도 함께 감소합니다. 더 일찍 갱신해야 한다는 것을 깨닫게 되었습니다. 알림이 있었다면 좋았을텐데요.',
  warn_power: '컴퓨팅 파워 모니터링',
  warn_balance: '잔액 모니터링',
  warn_sector: '섹터 모니터링',
  warn_email: '이메일 알림',
  warn_msg: '문자 메시지 알림',
  warn_phone: '전화 알림',
  data_text: '중요 정보 통합 모니터링',
  warn_text: '다양한 경고 채널과 유연한 구성',
  member_warn_title: '모니터링 추가, 경고로 빠르게 대응하기',
  member_content_title: '멤버십 가입, 즉시 시작하기',
  companies: '기업',
  companiesPro: '기업 Pro',
  companies_1: '30개 노드 한도',
  companies_2: '컴퓨팅 파워 모니터링',
  companies_3: '잔액 모니터링',
  companies_4: '섹터 모니터링',
  companies_5: '기타 (곧 제공 예정)',
  companies_6: '기술 지원',
  monthly: '월간 멤버십',
  quarter: '분기별 멤버십',
  year: '연간 멤버십',
  quarter_discount: '12% 미만 할인',
  year_discount: '20% 미만 할인',
  share_friend: '친구를 초대하여 한 달간의 기업 멤버십을 선물하세요',
  share_turn: '지금 시작하고 손실을 최소화하세요',
  tg_title: '비즈니스 TG 추가로 활성화',
  //活动
  success_member: '가입 성공',
  error_member: '언바운드 노드',
  success_miners: '바인딩된 노드',
  success_active: '효율적인',
  error_active: '유효하지 않은',
  invitees: '초대 받은 사람',
  is_valid: '유효 여부',
  send_member: 'Free Vip',
  invite_code: '초대 코드',
  active_share: '지금 초대하기',
  active_member_warn: '문자 및 전화 알림',
  active: '초대 이벤트',
  active_rule: '이벤트 규칙',
  active_detail: '자세한 내용',
  active_rule_detail: '세부',
  rule_content:
    '노드 관리자 2명 이상을 초대하여 등록하고 초대된 계정이 유효한 노드 정보와 바인딩되면, 169U에 해당하는 1개월의 엔터프라이즈 에디션 회원 자격을 받게 됩니다. 초대 받은 사람들은 7일간 엔터프라이즈 에디션 혜택을 체험할 수도 있습니다.',
  active_member: '엔터프라이즈 에디션 회원 자격 혜택:',
  active_member_1: '완전한 모니터링 기능',
  active_expired:
    '회원 자격이 만료되면 혜택은 자동으로 회수됩니다. 회원 자격을 재신청하여 관련 서비스를 계속해서 이용할 수 있습니다.',
  active_1: '邀请好友',
  active_1_des:
    '친구에게 초대 포스터나 초대 코드를 보내고, 코드를 스캔하거나 공식 웹사이트에서 초대 코드로 등록하세요.',
  active_2: '注册添加',
  active_2_des: '친구가 성공적으로 등록하고 유효한 노드를 추가했습니다.',
  active_3: '邀请2个有效好友',
  active_3_des: '성공적으로 유효한 친구 2명을 초대하고 보상을 받았습니다.',
  active_target_1: '종합적인 노드 정보',
  active_target_2: '이상 경고로 한 발 앞서기',
  scan_code: '코드를 스캔하여 즉시 체험해 보세요',
  active_des: 'Filscan은 이 활동에 대한 해석 권한을 보유합니다',
  active_gift:
    '신규 사용자에게 7일간의 엔터프라이즈 버전 체험 기회가 제공됩니다',
  active_save: '로컬에 저장',
  copy_tg: '复制ID',
  recommend: '推荐',
  //personal
  personal_1: '멤버십 업그레이드/갱신',
  personal_2: '绑定邮箱',
  personal_3: '비밀번호 변경',
  member_expired_time: '{{value}}에 만료됨',
  mail_success: '경계',
  look_more: '혜택 보기',
  look_detail: '세부 내용 확인',
  look_detail_member: '무료로',
  //第一次弹窗
  free_send: '기업 회원 자유로운 선물',
}

export default account
