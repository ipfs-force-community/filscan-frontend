import { Menu_Info } from "./type"
import Hot from '@/assets/images/hot.svg'

const navMenu: Array<Menu_Info|any> = [
  {
    key: 'fvm',
    sufIcon:'hot',
    color: '#F44C30',
    link: '/fvm'
  },
  // {
  //   key: 'home',
  //   link: '/home'
  // },
  {
    key: 'tipset',
    children: [
      {
        key: 'tipset_chain',
        link: '/tipset/chain/'
      },
      {
        key: 'tipset_message',
        link: '/tipset/message-list/'
      },
      {
        key: 'tipset_dsn',
        link: '/tipset/dsn/'
      },
      {
        key: 'tipset_pool-message',
        link: '/tipset/pool-message/'
      },
      // {
      //   key: 'tipset_transfer',
      //   link: '/tipset/transfer/'
      // },
    ]
  },
  {
    key: 'contract',
    sufIcon: 'newIcon',
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
    ]
  },

  {
    key: 'network_overview', link: '/rank', children: [
      {
        key: 'ranking',
        link: '/rank',
      },
      {
        key: 'tipset_ranking',
        link: '/tipset/address-list/'
      },
      { key: 'statistics_gas', link: '/statistics/gas' },
      { key: 'statistics_charts', link: '/statistics/charts' },
      { key: 'cw', link: '/cw' },
    ]
  },
  {
    key: 'develop',
    children: [
      {
        key: 'contract_verify',
        link: '/contract/verify/'
      }
    ]
  },
  {
    key: 'provider',
    outLink:'http://v1.filscan.io/account?key=login'
  }
  // {
  //   out_key: 'account',
  //   key: 'account',
  //   link: '/account'
  // },
]

const mobileNavMenu: Menu_Info[] = [
  {
    key: 'fvm',
    sufIcon: 'hotIcon',
    color: '#F44C30',
    link: '/fvm'
  },
  {
    key: 'home',
    link: '/'
  },
  {
    key: 'tipset',
    children: [
      {
        key: 'tipset_chain',
        link: '/tipset/chain/'
      },
      {
        key: 'tipset_message',
        link: '/tipset/message-list/'
      },
      {
        key: 'tipset_dsn',
        link: '/tipset/dsn/'
      },
      {
        key: 'tipset_pool-message',
        link: '/tipset/pool-message/'
      },
      {
        key: 'tipset_transfer',
        link: '/tipset/transfer/'
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

    ]
  },
  {
    key: 'network_overview', link: '/rank', children: [
      {
        key: 'ranking',
        link: '/rank',
      },
      {
        key: 'tipset_ranking',
        link: '/tipset/address-list/'
      },
      { key: 'statistics_gas', link: '/statistics/gas' },
      { key: 'statistics_charts', link: '/statistics/charts' },
    ]
  }
]

export { navMenu, mobileNavMenu }