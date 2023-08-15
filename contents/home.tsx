/** @format */

import {
  formatFilNum,
  formatNumber,
  getClassName,
  unitConversion,
} from '@/utils';

export const home_meta = [
  {
    title: 'power_increase_24h',
    dataIndex: 'power_increase_24h',
    render: (v: any, record: Record<string, any>) => {
      const classValue = record.increase_24h;
      const [show, unit] = unitConversion(v, 2).split(' ');
      return (
        <>
          <span>{show}</span>
          <span className='inline text-xs margin-l-4'>{unit}</span>
          <span className={`bg-bgColor ${getClassName(classValue)} text-xs`}>
            {classValue}
          </span>
        </>
      );
    },
  }, //近24h增长算力
  {
    title: 'add_power_in_32g',
    title_tip: 'add_power_in_32g_tip',
    dataIndex: 'add_power_in_32g',
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ');
      return (
        <>
          <span>{show}</span>
          <span className='text-xs margin-l-4'>{unit + '/TiB'}</span>
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
          <span className='text-xs margin-l-4'>{unit + '/TiB'}</span>
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
          <span className='text-xs margin-l-4'>{unit + '/TiB'}</span>
        </>
      );
    },
  }, //近24h产出效率，单位FIL/TiB

  {
    title: 'total_contract/24h_contract',
    dataIndex: 'total_contract',
    render: (v: number | string) => {
      return formatNumber(v, 2);
    },
  }, //全网合约数/24h变化
  {
    title: 'contract_transaction/24h_change',
    dataIndex: 'contract_transaction',
    render: (v: number | string) => formatNumber(v, 2),
  }, //合约交易数/24h变化
  {
    title: 'contract_address/24h_change',
    dataIndex: 'contract_address',
    render: (v: string | number) => formatNumber(v, 2),
  }, //合约交易地址/24h变化
  {
    title: 'gas_24',
    dataIndex: 'gas_24',
    render: (v: string) => formatNumber(v, 2),
  }, //近24h产出效率，单位FIL/TiB
] as const;
