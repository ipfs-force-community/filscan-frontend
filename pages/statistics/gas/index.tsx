/** @format */

import { Translation } from '@/components/hooks/Translation'
import { apiUrl } from '@/contents/apiUrl'
import { gas_24 } from '@/contents/statistic'
import Table from '@/packages/Table'
import Gas from '@/src/statistics/Gas'
import useAxiosData from '@/store/useAxiosData'
import { useMemo } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

export default () => {
  const { tr } = Translation({ ns: 'static' })
  const { data: GasData, loading, error } = useAxiosData(apiUrl.static_gas_24)
  const columns: any = useMemo(() => {
    return gas_24.columns.map((item: any) => {
      return { ...item, title: tr(item.title) }
    })
  }, [tr])

  return (
    <div className={classNames(styles['statistics-gas'], 'main_contain ')}>
      <div className="gas-title mx-2.5 mb-4 flex flex-col gap-y-2.5 text-lg font-medium">
        <span>{tr('gas')}</span>
      </div>
      <div
        className={classNames(
          'card_shadow border_color h-[348px] w-full !overflow-hidden rounded-xl border pb-2.5  pr-5 pt-5',
          styles.gas,
        )}
      >
        <Gas />
      </div>
      <>
        <div
          className={classNames(
            'mx-2.5 my-5 flex flex-col gap-y-2.5 text-lg font-medium',
            styles.title,
          )}
        >
          <span>{tr('gas_24')}</span>
        </div>
        <div
          className={classNames(
            'card_shadow border_color gas-table flex items-center rounded-xl border p-5',
          )}
        >
          <Table
            data={(GasData && GasData.items) || []}
            columns={columns}
            loading={loading}
          />
        </div>
      </>
    </div>
  )
}
