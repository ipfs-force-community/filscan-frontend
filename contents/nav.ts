import { Menu_Info } from "./type"

const navMenu: Array<Menu_Info> = [
  {
    key: 'home',
    link: '/home'
  },
  {
    key: 'tipset',
    children: [
      //   {
      //       key: 'tipset_chain',
      //       link:'/tipset/chain/'
      //   },
      {
        key: 'tipset_message',
        link: '/tipset/message-list/'
      },
      {
        key: 'tipset_ranking',
        link: '/tipset/address-list/'
      },
      {
        key: 'tipset_dsn',
        link: '/tipset/dsn/'
      },
      {
        key: 'tipset_pool-message',
        link: '/tipset/pool-message/'
      },
    ]
  },
  {
    key: 'contract',
    preIcon: 'newIcon',
    color: '#F44C30',
    children: [
      {
        key: 'token',
        link: '/contract/token/'
      },
      {
        key: 'nft',
        link: '/contract/nft/'
      },
      {
        key: 'defi_dashboard',
        link: '/fevm/defi/'
      },
      {
        key: 'contract_rank',
        link: '/contract/rank/'
      },
      {
        key: 'contract_list',
        link: '/contract/list/'
      },
      {
        key: 'contract_verify',
        link: '/contract/verify/'
      },

    ]
  },
  { key: 'ranking', link: '/rank' },
  {
    key: 'statistics',
    children: [
      { key: 'statistics_gas', link: '/statistics/gas' },
      { key: 'statistics_base', link: '/statistics/power' },
      { key: 'statistics_fil', link: '/statistics/fil' },
      { key: 'statistics_charts', link: '/statistics/charts' },
    ]
  },
  {
    key: 'fvm',
    sufIcon: 'hotIcon',
    color: '#F44C30',
    link: '/fvm'
  },
  {
    out_key: 'account',
    key: 'account',
    link: '/account'
  }
]

const mobileNavMenu: Menu_Info[] = [
  {
    key: 'fvm',
    sufIcon: 'hotIcon',
    color:'#F44C30',
    link:'/fvm'
  },
  {
    key: 'tipset',
    children: [
      {
        key: 'tipset_message',
        link:'/tipset/message-list/'
      },
      {
        key: 'tipset_ranking',
        link:'/tipset/address-list/'
      },
      {
        key: 'tipset_dsn',
        link:'/tipset/dsn/'
      },
      {
        key: 'tipset_pool-message',
        link:'/tipset/pool-message/'
      },
    ]
  },
  {
    key: 'contract',
    preIcon: 'newIcon',
    color:'#F44C30',
    children: [
      {
        key: 'token',
        link:'/contract/token/'
      },
      {
        key: 'nft',
        link:'/contract/nft/'
      },
      {
        key: 'defi_dashboard',
        link:'/fevm/defi/'
      },
      {
        key: 'contract_rank',
        link:'/contract/rank/'
      },
      {
        key: 'contract_list',
        link:'/contract/list/'
      },
      {
        key: 'contract_verify',
        link:'/contract/verify/'
      },

    ]
  },
  {
    key: 'statistics',
    children: [
      { key: 'statistics_gas',link:'/statistics/gas'},
      { key: 'statistics_base',link:'/statistics/power' },
      { key: 'statistics_fil' ,link:'/statistics/fil'},
      { key: 'statistics_charts', link: '/statistics/charts' },
    ]
  },
//   { key: 'ranking' ,link:'/rank'},
//   {
//     out_key: 'provider',
//     key:'provider',
//     outLink:'http://v1.filscan.io/account?key=login'
//   }
]

export { navMenu,mobileNavMenu }