const account = {
  date: '日期',
  day: '天',
  copy: '复制',
  confirm: '确认',
  cancel: '取消',
  //login: '节点管家',
  go_home: '返回首页',
  go_login: '去登录',
  back: '返回',
  select_group: '请选择分组',
  select_miner: '请选择节点',
  select_miner_tag: '请选择标签',
  account_title: '节点管家',
  all_tags: '全部标签',
  overview: '数据概览',
  data_details: '数据详情',
  miners: '节点管理',
  monitor: '监控管理',
  monitor_sector: '到期监控',
  monitor_balance: '余额监控',
  monitor_power: '算力监控',
  personal: '账号信息',
  logout: '退出登录',
  default_group: '默认分组',
  welcome: '欢迎来到Filscan!',
  welcome_text1:
    '恭喜！您的账户已成功注册,您可以使用您的邮箱号和密码继续登录。',
  welcome_text2: '请登录您的账户并享受您的Filscan服务!',
  last_time: '最新更新时间',
  all: '全部',
  all_groups: '全部分组',
  all_miners: '全部节点',
  edit: '操作',
  miner_add: '添加',
  edit_write: '修改',
  edit_delete: '删除',
  created_at: '创建时间',
  look_more: '查看权益',
  look_detail: '查看详情',
  look_detail_member: '免费赠送',
  //个人账户
  register_success: '恭喜！您的账户已注册成功，快来开启您的专属服务!',
  register_btn: '开启服务',

  //数据概览
  overview_power: '算力概览',
  overview_gas: 'Gas 消耗',
  overview_expired: '到期扇区',
  overview_reward: '出块奖励',
  overview_lucky: '幸运值',
  overview_balance: '地址余额',
  no_node_data: '暂未添加节点，去',
  miners_add: '添加节点',
  group_add: '添加分组',
  miners_group_manage: '分组设置',
  //total_out_come_gas: '总支出/Gas消耗',
  total_out_come_gas: '支出/Gas消耗',
  pledge_amount_24: '质押FIL/今日变化',
  balance_24: '账户余额/今日变化',
  quality_power_24: '有效算力/今日变化',

  //节点管理
  delete_group: '删除分组',
  delete_record_group: '确定删除分组“{{value}}”吗？',
  delete_group_text: '删除后该分组将不在列表中显示',

  delete_miner: '删除节点',
  delete_record_miner: '确定删除节点“{{value}}”吗？',
  delete_miner_text: '删除后该节点将不在分组中显示',

  //添加节点
  custom_tag: '自定义标签',
  miner_add_placeholder: '输入您要添加的节点账户ID',
  miner_select_group_placeholder:
    '选择分组（如未选择组，添加的节点将全部进入“默认分组”中',

  //分组
  create_group: '创建分组',
  create_group_holder: '输入您要创建组的名称',
  item_value: '组内 {{value}} 个节点',
  group_name: '分组名称',

  //幸运值
  all: '全部',
  '24h_lucky': '24时幸运值	',
  '7d_lucky': '7天的幸运值',
  '30d_lucky': '30天幸运值',
  '1year_lucky': '1年的幸运值',
  tag: '标签',
  miner_id: '节点ID',

  //地址余额
  miner_balance: '节点余额/今日变化',
  owner_balance: 'Owner余额/今日变化',
  worker_balance: 'Worker余额/今日变化',
  controller_0_balance: 'Controller0余额/今日变化',
  controller_1_balance: 'Controller1余额/今日变化',
  controller_2_balance: 'Controller2余额/今日变化',
  beneficiary_balance: 'Beneficiary余额/今日变化',
  market_balance: 'MarketBalance余额/今日变化',

  //奖励
  block_count: '爆块',
  win_count: '赢票',
  block_reward: '奖励',
  total_reward: '总奖励',
  total_reward_24: '出块奖励',
  //total_reward_24:'奖励/今日变化',

  //算力概览
  quality_power: '有效算力',
  dc_power: 'DC算力',
  raw_power: '原值算力',
  cc_power: 'CC算力',
  sector_size: '扇区大小',
  sector_power_change: '扇区变化',
  sector_power_count: 'Sector数量',
  sector_count_change: '扇区数量变化',
  pledge_changed: '质押变化',
  pledge_changed_per_t: '质押变化/T',
  penalty: '惩罚',
  fault_sectors: '错误扇区',
  sector_power_change_tip: 'Sector数量/原值算力的新增及终止的总和',
  pledge_changed_tip: 'Sector数量的新增及终止对应的质押变化总和',
  pledge_changed_per_t_tip: '质押变化÷扇区变化(TiB)',
  penalty_tip: '被惩罚的FIL数量',
  fault_sectors_tip: '新增的错误扇区数量',
  total_gas_cost_tip: '所有类型消耗Gas的总和',
  seal_gas_cost_tip:
    '扇区封装消耗的Gas总和（PreCommitSector+ProveCommitSector+PreCommitSectorBatch+ProveCommitAggregate+PreCommit 聚合费+ProveCommit 聚合费',
  seal_gas_per_t_tip: '封装Gas÷新增扇区(TiB)',
  deal_gas_cost_tip: '真实数据PublishStorageDeals消耗',
  wd_post_gas_cost_tip: '时空证明SubmitWindowedPoSt消耗',
  wd_post_gas_per_t_tip: '时空证明Gas÷原值算力(TiB)',
  //gas
  total_gas_cost: 'Gas总消耗',
  seal_gas_cost: '封装Gas',
  seal_gas_per_t: '封装Gas/T',
  deal_gas_cost: '发单Gas',
  wd_post_gas_cost: '时空证明Gas',
  wd_post_gas_per_t: '时空证明Gas/T',

  //到期扇区
  exp_month: '{{year}}年{{month}}月到期',
  exp_time: '到期时间',
  miner_count: '节点数',
  exp_power: '到期算力',
  sector_count: '到期扇区数',
  exp_dc: '到期DC',
  exp_pledge: '到期抵押',
  //个人中心
  default_user: '普通用户',
  last_login: '上次登录时间',
  personal_setting: '账户设置',
  personal_name: '账户名称',
  old_placeholder: '输入旧密码',
  old_password: '旧密码',
  new_password: '新密码',
  new_placeholder: '输入新密码',
  confirm_password: '确认密码',
  confirm_placeholder: '重新输入新密码',
  personal_name_holder: '请输入账户名称',
  name_length: '名称长度小于10',

  //下载
  out_come_gas: '支出',

  //余额监控
  miner: '节点余额',
  owner: 'Owner余额',
  worker: 'Worker余额',
  controller_0: 'Controller0余额',
  controller_1: 'Controller1余额',
  controller_2: 'Controller2余额',
  beneficiary: 'Beneficiary余额',

  //监控
  add_rules: '添加规则',
  examination: '规则',
  alarm: '告警方式',
  status: '状态',
  rules_more: '单个弹框最多添加10组规则，如还需添加请保存后再继续',
  warn_more: '最多支持添加3个',
  monitor_mobile_edit_tip: '监控增删改操作请前往PC端完成',
  //告警方式
  warn_title: '告警方式',
  warn_title_des: '告警方式可根据实际情况选择一种或组合',
  email_warn: '邮箱告警',
  email_warn_placeholder: '请输入告警邮箱地址',
  email_warn_warning: '请输入正确邮箱地址',
  email_warn_des: '当前账户注册邮箱会默认发送，无需重复提交',
  message_warn: '短信告警',
  message_warn_placeholder: '请输入接收号码',
  message_warn_warning: '请输入正确的接收号码',

  phone_warn: '电话告警',
  phone_warn_placeholder: '请输入接收号码',
  phone_warn_warning: '请输入正确的接收号码',

  //监控
  ExpireSectorMonitor: '扇区到期时间',
  edit_status: '关闭规则',
  edit_status_content: '您确定关闭此监控吗？关闭后将无法及时收到相关告警',
  delete_rule: '删除规则',
  delete_rule_content: '您确定删除此监控吗?',

  //扇区监控
  reset_button: '重置',
  add_rules: '添加规则',
  edit_rules: '修改规则',
  rule_detail: '规则详情',
  edit_write_warn: '告警方式',
  sector_rule_title: '扇区到期时间',
  sector_rule_des: '可自定义,建议大于30',
  sector_ruler_placeholder: '请输入正整数',
  sector_ruler_warningText: '请输入正整数',
  '<=': '小于等于',
  '>=': '大于等于',
  //余额监控
  balance_category_placeholder: '请选择余额类目',
  balance_rule_des: '当前 {{value}} FIL',
  //算力监控
  power_rules_1: '1. 扇区发生错误',
  power_rules_2: '2. 扇区主动终止',
  power_rules_3: '3. 扇区正常到期',
  //会员
  //会员
  member_miner_warn: '当前节点个数已达上限，升级会员畅享',
  member_warn: '您的会员权益即将到期，请及时续费，以免影响正常使用',
  member_header: '如果你担心或碰到过以下问题',
  power_title: '算力掉落',
  power_text: '扇区大批出错，致使算力锐减却无法及时获知，导致出块奖励损失惨重',
  balance_title: '账户余额不足',
  balance_text: '账户余额不足，却无法及时获取信息，导致扇区封装或维持失败',
  sector_title: '扇区到期',
  sector_text: '扇区到期了算力也跟着掉落，才想起应该早点续期，有个提醒就好了',
  warn_power: '算力监控',
  warn_balance: '余额监控',
  warn_sector: '扇区监控',
  warn_email: '邮箱告警',
  warn_msg: '短信告警',
  warn_phone: '电话告警',
  data_text: '重点信息一站式监控',
  warn_text: '告警渠道多样，灵活配置',
  member_warn_title: '添加监控，告警快人一步',
  member_content_title: '加入会员，即刻开启',
  companies: '企业会员',
  companiesPro: '企业Pro版',
  companies_1: '30个节点上限',
  companies_2: '算力监控',
  companies_3: '余额监控',
  companies_4: '扇区监控',
  companies_5: '更多（敬请期待）',
  companies_6: '技术服务支持',
  monthly: '月度会员',
  quarter: '季度会员',
  year: '年度会员',
  quarter_discount: '低于8.8折',
  year_discount: '低于8折',
  share_friend: '邀请朋友，赠送一个月企业版会员',
  share_turn: '即刻开启，最大化减少损失',
  tg_title: '添加商务TG开通',
  //活动
  success_member: '已成功注册',
  error_member: '未绑定节点',
  success_miners: '已绑定节点',
  success_active: '有效',
  error_active: '无效',
  invitees: '被邀请人',
  is_valid: '是否有效',
  send_member: '送会员',
  invite_code: '邀请码',
  active_share: '去邀请',
  active_member_warn: '短信 、电话告警',
  active: '邀请活动',
  active_rule: '活动规则',
  active_detail: '详情',
  active_rule_detail: '活动规则详情',
  rule_content:
    '累计邀请2名节点管理者注册，且被邀请账号绑定了有效节点信息，赠送价值169U的企业版会员一个月。被邀请者也可体验7天企业版权益。',
  active_member: '企业版会员权益',
  active_member_1: '享有完整监控能力',
  active_expired: '会员到期后，权益自动回收，您可通过续费继续享用相关服务。',
  active_1: '邀请好友',
  active_1_des: '发送邀请海报或邀请码给好友，扫码或登录官网填写邀请码注册',
  active_2: '注册添加',
  active_2_des: '好友注册成功，并成功添加有效节点',
  active_3: '邀请2个有效好友',
  active_3_des: '邀请2个有效好友，成功领取奖励',
  active_target_1: '节点信息 一网打尽',
  active_target_2: '异常告警 快人一步',
  scan_code: '立即扫码体验',
  active_des: '活动解释权归FILSCAN所有',
  active_gift: '新人赠送7天企业版体验权益',
  active_save: '保存本地',
  copy_tg: '复制ID',
  recommend: '推荐',
  //personal
  personal_1: '升级/续费会员',
  personal_2: '绑定邮箱',
  personal_3: '修改密码',
  member_expired_time: '到期',
  mail_success: '已绑定',

  //第一次弹窗
  free_send: '企业会员免费赠送',
}

export default account
