import { Menu_Info } from './type'

const navMenu: Array<Menu_Info | any> = [
  // {
  //   key: 'home',
  //   link: '/home'
  // },
  {
    key: 'network_overview',
    link: '/rank',
    // sufIcon: "newIcon",
    children: [
      {
        key: 'ranking',
        link: '/rank',
      },
      {
        key: 'tipset_ranking',
        link: '/tipset/address-list/',
      },
      {
        key: 'tipset_transfer',
        link: '/tipset/transfer/',
      },
      { key: 'statistics_gas', link: '/statistics/gas' },
      { key: 'statistics_charts', link: '/statistics/charts#networks' },
      {
        key: 'cw',
        link: '/cw',
        //sufIcon: "newIcon"
      },
    ],
  },
  {
    key: 'tipset',
    children: [
      {
        key: 'tipset_chain',
        link: '/tipset/chain/',
      },
      {
        key: 'tipset_message',
        link: '/tipset/message-list/',
      },
      {
        key: 'tipset_dsn',
        link: '/tipset/dsn/',
      },
      {
        key: 'tipset_pool-message',
        link: '/tipset/pool-message/',
      },
    ],
  },
  {
    key: 'contract',
    color: '#F44C30',
    children: [
      {
        key: 'token',
        link: '/contract/token/',
      },
      {
        key: 'nft',
        link: '/contract/nft/',
      },
      {
        key: 'defi_dashboard',
        link: '/fevm/defi/',
      },
      {
        key: 'contract_rank',
        link: '/contract/rank/',
      },
      {
        key: 'contract_list',
        link: '/contract/list/',
      },
    ],
  },

  {
    key: 'fvm',
    // sufIcon: "hot",
    color: '#F44C30',
    children: [
      {
        key: 'fvm_all',
        link: '/fvm',
      },
      {
        key: 'active',
        link: '/active',
      },
    ],
  },
  {
    key: 'develop',
    children: [
      {
        key: 'contract_verify',
        link: '/contract/verify/',
      },
    ],
  },
  // {
  //   key: "provider",
  //   outLink: "http://v1.filscan.io/account?key=login",
  // },
  // {
  //   out_key: 'account',
  //   key: 'account',
  //   link: '/account'
  // },
]

const mobileNavMenu: Menu_Info[] = [
  {
    key: 'home',
    link: '/',
  },
  {
    key: 'network_overview',
    link: '/rank',
    children: [
      {
        key: 'ranking',
        link: '/rank',
      },
      {
        key: 'tipset_ranking',
        link: '/tipset/address-list/',
      },
      {
        key: 'tipset_transfer',
        link: '/tipset/transfer/',
      },
      { key: 'statistics_gas', link: '/statistics/gas' },
      { key: 'statistics_charts', link: '/statistics/charts' },
    ],
  },
  {
    key: 'tipset',
    children: [
      {
        key: 'tipset_chain',
        link: '/tipset/chain/',
      },
      {
        key: 'tipset_message',
        link: '/tipset/message-list/',
      },
      {
        key: 'tipset_dsn',
        link: '/tipset/dsn/',
      },
      {
        key: 'tipset_pool-message',
        link: '/tipset/pool-message/',
      },
    ],
  },
  {
    key: 'fvm',
    // sufIcon: "hotIcon",
    color: '#F44C30',
    link: '/fvm',
  },
  {
    key: 'language',
    children: [
      {
        key: 'token',
        link: '/contract/token/',
      },
      {
        key: 'nft',
        link: '/contract/nft/',
      },
      {
        key: 'defi_dashboard',
        link: '/fevm/defi/',
      },
      {
        key: 'contract_rank',
        link: '/contract/rank/',
      },
      {
        key: 'contract_list',
        link: '/contract/list/',
      },
    ],
  },
  {
    key: 'fvm',
    sufIcon: 'hotIcon',
    color: '#F44C30',
    link: '/fvm',
  },
  {
    key: 'language',
    children: [
      {
        key: '中文',
        value: 'zh',
        type: 'lang',
      },
      {
        key: 'English',
        value: 'en',
        type: 'lang',
      },
      {
        key: '한국인',
        value: 'kr',
        type: 'lang',
      },
    ],
  },
  {
    key: 'network',
    children: [
      {
        key: 'Mainnet',
        value: 'Mainnet',
        type: 'network',
      },
      {
        key: 'Calibration',
        value: 'Calibration',
        type: 'network',
      },
    ],
  },
  {
    key: 'account_title',
    type: 'account',
    children: [
      {
        key: 'overview',
        link: '#overview',
      },
      {
        key: 'data_details',
        children: [
          {
            key: 'overview_power',
            link: '#power',
          },
          {
            key: 'overview_gas',
            link: '#gas',
          },
          {
            key: 'overview_expired',
            link: '#expired',
          },
          {
            key: 'overview_reward',
            link: '#expired',
          },
          {
            key: 'overview_reward',
            link: '#reward',
          },
          {
            key: 'overview_lucky',
            link: '#lucky',
          },
          {
            key: 'overview_balance',
            link: '#balance',
          },
        ],
      },
    ],
  },
  {
    key: 'monitor',
    type: 'account',
    children: [
      {
        key: 'monitor_balance',
        link: '#monitorBalance',
      },
      {
        key: 'monitor_sector',
        link: '#monitorSector',
      },
      {
        key: 'monitor_power',
        link: '#monitorPower',
      },
    ],
  },
  // {
  //   key: 'login',
  //   link: '/admin/login',
  //   // children: [
  //   //   {
  //   //     key: 'tipset_chain',
  //   //     link: '/tipset/chain/',
  //   //   },
  //   // ],
  // },
]

// {
//   value: "Mainnet",
//   label: "Mainnet",
// },
// {
//   value: "Calibration",
//   label: "Calibration",
// },

export { navMenu, mobileNavMenu }
