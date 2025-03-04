/** @format */
import { formatFil, formatFilNum, formatNumber, unitConversion } from '@/utils'

export const home_meta = [
  {
    title: 'quality_power/increase_24h',
    dataIndex: 'total_quality_power', //近24h增长算力
    tip: 'total_quality_power_tip',
    tipContent: [
      {
        title: 'quality_power_Cc',
        dataIndex: 'Cc',
        render: (text: string | number) => unitConversion(text, 2),
      },
      {
        title: 'quality_power_Dc',
        dataIndex: 'Dc',
        render: (text: string | number) => unitConversion(text, 2),
      },
    ],
    render: (v: any, record: Record<string, any>) => {
      const changeText =
        record?.power_increase_24h && Number(record.power_increase_24h)
      const className = changeText
        ? changeText < 0
          ? 'text_red'
          : 'text_green'
        : ''
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      const [textValue, unit] = unitConversion(v, 2).split(' ')
      return (
        <>
          <span>{textValue}</span>
          <span className="unit ml-1 inline text-xs">{unit}</span>
          <span className={`${className} font-HarmonyOS_Medium ml-1 text-xs`}>
            {`${flag}${unitConversion(Math.abs(changeText), 2)}`}
          </span>
        </>
      )
    },
  },
  {
    title: 'add_power_in_32g',
    title_tip: 'add_power_in_32g_tip',
    tip: 'add_power_in_32g_tip',
    dataIndex: 'add_power_in_32g',
    tipContent: [
      {
        title: 'gas_in_32g',
        dataIndex: 'gas_in_32g',
        render: (text: string | number) => {
          return formatFilNum(text, false, false) + '/TIB'
        },
      },
      {
        title: 'gas_in_64g',
        dataIndex: 'gas_in_64g',
        render: (text: string | number) =>
          formatFilNum(text, false, false) + '/TIB',
      },
    ],
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ')
      return (
        <>
          <span>{show}</span>
          <span className="unit ml-1	text-xs">{unit + '/TiB'}</span>
        </>
      )
    },
  }, //32GiB扇区新增算力成本，单位FIL/TiB
  {
    title: 'miner_initial_pledge',
    dataIndex: 'miner_initial_pledge',
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ')
      return (
        <>
          <span>{show}</span>
          <span className="unit ml-1 text-xs">{unit + '/TiB'}</span>
        </>
      )
    },
  }, //当前扇区质押量
  {
    title: 'fil_per_tera_24h',
    tip: 'fil_per_tera_24h_tip',
    dataIndex: 'fil_per_tera_24h',
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ')
      return (
        <>
          <span>{show}</span>
          <span className="unit ml-1 text-xs">{unit + '/TiB'}</span>
        </>
      )
    },
  }, //近24h产出效率，单位FIL/TiB

  {
    title: 'total_contract/24h_contract',
    dataIndex: 'total_contract',
    tip: 'total_contract/24h_contract_tip',
    tipContent: [
      { title: 'verified_contracts', dataIndex: 'verified_contracts' },
    ],
    render: (v: number | string, record: any) => {
      const changeText =
        record?.total_contract_change_in_24h &&
        Number(record.total_contract_change_in_24h)
      const className = changeText
        ? changeText < 0
          ? 'text_red'
          : 'text_green'
        : ''
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      return (
        <span className="flex items-baseline gap-x-1">
          {formatNumber(v, 2)}
          {changeText && (
            <span
              className={`${className} font-HarmonyOS_Medium text-xs font-medium`}
            >
              {flag}
              {changeText}
            </span>
          )}
        </span>
      )
    },
  }, //全网合约数/24h变化
  {
    title: 'contract_transaction/24h_change',
    dataIndex: 'contract_txs',
    render: (v: number | string, record: any) => {
      const changeText =
        record?.contract_txs_change_in_24h &&
        Number(record.contract_txs_change_in_24h)
      const className = changeText
        ? changeText < 0
          ? 'text_red'
          : 'text_green'
        : ''
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      return (
        <span className="flex items-baseline gap-x-1">
          {formatNumber(v, 2)}
          {changeText && (
            <span
              className={`${className} font-HarmonyOS_Medium text-xs font-medium`}
            >
              {flag}
              {changeText}
            </span>
          )}
        </span>
      )
    },
  }, //合约交易数/24h变化
  {
    title: 'contract_address/24h_change',
    dataIndex: 'contract_users',
    render: (v: number | string, record: any) => {
      const changeText =
        record?.contract_users_change_in_24h &&
        Number(record.contract_users_change_in_24h)
      const className = changeText
        ? changeText < 0
          ? 'text_red'
          : 'text_green'
        : ''
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      return (
        <span className="flex items-baseline gap-x-1">
          {formatNumber(v, 2)}
          {changeText && (
            <span
              className={`${className} font-HarmonyOS_Medium  text-xs font-medium`}
            >
              {flag} {changeText}
            </span>
          )}
        </span>
      )
    },
  }, //合约交易地址/24h变化
  {
    title: 'gas_24',
    dataIndex: 'sum',
    tipContent: [
      {
        title: 'contract_gas',
        dataIndex: 'contract_gas',
        render: (text: string | number) => formatFilNum(text, false, false, 4),
      },
    ],
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ')
      return (
        <>
          <span>{show}</span>
          <span className="unit ml-1	text-xs">{unit}</span>
        </>
      )
    },
  }, //近24h产出效率，单位FIL/TiB
] as const

export const meta_list = [
  {
    title: 'power_increase_24h',
    dataIndex: 'power_increase_24h',
    render: (v: number | string) => {
      if (!v) return '--'
      const [textValue, unit] = unitConversion(v, 4).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  }, //近24h增长算力

  //最新区块时间
  // {
  //   title: 'total_blocks',
  //   dataIndex:'total_blocks',

  //   render: (v: number | string) => formatNumber(v, 2)
  // }, //全网出块数量

  {
    title: 'total_quality_power',
    tip: 'total_quality_power_tip',
    dataIndex: 'total_quality_power',

    render: (v: number | string) => {
      if (!v) return '--'
      const [textValue, unit] = unitConversion(v, 4).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  }, //全网有效算力
  {
    title: 'rewards_increase_24h',
    dataIndex: 'rewards_increase_24h',

    render: (v: number | string) => {
      return (
        <span>
          <span>{formatNumber(formatFil(v, 'FIL'), 2) + ' '}</span>
          <span className="unit">{'FIL'}</span>
        </span>
      )
    },
  }, //近24h出块奖励

  {
    title: 'miner_initial_pledge',
    dataIndex: 'miner_initial_pledge',

    render: (v: string | number) => {
      return (
        <span>
          <span>{formatNumber(formatFil(v, 'FIL', 4)) + ' '}</span>
          <span className="unit">{'FIL/TiB'}</span>
        </span>
      )
    },
  }, //当前扇区质押量
  // {
  //   title: 'base_fee',
  //   dataIndex:'base_fee',

  //   render: (v: string | number) => {
  //     return formatFilNum(Number(v),false,false) //  Number(formatFil(v,'attoFIL'))+' attoFIL'
  //   }
  // }, //当前基础费率
  {
    title: 'gas_in_32g_meta',
    tip: 'gas_in_32g_tip',
    dataIndex: 'gas_in_32g',

    render: (v: number | string) => {
      let value = ''
      let unit = ''
      if (Number(v) < 0.0001) {
        value = formatFil(v, 'nanoFIL', 4)
        unit = 'nanoFIL/TiB'
      } else {
        value = formatFil(v, 'FIL', 4)
        unit = 'FIL/TiB'
      }
      return (
        <span>
          <span>{value + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  }, //32GiB扇区Gas消耗，单位FIL/TiB
  {
    title: 'add_power_in_32g',
    tip: 'add_power_in_32g_tip',
    dataIndex: 'add_power_in_32g',

    render: (v: number | string) => {
      return (
        <span>
          <span>{formatFil(v, 'FIL', 4) + ' '}</span>
          <span className="unit">{'FIL/TiB'}</span>
        </span>
      )
    },
  }, //32GiB扇区新增算力成本，单位FIL/TiB
  {
    title: 'fil_per_tera_24h',
    tip: 'fil_per_tera_24h_tip',
    dataIndex: 'fil_per_tera_24h',

    render: (v: string) => {
      return (
        <span>
          <span>{formatFil(v, 'FIL', 4) + ' '}</span>
          <span className="unit">{'FIL/TiB'}</span>
        </span>
      )
    },
  }, //近24h产出效率，单位FIL/TiB
  {
    title: 'total_rewards',
    dataIndex: 'total_rewards',

    render: (v: number | string) => {
      // return Number(formatFil(v,'FIL')).toLocaleString() + ' FIL'
      return (
        <span>
          <span>{Number(formatFil(v, 'FIL')).toLocaleString() + ' '}</span>
          <span className="unit">{'FIL'}</span>
        </span>
      )
    },
  }, //全网出块奖励，单位Fil
  {
    title: 'win_count_reward',
    dataIndex: 'win_count_reward',
    render: (v: any) => {
      return (
        <span>
          <span>{Number(formatFil(v, 'FIL', 4)).toLocaleString() + ' '}</span>
          <span className="unit">{'FIL'}</span>
        </span>
      )
    },
  }, //每赢票奖励，单位Fil

  {
    title: 'gas_in_64g_meta',
    tip: 'gas_in_64g_tip',
    dataIndex: 'gas_in_64g',
    render: (v: number | string) => {
      let value = ''
      let unit = ''
      if (Number(v) < 0.0001) {
        value = formatFil(v, 'nanoFIL', 4)
        unit = 'nanoFIL/TiB'
      } else {
        value = formatFil(v, 'FIL', 4)
        unit = 'FIL/TiB'
      }
      return (
        <span>
          <span>{value + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  }, //64GiB扇区Gas消耗，单位FIL/TiB
  {
    title: 'add_power_in_64g',
    tip: 'add_power_in_64g_tip',
    dataIndex: 'add_power_in_64g',

    render: (v: number | string) => {
      return (
        <span>
          <span>{formatFil(v, 'FIL', 4) + ' '}</span>
          <span className="unit">{'FIL/TiB'}</span>
        </span>
      )
    },
  }, //64GiB扇区新增算力成本，单位FIL/TiB
  {
    title: 'avg_block_count',
    tip: 'avg_block_count_tip',
    dataIndex: 'avg_block_count',

    render: (v: number | string) => formatNumber(v),
  }, //平均每高度区块数量
  {
    title: 'avg_message_count',
    dataIndex: 'avg_message_count',

    tip: 'avg_message_count_tip',

    render: (v: number | string) => formatNumber(v),
  }, //平均每高度消息数
  {
    title: 'active_miners',
    dataIndex: 'active_miners',

    render: (v: number | string) => formatNumber(v),
  }, //活跃节点数
  {
    title: 'burnt',
    dataIndex: 'burnt',

    render: (v: number | string) => {
      return (
        <span>
          <span>{formatNumber(formatFil(v, 'FIL'), 4) + ' '}</span>
          <span className="unit">{'FIL'}</span>
        </span>
      )
    },
  }, //销毁量
  {
    title: 'circulating_percent',
    dataIndex: 'circulating_percent',
    render: (v: number) => Number(v * 100).toFixed(2) + '%',
  }, //流通率
  {
    title: 'quality_power_Cc',
    dataIndex: 'Cc',
    render: (text: string | number) => {
      const [textValue, unit] = unitConversion(text, 2).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  },
  {
    title: 'quality_power_Dc',
    dataIndex: 'Dc',
    render: (text: string | number) => {
      const [textValue, unit] = unitConversion(text, 2).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  },
  {
    title: 'proportion_32G',
    dataIndex: 'proportion_32G',
    render: (text: string | number) => {
      if (!text) return '--'
      const newText = Number(Number(text) * 100).toFixed(2)
      return newText + '%'
    },
  },
  {
    title: 'proportion_64G',
    dataIndex: 'proportion_64G',
    render: (text: string | number, record: any) => {
      if (!text) return '--'
      const text_32 = record.proportion_32G || 0
      const newText = Number(Number(text_32) * 100).toFixed(2)
      const lastText = (100 - Number(newText)).toFixed(2)
      return lastText + '%'
    },
  },
  {
    title: 'gas_24',
    dataIndex: 'sum',
    tipContent: [
      {
        title: 'contract_gas',
        dataIndex: 'contract_gas',
        render: (text: string | number) => formatFilNum(text, false, false, 2),
      },
    ],
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ')
      return (
        <>
          <span>{show}</span>
          <span className="unit ml-1	text-xs">{unit}</span>
        </>
      )
    },
  }, //近24h产出效率，单位FIL/TiB
  {
    title: 'quality_power_Cc',
    dataIndex: 'Cc',
    render: (text: string | number) => {
      const [textValue, unit] = unitConversion(text, 2).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  },
  {
    title: 'quality_power_Dc',
    dataIndex: 'Dc',
    render: (text: string | number) => {
      const [textValue, unit] = unitConversion(text, 2).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  },
  {
    title: 'proportion_32G',
    dataIndex: 'proportion_32G',
    render: (text: string | number) => {
      if (!text) return '--'
      const newText = Number(Number(text) * 100).toFixed(2)
      return newText + '%'
    },
  },
  {
    title: 'proportion_64G',
    dataIndex: 'proportion_64G',
    render: (text: string | number, record: any) => {
      if (!text) return '--'
      const text_32 = record.proportion_32G || 0
      const newText = Number(Number(text_32) * 100).toFixed(2)
      const lastText = (100 - Number(newText)).toFixed(2)
      return lastText + '%'
    },
  },
  {
    title: 'gas_24',
    dataIndex: 'sum',
    tipContent: [
      {
        title: 'contract_gas',
        dataIndex: 'contract_gas',
        render: (text: string | number) => formatFilNum(text, false, false, 2),
      },
    ],
    render: (v: any) => {
      const [show, unit] = formatFilNum(v, false, false, 4).split(' ')
      return (
        <>
          <span>{show}</span>
          <span className="unit ml-1	text-xs">{unit}</span>
        </>
      )
    },
  }, //近24h产出效率，单位FIL/TiB
  {
    title: 'total_contract',
    dataIndex: 'total_contract',
    tip: 'total_contract/24h_contract_tip',

    render: (v: number | string, record: any) => {
      const changeText =
        record?.total_contract_change_in_24h &&
        Number(record.total_contract_change_in_24h)
      return (
        <span className="flex items-baseline gap-x-1">
          {formatNumber(v, 2)}
          {/* {changeText && <span className={`${className} font-medium font-HarmonyOS_Medium text-xs`}>{flag}{ changeText}</span>} */}
        </span>
      )
    },
  }, //全网合约数/24h变化
  {
    title: 'total_contract_24h_contract',
    dataIndex: 'total_contract_change_in_24h',
    render: (v: number | string, record: any) => {
      const changeText =
        record?.total_contract_change_in_24h &&
        Number(record.total_contract_change_in_24h)
      const className = changeText
        ? changeText < 0
          ? 'text_red'
          : 'text_green'
        : ''
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      return (
        <span className="flex items-baseline gap-x-1">
          {flag}
          {Math.abs(changeText)}
          {/* {changeText && <span className={`${className} font-medium font-HarmonyOS_Medium text-xs`}>{flag}{ changeText}</span>} */}
        </span>
      )
    },
  }, //24h变化

  { title: 'verified_contracts', dataIndex: 'verified_contracts' },

  {
    title: 'contract_transaction',
    dataIndex: 'contract_txs',
    render: (v: number | string, record: any) => {
      return (
        <span className="flex items-baseline gap-x-1">
          {formatNumber(v, 2)}
          {/* {changeText && <span className={`${className} font-medium font-HarmonyOS_Medium text-xs`}>{flag}{changeText}</span>} */}
        </span>
      )
    },
  }, //合约交易数/24h变化
  {
    title: 'contract_transaction_24h_change',
    dataIndex: 'contract_txs',
    render: (v: number | string, record: any) => {
      const changeText =
        record?.contract_txs_change_in_24h &&
        Number(record.contract_txs_change_in_24h)
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      return (
        <span className="flex items-baseline gap-x-1">
          {changeText && (
            <span>
              {flag}
              {changeText}
            </span>
          )}
        </span>
      )
    },
  }, //合约交易数/24h变化
  {
    title: 'contract_address',
    dataIndex: 'contract_users',
    render: (v: number | string, record: any) => {
      return (
        <span className="flex items-baseline gap-x-1">
          {formatNumber(v, 2)}
        </span>
      )
    },
  }, //合约交易地址/24h变化
  {
    title: 'contract_address_24h_change',
    dataIndex: 'contract_users',
    render: (v: number | string, record: any) => {
      const changeText =
        record?.contract_users_change_in_24h &&
        Number(record.contract_users_change_in_24h)
      const flag = changeText ? (changeText > 0 ? '+' : '-') : ''
      return (
        <span className="flex items-baseline gap-x-1">
          {/* {formatNumber(v, 2)} */}
          {changeText && (
            <span>
              {flag} {changeText}
            </span>
          )}
        </span>
      )
    },
  }, //合约交易地址/24h变化
  {
    title: 'contract_balance',
    dataIndex: 'total_balance',
    render: (v: number | string, record: any) => {
      if (!v) return '--'
      return formatFilNum(v)
    },
  },
  {
    title: 'quality_power_Dc',
    dataIndex: 'Dc',
    render: (text: string | number) => {
      const [textValue, unit] = unitConversion(text, 2).split(' ')
      return (
        <span>
          <span>{textValue + ' '}</span>
          <span className="unit">{unit}</span>
        </span>
      )
    },
  },
  {
    title: 'proportion_32G',
    dataIndex: 'proportion_32G',
    render: (text: string | number) => {
      if (!text) return '--'
      const newText = Number(Number(text) * 100).toFixed(2)
      return newText + '%'
    },
  },
  {
    title: 'proportion_64G',
    dataIndex: 'proportion_64G',
    render: (text: string | number, record: any) => {
      if (!text) return '--'
      const text_32 = record.proportion_32G || 0
      const newText = Number(Number(text_32) * 100).toFixed(2)
      const lastText = (100 - Number(newText)).toFixed(2)
      return lastText + '%'
    },
  },
]

export const no_result = {
  title: 'search_notFound',
  warn_text: 'warn_text',
  warn_details: 'warn_details',
  go_home: 'go_home',
}
