/** @format */
import { useTranslation } from "react-i18next";
import Charts from "@/src/statistics/charts";
import FILChart from "@/src/statistics/fil";
import Card from '@/packages/custom_card'
import { charts } from "@/contants/statistic";
import styles from "../../index.module.scss";
import { useEffect, useState } from "react";
import { postAxios } from "@/store/server";
import { apiUrl } from "@/contants/apiUrl";
import Tabs from "@/packages/tabs";
import Tip from '@/packages/tips'
import { formatFil, formatFilNum } from "@/utils/utils";


function Overview({ data }: { data: any }) {
  const { t } = useTranslation();
  const tr = (label: string): string => {
    return t(label, { ns: "static" });
  };
    
    const [blockData, setBlockData] = useState({})
    const [activeNode, setActiveNode] = useState({})
    const [filData, setFilData] = useState<any>({})
    const [meaasge,setMessage] = useState({})

    useEffect(() => { 
        fil_chart()
        load_block_trend()
        load_active_miner()
        load_message_trend()
    }, [])

    const fil_chart = () => { 
        postAxios(apiUrl.static_fil_chart, {}).then((res: any) => { 
            const result = res?.result?.fil_compose || {};
            const newList:any = {};
            charts.pie.list?.forEach((itemList: any) => { 
                newList[itemList.title] = itemList.list.map((itemValue: any) => { 
                    const show_value = formatFil(result[itemValue.key], 'FIL',);
                    if (itemList.title === 'pie_title_a') {
                        const percentage_a = Number(20 * Math.pow(10, 8));
                        return {
                            ...itemValue,
                            percentage: Number((Number(show_value) /percentage_a )*100).toFixed(2) + '%',
                            value:show_value,
                            unit: 'FIL',
                        }
                    } else { 
                        const percentage_b = Number((Number(result[itemValue.key]) / result.total_released) * 100).toFixed(2) + '%';
                        return {
                            ...itemValue,
                            percentage:percentage_b,
                            value:show_value,
                            unit: 'FIL',
                        }
                    }
                  
                })
            })
        setFilData(newList)
        })
    }
    
    const load_block_trend = (time?: string) => { 
        const interval = time || '24h';
        postAxios(apiUrl.static_block_trend, { interval }).then((res:any) => {
            const dateList:any = [];
            const seriesObj:any = {
                block_reward_per_TiB: [],
                acc_block_rewards:[]
            }
            res?.result?.items?.reverse()?.forEach((value: any) => {
            const {
            block_time,
            acc_block_rewards,
            block_reward_per_tib,
            } = value;
            const showTime =block_time.split("+")[0];
            dateList.push(showTime);
                seriesObj.acc_block_rewards.push({
                    value: formatFil(acc_block_rewards, 'FIL'),
                    amount:formatFilNum(acc_block_rewards, false,false,4,false).split(' ')[0],
                    unit:'FIL'
                }   
            
            );
            seriesObj.block_reward_per_TiB.push(
                {
                    value: formatFil(block_reward_per_tib, 'FIL', 4),
                    amount:formatFilNum(block_reward_per_tib, false,false,4,false).split(' ')[0],
                    unit: formatFilNum(block_reward_per_tib, false,false,4,false).split(' ')[1]+ '/TiB'
                }
            );
            });
            setBlockData({
                xData: dateList,
                seriesObj
            })
         })
    }

    const load_active_miner = (time?: string) => { 
          const interval = time || '24h';
        postAxios(apiUrl.static_active_miner, { interval }).then((res:any) => {
            const dateList:any = [];
            const seriesObj:any = {
                active_miner_count: [],
            }
            res?.result?.items?.forEach((value: any) => {
            const {
            block_time,
            active_miner_count,
            } = value;
            const showTime =block_time.split("+")[0];
            dateList.push(showTime);
            seriesObj.active_miner_count.push({
                value: active_miner_count,
                unit:''
            }   
            
            )
            });
            setActiveNode({
                xData: dateList,
                seriesObj
            })
         })
    }

    const load_message_trend = (time?:string) => { 
            const interval = time || '24h';
        postAxios(apiUrl.static_message_trend, { interval }).then((res:any) => {
            const dateList:any = [];
            const seriesObj:any = {
                message_count: [],
                all_message_count :[]
            }
            res?.result?.items?.reverse()?.forEach((value: any) => {
            const {
            block_time,
            message_count,
            all_message_count,
            } = value;
            const showTime =block_time.split("+")[0];
            dateList.push(showTime);
            seriesObj.message_count.push({
                    value: message_count,
                    unit:''
            }   
            );
                
            seriesObj.all_message_count.push(
                {
                    value: all_message_count,
                    unit:''
                }
            );
            });
            setMessage({
                xData: dateList,
                seriesObj
            })
         })
    }

    
    const { block_trend, pie, active_nodes, messages_trend, header } = charts;
    // <span style={{marginLeft:20}}>{} </span>

    return <div className={styles.static_charts}>
        <Card bgColor title={pie.title.label} ns={'static'}>
            <div className={styles.static_charts_first}>
                {charts.pie.list.map((t: any,index:number) => {
                    return <div key={ index}>
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', columnGap:'3px',   }}>{tr(t.title)}
                            {t.title_tip && <Tip  context={tr(t.title_tip)}/>}
                           
                        </div>
                    <FILChart data={filData[t.title]} list={[...filData[t.title]||[]]} /> 
                    </div>             
                })}
            </div>
        </Card>
        <Card title={block_trend.title.label}  bgColor ns={'static'} headerRight={ 
            <Tabs
                     data={header}
                    ns='static'
                    border={ true}
                    defaultValue={'24h'}
                    onChange={(value) => { 
                        load_block_trend(value.value)
                }}
            />
          
    }>
        <Charts  type='block_trend' data={blockData}   />  
        </Card>

        <Card title={active_nodes.title.label} bgColor ns={'static'} headerRight={ 
       <Tabs
        data={header}
            ns='static'
            border={ true}
            defaultValue={'24h'}
            onChange={(value) => { 
            load_active_miner(value.value)
        }}
      />
    }>
        <Charts  type='active_nodes' data={activeNode}   />  
        </Card>
        <Card bgColor title={messages_trend.title.label} ns={'static'}  headerRight={ 
       <Tabs
        data={header}
            ns='static'
            border={ true}
            defaultValue={'24h'}
            onChange={(value) => { 
            load_message_trend(value.value)
        }}
      />
    }>
        <Charts  type='messages_trend' data={meaasge}   />  
    </Card>
    </div>
    
}
export default Overview;
