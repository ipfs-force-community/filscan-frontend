/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery'
import useUpdateQuery from '@/components/hooks/useUpdateQuery'
import { pool_list } from '@/contents/tipset'
import Table from '@/packages/Table'
import Selects from '@/packages/selects'
import { formatNumber, pageLimit } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import useAxiosData from '@/store/useAxiosData'
import styles from './index.module.scss'
import classNames from 'classnames'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(() => {
  const { tr } = Translation({ ns: 'tipset' })
  const { theme, lang } = filscanStore
  const updateQuery = useUpdateQuery()
  const removeQueryParam = useRemoveQueryParam()
  const { axiosData, loading } = useAxiosData()
  const { name, p } = useRouter().query
  // const [loading, setLoading] = useState(false);
  const [headerOptions, setHeaderOptions] = useState<Array<any>>([])
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  })

  const method = useMemo(() => {
    if (name && typeof name === 'string') {
      return name
    }
    return 'all'
  }, [name])

  const current = useMemo(() => {
    if (p && typeof p === 'string') {
      return Number(p)
    }
    return 1
  }, [p])

  useEffect(() => {
    loadOptions()
  }, [lang])

  const loadOptions = async () => {
    const result: any = await axiosData(apiUrl.tipset_message_pool_opt)
    const obj = result?.method_name_list || {}
    const options = Object.keys(obj).map((v: string) => {
      return { value: v, label: tr(v) }
    })
    options.unshift({
      label: `${tr('all')}`,
      value: 'all',
    })
    setHeaderOptions(options)
  }

  useEffect(() => {
    load(current, method)
  }, [method, current])

  const load = async (cur?: number, method?: string) => {
    //  setLoading(true);
    const showIndex = cur || current
    const method_name = method === 'all' ? '' : method
    const result: any = await axiosData(apiUrl.tipset_pool, {
      filters: {
        index: showIndex - 1,
        limit: pageLimit,
        method_name,
      },
    })
    // setLoading(false);
    setDataSource({
      data: (result?.messages_pool_list || [])?.map((item: any) => {
        return {
          ...item?.message_basic,
          gas_fee_cap: item?.gas_limit || '',
          gas_premium: item?.gas_premium || '',
        }
      }),
      total: result?.total_count,
    })
  }

  const columns = useMemo(() => {
    const content = pool_list.columns.map((v: any) => {
      return { ...v, title: tr(v.title) }
    })
    return content
  }, [theme, tr])

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    const showCurrent = pagination?.current
    if (showCurrent) {
      if (showCurrent === 1) {
        removeQueryParam('p')
      } else {
        updateQuery({ p: pagination.current })
      }
    }
  }
  return (
    <div className={classNames(styles['pool-message-list'], 'main_contain')}>
      <div
        className={classNames(
          'mx-2.5 flex items-center justify-between',
          styles['title-wrap'],
        )}
      >
        <div>
          <div className="font-HarmonyOS text-lg font-semibold">
            {tr('pool_list')}
          </div>
          <div className="text_des text-xs">
            {tr(pool_list.total_list, {
              value: formatNumber(dataSource?.total || 0),
            })}
          </div>
        </div>
        <Selects
          className={classNames('w-[200px]', styles.select)}
          value={method}
          options={headerOptions}
          onChange={(value) => {
            if (value !== 'all') {
              updateQuery({ name: value, p: 'removed' })
            } else {
              removeQueryParam('name')
            }
          }}
        />
      </div>

      <div className="card_shadow border_color mt-4  h-full rounded-xl	border p-5">
        <Table
          className="-mt-2.5 "
          data={dataSource.data}
          total={dataSource.total}
          columns={columns}
          loading={loading}
          current={current}
          onChange={handleChange}
        />
      </div>
    </div>
  )
})
