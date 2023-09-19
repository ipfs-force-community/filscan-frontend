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
  // {
  //   label:'1year',
  //   title: '1year',
  //   value: '1year',
  //   dataIndex:'1year',
  // },
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
      title: 'power_increase',
      dataIndex: 'power_increase',
      yIndex: 1,
      color: '#1C6AFD',
      type: 'bar',
    }, //算力增长
    {
      dataIndex: 'power_decrease',
      title: 'power_decrease',
      yIndex: 1,
      color: '#B0CBFE',
      type: 'bar',
    }, //算力损失

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
      title: 'block_reward_per_TiB',
      dataIndex: 'block_reward_per_tib',
      type: 'line',
      color: '#1C6AFD',
    },
  ]
}

export const active_node = {
  list: [
    {
      title: 'block_reward_per_tib',
      dataIndex: 'block_reward_per_tib',
      type: 'line',
      color: '#1C6AFD',
    },
  ]
}

export const active_miner_count = {
  list: [
    {
      title: 'active_miner_count',
      dataIndex: 'active_miner_count',
      type: 'line',
      color: '#1C6AFD',
    },
  ]
}
//DC CC 走势
export const cc_dc_trend= {
  list: [
    {
      title: 'dc_trend',
      dataIndex: 'dc',
      type: 'line',
      color: '#4ACAB4',
    },
    {
      title: 'cc_trend',
      dataIndex: 'cc',
      type: 'line',
      color: '#F8CD4D',
    },
  ]
}

export const fil_overviewList = [
  {
    title: 'pie_title_a',
    list: [
      {
        key: 'mined',
        color: '#F8CD4D'
      },
      {
        key: 'remaining_mined',
        color: '#1C6AFD'
      },
      {
        key: 'vested',
        color: '#4988FD'
      },
      {
        key: 'remaining_vested',
        color: '#4ACAB4'
      },
      {
        key: 'reserve_disbursed',
        color: '#B0CBFE'
      },
      {
        key: 'remaining_reserved',
        color: '#6E69CF'
      }
    ]
  },
  {
    title: 'pie_title_b',
    title_tip:'pie_title_a_tip',
    list: [
      {
        key: 'locked',
        color: '#4ACAB4'
      },
      {
        key: 'burnt',
        color: '#1C6AFD'
      },
      {
        key: 'circulating',
        color: '#F8CD4D'
      },
    ],
  }
]

export const fil_charts = {
  title: {
    label:'TokenRules'
  },
  chart:  [
    {
      key: 'FilecoinFoundation',
      name: 'Filecoin基金会',
      value: '5',
      color: '#477DE5'
    },
    {
      key: 'Contributors',
      name: '协议实验室团队及贡献者',
      value: '4.5',
      color: '#4FD0A1'
    },
    {
      key: 'protocolLab',
      name: '协议实验室',
      value: '10.5',
      color: '#5D77A3'
    },
    {
      key: 'FundraisingRemainder',
      name: '募资 – 剩余通证',
      value: '2.5',
      color: '#E8B61B'
    },
    {
      key: 'FundraisingSAFT',
      name: '募资 – 未来通证简单协议',
      value: '7.5',
      color: '#D75B42'
    },
    {
      key: 'MiningReserve',
      name: '为存储服务提供者预留通证',
      value: '15',
      color: '#59BAE3'
    },
    {
      key: 'TokenAllocation',
      name: '存储提供者通证分配',
      value: '55',
      color: '#876AC3'
    }
  ],
  content: [
    {
      label: 'Allocation',
      value: 'value',
      Released: 'Released',
      description: 'description'
    },
    {
      label: 'filBase',
      value: '2,000,000,000',
      Released: '2,000,000',
      description: 'filBase_des'
    },
    {
      label: 'ReservedTokens',
      value: '300,000,000 ',
      Released: '300,000 ',
      description:
            'ReservedTokens_des'
    },
    {
      label: 'TokenAllocation',
      value: '1,100,000,000',
      Released: '1,100',
      description: 'TokenAllocation_des'
    },
    {
      label: 'Fundraising',
      value: '150,000,000 ',
      Released: '50,000 ',
      description: 'Fundraising_des'
    },
    {
      label: 'Funds',
      value: '50,000,000',
      Released: '50,000 ',
      description: 'Funds_des'
    },
    {
      label: 'FilecoinFoundation',
      value: '100,000,000',
      description: 'FilecoinFoundation_des'
    },
    {
      label: 'protocolLab',
      value: '210,000,000',
      Released: '20,000',
      description: 'protocolLab_des'
    },
    {
      label: 'Contributors',
      value: '90,000,000',
      Released: '9,000 ',
      description: 'Contributors_des'
    }
  ]
}
//charts
export const chartsNav:Array<Menu_Info> = [
  {
    key: 'BlockChain',
    preIcon: 'block_chain',
    title:'BlockChain',
    // children: [
    //   {
    //     key: 'power',
    //     title: 'power',
    //   },
    //   {
    //     key: 'cc_dc_power',
    //     title:'cc_dc_power',
    //   },
    //   {
    //     key: 'block_trend',
    //     title:'block_trend',
    //   },
    //   {
    //     key: 'block_reward_per',
    //     title:'block_reward_per_TiB',
    //   },
    //   {
    //     key: 'active_nodes',
    //     title:'active_nodes',
    //   }
    // ]
  },
  {
    key: 'fil_overview',
    preIcon: 'fil_overview',
    title:'fil_overview',

  }
]