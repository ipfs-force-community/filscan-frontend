/** @format */

import Tooltip from '@/packages/tooltip';
import {
  formatFilNum,
  formatNumber,
  getClassName,
  unitConversion,
} from '@/utils';
import { spawn } from 'child_process';

export const home_meta = [
  {
    title: 'quality_power/increase_24h',
    dataIndex: 'total_quality_power', //近24h增长算力
    tipContent: [
      { title: '', dataIndex: '' },
      {title:'',dataIndex:''},
    ],
    render: (v: any, record: Record<string, any>) => {
      const changeText =record?.total_contract_change_in_24h&& Number(record.total_contract_change_in_24h);
      const className = changeText ? changeText > 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      const [textValue, unit] = unitConversion(v, 2).split(' ');

      return (
        <>
          <span>{textValue}</span>
          <span className='inline text-xs ml-1'>{unit}</span>
          <span className={`bg-bgColor ${className} text-xs ml-1`}>
            {`${flag}${changeText}`}
          </span>
        </>

      );
    },
  },
  {
    title: 'add_power_in_32g',
    title_tip: 'add_power_in_32g_tip',
    dataIndex: 'add_power_in_32g',
    tipContent: [
      { title: 'gas_in_32g', dataIndex: 'gas_in_32g' },
      {title:'gas_in_64g',dataIndex:'gas_in_64g'},
    ],
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ');
      return (
        <>
          <span>{show}</span>
          <span className='text-xs ml-1	'>{unit + '/TiB'}</span>
        </>
      );
    },
  }, //32GiB扇区新增算力成本，单位FIL/TiB
  {
    title: 'miner_initial_pledge',
    dataIndex: 'miner_initial_pledge',
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ');
      return (
        <>
          <span>{show}</span>
          <span className='text-xs ml-1'>{unit + '/TiB'}</span>
        </>
      );
    },
  }, //当前扇区质押量
  {
    title: 'fil_per_tera_24h',
    title_tip: 'fil_per_tera_24h_tip',
    dataIndex: 'fil_per_tera_24h',
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ');
      return (
        <>
          <span>{show}</span>
          <span className='text-xs ml-1'>{unit + '/TiB'}</span>
        </>
      );
    },
  }, //近24h产出效率，单位FIL/TiB

  {
    title: 'total_contract/24h_contract',
    dataIndex: 'total_contract',
    tipContent: [
      { title: 'verified_contracts', dataIndex: 'verified_contracts' },
    ],
    render: (v: number | string,record:any) => {
      const changeText =record?.total_contract_change_in_24h&& Number(record.total_contract_change_in_24h);
      const className = changeText ? changeText > 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      return <span className='flex gap-x-1 items-end'>
        {formatNumber(v, 2)}
        {changeText && <span className={`${className} text-xs solid_text`}>{flag}{ changeText}</span>}
      </span>
    },
  }, //全网合约数/24h变化
  {
    title: 'contract_transaction/24h_change',
    dataIndex: 'contract_txs',
    render: (v: number | string,record:any) => {
      const changeText =record?.contract_txs_change_in_24h&& Number(record.contract_txs_change_in_24h);
      const className = changeText ? changeText > 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      return <span className='flex gap-x-1 items-end'>
        {formatNumber(v, 2)}
        {changeText && <span className={`${className} text-xs solid_text`}>{flag}{changeText}</span>}
      </span>
    },
  }, //合约交易数/24h变化
  {
    title: 'contract_address/24h_change',
    dataIndex: 'contract_users',
    render: (v: number | string,record:any) => {
      const changeText =record?.contract_users_change_in_24h&& Number(record.contract_users_change_in_24h);
      const className = changeText ? changeText > 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      return <span className='flex gap-x-1 items-end'>
        {formatNumber(v, 2)}
        {changeText && <span className={`${className} text-xs solid_text`}>{flag} {changeText}</span>}
      </span>
    },
  }, //合约交易地址/24h变化
  {
    title: 'gas_24',
    dataIndex: 'sum',
    tipContent: [
      { title: 'contract_gas', dataIndex: 'contract_gas' },
    ],
    render: (v: string) => formatFilNum(v,false,false,4)
  }, //近24h产出效率，单位FIL/TiB
] as const;

