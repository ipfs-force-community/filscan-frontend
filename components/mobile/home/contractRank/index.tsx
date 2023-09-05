import Table from "@/packages/mobile/table"
import styles from './index.module.scss'
import { useEffect, useMemo, useState } from "react"
import { contract_list, contract_rank, mobileHomeContractRank } from "@/contents/contract"
import { ColumnType } from "antd/es/table"
import homeStore from "@/store/modules/home"
import { DefiProtocol } from "@/store/homeData"
import { useTranslation } from "react-i18next"
import fetchData from "@/store/server"
import { apiUrl } from "@/contents/apiUrl"
import { observer } from "mobx-react"
import Link from "next/link"
import verifySvg from '@/assets/images/verify.svg';
import Image from "next/image"

interface Sort {
  field:string,
  order:string
}

const ContractRank =()=>{
  const [sort,setSort] = useState<Sort>({
    field:'transfer_count',
    order:'descend'
  })
  const {t} = useTranslation('contract')

  const columns = useMemo(()=>{
    return contract_rank.columns.filter((value,index)=>{
      if (value.dataIndex === 'contract_name') {
        value.render = (text: string, record: any) => {
          if (text) {
            return (
              <span className='flex gap-x-2 items-center'>
                <Link href={`/address/${record.contract_address}`}>{text}</Link>
                <Image src={verifySvg} width={13} height={14} alt='' />
              </span>
            );
          }
          return (
            <Link href='/contract/verify' className='text_color'>
              {t('ver_address')}
            </Link>
          );
        };
      }
      value.title = `${t(value.title)}`
      return mobileHomeContractRank.includes(value.dataIndex)
    }) as ColumnType<DefiProtocol>[]
  },[])
  useEffect(()=>{
    homeStore.fetchContractRank({
      page:1,
      limit:10,
      sort: sort.order === 'ascend' ? 'asc' : 'desc',
      field: sort.field
    })
  },[])
  return <div className={styles.wrap}>
    <div className={styles.title}>{t(contract_rank.title)}</div>
    <div className={styles.content}>
      <Table
        columns={columns}
        dataSource={homeStore.contractData?.evm_contract_list}
        pagination={false}
      ></Table>
      <div className="flex justify-center items-center h-[45px] text-[13px] font-DINPro-Medium text-mobile-text-warning">{t("see_more")}</div>
    </div>
  </div>
}

export default observer(ContractRank)