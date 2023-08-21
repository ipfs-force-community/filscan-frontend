/** @format */

import {
  formatDateTime,
  formatFilNum,
  get_account_type,
  isIndent,
  unitConversion,
} from '@/utils';
import { Item } from './type';
import Link from 'next/link';
import Copy from '@/components/copy';

//储存池概览 账户余额 & 有效算力

export const account_balance = {
  title: 'balance',
  list: [
    {
      title: 'available_balance',
      dataIndex: 'available_balance',
      color: '#256DF3',
    },
    {
      title: 'init_pledge',
      dataIndex: 'init_pledge',
      color: '#D5E3F4',
    },
    {
      title: 'pre_deposits',
      dataIndex: 'pre_deposits',
      color: '#4ACAB4',
    },
    {
      title: 'locked_balance',
      dataIndex: 'locked_balance',
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
        if (Number(text) === 0) return text;
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

export const owner_detail = {
  list: [
    {
      title: 'owner_address',
      dataIndex: 'account_address',
      render: (text: string) => {
        return (
          <div className='flex gap-x-1 items-center'>
            <Link className='link' href={`/address/${text}`}>
              {text}
            </Link>
            <Copy text={text} />
          </div>
        );
      },
    },
    {
      title: 'owned_miners',
      dataIndex: 'owned_miners',
      render: (text: Array<any>, record: any) => {
        return (
          <span className='flex flex-wrap gap-2.5 items-baseline'>
            {text &&
              Array.isArray(text) &&
              text?.map((item: any, index: number) => {
                return (
                  <Link className='link' key={index} href={`/miner/${item}`}>
                    {item}
                  </Link>
                );
              })}
          </span>
        );
      },
    },
    {
      title: 'owned_active_miners',
      dataIndex: 'owned_active_miners',
      render: (text: Array<any>, record: any) => {
        return (
          <span className='flex flex-wrap gap-2.5 items-baseline'>
            {text &&
              Array.isArray(text) &&
              text?.map((item: any, index: number) => {
                return (
                  <Link className='link' key={index} href={`/miner/${item}`}>
                    {item}
                  </Link>
                );
              })}
          </span>
        );
      },
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
  title: 'power_change',
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

export const minerTabs = [
  {
    title: 'message_list',
    dataIndex: 'message_list',
    optionsUrl: 'AllMethodByAccountID',
  },
  {
    title: 'block_list',
    dataIndex: 'block_list',
  },
  {
    title: 'traces_list',
    dataIndex: 'traces_list',
    optionsUrl: 'AllMethodByAccountID',
  },
];

export const message_list = (fromList: any, toList: any) => [
  {
    dataIndex: 'cid',
    title: 'cid',
    width: '10%',
    render: (text: string) =>
      text ? (
        <Link href={`/message/${text}`} className='link_text'>
          {text ? isIndent(text, 6) : ''}
        </Link>
      ) : (
        '--'
      ),
  },
  {
    dataIndex: 'height',
    title: 'height',
    width: '10%',
    render: (text: string) => (
      <Link href={`/tipset/chain?height=${text}`} className='link_text'>
        {text}
      </Link>
    ),
  },
  {
    dataIndex: 'block_time',
    title: 'time',
    width: '15%',
    render: (text: string | number) => formatDateTime(text, 'YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: 'from',
    title: 'from',
    width: '15%',
    render: (text: string, record: any) => {
      if (!text) return '--';
      return (
        <span className='flex items-center gap-x-1'>
          {get_account_type(text)}
          {fromList?.domains && fromList?.domains[text] && (
            <Link
              href={`/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>
              ({fromList.domains[text]})
            </Link>
          )}
        </span>
      );
    },
  },
  {
    dataIndex: 'to',
    title: 'to',
    width: '15%',
    render: (text: string, record: any) => {
      if (!text) return '--';
      return (
        <div className='flex items-center gap-x-1'>
          {get_account_type(text)}
          {toList?.domains && toList?.domains[text] && (
            <Link
              href={`/domain/${toList.domains[text]}?provider=${toList.provider}`}>
              ({toList.domains[text]})
            </Link>
          )}
        </div>
      );
    },
  },
  {
    dataIndex: 'value',
    title: 'value',
    width: '10%',
    render: (text: number) =>
      text ? formatFilNum(text, false, false) : text || '--',
  },
  { dataIndex: 'exit_code', width: '10%', title: 'status' },
  { dataIndex: 'method_name', width: '15%', title: 'method_name' },
];

export const block_list = (fromList: any, toList: any) => [
  {
    dataIndex: 'cid',
    title: 'block_cid',
    width: '15%',
    render: (text: string) =>
      text ? (
        <Link href={`/tipset/chain?cid=${text}`} className='link_text'>
          {text ? isIndent(text, 6) : ''}
        </Link>
      ) : (
        '--'
      ),
  },
  {
    dataIndex: 'height',
    title: 'block_height',
    width: '15%',
    render: (text: string) => (
      <Link href={`/tipset/chain?height=${text}`} className='link_text'>
        {text}
      </Link>
    ),
  },
  {
    dataIndex: 'block_time',
    title: 'block_time',
    width: '20%',
    render: (text: string | number) => formatDateTime(text, 'YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: 'messages_count',
    width: '10%',
    title: 'block_messages_count',
  },
  {
    dataIndex: 'miner_id',
    width: '15%',
    title: 'block_miner_id',
    render: (text: string) => (
      <Link href={`/miner/${text}`} className='link'>
        {text}
      </Link>
    ),
  },
  {
    dataIndex: 'reward',
    title: 'block_mined_reward',
    width: '15%',
    render: (text: number) =>
      text ? formatFilNum(text, false, false) : text || '--',
  },
];
export const trance_list = (fromList: any, toList: any) => [
  {
    dataIndex: 'block_time',
    title: 'time',
    width: '20%',
    render: (text: string | number) => formatDateTime(text, 'YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: 'cid',
    title: 'cid',
    width: '15%',
    render: (text: string) =>
      text ? (
        <Link href={`/message/${text}`} className='link'>
          {isIndent(text, 6)}
        </Link>
      ) : (
        '--'
      ),
  },
  {
    dataIndex: 'from',
    title: 'from',
    width: '15%',
    render: (text: string, record: any) => {
      if (!text) return '--';
      return (
        <span className='flex items-center gap-x-1'>
          {get_account_type(text)}
          {fromList?.domains && fromList?.domains[text] && (
            <Link
              href={`/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>
              ({fromList.domains[text]})
            </Link>
          )}
        </span>
      );
    },
  },
  {
    dataIndex: 'to',
    title: 'to',
    width: '15%',
    render: (text: string, record: any) => {
      if (!text) return '--';
      return (
        <div className='flex items-center gap-x-1'>
          <div>{get_account_type(text)}</div>

          {toList?.domains && toList?.domains[text] && (
            <Link
              href={`/domain/${toList.domains[text]}?provider=${toList.provider}`}>
              ({toList.domains[text]})
            </Link>
          )}
        </div>
      );
    },
  },
  {
    dataIndex: 'value',
    width: '15%',
    title: 'value',
    render: (text: number) =>
      text ? formatFilNum(text, false, false) : text || '--',
  },
  { dataIndex: 'method_name', width: '20%', title: 'method_name' },
];
