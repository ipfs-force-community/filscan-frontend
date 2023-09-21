import Table from "@/packages/mobile/table"
import styles from './index.module.scss'
import { useEffect, useMemo, useState } from "react"
import { getColumn, mobileRankList, rank_header } from "@/contents/rank"
import { ColumnType } from "antd/es/table"
import { DefiProtocol, MinerPowerRank, MinerPowerRankData } from "@/store/homeData"
import homeStore from "@/store/modules/home"
import { useTranslation } from "react-i18next"
import Progress from "@/packages/progress"
import { unitConversion } from "@/utils"
import { observer } from "mobx-react"
import { useRouter } from "next/router"

interface Sort {
    field:string,
    order:string
  }

const Rank = ()=>{
  const [sort,setSort] = useState<Sort>({
    field:'power_ratio',
    order:'descend'
  })
  const {t} = useTranslation("rank")
  const router = useRouter()
  const columns = useMemo(()=>{
    return getColumn('growth','').filter((item)=>{
      if (item.dataIndex === 'rank') {
        item.width = '15%'
        item.align = "left"
      }
      if (item.dataIndex === 'miner_id') {
        item.width = '30%'
      }
      if (item.title === 'power_ratio') {
        item.align = "right"
        item.width = '0'
        item.render = (value:any,render:MinerPowerRank)=>{
          const left = 100 - (Number(value) / Number(render.power_ratio)) * 100;
          return (
            <span className='flex justify-end gap-x-2'>
              <Progress left={left + '%'} />
              <span>{unitConversion(value, 2) + '/D'}</span>
            </span>
          );
        }
      }
      item.title = t(item.title)
      return mobileRankList.includes(item.dataIndex)

    }) as ColumnType<MinerPowerRank>[];
  },[t])

  useEffect(()=>{
    homeStore.fetchMinerPowerRank({
      index:1,
      limit:10,
      interval:"24h",
      order:{
        sort:sort.order === 'ascend' ? 'asc' : 'desc',
        field:sort.field
      },
      sector_size:null,
    })
  },[])

  useEffect(()=>{
  },[homeStore.minerPowerRankData?.items])

  return <div className={styles.wrap}>
    <div className={styles.title}>{t('growth')}</div>
    <div className={styles.content}>
      <Table
        columns={columns}
        dataSource={homeStore.minerPowerRankData?.items}
        pagination={false}
      ></Table>
      <div onClick={()=>{
        router.push('/rank#growth')
        console.log("=======ank#growth=========");

      }} className="flex justify-center items-center h-[45px] text-[13px] font-DINPro-Medium text-mobile-text-warning">{t("see_more")}</div>
    </div>
  </div>
}

export default observer(Rank)