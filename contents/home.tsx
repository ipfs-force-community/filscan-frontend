import { Item } from "./type";

/*
 {
            label: 'total_quality_power',
            tip:'total_quality_power_tip',
            render: (v: number | string) => {
            return unitConversion(v, 4)
            }
        }, //全网有效算力

*/

export const home_meta: Array<Item> = [
         {
         title: 'power_increase_24h',
             dataIndex:'power_increase_24h',
            render: (v: number | string) => {
            return unitConversion(v, 4)
        }
    }, //近24h增长算力
        {
            title: 'add_power_in_32g',
            tip:'add_power_in_32g_tip',
            render: (v: number | string) => formatFil(v,'FIL',4) + ' FIL/TiB'
    }, //32GiB扇区新增算力成本，单位FIL/TiB
    {
            label: 'miner_initial_pledge',
            render: (v: string | number) => formatNumber(formatFil(v,'FIL',4)) + ' FIL/TiB'
    }, //当前扇区质押量
      {
            label: 'fil_per_tera_24h',
            tip:'fil_per_tera_24h_tip',
            render: (v: string) => { 
            return formatFil(v,'FIL',4) + ' FIL/TiB'
        } }, //近24h产出效率，单位FIL/TiB
]