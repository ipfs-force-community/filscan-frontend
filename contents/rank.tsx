/** @format */

import Link from 'next/link';
import { Item, Option_Item } from './type';
import { formatFilNum, unitConversion } from '@/utils';
import Progress from '@/packages/progress';

//    pool: '存储池排行',
//     provider: '节点排行',
//     growth:'算力增速',
//     rewards: '节点收益',

interface showHeader extends Item {
  options?: Array<string>;
}

const sectorOptions: Array<Option_Item> = [
  { label: 'select_rank_all', value: 'all' },
  { label: 'select_rank_32', value: '32 GiB' },
  { label: 'select_rank_64', value: '64 GiB' },
];
const timeList: Array<Option_Item> = [
  { label: '24h', value: '24h' },
  { label: 'week_days', value: '7d' },
  { label: 'month', value: '1m' },
];

export const rank_header:
  | {
      tabList: Array<showHeader>;
      growth: Record<string, Array<Option_Item>>;
      rewards: Record<string, Array<Option_Item>>;
    }
  | any = {
    tabList: [
      {
        title: 'provider',
        dataIndex: 'provider',
      },
      {
        title: 'pool',
        dataIndex: 'pool',
      },
      {
        title: 'growth',
        dataIndex: 'growth',
        options: ['sectorOptions', 'timeList'],
      },
      {
        title: 'rewards',
        dataIndex: 'rewards',
        options: ['sectorOptions', 'timeList'],
      },
    ],
    growth: { sector_size: sectorOptions, interval: timeList },
    rewards: { sector_size: sectorOptions, interval: timeList },
  };

export const providerList = (progress: any): Array<any> => {
  return [
    {
      title: 'ranking', //排名
      dataIndex: 'rank',
      width: '6%',
      align: 'center',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'provider_miner', //节点号
      dataIndex: 'miner_id',
      with: '9%',
      align: 'center',
      render: (text: string) => {
        return (
          <Link href={`/miner/${text}`} prefetch className='link_text'>
            {text}
          </Link>
        );
      },
    },
    {
      title: 'provider_power_ratio', //有效算力占比
      dataIndex: 'quality_adj_power',
      with: '37%',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text: string | number, record: any) => {
        const text1 = record.quality_power_ratio;
        const left = 100 - (Number(text) / Number(progress)) * 100;
        return (
          <span className='flex items-center gap-x-2'>
            <Progress left={left + '%'} />
            <span>{`${unitConversion(text, 2)} / ${(
              Number(text1) * 100
            ).toFixed(2)}%`}</span>
          </span>
        );
      },
    },
    {
      title: 'pool_increase_24h', //近24小时增长算力
      dataIndex: 'power_increase_24h',
      sorter: true,
      width: '13%',
      render: (text: string) => unitConversion(text, 4),
    },
    {
      title: 'provider_block_ratio', //出块总数占比
      dataIndex: 'block_count',
      rowKey: 'block_count',
      width: '15%',
      sorter: true,
      render: (text: string, record: any) => {
        const text1 = record.block_ratio;
        return `${text} / ${(Number(text1) * 100).toFixed(2)}%`;
      },
    },
    {
      title: 'provider_rewards_ratio', //奖励总数占比
      dataIndex: 'rewards',
      rowKey: 'rewards',
      width: '15%',
      sorter: true,
      render: (text: string, record: any) => {
        const text1 = formatFilNum(text, false, false, 2);
        return `${text1} / ${(Number(record.rewards_ratio) * 100).toFixed(2)}%`;
      },
    },
    {
      title: 'balance', //余额
      dataIndex: 'balance',
      sorter: true,
      width: '15%',
      render: (text: string) => formatFilNum(text, false, false, 2),
    },
  ];
};

export const poolList = (progress: number | string) => {
  return [
    {
      title: 'ranking', //排名
      dataIndex: 'rank',
      width: '6%',
      align: 'center',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'pool_owner', //存储池号
      dataIndex: 'owner_id',
      align: 'center',
      with: '9%',
      render: (text: string) => {
        return (
          <Link href={`/owner/${text}`} prefetch className='link_text'>
            {text}
          </Link>
        );
      },
    },
    {
      title: 'pool_power', //有效算力
      dataIndex: 'quality_adj_power',
      align: 'center',
      with: '30%',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text: string | number, record: any) => {
        const left = 100 - (Number(text) / Number(progress)) * 100;
        return (
          <span className='flex items-center gap-x-2'>
            <Progress left={left + '%'} />
            <span>{unitConversion(text, 2)}</span>
          </span>
        );
      },
    },
    {
      title: 'pool_efficiency_24h', //近24小时产出效率
      dataIndex: 'rewards_ratio_24h',
      sorter: true,
      with: '20%',
      render: (text: string) => formatFilNum(text, false, false, 2) + '/TiB',
    },
    {
      title: 'pool_increase_24h', //近24小时增长算力
      dataIndex: 'power_change_24h',
      sorter: true,
      with: '20%',
      render: (text: string) => unitConversion(text, 4),
    },
    {
      title: 'pool_block_count_24h', //出块总数
      dataIndex: 'block_count',
      sorter: true,
      with: '10%',
    },
  ];
};

const growthList = (progress: number | string) => {
  return [
    {
      title: 'ranking', //排名
      dataIndex: 'rank',
      width: '10%',
      align: 'center',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'miner', //节点号
      dataIndex: 'miner_id',
      width: '12%',
      render: (text: string) => {
        return (
          <Link href={`/miner/${text}`} className='link_text'>
            {text}
          </Link>
        );
      },
    },
    {
      title: 'power_ratio', //算力增速
      title_tip: 'power_ratio_tip',
      dataIndex: 'power_ratio',
      sorter: true,
      width: '18%',
      defaultSortOrder: 'descend',
      render: (text: string | number, record: any) => {
        const left = 100 - (Number(text) / Number(progress)) * 100;
        return (
          <span className='flex items-center gap-x-2'>
            <Progress left={left + '%'} />
            <span>{unitConversion(text, 2) + '/D'}</span>
          </span>
        );
      },
    },
    {
      title: 'quality_power_increase', //算力增量
      title_tip: 'quality_power_increase_tip',
      sorter: true,
      width: '15%',
      dataIndex: 'quality_power_increase',
      render: (text: string) => unitConversion(text, 2),
    },
    {
      title: 'quality_adj_power', //有效算力
      dataIndex: 'quality_adj_power',
      sorter: true,
      width: '15%',
      render: (text: string) => unitConversion(text, 2),
    },

    {
      title: 'raw_power', //原值算力
      dataIndex: 'raw_power',
      sorter: true,
      width: '15%',
      render: (text: string) => unitConversion(text, 2),
    },
    {
      title: 'sector_size', //扇区大小
      width: '15%',
      dataIndex: 'sector_size',
    },
  ];
};

const rewardsList = () => {
  return [
    {
      title: 'ranking', //排名
      dataIndex: 'rank',
      width: '10%',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'miner', //节点号
      dataIndex: 'miner_id',
      width: '15%',
      render: (text: string) => {
        return (
          <Link href={`/miner/${text}`} className='table_link'>
            {text}
          </Link>
        );
      },
    },
    {
      title: 'rewards/ratio',
      dataIndex: 'rewards',
      title_tip: 'rewards/ratio_tip',
      width: '18%',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text: string, record: any) => {
        const showNum = formatFilNum(text, false, false, 2);
        const ratio = Number(record.rewards_ratio * 100).toFixed(2) + '%';
        return `${showNum}/${ratio}`;
      },
    },
    {
      title: 'block_count',
      dataIndex: 'block_count',
      title_tip: 'block_count_tip',
      sorter: true,
      width: '15%',
    },
    {
      title: 'winning_rate',
      dataIndex: 'winning_rate',
      sorter: true,
      width: '12%',
      render: (text: any) => Number(text * 100).toFixed(2) + '%', //
    },
    {
      title: 'quality_adj_power',
      dataIndex: 'quality_adj_power',
      sorter: true,
      width: '15%',
      render: (text: string | number) => unitConversion(text, 2),
    },
    {
      title: 'sector_size',
      width: '15%',
      dataIndex: 'sector_size',
    },
  ];
};

export const getColumn = (type: string, progress: number | string) => {
  switch (type) {
  case 'provider':
    return providerList(progress);
  case 'pool':
    return poolList(progress);
  case 'growth':
    return growthList(progress);
  case 'rewards':
    return rewardsList();
  default:
    return providerList(progress);
  }
};

export const getDefaultSort: any = {
  provider: 'quality_adj_power',
  pool: 'quality_adj_power',
  growth: 'power_ratio',
  rewards: 'rewards',
};
