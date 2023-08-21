/** @format */

import { unitConversion } from '@/utils';
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
      align: 'right',
      render: (text: number) => (text ? unitConversion(text, 2) : '--'),
    },
    {
      title: 'sector_size',
      dataIndex: 'sector_size',
      render: (text: number) => {
        return text ? unitConversion(text) : '--';
      },
    },
    {
      title: 'sector_stauts',
      dataIndex: 'sector_stauts',
      width: '100%',
      renderList: [
        { title: 'sector_count', value: 'live_sector_count' },
        {
          title: 'live_sector_count',
          value: 'active_sector_count',
          color: '#5ad8a6',
        },
        {
          title: 'fault_sector_count',
          value: 'fault_sector_count',
          color: '#ff000f',
        },
        {
          title: 'recover_sector_count',
          value: 'recover_sector_count',
          color: '#ffc631',
        },
      ],
    },
  ],
};
