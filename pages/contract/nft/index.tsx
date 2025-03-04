/** @format */

import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { contract_nfts } from '@/contents/contract'
import Table from '@/packages/Table'
import useAxiosData from '@/store/useAxiosData'
import { pageLimit } from '@/utils'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import styles from './index.module.scss'
import useWindow from '@/components/hooks/useWindown'
import { cloneDeep } from 'lodash'
export default () => {
  const { tr } = Translation({ ns: 'contract' })
  const [current, setCurrent] = useState(1)
  const payload = useMemo(() => {
    return {
      index: current - 1,
      limit: pageLimit,
    }
  }, [current])

  const { isMobile } = useWindow()

  const { data: NftsData, loading } = useAxiosData(
    apiUrl.contract_nfts,
    payload,
  )

  const columns = useMemo(() => {
    const columns = cloneDeep(contract_nfts.columns)
    return columns.map((v: any) => {
      if (isMobile) {
        if (v.dataIndex === 'rank') {
          // @ts-ignore
          v.render = (value: string, record: any, index) => {
            return <>{`No.${index + 1}`}</>
          }
        }
      }
      return {
        ...v,
        title: typeof v.title === 'string' ? tr(v.title) : v.title,
      }
    })
  }, [tr, isMobile])

  return (
    <div className="main_contain ">
      <div
        className={classNames(
          'mx-2.5 mb-4 flex flex-col gap-y-2.5 text-xl font-medium',
          styles.title,
        )}
      >
        <span>{tr('nfts_list')}</span>
      </div>
      <div
        className={classNames(
          'card_shadow  border_color flex items-center rounded-xl border p-5',
          styles.table,
        )}
      >
        <Table
          data={NftsData?.items || []}
          columns={columns}
          loading={loading}
        />
      </div>
    </div>
  )
}
