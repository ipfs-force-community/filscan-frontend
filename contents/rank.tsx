/** @format */

import Link from 'next/link';
import { Item, Option_Item } from './type';
import { unitConversion } from '@/utils';

//    pool: '存储池排行',
//     provider: '节点排行',
//     growth:'算力增速',
//     rewards: '节点收益',

export const rank_header: {
  tabList: Array<Item>;
  sectorOptions: Array<Option_Item>;
  timeList: Array<Option_Item>;
} = {
  tabList: [
    {
      title: 'provider',
      dataIndex: 'provider',
      api: '/MinerRank',
    },
    {
      title: 'pool',
      dataIndex: 'pool',
      api: '/OwnerRank',
    },
    {
      title: 'growth',
      dataIndex: 'growth',
      api: '/MinerPowerRank',
    },
    {
      title: 'rewards',
      dataIndex: 'rewards',
      api: '/MinerRewardRank',
    },
  ],
  sectorOptions: [
    { label: 'select_rank_all', value: 'all' },
    { label: 'select_rank_32', value: '32 GiB' },
    { label: 'select_rank_64', value: '64 GiB' },
  ],
  timeList: [
    { label: '24h', value: '24h' },
    { label: 'week_days', value: '7d' },
    { label: 'month', value: '1m' },
  ],
};

const firstObj: any = {
  title: 'ranking', //排名
  dataIndex: 'rank',
  width: '10%',
  align: 'center',
};

export const providerList = (progress: any): Array<any> => {
  return [
    {
      title: 'ranking', //排名
      dataIndex: 'rank',
      width: '10%',
      align: 'center',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'provider_miner', //节点号
      dataIndex: 'miner_id',
      with: '10%',
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
      with: '20%',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text: string | number, record: any) => {
        const text1 = record.quality_power_ratio;
        const left = (Number(text) / Number(progress)) * 100 + '%';
        return (
          <span className='other_progress'>
            <span className='progress'>
              <span className='mask' style={{ left }}></span>
            </span>
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
      render: (text: string) => unitConversion(text, 4),
    },
    {
      title: 'provider_block_ratio', //出块总数占比
      dataIndex: 'block_count',
      rowKey: 'block_count',
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
      sorter: true,
      // render: (text: string, record: any) => {
      //   const text1 = formatFil(text, 'FIL', 2) + 'FIL';
      //   return `${text1} / ${(Number(record.rewards_ratio) * 100).toFixed(2)}%`;
      // },
    },
    {
      title: 'balance', //余额
      dataIndex: 'balance',
      sorter: true,
      // render: (text: string) => {
      //   const showText = formatFil(text, 'FIL', 2);
      //   return (
      //     <div
      //       className={showText < 200 ? 'warning text-center' : 'text-center'}>
      //       {showText < 200 ? (
      //         <Popover
      //           trigger='hover'
      //           //content={tr("lowBalance")}
      //         >
      //           <span slot='reference' className='pointer'>
      //             {formatNumber(showText) + ' FIL' || '-'}
      //           </span>
      //         </Popover>
      //       ) : (
      //         formatNumber(showText) + ' FIL' || '-'
      //       )}
      //     </div>
      //   );
      // },
    },
  ];
};
