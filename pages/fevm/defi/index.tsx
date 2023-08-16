import { apiUrl } from '@/contants/apiUrl'
import { defi_dashboard, defi_list } from '@/contants/fevm'
import { postAxios } from '@/store/server'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './index.module.scss'
import Card from '@/packages/custom_card'
import Table from '@/packages/newTable'
import { pageLimit } from '@/contants/varible'
import { formatDateTime } from '@/utils/utils'
import FilscanState from '@/store/content'
export default () => {
    const filscanStore: any = useContext(FilscanState);
    const [defiData, setDefiData] = useState<any>({});
    const [data, setData] = useState<any>({})
    const [current, setCurrent] = useState(1);
    const [max_pro,setMax]= useState('')
    const [sort, setSort] = useState({
        field:'tvl'
    })
    const [loading,setLoading] = useState(false)
    const { t } = useTranslation();
    const tr = (label: string, value?: Record<string, any>) => {
    if (value) {
      return t(label, { ...value, ns: "fevm" });
    }
    return t(label, { ns: "fevm" });
    };
    
    useEffect(() => { 
        postAxios(apiUrl.fevm_defiSummary).then(
            (res: any) => {
                setDefiData(res?.result)
            }
        );
        load();
    }, [])
    
    const load = (cur?:number,sorter?:any) => {
        setLoading(true)
        const page = cur || current;
        const sortData = sorter || sort
        postAxios(apiUrl.fevm_defiList, {
            page: page -1 ,
            limit: pageLimit,
            field: sortData.field,
            reverse:sortData.order === 'ascend'
        }).then(
            (res: any) => {
                if (!max_pro) { 
                setMax(res?.result?.items[0]?.tvl)
                }
                setLoading(false)
                setData(res?.result)
            }
         );
    }
    

    const columns = useMemo(() => { 
        return defi_list.columns(current,tr).map(v => { 
            return { ...v, title:typeof v.title === 'string'? tr(v.title):v.title(tr)}
        })
    },[current,filscanStore?.filscan?.lang])


    return <div className={style.defi}>
        <div className={style.defi_title}>
            <span>
                {tr('defi_overview')}
                <span className={style.defi_time}>{tr('defi_list_time',{value:formatDateTime(defiData.updated_at)})}</span>
            </span>
           
            {/* <span className={style.defi_title_des} onClick={() => { window.open('https://t.me/filscan_io')}}>
                Show My Project
            </span> */}
        </div> 
        <div className={style.defi_card}>
            {defi_dashboard.map((v:any) => { 
                return <li className={style.defi_card_item} key={v.dataIndex}>
                    <span className={style.defi_card_item_title}> {tr(v.title)}</span>
                    <span className={style.defi_card_item_value}>
                        { v.render? v.render(defiData[v.dataIndex],defiData,tr) : <span>{defiData[v.dataIndex]}</span>}
                </span>
            </li>
         })}
        </div>
        <Card title={''}  ns='fevm'>
            <Table ns='fevm'
               // total_msg={<span className={style.defi_time}>{tr('defi_list_time',{value:formatDateTime(defiData.updated_at)})}</span>}
                total={data?.total}
                onChange={(pagination: any, filters: any, sorter: any,) => { 
                    const index = pagination.current|| current
                    if (pagination.current) { 
                        setCurrent(pagination.current)
                    }
                    if (sorter) { 
                        setSort(sorter)
                    }
                    load(index,sorter)
                }}
                loading={ loading}
                columns={columns}
                dataSource={data?.items || []}
            //     onPage={(cur:number) => {
            //     // setCurrent(cur);
            //     // load(cur);
            // }}
            />
        </Card>
      
    </div>
}