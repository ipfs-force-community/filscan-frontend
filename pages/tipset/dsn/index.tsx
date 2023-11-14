/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import useUpdateQuery from '@/components/hooks/useUpdateQuery'
import useRemoveQueryParam from '@/components/hooks/useRemoveQuery'
import Search from '@/components/search'
import { dsn_list } from '@/contents/tipset'
import Table from '@/packages/Table'
import { useFilscanStore } from '@/store/FilscanStore'
import { formatNumber, pageLimit } from '@/utils'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import useAxiosData from '@/store/useAxiosData'
import styles from './index.module.scss'
import classNames from 'classnames'

export default () => {
  const { tr } = Translation({ ns: 'tipset' })
  const { theme, lang } = useFilscanStore()
  const { axiosData, loading } = useAxiosData()
  const updateQuery = useUpdateQuery()

  const removeQueryParam = useRemoveQueryParam()
  const { p } = useRouter().query
  //const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('')
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
  })

  const current = useMemo(() => {
    if (p && typeof p === 'string') {
      return Number(p)
    }
    return 1
  }, [p])

  useEffect(() => {
    load(current)
  }, [current])

  const load = async (cur?: number, searching?: string) => {
    //setLoading(true);
    const showIndex = cur || current
    const input = searching || search
    const result: any = await axiosData(
      apiUrl.tipset_Dsn,
      {
        input,
        filters: {
          index: showIndex - 1,
          limit: pageLimit,
        },
      },
      { isCancel: false },
    )
    //setLoading(false);
    setDataSource({
      data: result?.market_deals_list || [],
      total: result?.total_count,
    })
  }

  const columns = useMemo(() => {
    const content = dsn_list.columns.map((v: any) => {
      return { ...v, title: tr(v.title) }
    })
    return content
  }, [theme, tr])

  const handleSearch = (search: string) => {
    setSearch(search)
    load(undefined, search)
  }

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
    <div className={classNames(styles['dsn-list'], 'main_contain')}>
      <div
        className={classNames(
          styles['list-header'],
          'mx-2.5 flex items-center justify-between',
        )}
      >
        <div>
          <div className="font-PingFang text-lg font-semibold">
            {tr('dsn_list')}
          </div>
          <div className="text_des text-xs">
            {tr(dsn_list.total_list, {
              value: formatNumber(dataSource?.total || 0),
            })}
          </div>
        </div>
        <Search
          className={classNames(styles.search, '!h-9 !w-[400px]')}
          placeholder={dsn_list.placeholder}
          onSearch={handleSearch}
          onClick={handleSearch}
          ns="tipset"
          suffix={<SearchOutlined />}
        />
      </div>

      <div className="card_shadow border_color mt-4  h-full rounded-xl	border p-5">
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
}
