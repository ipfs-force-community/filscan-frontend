const account = {
  date:'日期',
  confirm: '确认',
  cancel: '取消',
  login:'节点管家',
  go_home: '返回首页',
  go_login: '去登录',
  back:'返回',
  account_title:'节点管家',
  overview: '数据概览',
  data_details:'数据详情',
  miners: '节点管理',
  monitor: '监控管理',
  overview_monitorBalance: '余额监控',
  monitor_sector:'扇区监控',
  personal: '账号信息',
  logout: '退出登录',
  default_group: '默认分组',
  welcome: '欢迎来到Filscan!',
  welcome_text1: '恭喜！您的账户已成功注册,您可以使用您的邮箱号和密码继续登录。',
  welcome_text2: '请登录您的账户并享受您的Filscan服务!',
  last_time: '最新更新时间',
  all: '全部',
  all_groups: '全部分组',
  all_miners:'全部节点',
  edit:'操作',
  miner_add: '添加',
  //个人账户
  register_success: '恭喜！您的账户已注册成功，快来开启您的专属服务!',
  register_btn:'开启服务',

  //数据概览
  overview_power: '算力概览',
  overview_gas: 'Gas 消耗',
  overview_expired: '到期扇区',
  overview_reward: '出块奖励',
  overview_lucky: '幸运值',
  overview_balance: '地址余额',
  no_node_data:'暂未添加节点，去',
  miners_add: '添加节点',
  group_add: '添加分组',
  miners_group_manage: '分组设置',
  //total_out_come_gas: '总支出/Gas消耗',
  total_out_come_gas: '支出/Gas消耗',
  pledge_amount_24: '质押FIL/今日变化',
  balance_24:'账户余额/今日变化',
  quality_power_24: '有效算力/今日变化',

  //节点管理
  delete_group: '删除分组',
  delete_record_group: '确定删除分组“{{value}}”吗？',
  delete_group_text: '删除后该分组将不在列表中显示',

  delete_miner: '删除节点',
  delete_record_miner: '确定删除节点“{{value}}”吗？',
  delete_miner_text:'删除后该节点将不在分组中显示',

  //添加节点
  custom_tag:'自定义标签',
  miner_add_placeholder: '输入您要添加的节点账户ID',
  miner_select_group_placeholder: '选择分组（如未选择组，添加的节点将全部进入“默认分组”中',

  //分组
  create_group: '创建分组',
  create_group_holder: '输入您要创建组的名称',
  item_value: '组内 {{value}} 个节点',
  group_name: '分组名称',

  //幸运值
  "all":'全部',
  "24h_lucky":"24时幸运值	",
  "7d_lucky":"7天的幸运值",
  "30d_lucky":"30天幸运值",
  "1year_lucky": "1年的幸运值",
  tag: '标签',
  miner_id: '节点ID',

  //地址余额
  miner_balance: '节点余额/今日变化',
  owner_balance: 'Owner余额/今日变化',
  worker_balance:'Worker余额/今日变化',
  controller_0_balance: 'Controller0余额/今日变化',
  controller_1_balance: 'Controller1余额/今日变化',
  controller_2_balance: 'Controller2余额/今日变化',
  beneficiary_balance: 'Beneficiary余额/今日变化',
  market_balance: 'MarketBalance余额/今日变化',

  //奖励
  block_count:'爆块',
  win_count:'赢票',
  block_reward:'奖励',
  total_reward: "总奖励",
  total_reward_24:'出块奖励',
  //total_reward_24:'奖励/今日变化',

  //算力概览
  quality_power: '有效算力',
  dc_power:'DC算力',
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
  pledge_changed_per_t_tip:'质押变化÷扇区变化(TiB)',
  penalty_tip: '被惩罚的FIL数量',
  fault_sectors_tip: '新增的错误扇区数量',
  total_gas_cost_tip: '所有类型消耗Gas的总和',
  seal_gas_cost_tip: '扇区封装消耗的Gas总和（PreCommitSector+ProveCommitSector+PreCommitSectorBatch+ProveCommitAggregate+PreCommit 聚合费+ProveCommit 聚合费',
  seal_gas_per_t_tip: '封装Gas÷新增扇区(TiB)',
  deal_gas_cost_tip: '真实数据PublishStorageDeals消耗',
  wd_post_gas_cost_tip:"时空证明SubmitWindowedPoSt消耗",
  wd_post_gas_per_t_tip:'时空证明Gas÷原值算力(TiB)',
  //gas
  total_gas_cost: 'Gas总消耗',
  seal_gas_cost: '封装Gas',
  seal_gas_per_t: '封装Gas/T',
  deal_gas_cost: '发单Gas',
  wd_post_gas_cost: '时空证明Gas',
  wd_post_gas_per_t:'时空证明Gas/T',

  //到期扇区
  exp_month: '{{year}}年{{month}}月到期',
  exp_time:'到期时间',
  miner_count: '节点数',
  exp_power: '到期算力',
  sector_count: '到期扇区数',
  exp_dc:'到期DC',
  exp_pledge:'到期抵押',
  //个人中心
  default_user: '普通用户',
  last_login: '上次登录时间',
  personal_setting: '账户设置',
  personal_name: '账户名称',
  old_placeholder: '输入旧密码',
  old_password:'旧密码',
  new_password: '新密码',
  new_placeholder:'输入新密码',
  confirm_password: '确认密码',
  confirm_placeholder: '重新输入新密码',
  personal_name_holder: '请输入账户名称',
  name_length: '名称长度小于10',

  //下载
  out_come_gas: '支出',
  
  //监控
  add_rules:'添加规则',
  examination: '规则',
  alarm: '告警方式',
  status:'状态'

}

export default account