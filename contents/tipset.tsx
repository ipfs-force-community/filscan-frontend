/** @format */

import Copy from '@/components/copy';
import {
  formatDateTime,
  formatFilNum,
  get_account_type,
  isIndent,
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
