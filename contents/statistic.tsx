/** @format */

import { formatFilNum, formatNumber } from '@/utils';
import { Menu_Info } from './type';

export const timeList = [
  {
    label:'24h',
    title: '24h',
    value: '24h',
    dataIndex:'24h',
  },
  {
    label:'7d',
    title: '7d',
    value: '7d',
    dataIndex:'7d',
  },
  {
    label: '30d',
    title: '30d',
    value: '1m',
    dataIndex:'1m',
  },
  {
    label:'1year',
    title: '1year',
    value: '1year',
    dataIndex:'1year',
  },
];

export const gas = {
  title: 'trend_24', //基础手续费
  list: [
    {
      label: '24h',
      value: '24h',
    },
    {
      label: '7d',
      value: '7d',
    },
    {
      label: '30d',
      value: '1m',
    },
    {
      label: '1year',
      value: '1year',
    },
  ],
};

export const gas_24 = {
  title: {
    label: 'gas_24',
  },

  columns: [
    { dataIndex: 'method_name', title: 'method_name', align: 'left' }, //消息类型
    {
      dataIndex: 'avg_gas_premium',
      title: 'avg_gas_premium',
      render: (text: string | number) => formatFilNum(text, false, false),
    },
    {
      dataIndex: 'avg_gas_limit',
      title: 'avg_gas_limit',
      render: (v: string) => formatNumber(v),
    }, //平均Gas限额
    {
      dataIndex: 'avg_gas_used',
      title: 'avg_gas_used',
      render: (text: string | number) => formatNumber(text),
    }, //平均Gas消耗

    {
      dataIndex: 'avg_gas_fee',
      title: 'avg_gas_fee',
      render: (v: string) => {
        if (Number(v) === 0) {
          return 0;
        }
        return formatFilNum(v, false, false);
      },
    }, //平均手续费
    {
      dataIndex: 'sum_gas_fee',
      title: 'sum_gas_fee/ratio',
      render: (text: string, record: any) => {
        if (Number(text) === 0) {
          return 0;
        }

        return `${formatFilNum(text, false, false)}/${Number(
          record.gas_fee_ratio * 100
        ).toFixed(2)}%`;
      },
    }, //合计手续费/占比
    {
      dataIndex: 'message_count',
      title: 'message_count/ratio',
      render: (text: string, record: any) => {
        return `${formatNumber(text)}/${(
          record.message_count_ratio * 100
        ).toFixed(2)}%`;
      },
    }, //消息数/占比
  ],
};

//算力走势图
export const power_trend = {
  title: 'power',
  list: [
    {
      title: 'total_quality_adj_power',
      dataIndex: 'total_quality_adj_power',
      yIndex: 0,
      type: 'line',
      color: '#FFC53D',
    }, //有效算力
    {
      title: 'total_raw_byte_power',
      dataIndex: 'total_raw_byte_power',
      yIndex: 0,
      type: 'line',
      color: '#4ACAB4',
    }, //原值算力
    {
      dataIndex: 'change_quality_adj_power',
      title: 'change_quality_adj_power',
      yIndex: 1,
      color: '#1C6AFD',
      type: 'bar',
    }, //算力增长，环比有效算力
    {
      title: 'base_line_power',
      dataIndex: 'base_line_power',
      yIndex: 1,
      color: '#D4D8DD',
      type: 'bar',
    }, //基线算力
  ],
};

//合约交易走势图
export const contract_trend = {

  list: [
    {
      title: 'contract_trend',
      dataIndex: 'txs_count',
      type: 'line',
      color: '#1C6AFD',
    },
  ],
};

// 区块奖励走势
export const block_rewards = {
  list: [
    {
      title: 'acc_block_rewards',
      dataIndex: 'acc_block_rewards',
      type: 'line',
      color: '#1C6AFD',
    },
  ]
}
//产出效率
export const block_rewards_per = {
  list: [
    {
      title: 'block_reward_per_tib',
      dataIndex: 'block_reward_per_tib',
      type: 'line',
      color: '#1C6AFD',
    },
  ]
}
export const active_node= {
  list: [
    {
      title: 'active_miner_count',
      dataIndex: 'active_miner_count',
      type: 'line',
      color: '#1C6AFD',
    },
  ]
}
//charts
export const chartsNav:Array<Menu_Info> = [
  {
    key: 'BlockChain',
    preIcon: 'block_chain',
    title:'BlockChain',
    children: [
      {
        key: 'power',
        title: 'power',
      },
      {
        key: 'cc_dc_power',
        title:'cc_dc_power',
      },
      {
        key: 'block_trend',
        title:'block_trend',
      },
      {
        key: 'block_reward_per',
        title:'block_reward_per_TiB',
      },
      {
        key: 'active_nodes',
        title:'active_nodes',
      }
    ]
  }
]