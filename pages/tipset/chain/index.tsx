import { Translation } from "@/components/hooks/Translation";
import { apiUrl } from "@/contents/apiUrl";
import { chain_list } from "@/contents/tipset"
import Skeleton from "@/packages/skeleton";
import { useFilscanStore } from "@/store/FilscanStore";
import useAxiosData from "@/store/useAxiosData";
import { formatDateTime, formatFilNum, pageLimit } from "@/utils";
import { Pagination } from "antd";
import { useEffect, useMemo, useState } from "react"
import styles from './index.module.scss'
import classNames from "classnames";
import { BrowserView, MobileView } from "@/components/device-detect";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { get } from 'lodash'

export default () => {
  const { tr } = Translation({ ns: 'tipset' });
  const { theme, lang } = useFilscanStore();
  const { axiosData } = useAxiosData();
  const [loading,setLoading] = useState(false)
  const [current, setCurrent] = useState<number>(1);
  const [data, setData] = useState({
    dataSource: [],
    total:0
  })

  useEffect(() => {
    load()
  },[])

  const load = async (cur?: number) => {
    setLoading(true)
    const index = cur || current
    const result:any = await axiosData(apiUrl.tipset_chain, {
      filters: {
        limit:10,
        index: index - 1,

      }
    })
    setLoading(false)
    setData({
      dataSource: result?.tipset_list || [],
      total:result?.total_count||0
    })
  }

  const columns = useMemo(() => {
    return chain_list.columns.map(item => {
      return {...item,title:tr(item.title)}
    })
  }, [lang])

  function renderLoading(){
    return <div className="h-[500px] flex flex-col gap-y-5">
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
      <Skeleton />
    </div>
  }

  return <div className={classNames(styles['chain-list'],'main_contain')}>
    <div className='font-PingFang font-semibold text-lg mx-2.5'>
      {tr('block_list')}
    </div>
    <div className="mt-4 h-full border rounded-xl p-5 card_shadow border_color text_xs">
      <BrowserView>
        <ul className="flex p-5">
          {columns.map(itemHeader => {
            return <li key={itemHeader.dataIndex} className="text_des font-medium" style={{width:itemHeader.width}}>
              { itemHeader.title}
            </li>
          })}
        </ul>
      </BrowserView>
      {loading ?
        renderLoading() :
        <>
          <MobileView>
            <div className={styles['block-list']}>
              {
                data.dataSource.map((item,index)=>{
                  return <div className={styles['block-item']} key={`block-${index}`}>
                    <div className={styles.height}>
                      <div className={styles.label}>{tr('height')}</div>
                      <div className={styles.link}>
                        <Link className="link" href={`/height/${item['height']}`}>
                          {item['height']}
                        </Link>
                      </div>
                      <div className={styles.time}>{formatDateTime(get(item,'block_basic[0].block_time'))}</div>
                    </div>
                    <div className={styles.rewards}>
                      {
                        [...item['block_basic']].map((m,idx)=>{
                          return <div className={styles['reward-item']} key={`reward-${idx}`}>
                            <div className={styles.miner}>
                              <Link key={index} className="link" href={`/miner/${m['miner_id']}`}>
                                {m['miner_id']}
                              </Link>
                            </div>
                            <div className={styles.reward}>{tr('blocks_reward')}：{m['reward'] ? formatFilNum(m['reward'],false,false) :''}</div>
                          </div>
                        })
                      }
                    </div>
                  </div>
                })
              }
            </div>
          </MobileView>
          <BrowserView>
            <div>
              {data.dataSource.map((item,index) => {
                return <ul className='flex mt-5 items-center p-5 pt-0 border-b border_color' key={index}>
                  {columns.map(itemHeader => {
                    const { dataIndex,render} = itemHeader;
                    const value = item[dataIndex];
                    const renderValue = render ? render(value,item):value
                    return <li style={{width:itemHeader.width}} key={dataIndex} className="font-DINPro-Medium">{renderValue}</li>
                  })}
                </ul>

              })}
            </div>
          </BrowserView>
        </>
      }

      <div className={`mt-5 flex justify-end items-center`} >
        <Pagination showQuickJumper showSizeChanger={ false} current={current} total={data.total}
          onChange={(cur) => {
            load(cur);
            setCurrent(cur)
          } } />
      </div>

    </div>

  </div>
}