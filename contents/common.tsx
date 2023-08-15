/** @format */

import { formatNumber, get$Number, getClassName } from '@/utils';
import Image from 'next/image';
import { Item, Option_Item } from './type';

interface TOP_DATA {
  left: Item[];
  right: Item[];
}
export const header_top: TOP_DATA = {
  left: [
    {
      title: 'fil',
      dataIndex: 'fil',
      render: (text: number) => (
        <span className='text_primary'>{get$Number(text)} </span>
      ),
    },
    {
      title: 'last_time',
      dataIndex: 'last_time',
    },
    {
      title: 'base_fee',
      dataIndex: 'base_fee',
      render: (text: number) => <span className='text_primary'>{text} </span>,
    },
    {
      title: 'last_height',
      dataIndex: 'last_height',
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
