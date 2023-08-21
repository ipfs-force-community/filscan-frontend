/** @format */

import { formatFilNum, unitConversion } from '@/utils';
import { Item } from './type';

//储存池概览 账户余额 & 有效算力

export const account_balance = {
  title: 'balance',
  list: [
    {
      title: 'available_balance',
      dataIndex: 'available_balance',
      type: ['account_indicator'],
      color: '#256DF3',
    },
    {
      title: 'init_pledge',
      dataIndex: 'init_pledge',
      type: ['account_indicator'],
      color: '#D5E3F4',
    },
    {
      title: 'pre_deposits',
      dataIndex: 'pre_deposits',
      color: '#4ACAB4',
      type: ['account_indicator'],
    },
    {
      title: 'locked_balance',
      dataIndex: 'locked_balance',
      type: ['account_indicator'],
      color: '#7F79EB',
    },
  ],
};

export const power_list = {
  header: [
    {
      title: 'quality_adjust_power',
      dataIndex: 'quality_adjust_power',
      render: (text: number) => (text ? unitConversion(text, 2) : '--'),
    },
    {
      title: 'quality_power_rank',
      dataIndex: 'quality_power_rank',
      render: (text: number) => text || '--',
    },
  ],
  list: [
    {
      title: 'raw_power_percentage',
      dataIndex: 'quality_power_percentage',
      render: (text: number) =>
        text ? Number(text * 100).toFixed(4) + '%' : '--',
    },
    {
      title: 'raw_power',
      dataIndex: 'raw_power',
      render: (text: number) => (text ? unitConversion(text, 2) : '--'),
    },
    {
      title: 'total_block_count',
      dataIndex: 'total_block_count',
    },

    {
      title: 'total_win_count',
      dataIndex: 'total_win_count',
    },
    {
      title: 'total_reward',
      dataIndex: 'total_reward',
    },
    {
      title: 'sector_size',
      dataIndex: 'sector_size',
      render: (text: number) => {
        return text ? unitConversion(text) : '--';
      },
    },
  ],
  sector_status: {
    title: 'sector_status',
    dataIndex: 'sector_stauts',
    width: '100%',
    renderList: [
      { title: 'sector_count', dataIndex: 'live_sector_count' },
      {
        title: 'live_sector_count',
        dataIndex: 'active_sector_count',
        color: '#1C6AFD',
      },
      {
        title: 'fault_sector_count',
        dataIndex: 'fault_sector_count',
        color: '#ff000f',
      },
      {
        title: 'recover_sector_count',
        dataIndex: 'recover_sector_count',
        color: '#ffc631',
      },
    ],
  },
};

//miner_统计指标

export const miner_overview = {
  title: 'indicators',
  tabList: [
    { title: '24h', dataIndex: '24h' },
    { title: '7d', dataIndex: '7d' },
    { title: '30d', dataIndex: '1m' },
    { title: '1year', dataIndex: '1year' },
  ],
  list: [
    {
      title: 'power_ratio',
      dataIndex: 'power_ratio',
      width: '20%',
      style: { alignSelf: 'flex-start' },
      render: (text: string | number) =>
        text ? unitConversion(text, 2) + '/D' : '--',
    },
    {
      title: 'precommit_deposits',
      dataIndex: 'sector_deposits',

      style: { width: '20%', justifyContent: 'flex-start' },

      render: (text: string | number) =>
        text ? formatFilNum(text, false, false) : text,
    }, //扇区质押
    {
      title: 'gas_fee',
      dataIndex: 'gas_fee',
      width: '20%',
      style: { alignSelf: 'flex-start' },

      render: (text: string | number) =>
        text ? formatFilNum(text, false, false) : '--',
    },
    {
      title: 'win_count',
      width: '32%',
      dataIndex: 'win_count',
      title_tip: 'win_count_tip',
      render: (text: any) => String(text) || '--',
    },
    {
      title: 'block_count',
      width: '32%',
      dataIndex: 'block_count_increase',
      title_tip: 'block_count_tip',
      render: (text: any) => String(text) || '--',
    },
    {
      title: 'block_rewards',
      width: '32%',
      dataIndex: 'block_reward_increase',
      render: (text: string | number) =>
        text ? formatFilNum(text, false, false) : '--',
    },
    {
      title: 'mining_efficiency',
      dataIndex: 'rewards_per_tb',
      width: '32%',
      title_tip: 'mining_efficiency_tip',
      render: (text: string | number) =>
        text ? formatFilNum(text, false, false) + '/TiB' : '--',
    },
    {
      title: 'lucky',
      width: '32%',
      dataIndex: 'lucky',
      render: (text: string | number) =>
        text !== '-1' ? Number(100 * Number(text)).toFixed(4) + ' %' : '--',
    },
    {
      title: 'net_profit_per_tb',
      width: '32%',
      dataIndex: 'gas_fee_per_tb',
      title_tip: 'net_profit_per_tb_tip',
      render: (text: string | number) =>
        text ? formatFilNum(text, false, false, 3) : '--',
    },

    {
      title: 'power_increase_indicators',
      style: { width: '16%', justifyContent: 'flex-end' },
      dataIndex: 'power_increase',
      render: (text: string | number) =>
        text ? unitConversion(text, 2) : '--',
    },
  ],
};

export const account_change = {
  title: 'account_change',
  list: [
    {
      title: 'balance',
      dataIndex: 'balance',
      color: '#FFC53D',
      type: 'line',
    },

    {
      title: 'available_balance',
      dataIndex: 'available_balance',
      color: '#4ACAB4',
      type: 'line',
    },
    {
      title: 'init_pledge',
      dataIndex: 'initial_pledge',
      type: 'line',
      color: '#1C6AFD',
    },
    {
      title: 'locked_balance',
      dataIndex: 'locked_funds',
      type: 'line',
      color: '#6E69CF',
    },
  ],
};

export const power_change = {
  title: 'quality_adjust_power',
  tabList: [
    { title: '7d', dataIndex: '7d' },
    { title: '30d', dataIndex: '1m' },
  ],
  list: [
    { title: 'power', dataIndex: 'power', type: 'line', color: '#FFC53D' },
    {
      title: 'power_increase',
      dataIndex: 'power_increase',
      type: 'bar',
      color: '#1C6AFD',
    },
  ],
};
