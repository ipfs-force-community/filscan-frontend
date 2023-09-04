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
import classNames from "classnames"
import { get$Number } from "@/utils"
interface Sort {
  field:string,
  order:string
}

const Defi = ()=>{
  const {t} = useTranslation('fevm')
  const [sort,setSort] = useState<Sort>({
    field:'tvl',
    order:'descend'
  })

  const columns:ColumnsType<DefiProtocol> = [
    {
      title: `${t('rank')}`,
      dataIndex: 'rank',
      key:'rank',
      width:'15%',
      render(value, record, index) {
        return <div
          className={'flex justify-center items-center rounded-[3px] bg-mobile-title-color w-[16px] text-mobile-text-unimportant font-DINPro-Medium text-[12px]'}
        >
          {index + 1}
        </div>
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
        return <div className='flex items-center'>
          <Image className="!relative !w-[15px] !h-[15px] !rounded-[2.5px] mr-[4px]" fill src={record.icon_url} alt="" />
          <div
            className={'font-DINPro-Medium text-[14px] overflow-hidden text-ellipsis cursor-pointer'}
          >{value}</div>
        </div>
      },
    },
    {
      title: `${t('tvl')}`,
      dataIndex: 'tvl',
      key:'tvl',
      align:"right",
      render(value, record, index) {
        return <div className="font-DINPro-Medium text-[14px]">{get$Number(value)}</div>
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
  return <div className={styles.defiWrap}>
    <div className={styles.title}>Defi Protocol</div>
    <div className="bg-mobile-bgColor rounded-[6px] overflow-hidden">
      <Table
        columns={columns}
        dataSource={homeStore.defiData?.items}
        pagination={false}
      ></Table>
      <div className="flex justify-center items-center h-[45px] text-[13px] font-DINPro-Medium text-mobile-text-warning">FIL Staking</div>
    </div>
  </div>
}

export default observer(Defi)