/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery'
import useUpdateQuery from '@/components/hooks/useUpdateQuery'
import { address_list } from '@/contents/tipset'
import Table from '@/packages/Table'
import Selects from '@/packages/selects'
import { formatNumber, pageLimit } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import useAxiosData from '@/store/useAxiosData'
import styles from './index.module.scss'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(() => {
  const { tr } = Translation({ ns: 'tipset' })
  const { theme, lang } = filscanStore
  const updateQuery = useUpdateQuery()
  const removeQueryParam = useRemoveQueryParam()
  const { axiosData, loading } = useAxiosData()
  const { isMobile } = useWindow()
  const { name, p } = useRouter().query
  // const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  })

  const headerOptions = useMemo(() => {
    return address_list.options.map((v) => {
      return { ...v, label: tr(v.label) }
    })
  }, [lang])

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
    load(current, method)
  }, [method, current])

  const load = async (cur?: number, method?: string) => {
    // setLoading(true);
    const showIndex = cur || current
    const method_name = method === 'all' ? '' : method
    const result: any = await axiosData(apiUrl.tipset_address, {
      index: showIndex - 1,
      limit: pageLimit,
      order: {
        field: method_name,
      },
    })
    // setLoading(false);
    const showData =
      result?.get_rich_account_list?.map((item: any, index: number) => {
        return { ...item, rank: pageLimit * (showIndex - 1) + index + 1 }
      }) || []
    setDataSource({
      data: showData,
      total: result?.total_count,
    })
  }

  const columns = useMemo(() => {
    const content = address_list.columns.map((v: any) => {
      if (isMobile) {
        if (v.dataIndex === 'rank') {
          v.render = (value: string, record: any, index: any) => {
            return <>{`No.${record.rank}`}</>
          }
        }
      }
      if (v.dataIndex === 'account_type') {
        return { ...v, title: tr(v.title), render: (text: string) => tr(text) }
      }
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
    <div className={classNames(styles['address-list'], 'main_contain')}>
      <div
        className={classNames(
          'flex items-center justify-between',
          styles['header-wrap'],
        )}
      >
        <div className="mx-2.5">
          <div className="font-HarmonyOS text-lg font-semibold ">
            {tr('address_list')}
          </div>
          <div className="text_des text-xs">
            {tr(address_list.total_list, {
              value: formatNumber(dataSource?.total || 0),
            })}
          </div>
        </div>
        <Selects
          className={classNames(styles.select)}
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

      <div className="card_shadow border_color  mt-4 rounded-xl	border p-5">
        <Table
          className="-mt-2.5 "
          data={dataSource.data}
          total={dataSource.total}
          current={current}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </div>
  )
})
