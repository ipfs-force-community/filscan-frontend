/** @format */
import {
  formatFilNum,
  formatNumber,
  unitConversion,
} from '@/utils';

export const home_meta = [
  {
    title: 'quality_power/increase_24h',
    dataIndex: 'total_quality_power', //近24h增长算力
    tip:'total_quality_power_tip',
    tipContent: [
      { title: 'quality_power_Cc', dataIndex: 'Cc' ,render: (text:string|number) => unitConversion(text, 2)},
      {title:'quality_power_Dc',dataIndex:'Dc',render: (text:string|number) => unitConversion(text, 2)},
    ],
    render: (v: any, record: Record<string, any>) => {
      const changeText =record?.power_increase_24h&& Number(record.power_increase_24h);
      const className = changeText ? changeText < 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      const [textValue, unit] = unitConversion(v, 2).split(' ');
      return (
        <>
          <span>{textValue}</span>
          <span className='inline text-xs ml-1'>{unit}</span>
          <span className={`${className} font-DINPro-Medium text-xs ml-1`}>
            {`${flag}${unitConversion(Math.abs(changeText), 2)}`}
          </span>
        </>

      );
    },
  },
  {
    title: 'add_power_in_32g',
    title_tip: 'add_power_in_32g_tip',
    tip:'add_power_in_32g_tip',
    dataIndex: 'add_power_in_32g',
    tipContent: [
      {
        title: 'gas_in_32g', dataIndex: 'gas_in_32g', render: (text:string|number) => formatFilNum(text, false, false, 2)+'/TIB' },
      {title:'gas_in_64g',dataIndex:'gas_in_64g',render: (text:string|number) => formatFilNum(text, false, false, 2)+'/TIB'},
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
    tip:'fil_per_tera_24h_tip',
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
    tip:'total_contract/24h_contract_tip',
    tipContent: [
      { title: 'verified_contracts', dataIndex: 'verified_contracts' },
    ],
    render: (v: number | string,record:any) => {
      const changeText =record?.total_contract_change_in_24h&& Number(record.total_contract_change_in_24h);
      const className = changeText ? changeText < 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      return <span className='flex gap-x-1 items-baseline'>
        {formatNumber(v, 2)}
        {changeText && <span className={`${className} font-medium font-DINPro-Medium text-xs`}>{flag}{ changeText}</span>}
      </span>
    },
  }, //全网合约数/24h变化
  {
    title: 'contract_transaction/24h_change',
    dataIndex: 'contract_txs',
    render: (v: number | string,record:any) => {
      const changeText =record?.contract_txs_change_in_24h&& Number(record.contract_txs_change_in_24h);
      const className = changeText ? changeText < 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      return <span className='flex gap-x-1 items-baseline'>
        {formatNumber(v, 2)}
        {changeText && <span className={`${className} font-medium font-DINPro-Medium text-xs`}>{flag}{changeText}</span>}
      </span>
    },
  }, //合约交易数/24h变化
  {
    title: 'contract_address/24h_change',
    dataIndex: 'contract_users',
    render: (v: number | string,record:any) => {
      const changeText =record?.contract_users_change_in_24h&& Number(record.contract_users_change_in_24h);
      const className = changeText ? changeText < 0 ? 'text_red' : 'text_green':'';
      const flag = changeText ? changeText > 0 ? '+' : '-':'';
      return <span className='flex gap-x-1 items-baseline'>
        {formatNumber(v, 2)}
        {changeText && <span className={`${className} font-medium  font-DINPro-Medium text-xs`}>{flag} {changeText}</span>}
      </span>
    },
  }, //合约交易地址/24h变化
  {
    title: 'gas_24',
    dataIndex: 'sum',
    tipContent: [
      { title: 'contract_gas', dataIndex: 'contract_gas',render: (text:string|number) => formatFilNum(text, false, false, 2) },
    ],
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ');
      return (
        <>
          <span>{show}</span>
          <span className='text-xs ml-1	'>{unit}</span>
        </>
      );
    },
  }, //近24h产出效率，单位FIL/TiB
] as const;

export const no_result = {
  title: 'search_notFound',
  warn_text: 'warn_text',
  warn_details: 'warn_details',
  go_home:'go_home'

}