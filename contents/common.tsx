/** @format */

import { formatDateTime, formatFilNum, formatNumber, get$Number, getClassName } from '@/utils';
import Image from 'next/image';
import { Item, Option_Item } from './type';
import TimerHtml from '@/components/TimerHtml';
import Skeleton from '@/packages/skeleton';

interface TOP_DATA {
  left: Item[];
  right: Item[];
}
export const header_top: TOP_DATA = {
  left: [
    {
      title: 'fil',
      dataIndex: 'price',
      render: (text: number, record) => {
        if (!text) return null
        const changeText =record?.percent_change_24h&& Number(record.percent_change_24h);
        const className = changeText ? changeText < 0 ? 'text_red' : 'text_green':'';
        const flag = changeText ? changeText > 0 ? '+' : '-' : '';
        return <span className='flex gap-x-1 items-end'>
          <span className='text_primary'>{get$Number(text)} </span>
          {changeText && <span className={`${className} ml-1`}>{flag}{Math.abs(changeText).toFixed(2)}%</span>}
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
      render: (text: number) => <span className='text_primary'>{text?formatFilNum(text,false,false,2):text} </span>,
    },
    {
      title: 'last_height',
      dataIndex: 'height',
      render: (text: number) => (
        <span className='text_primary'>{text?formatNumber(text,2):text} </span>
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

export const networkOptions: Array<Option_Item> = [
  {
    value: "Mainnet",
    label: "Mainnet",
  },
  {
    value: "Calibration",
    label: "Calibration",
  },
];

export const SEO:any = {
  'zh': {
    title: 'Filscan--Filecoin 浏览器',
    description:'Filecoin官方区块浏览器,Filecoin官方浏览器, Filscan,Filecoin,最新区块,Filecoin Explorer,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易',
    keywords: 'Filecoin官方区块浏览器,Filecoin官方浏览器,',
    url: 'https://filscan.io/',
  },
  'en': {
    title: 'Filscan--Filecoin Explorer',
    description:`Filscan is a blockchain explorer that serves as a fundamental tool for the Filecoin ecosystem, providing real-time on-chain data. It enables users to query information about Filecoin's blockchain, transactions, FIL tokens, wallets, etc., and synchronizes real-time information from all nodes.`,
    keywords: 'Filecoin官方区块浏览器,Filecoin官方浏览器, Filecoin Explorer,fvm,Filscan,Filecoin, blockchain, crypto, currency,最新区块,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易',
    url: 'https://filscan.io/en',
  },

  'kr': {
    title: '파일코인 익스플로러',
    description: 'Filecoin 공식 브라우저 ,Filecoin 공식 블록 탐색기 ,Filecoin 블록 쿼리 ,FIL 브라우저 ,FVM ,IPFS, 블록 높이,블록체인 트랜잭션,블록체인 검색 엔진,최신 블록',
    keywords: 'Filecoin官方区块浏览器,Filecoin官方浏览器, Filecoin Explorer,fvm,Filscan,Filecoin, blockchain, crypto, currency,最新区块,FIL,IPFS，FIL,Filecoin区块链查询浏览器,FIL浏览器,Filecoin浏览器,Filecoin区块查询,区块链搜索引擎,区块高度,区块链交易',

    url: 'https://filscan.io/kr',
  }
  // 添加更多语言...
}
