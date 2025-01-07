import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { contract_list } from '@/contents/contract'
import Table from '@/packages/Table'
import useAxiosData from '@/store/useAxiosData'
import { isIndent, pageLimit } from '@/utils'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import styles from './index.module.scss'
import useWindow from '@/components/hooks/useWindown'
import Link from 'next/link'
import Copy from '@/components/copy'
export default () => {
  const { tr } = Translation({ ns: 'contract' })
  const [current, setCurrent] = useState(1)
  const { isMobile } = useWindow()
  const payload = useMemo(() => {
    return {
      limit: pageLimit,
      index: current - 1,
    }
  }, [current])

  const { data: listData, loading } = useAxiosData(
    apiUrl.contract_verify_list,
    { ...payload },
  )

  const columns: any = useMemo(() => {
    return contract_list.columns.map((item) => {
      if (isMobile && item.dataIndex === 'contract_address') {
        //@ts-ignore
        item.render = (value: string, record: any) => {
          if (!value) return '--'
          return (
            <span className="flex items-center gap-x-2">
              <Link className="link_text" href={`/address/${value}`}>
                {isIndent(value, 5, 4)}
              </Link>
              <Copy text={value} />
            </span>
          )
        }
      }
      return { ...item, title: tr(item.title) }
    })
  }, [tr, isMobile])

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current
    setCurrent(cur)
  }

  const showData = useMemo(() => {
    if (listData && listData.compiled_file_list) {
      return listData.compiled_file_list.map((item: any, index: number) => {
        return { ...item, rank: (current - 1) * pageLimit + index + 1 }
      })
    }
    return []
  }, [listData?.compiled_file_list, current])

  return (
    <div className="main_contain">
      <div
        className={classNames(
          'mx-2.5 font-HarmonyOS text-lg font-semibold',
          styles.title,
        )}
      >
        {tr('contract_list')}
      </div>
      <div
        className={classNames(
          'text_des mx-2.5 mt-1 text-xs font-normal',
          styles['title-description'],
        )}
      >
        {tr('contract_list_total', { value: listData?.total || 0 })}
      </div>
      <div
        className={classNames(
          'card_shadow border_color mt-4 rounded-xl border p-5',
          styles.reset,
          styles.table,
        )}
      >
        <Table
          key="contract_rank"
          className="-mt-2.5 "
          data={showData || []}
          total={listData?.total || 0}
          columns={columns || []}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}
