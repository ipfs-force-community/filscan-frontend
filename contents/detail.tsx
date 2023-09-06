/** @format */

import {
  formatDateTime,
  formatFilNum,
  formatNumber,
  get_account_type,
  isIndent,
  unitConversion,
} from '@/utils';
import { Item } from './type';
import Link from 'next/link';
import Copy from '@/components/copy';
import { getSvgIcon } from '@/svgsIcon';
import { space } from 'postcss/lib/list';
import { BrowserView, MobileView } from '@/components/device-detect';
import copySvgMobile from '@/assets/images/icon-copy.svg';

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
      render: (text:string|number) => text ? formatFilNum(text, false, false) : '--',
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

//message detail
export const message_detail = {
  title: 'message_overview_detail',
  trans:[
    {
      dataIndex: 'cid',
      title: 'cid',
      type: ['message_basic'],
      render: (text: string) => {
        if (!text) return '--';
        return (
          <>
            <BrowserView>
              <span className='flex items-center gap-x-2'>
                <span className='text'>{text}</span>
                <Copy text={text} />
              </span>
            </BrowserView>
            <MobileView>
              <span className='copy-row'>
                <span className='text'>{text}</span>
                <Copy text={text} icon={copySvgMobile} className='copy'/>
              </span>
            </MobileView>
          </>

        );
      },
    },
    {
      dataIndex: 'eth_message',
      title: 'eth_message',
      elasticity: true,
      render: (text: string) => {
        if (!text) return null;
        return (
          <>
            <BrowserView>
              <span className='flex items-center gap-x-2'>
                <span className='text'>{text}</span>
                <Copy text={text} />
              </span>
            </BrowserView>
            <MobileView>
              <span className='copy-row'>
                <span className='text'>{text}</span>
                <Copy text={text} icon={copySvgMobile} className='copy'/>
              </span>
            </MobileView>
          </>
        );
      },
    },
    {
      dataIndex: 'exit_code',
      title: 'exit_code',
      type: ['message_basic'],
      render: (text: any) => {
        if (text?.startsWith('Ok')) {
          return (
            <span className='flex px-2 py-1 gap-x-1 bg-success_bg rounded-sm items-center'>
              {getSvgIcon('successIcon')}
              <span className='text-success text-cm'>Success</span>
            </span>
          );
        }
        if (text?.startsWith('Err')) {
          return (
            <span className='flex px-2 py-1 gap-x-1 rounded-sm items-center'>
              {getSvgIcon('errorIcon')}
              <span className='text_red text-cm'>Error</span>
            </span>
          );
        }

        return (
          <span className='flex px-2 py-1 gap-x-1  rounded-sm items-center'>
            {getSvgIcon('pendingIcon')}
            <span className='text-cm'>Pending</span>
          </span>
        );
      },
    },
    {
      dataIndex: 'value',
      title: 'value',
      type: ['message_basic'],
      render: (text: number) => {
        return formatFilNum(text, false, false, 4);
      },
    },
    {
      dataIndex: 'height',
      title: 'height',
      type: ['message_basic'],
      render: (text: string) => {
        return (
          <Link className='link' href={`/tipset/chain?height=${text}`}>
            {text}
          </Link>
        );
      },
    },
    {
      dataIndex: 'block_time',
      title: 'time',
      type: ['message_basic'],
      render: (text: string) => formatDateTime(text, 'YYYY-MM-DD HH:mm:ss'),
    },
    {
      dataIndex: 'method_name',
      title: 'method_name',
      type: ['message_basic'],
    },
    {
      dataIndex: 'from',
      title: 'from',
      borderTop: true,
      type: ['message_basic'],
      render: (text: string, record: any) => (
        <span className='flex items-center gap-x-2'>
          {get_account_type(text, 0)}
        </span>
      ),
    },
    {
      dataIndex: 'to',
      title: 'to',
      type: ['message_basic'],
      render: (text: string, record: any) => {
        return (
          <span className='flex items-center gap-x-2'>
            {get_account_type(text, 0)}
          </span>
        );
      },
    },
    //转账信息
    {
      title: 'message_tranf',
      dataIndex: 'consume_list',
      elasticity: true,
      borderTop: true,
      mobileHide:true,
      render: (text: any, record: any, tr: any) => {
        if (Array.isArray(text)) {
          if (text.length === 0) return null;
          return (
            <div className='flex flex-col gap-y-4 align-baseline'>
              {text.map((item: any, index) => {
                return (
                  <div key={index} className='flex gap-x-2.5'>
                    <span className='flex items-center gap-x-1'>
                      <span className='text_des'>{tr('from_ath')}</span>
                      <span className='flex gap-x-1 items-center'>
                        {get_account_type(item.from)}
                      </span>
                    </span>
                    <span className='flex items-center gap-x-1 '>
                      <span className='text_des'>{tr('to_ath')}</span>{' '}
                      <span className='flex gap-x-1 items-center'>
                        {get_account_type(item.to)}
                      </span>
                    </span>
                    <span className='flex items-center font-DINPro-Medium gap-x-1 '>
                      <span className='font_weight'>For</span>
                      <span>
                        {formatFilNum(item.value, false, false, 4) || '--'}
                      </span>
                      <span className='text_des font-PingFang'>
                  ({tr(item.consume_type)})
                      </span>
                    </span>
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      },
    }
  ],
  detail: [
    {
      dataIndex: 'nonce',
      title: 'nonce',

      render: (text: any) => text,
    },

    {
      borderTop: true,
      dataIndex: 'all_gas_fee',
      title: 'all_gas_fee',
      render: (text: string) => formatFilNum(text, false, false, 4),
    },
    {
      dataIndex: 'base_fee',
      title: 'base_fee',

      render: (text: string) => {
        return formatFilNum(text, false, false, 4);
      },
    },

    {
      dataIndex: 'gas_fee_cap',
      title: 'gas_fee_cap',
      render: (text: string) => formatFilNum(text, false, false, 4),
    },
    {
      dataIndex: 'gas_premium',
      title: 'gas_premium',
      render: (text: string) => formatFilNum(text, false, false, 4),
    },
    {
      dataIndex: 'gas_limit',
      title: 'gas_limit',
      render: (text: string) => formatNumber(text),
    },
    {
      dataIndex: 'gas_used',
      title: 'gas_used',
      render: (text: string) => formatNumber(text),
    },
    {
      dataIndex: 'blk_cids',
      title: 'blk_cids',
      borderTop: true,
      render: (text: Array<string>) => {
        if (!Array.isArray(text) || !text) return '--';
        return (
          <div className='flex flex-col'>
            {text.map((item: string, index: number) => {
              if (!text) return '--';
              return (

                <>
                  <BrowserView>
                    <span className='flex gap-x-2 items-center  mb-2 last:mb-0' key={index}>
                      <Link
                        key={index}
                        className='link link-html'
                        href={`/tipset/chain?cid=${item}`}>
                        {item}
                      </Link>
                      <Copy text={item} />
                    </span>
                  </BrowserView>
                  <MobileView>
                    <span className='copy-row'>
                      <span className='text'>
                        <Link
                          key={index}
                          className='link link-html'
                          href={`/tipset/chain?cid=${item}`}>
                          {item}
                        </Link>
                      </span>
                      <Copy text={item} icon={copySvgMobile} className='copy'/>
                    </span>
                  </MobileView>
                </>
              );
            })}
          </div>
        );
      },
    },
    {
      dataIndex: 'version',
      title: 'version',
      borderTop: true,
      render: (text: any) => text,
    },
    {
      dataIndex: 'params_detail',
      title: 'params',
      render: (text: string, record?: any) => {
        const showValue = text || record?.params;
        if (!showValue) return null;
        if (typeof showValue === 'string') {return JSON.stringify(showValue, undefined, 4);}
        return (
          <span className='code'>
            <pre>{JSON.stringify(showValue, undefined, 4)}</pre>
          </span>
        );
      },
    },
    {
      dataIndex: 'returns_detail',
      title: 'returns',
      render: (text: string, record?: any) => {
        const showValue = text || record?.returns;
        if (!showValue) return null;
        if (typeof showValue === 'string') {return JSON.stringify(showValue, undefined, 4);}
        return <pre>{JSON.stringify(showValue, undefined, 4)}</pre>;
      },
    },
  ],
  content: [
    // [
    //   //erc20 transfer
    //   {
    //     title: 'message_ERC20Trans',
    //     elasticity: true,
    //     dataIndex: 'message_ERC20Trans',
    //     borderTop: true,
    //     render: (text: any, record: any, tr: any) => {
    //       if (Array.isArray(text)) {
    //         if (text.length === 0) return null;
    //         return (
    //           <div className='array_item_column'>
    //             {text.map((item: any, index) => {
    //               return (
    //                 <li key={index} className='array_item_column_li'>
    //                   <div className='flex_align_center '>
    //                     <span className='font_weight'>{tr('from_ath')}</span>
    //                     <span>{get_account_type(item.from)}</span>
    //                   </div>
    //                   <div className='flex_align_center'>
    //                     <span className='font_weight'>{tr('to_ath')}</span>{' '}
    //                     <span>{get_account_type(item.to)}</span>
    //                   </div>
    //                   <div className='flex_align_center'>
    //                     <span className='font_weight'>For</span>
    //                     <span>{Number(item?.amount).toFixed(4) || '--'}</span>
    //                     <span>{item?.token_name}</span>
    //                   </div>
    //                 </li>
    //               );
    //             })}
    //           </div>
    //         );
    //       }
    //       return null;
    //     },
    //   },
    // ],
  ],
};

const default_content = [
  {
    title: 'account_address',
    dataIndex: 'account_address',
    type: ['account_basic'],
    render: (text: string, record: any, tr: any) => {
      const owned_miners = record?.account_basic?.owned_miners || [];
      if (!text) return '--';
      // if (owned_miners.length > 0) {
      //   return (
      //     <div>
      //       <span className='flex_align_center'>
      //         {isMobile() || (text && text.length > 50)
      //           ? isIndent(text, 10)
      //           : text}
      //         {text && <Copy text={text} />}
      //       </span>

      //       <Button
      //         className='btn-link'
      //         onClick={() => {
      //           Router.push(`/owner/${record?.account_basic?.account_id}`);
      //         }}>
      //         {tr('account_detail')}
      //       </Button>
      //     </div>
      //   );
      // }
      return (
        <span className='flex gap-x-2'>
          {text}
          {text && <Copy text={text} />}
        </span>
      );
    },
  },
  {
    title: 'base_account_id',
    dataIndex: 'account_id',
    type: ['account_basic'],
    elasticity: true,
    render: (text: string, record: any) => {
      if (!text) return text;
      return (
        <span className='flex gap-x-2 items-center'>
          {text} <Copy text={text} />
        </span>
      );
    },
  },
  {
    title: 'account_type',
    dataIndex: 'account_type',
    type: ['account_basic'],
    render: (text: string, record: any, tr: any) => (text ? tr(text) : '--'),
  },
  {
    title: 'balance',
    dataIndex: 'account_balance',
    type: ['account_basic'],
    render: (text: string) => (text ? formatFilNum(text) : '--'),
  },
  {
    title: 'message_count',
    dataIndex: 'message_count',
    type: ['account_basic'],
    render: (text: any) => text,
  },
  {
    title: 'nonce',
    dataIndex: 'nonce',
    type: ['account_basic'],
    render: (text: any) => text,
  },
  {
    title: 'create_time',
    dataIndex: 'create_time',
    type: ['account_basic'],
    render: (text: number | string) => formatDateTime(text),
  },
  {
    title: 'latest_transfer_time',
    dataIndex: 'latest_transfer_time',
    type: ['account_basic'],
    render: (text: number | string) => formatDateTime(text),
  },
];

export const address_detail = {
  title: 'general_overview_title',
  content: (type: string) => {
    switch (type) {
    case 'account':
      return [...default_content];
    default:
      return [...default_content];
    }
  },
  account_change: {
    tabsList: [
      { title: '24h', dataIndex: '24h' },
      { title: '7d', dataIndex: '7d' },
      { title: '30d', dataIndex: '1m' },
    ],
    list: [
      {
        title: 'balance',
        type: 'line',
        dataIndex: 'balance',
        color: '#1C6AFD',
        seriesArea: true,
      },
    ],
  },
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

export const address_tabs = [
  {
    title: 'message_list',
    dataIndex: 'message_list',
    optionsUrl: 'AllMethodByAccountID',
  },
  {
    title: 'traces_list',
    dataIndex: 'traces_list',
    headerOptions: [
      { title: 'all', value: 'all' },
      { title: 'Blockreward', value: 'blockreward' },
      { title: 'Burn', value: 'burn' },
      { title: 'Transfer', value: 'transfer' },
      { title: 'Send', value: 'send', isIndent: true },
      { title: 'Receive', value: 'receive', isIndent: true },
    ],
  },
];
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
    headerOptions: [
      { title: 'all', value: 'all' },
      { title: 'Blockreward', value: 'blockreward' },
      { title: 'Burn', value: 'burn' },
      { title: 'Transfer', value: 'transfer' },
      { title: 'Send', value: 'send', isIndent: true },
      { title: 'Receive', value: 'receive', isIndent: true },
    ],
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

//height
export const height_list = {
  headerList: [
    { dataIndex: "blcok_time",
      title: "blcok_time",
    },
    { dataIndex: "message_count_deduplicate",
      title: "message_count_deduplicate",
    },
  ],
  columns: [
    { dataIndex: "cid",
      title: "block_cid",
    },
    { dataIndex: "miner_id",
      title: "miner_id",
    },
    { dataIndex: "messages_count",
      title: "messages_count",
    },
    { dataIndex: "blocks_reward",
      title: "reward",
    },

  ]

}

//cid detail
export const cid_list = {
  headerList:[
    {
      title: 'blocks_cid', dataIndex: 'cid', type: ['block_basic'],
    },
    {
      title: 'cid_height', dataIndex: 'height', type: ['block_basic'],
      render: (text: any) => {
        if(!text) return '--'
        return <Link href={`/height/${text}`} className='link'>{formatNumber(text)}</Link>
      }
    },
    {
      title: 'block_time', dataIndex: 'block_time', type: ['block_basic'],
      render: (text: any, data:any) => formatDateTime(text,'YYYY-MM-DD')
    },
    {
      title: 'blocks_messages', dataIndex: 'messages_count', type: ['block_basic'],

    },
    {
      title: 'blocks_miner', dataIndex: 'miner_id', type: ['block_basic'],
      render: (text: any) => {
        return <Link href={`/miner/${text}`} className='link'>{ text}</Link>
      }
    },
    {
      title:'win_count',dataIndex:'win_count',
    },
    {
      title: 'blocks_reward', dataIndex: 'mined_reward', type: ['block_basic'],
      render: (text: any, data:any) => text ? formatFilNum(text, false, false) : text || '--',
    },
    {
      title: 'parents_cid', dataIndex: 'parents', type: ['block_basic'],
      render: (text:any, data:any) => {
        return <div className='flex flex-col gap-y-2'>
          {data?.parents?.map((item:string) => {
            return <Link href={`/cid/${item}`} key={ item} className='link'>{item}</Link>
          })}
        </div>
      }
    },
    {
      title:'parent_weight',dataIndex:'parent_weight',
    },
    {
      title:'parent_base_fee',dataIndex:'parent_base_fee',
    },
    {
      title:'ticket_value',dataIndex:'ticket_value',
    },
    {
      title:'state_root',dataIndex:'state_root',
    },

  ],
  columns:(fromList:any,toList:any)=>[
    {
      dataIndex: "cid", title: "cid",
      render: (text: string) => <Link href={`/message/${text}`} className='link'>{text ? isIndent(text, 6) : ''}</Link>
    },
    { dataIndex: "height", title: "height",render: (text: string) => <Link href={`/tipset/chain?height=${text}` }className='link'>{ text}</Link> },
    { dataIndex: "block_time", title: "block_time", render: (text: string|number)=> formatDateTime(text,'YYYY-MM-DD HH:mm')},
    {
      dataIndex: "from", title: "from",
      render: (text: string, record: any) => {
        if (!text) return '--';
        return (
          <span className='flex items-center gap-x-1'>
            {get_account_type(text,0)}
            {fromList?.domains && fromList?.domains[text] && (
              <Link
                href={`/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>
              ({fromList.domains[text]})
              </Link>
            )}
          </span>
        );
      },},
    {
      dataIndex: "to", title: "to",
      render: (text: string, record: any) => {
        if (!text) return '--';
        return (
          <div className='flex items-center gap-x-1'>
            {get_account_type(text,0)}
            {toList?.domains && toList?.domains[text] && (
              <Link
                href={`/domain/${toList.domains[text]}?provider=${toList.provider}`}>
                ({toList.domains[text]})
              </Link>
            )}
          </div>
        )
      }
    },
    { dataIndex: "value", title: "value" ,render:(text:number)=>text ? formatFilNum(text, false, false) : text || '--',},
    { dataIndex: "exit_code", title: "status" },
    { dataIndex: "method_name", title: "method_name" },
  ],
}

//deal
export const deal_list = {
  list: [
    { dataIndex: 'deal_id', title: 'deal_id' },
    { dataIndex: 'service_start_time', title: 'service_start_time' ,render:(text:string) =>formatDateTime(text)},
    { dataIndex: 'epoch', title: 'epoch', render: (text:number|string) => <Link className="link" href={`/tipset/chain?height=${text}`}>{ text}</Link> },
    {dataIndex:'message_cid',title:'message_cid',render: (text:number|string) => <Link className="link" href={`/message/${text}`}>{ text}</Link> },
    {dataIndex:'piece_cid',title:'piece_cid'},
    {
      dataIndex: 'verified_deal', title: 'verified_deal', render: (text: boolean) => {
        const icon = typeof text ==='boolean' ? text ? 'successIcon':'errorIcon':'';
        return <span className='flex gap-x-1 items-center'>
          {icon&&getSvgIcon(icon)}
          {String(text)}
        </span>
      } },
  ],
  content: {
    left_title: 'deal_left_title',
    right_title: 'deal_right_title',
    value: 'deal_value',
    cash: 'deal_cash',
    time:'deal_time'
  }
}