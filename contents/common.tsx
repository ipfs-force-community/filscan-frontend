/** @format */

import { formatDateTime, formatFilNum, formatNumber, get$Number, getClassName } from '@/utils';
import Image from 'next/image';
import { Item, Option_Item } from './type';
import TimerHtml from '@/components/TimerHtml';

interface TOP_DATA {
  left: Item[];
  right: Item[];
}
export const header_top: TOP_DATA = {
  left: [
    {
      title: 'fil',
      dataIndex: 'price',
      render: (text: number,record) =>{
        const changeText =record?.percent_change_24h&& Number(record.percent_change_24h);
        const className = changeText ? changeText < 0 ? 'text_red' : 'text_green':'';
        const flag = changeText ? changeText > 0 ? '+' : '-':'';
        return <span className='flex gap-x-1 items-end'>
          <span className='text_primary'>{get$Number(text)} </span>
          {changeText && <span className={`${className} ml-1`}>{flag}{ changeText}%</span>}
        </span>
      },

    },
    {
      title: 'last_time',
      dataIndex: 'block_time',
    },
    {
      title: 'base_fee',
      dataIndex: 'base_fee',
      render: (text: number) => <span className='text_primary'>{formatFilNum(text)} </span>,
    },
    {
      title: 'last_height',
      dataIndex: 'height',
      render: (text: number) => (
        <span className='text_primary'>{formatNumber(text)} </span>
      ),
    },
  ],
  right: [
    {
      title: '',
      dataIndex: 'network',
    },
    {
      title: '',
      dataIndex: 'network',
    },
    {
      title: '',
      dataIndex: 'network',
    },
  ],
};

export const search = {
  holder: 'search_holder',
  opt: [
    { label: 'all', value: 'all' },
    { label: 'address', value: 'address' },
    { label: 'message_id', value: 'message_id' },
    { label: 'height', value: 'height' },
    { label: 'cid', value: 'cid' },
    { label: 'node', value: 'node' },
  ],
};

export const langOptions: Array<Option_Item> = [
  {
    value: 'zh',
    label: '中文',
  },
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'kr',
    label: '한국인',
  },
];
