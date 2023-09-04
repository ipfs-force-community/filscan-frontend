/** @format */

import Copy from '@/components/copy';
import Tooltip from '@/packages/tooltip';
import {
  formatDateTime,
  formatFilNum,
  formatNumber,
  get$Number,
  get_account_type,
  isIndent,
  titleCase,
} from '@/utils';
import Image from '@/packages/image';
import Link from 'next/link';
import { spawn } from 'child_process';

//合约验证
export const verify_first = {
  list: [
    {
      type: 'Input',
      dataIndex: 'contract_address',
      title: 'address',
      placeholder: 'address_placeholder',
      rules: [{ required: true, message: '' }, {
        validator: (_:any, value:string) => {
          if (!value ||value.length == 0 || value.startsWith('0x') || value.startsWith('f') || value.startsWith('t')) {
            return Promise.resolve();
          }
          return Promise.reject('');
        },
      },],

    },
    {
      type: 'Select',
      title: 'verify_address',
      dataIndex: 'compile_version',
      placeholder: 'verify_select_placeholder',
      //rules: [{ required: true, message: '${compile_version} is required' }],
    },
    {
      type: 'Select',
      title: 'verify_model',
      dataIndex: 'verify_model',
      placeholder: 'verify_model_placeholder',
      // rules: [{ required: true, message: '${verify_model} is required' }],
      options: [
        {
          label: 'Solidity File',
          value: 'single'
        },
        {
          label: 'Solidity File with Metadata',
          value: 'multi'
        },
        {
          label: 'Hardhat Support (Quickly)',
          value: 'standard'
        },
      ]
    },
    {
      type: 'Select',
      title: 'license_type',
      dataIndex: 'license',
      placeholder: 'verify_select_placeholder',
      options: [
        {
          label: 'No License(None)',
          value: 'No license(None)'
        },
        {
          label: 'MIT License(MIT)',
          value: 'MIT license(MIT)'
        }
      ]
    }
  ],
}
export const verify = {
  tabList: [
    { dataIndex: 'source_code', title: 'source_code' },
    { dataIndex: 'compile_output', title: 'compile_output' }
  ],

}

export const verify_source={
  desList: [
    { title: 'content_des1', },
    { title: 'content_des2', },
    { title: 'content_des3'},
  ],
  headerList: [
    { title: 'contract_address', dataIndex: 'contract_address'},
    {title:'compile_version',dataIndex:'compile_version'},
    {title:'optimize',dataIndex:'optimize', type: 'Select', options: [
      {
        label: 'Yes',
        value: true
      },
      {
        label: 'No',
        value: false
      }
    ],

    },
    {title:'run_optimizer',dataIndex:'optimize_runs',type:'Input'},
  ]
}

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
  mobileColumns: [
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

export const mobileHomeContractRank: string[] = [
  "rank",
  "contract_address",
  "contract_name",
  "transfer_count"
];

export const contract_list:any={
  columns: [
    {
      dataIndex: 'rank',
      title: 'rank',
      width:'10%',
      render: (text: any, record: any) => {
        return <span className='rank_icon'>{ text}</span>
      } },
    {
      dataIndex: 'contract_address', title: 'contract_address',
      width:'20%',
      render: (text: any, record: any) => {
        if (!text) return '--'
        return <Link className="link" href={`/address/${text}`} >{ text}</Link>
      } },
    { dataIndex: 'contract_name', width:'10%', title: 'contract_name',render: (text:any,record:any) => {
      if (!text) return '--'
      return <Link href={`/address/${record.contract_address}`} >{ text}</Link>
    } },
    { dataIndex: 'language', title: 'language' , width:'10%',},
    { dataIndex: 'compiler', title: 'compile_version' ,width:'15%',},
    { dataIndex: 'optimize_runs', title: 'Optimizations' ,width:'15%',},
    { dataIndex: 'license', title: 'license',render:(text:any)=> text || 'No License(None)',width:'20%' }
  ]
}

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

export const token_details = {
  headerList: [
    {
      title: 'overview',
      list: [
        {
          title: 'total_supply',
          dataIndex: 'total_supply',
          render: (text: string) => {
            return text ? formatNumber(text, 4) : text || '--';
          },
        },
        {
          title: 'owners',
          dataIndex: 'owners',
        },
        {
          title: 'transfers',
          dataIndex: 'transfers',
        },
      ],
    },
    {
      title: 'market',
      list: [
        {
          title: 'latest_price',
          dataIndex: 'latest_price',
          render: (text: string) => (text ? get$Number(text) : text || '--'),
        },
        {
          title: 'market_value',
          dataIndex: 'market_cap',
          render: (text: string) => (text ? get$Number(text) : text || '--'),
        },
        {
          title: 'token_contract',
          dataIndex: 'contract_id',
          render: (text: string, record: any) => {
            if (!text) {
              return '--';
            }
            return (
              <span className='flex items-center gap-x-2'>
                <Link href={`/address/${text}`} className='link'>
                  {text}
                </Link>
                <Copy text={text} />
              </span>
            );
          },
        },
      ],
    },
  ],
  tabList: [
    {
      title: 'transfer',
      dataIndex: 'transfer',
      total: 'transfer_total',
    },
    {
      title: 'owner',
      dataIndex: 'owner',
      total: 'owner_total',
    },
    {
      title: 'dex',
      dataIndex: 'dex',
      total: 'dex_total',
    },
  ],
};

export const token_transfer_columns = (fromList: any, toList: any) => {
  return [
    {
      dataIndex: 'cid',
      title: 'message_cid',
      width: '15%',
      render: (text: string) =>
        text ? (
          <Link href={`/message/${text}`} className='link'>
            {text ? isIndent(text, 6) : ''}
          </Link>
        ) : (
          '--'
        ),
    },
    {
      dataIndex: 'method',
      title: 'method',
      width: '15%',
      render: (text: string) => (
        <span className='bg-render'>{titleCase(text)}</span>
      ),
    },
    {
      dataIndex: 'time',
      title: 'time',
      width: '15%',
      render: (text: string | number) =>
        formatDateTime(text, 'YYYY-MM-DD HH:mm'),
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
      dataIndex: 'amount',
      title: 'amount',
      width: '15%',
      render: (text: string, record: any) =>
        text ? formatNumber(text, 4) : text || '--',
    },
  ];
};

export const token_owner_columns = (ownerList: any) => {
  return [
    {
      dataIndex: 'rank',
      title: 'rank',
      width: '10%',
      render: (text: string) => <span className='rank_icon'>{text}</span>,
    },
    {
      dataIndex: 'owner',
      title: 'owner',
      width: '35%',
      render: (text: string, record: any) => {
        if (!text) return '--';
        return (
          <span className='flex link_text items-center gap-x-1'>
            <span> {text}</span>
            {text && <Copy text={text} />}
            {ownerList?.domains && ownerList?.domains[text] && (
              <Link
                href={`/domain/${ownerList.domains[text]}?provider=${ownerList.provider}`}>
                ({ownerList.domains[text]})
              </Link>
            )}
          </span>
        );
      },
    },
    {
      dataIndex: 'amount',
      title: 'amount',
      width: '20%',
      render: (text: string, record: any) =>
        text ? formatNumber(text, 4) : text || '--',
    },
    {
      dataIndex: 'rate',
      title: 'percentage',
      width: '15%',
      render: (text: string, record: any) =>
        text ? Number(text).toFixed(4) + '%' : text || '--',
    },
    {
      dataIndex: 'value',
      title: 'Value',
      width: '20%',
      render: (text: any) => (text ? get$Number(text) : ''),
    },
  ];
};

export const token_Dex_columns = [
  {
    dataIndex: 'cid',
    title: 'message_cid',
    render: (text: string) => {
      if (!text) return '--';
      return (
        <Link href={`/message/${text}`} className='link_text'>
          {isIndent(text)}
        </Link>
      );
    },
  },
  {
    dataIndex: 'time',
    title: 'time',
    render: (text: string) => formatDateTime(text, 'YYYY-MM-DD HH:mm'),
  },
  {
    dataIndex: 'action',
    title: 'Action',
    render: (text: string) => {
      const color = text === 'buy' ? 'green' : text === 'sell' ? 'red' : '';
      return (
        <span style={{ color }}>
          {text ? text[0].toUpperCase() + text.substr(1) : text}
        </span>
      );
    },
  },

  {
    dataIndex: 'amount_out',
    title: 'Token_Amount_out',
    render: (text: number, record: any) => {
      return formatNumber(text, 4) + ' ' + record?.amount_out_token_name;
    },
  },
  {
    dataIndex: 'amount_in',
    title: 'Token_Amount_in',
    render: (text: number, record: any) => {
      return formatNumber(text, 4) + ' ' + record?.amount_in_token_name;
    },
  },
  {
    dataIndex: 'swap_rate',
    title: 'swapped_Rate',
    render: (text: string, record: any) =>
      text ? text + ' ' + record.swap_token_name : '',
  },
  {
    dataIndex: 'value',
    title: 'Txn_Value',
    render: (text: string) => get$Number(text),
  },
  {
    dataIndex: 'dex',
    title: 'platform',
    render: (text: string, record: any) => {
      return (
        <span
          className='link'
          onClick={() => {
            if (record.dex_url) {
              window.open(record.dex_url);
            }
          }}>
          <Image className='fvm_img_url' alt='' width={25} height={25} />
        </span>
      );
    },
  },
];

export const contract_nfts = {
  columns: [
    {
      dataIndex: 'rank',
      title: 'rank',
      render: (text: any, record: any, index: any) => {
        return <span className='rank_icon'>{index + 1}</span>;
      },
    },
    {
      dataIndex: 'collection',
      title: 'Collection',
      render: (text: string, record: any) => {
        if (!text) return '--';
        return (
          <Link
            href={`/nft/${record.provider}`}
            className='flex items-center gap-x-2'>
            <Image
              className='fvm_img_url'
              src={record.icon}
              alt=''
              height={36}
              width={36}
            />
            <span className='text_color'> {text}</span>
          </Link>
        );
      },
    },
    // { dataIndex: 'trading_volume', title: 'Volume' },
    { dataIndex: 'holders', title: 'owners' },
    {
      dataIndex: 'transfers',
      title: 'transfers',
      render: (text: string) => (text ? formatNumber(text, 4) : '--'),
    },
  ],
};

export const nft_details = {
  headerList: [
    {
      title: 'overview',
      list: [
        {
          title: 'total_supply',
          dataIndex: 'total_supply',
          render: (text: string) => {
            return text ? formatNumber(text, 4) : text || '--';
          },
        },
        {
          title: 'owners',
          dataIndex: 'owners',
        },
        {
          title: 'transfers',
          dataIndex: 'transfers',
        },
      ],
    },
    {
      title: 'market',
      list: [
        {
          title: 'token_contract',
          dataIndex: 'contract',
          render: (text: string) => {
            if (text) {
              return (
                <span className='flex-center'>
                  <Link href={`/address/${text}`} className='link'>
                    {text}
                  </Link>
                  <Copy text={text} />
                </span>
              );
            }
            return '--';
          },
        },
      ],
    },
  ],
  tabList: [
    {
      title: 'transfer',
      dataIndex: 'transfer',
      total: 'transfer_total',
    },
    {
      title: 'owner',
      dataIndex: 'owner',
      total: 'owner_total',
    },
  ],
};

export const nft_transfer_columns = (fromList: any, toList: any) => {
  return [

    {
      dataIndex: 'cid', title: 'message_cid',
      render: (text: string) => text? <Link href={`/message/${text}` }className='link'>{ text?isIndent(text,6):''}</Link>:'--'
    },
    {dataIndex:'method',title:'method',render: (text: string) => <span className="bg-render">{ titleCase(text)}</span>},
    {dataIndex:'time',title:'time', render: (text: string|number)=> formatDateTime(text,'YYYY-MM-DD HH:mm')},
    {
      dataIndex: "from", title: "from", render: (text: string, record: any) => {
        if (!text) return '--';
        return <span className="table_li">
          {get_account_type(text)}
          {fromList?.domains && fromList?.domains[text] && <Link href={`/domain/${fromList.domains[text]}?provider=${fromList.provider}`}>({fromList.domains[text]})</Link>
          }
        </span>
      }},
    { dataIndex: "to", title: "to" , render: (text: string, record: any) => {
      if (!text) return '--';
      return <div className="table_li">
        <div>
          {get_account_type(text)}
        </div>

        {toList?.domains && toList?.domains[text] &&<Link href={`/domain/${toList.domains[text]}?provider=${toList.provider}`}>({toList.domains[text]})</Link>

        }
      </div>
    }},
    {
      dataIndex: 'item', title: 'item', render: (text: string, record: any) => {
        if (record.url) {
          return <Image className="fvm_img_url" alt="" width={25} height={ 25} src={record.url} />
        }
        return text || '--'
      }},
  ]
}