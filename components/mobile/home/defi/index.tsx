import { defi_list, mobileHomeDefiColumns } from "@/contents/fevm"
import { DefiProtocol } from "@/store/homeData"
import homeStore from "@/store/modules/home"
import { ColumnsType } from "antd/es/table"
import { observer } from "mobx-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import styles from './index.module.scss'
import Image from "next/image"
import Table from "@/packages/mobile/table"
import { get$Number } from "@/utils"
import { useRouter } from "next/router"
import Link from "next/link"

interface Sort {
  field:string,
  order:string
}

const Defi = ()=>{
  const {t} = useTranslation('fevm')
  const router = useRouter()
  const [sort,setSort] = useState<Sort>({
    field:'tvl',
    order:'descend'
  })

  const columns :ColumnsType<DefiProtocol> = [
    {
      title: `${t('rank')}`,
      dataIndex: 'rank',
      key:'rank',
      width:'15%',
      render(value, record, index) {
        return <div className={styles.rank}>{index + 1}</div>
      },
    },
    {
      title: `${t('Protocol')}`,
      dataIndex: 'protocol',
      key:'protocol',
      ellipsis: {
        showTitle: false,
      },
      render(value, record, index) {
        return <div className={styles.protocol}>
          <Image fill src={record.icon_url} alt="" className="mr-1"/>
          <div
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              cursor: 'pointer',
            }}
            className="font-DINPro-Medium"
          >{value}</div>
        </div>
      },
    },
    {
      title: `${t('tvl')}`,
      dataIndex: 'tvl',
      key:'tvl',
      align:"right",
      render(value) {
        return <div className="font-DINPro-Medium">{get$Number(value)}</div>
      },
    },
  ]
  useEffect(()=>{
    homeStore.fetchHomeDefi({
      page:1,
      limit:10,
      field: sort.field,
      reverse: sort.order.toLocaleLowerCase() === 'ascend',
    })
  },[sort])
  return <div className={styles.wrap}>
    <div className={styles.title}>Defi Protocol</div>
    <div className={styles.content}>
      <Table
        columns={columns}
        dataSource={homeStore.defiData?.items}
        pagination={false}
      ></Table>
      <Link href={`/fevm/defi`}
        // onClick={() => {
        //   router.push('/contract/rank')
        // }}
        className="flex justify-center items-center h-[45px] text-[13px] font-DINPro-Medium text-mobile-text-warning">{t("see_more")}</Link>
    </div>
  </div>
}

export default observer(Defi)