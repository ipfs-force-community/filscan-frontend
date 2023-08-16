/** @format */

import Copy from '@/components/copy';
import TextTip from '@/packages/textTooltip';
import {
  formatDateTime,
  formatFilNum,
  get_account_type,
  isIndent,
  unitConversion,
} from '@/utils';
import Link from 'next/link';

//消息列表
export const message_list = {
  title: 'message_list',
  total_list: 'total_list',
  columns: [
    {
      dataIndex: 'cid',
      title: 'cid',
      width: '12%',
      render: (text: string) => (
        <span className='flex items-center gap-x-1'>
          <Link href={`/message/${text}`} className='link'>
            {isIndent(text)}
          </Link>
          <Copy text={text} />
        </span>
      ),
    },
    {
      dataIndex: 'height',
      title: 'height',
      width: '10%',
      render: (text: string) => (
        <Link href={`/tipset/chain?height=${text}`} className='link'>
          {text}
        </Link>
      ),
    },
    {
      dataIndex: 'block_time',
      title: 'block_time',
      width: '15%',
      render: (text: string | number) =>
        formatDateTime(text, 'YYYY-MM-DD HH:mm'),
    },
    {
      dataIndex: 'from',
      title: 'from',
      width: '15%',
      render: (text: string, record: any) => (
        <span className='flex items-center gap-x-1'>
          {get_account_type(text)}
        </span>
      ),
    },
    {
      dataIndex: 'to',
      title: 'to',
      width: '15%',
      render: (text: string, record: any) => (
        <span className='flex items-center gap-x-1'>
          {get_account_type(text)}
        </span>
      ),
    },
    {
      dataIndex: 'value',
      title: 'value',
      width: '10%',
      render: (text: number) => formatFilNum(text, false, false, 4),
    },
    {
      dataIndex: 'exit_code',
      width: '8%',

      title: 'message_list_exit_code',
    },
    {
      dataIndex: 'method_name',
      width: '15%',
      title: 'method_name',
    },
  ],
};

//富豪榜
export const address_list = {
  title: 'address_list',
  total_list: 'address_total_list',
  options: [
    { value: 'all', label: 'address_all' },
    { value: 'account', label: 'account' },
    { value: 'storageminer', label: 'miner' },
    { value: 'multisig', label: 'multisig' },
  ],
  columns: [
    {
      dataIndex: 'rank',
      title: 'rank',
      width: '10%',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      width: '20%',
      dataIndex: 'account_address',
      title: 'account_address',
      render: (text: string) => {
        return (
          <span className='flex items-center gap-x-1 '>
            {get_account_type(text)}
          </span>
        );
      },
    },
    {
      dataIndex: 'balance',
      width: '20%',
      title: 'balance_percentage',
      rowKey: 'balance_percentage',
      render: (text: string, record: any) => {
        return `${formatFilNum(text, false, false, 2)} / ${(
          record.balance_percentage * 100
        ).toFixed(2)}%`;
      },
    },
    {
      dataIndex: 'account_type',
      title: 'account_type',
      width: '20%',
    },
    {
      dataIndex: 'latest_transfer_time',
      width: '20%',
      title: 'latest_transfer_time',
      render: (text: number | string) => formatDateTime(text),
    },
  ],
};

//订单
export const dsn_list = {
  title: 'dsn_list',
  placeholder: 'dsn_placeholder',
  total_list: 'dsn_total_list',
  columns: [
    {
      dataIndex: 'deal_id',
      title: 'deal_id',
      width: '10%',
      render: (text: string, record: any) => {
        return (
          <Link href={`/deal/${text}`} className='link'>
            {text}
          </Link>
        );
      },
    },
    {
      dataIndex: 'piece_cid',
      title: 'piece_cid',
      width: '10%',
      render: (text: string) => {
        return <span>{isIndent(text)}</span>;
      },
    },
    {
      dataIndex: 'piece_size',
      title: 'piece_size',
      width: '10%',
      render: (text: number | string) => unitConversion(text),
    },
    {
      dataIndex: 'client_address',
      title: 'client_address',
      width: '12%',
      render: (text: string, record: any) => (
        <span className='flex items-center gap-x-1'>
          {get_account_type(text)}
        </span>
      ),
    },
    {
      dataIndex: 'provider_id',
      title: 'provider_id',
      width: '12%',
      render: (text: string, record: any) => (
        <span className='flex items-center gap-x-1'>
          {get_account_type(text)}
        </span>
      ),
    },
    {
      dataIndex: 'service_start_time',
      title: 'service_start_time',
      width: '13%',
      render: (text: string) => formatDateTime(text, 'YYYY-MM-DD HH:mm'),
    },

    {
      dataIndex: 'end_time',
      title: 'end_time',
      width: '13%',
      render: (text: string) => formatDateTime(text, 'YYYY-MM-DD HH:mm'),
    },
    {
      dataIndex: 'storage_price_per_height',
      title: 'storage_price_per_height',
      width: '10%',
      render: (text: string | number) => formatFilNum(text),
    },
    {
      dataIndex: 'verified_deal',
      width: '10%',
      title: 'verified_deal',
      render: (text: boolean) => String(text),
    },
  ],
};

//消息池
export const pool_list = {
  title: 'pool_list',
  total_list: 'total_list',
  columns: [
    {
      dataIndex: 'cid',
      title: 'cid',
      width: '10%',
      render: (text: string) => (
        <Link href={`/message/${text}`} className='table_link'>
          {isIndent(text)}
        </Link>
      ),
    },
    {
      dataIndex: 'block_time',
      title: 'block_time',
      width: '15%',
      render: (text: string | number) =>
        formatDateTime(text, 'YYYY-MM-DD HH:mm'),
    },
    {
      dataIndex: 'from',
      title: 'from',
      width: '10%',
      render: (text: string) => {
        return (
          <span className='flex items-center gap-x-1'>
            {get_account_type(text)}
          </span>
        );
      },
    },
    {
      dataIndex: 'to',
      title: 'to',
      width: '10%',
      render: (text: string) => {
        return (
          <span className='flex items-center gap-x-1'>
            {get_account_type(text)}
          </span>
        );
      },
    },
    {
      dataIndex: 'value',
      title: 'value',
      width: '10%',
      render: (text: string) => {
        return formatFilNum(text, false, false);
      },
    },
    {
      dataIndex: 'gas_fee_cap',
      title: 'gas_fee_cap',
      width: '15%',
      render: (text: string) => text || '--',
    },
    {
      dataIndex: 'gas_premium',
      title: 'gas_premium',
      width: '15%',
      render: (text: string) =>
        text ? formatFilNum(text, false, false, 2) : '--',
    },
    { dataIndex: 'method_name', title: 'method_name', width: '15%' },
  ],
};
