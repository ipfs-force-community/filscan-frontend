/** @format */

import Copy from '@/components/copy';
import Tooltip from '@/packages/tooltip';
import { formatFilNum, formatNumber, get$Number, isIndent } from '@/utils';
import Image from '@/packages/image';
import Link from 'next/link';

export const contract_rank = {
  title: 'contract_rank',
  title_des: 'contract_rank_des',
  options: [
    { label: 'transaction_count', value: 'transfer_count' },
    { label: 'actor_balance', value: 'actor_balance' },
    { label: 'gas_cost', value: 'gas_cost' },
    { label: 'user_count', value: 'user_count' },
  ],
  total_msg: 'contract_rank_total',
  columns: [
    {
      title: 'rank',
      dataIndex: 'rank',
      width: '10%',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      title: 'contract_address',
      dataIndex: 'contract_address',
      width: '10%',
      render: (text: any, record: any) => {
        if (!text) return '--';
        return (
          <span className='flex gap-x-2 items-center'>
            <Link className='link_text' href={`/address/${text}`}>
              {isIndent(text, 5, 4)}
            </Link>
            <Copy text={text} />
          </span>
        );
      },
    },
    {
      title: 'contract_name',
      dataIndex: 'contract_name',
      width: '20%',
    },
    {
      title: 'transaction_count',
      dataIndex: 'transfer_count',
      width: '15%',
      sorter: true,
      defaultSortOrder: 'descend',
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'user_count',
      dataIndex: 'user_count',
      width: '15%',
      sorter: true,
      render: (text: number) => formatNumber(text),
    },
    {
      title: 'actor_balance',
      dataIndex: 'actor_balance',
      width: '15%',
      render: (text: number) => formatFilNum(text),
      sorter: true,
    },
    {
      title: 'gas_cost',
      dataIndex: 'gas_cost',
      width: '15%',
      render: (text: number) => formatFilNum(text),
      sorter: true,
    },
  ],
};

export const homeContractRank: any = {
  rank: '10%',
  contract_address: '25%',
  contract_name: '25%',
  transfer_count: '20%',
  user_count: '20%',
};

export const contract_token = {
  columns: (tr: any) => {
    return [
      {
        dataIndex: 'rank',
        title: 'rank',
        width: '10%',
        render: (text: any, record: any, index: any) => {
          return <span className='rank_icon'>{index + 1}</span>;
        },
      },
      {
        dataIndex: 'token_name',
        title: 'token_name',
        render: (text: string, record: any) => {
          return (
            <>
              <Link
                href={`/token/${record.contract_id}`}
                className='flex items-center gap-x-1'>
                <Image src={record?.icon_url} alt='' height={38} width={38} />
                <span className='margin-6 text_color'>{text}</span>
              </Link>
              {}
            </>
          );
        },
      },
      {
        dataIndex: 'total_supply',
        title: () => {
          return (
            <span className='flex items-center gap-x-2'>
              {tr('total_supply')}
              <Tooltip context={tr('total_supply_tip')} />
            </span>
          );
        },
        render: (text: string | number) => {
          return text ? formatNumber(text, 4) : text;
        },
      },
      {
        dataIndex: 'vol_24',
        title: 'vol_24',
        render: (text: string) => get$Number(text),
      },
      {
        dataIndex: 'latest_price',
        title: 'latest_price',
        render: (text: string) => (text ? '$' + text : text),
      },
      {
        dataIndex: 'market_cap',
        title: 'market_value',
        render: (text: string) => (text ? '$' + formatNumber(text, 4) : '--'),
      },
      { dataIndex: 'owners', title: 'owners' },
    ];
  },
};
