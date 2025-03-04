/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import { ercToken_list } from '@/contents/detail'
import Table from '@/packages/Table'
import { formatNumber, pageLimit } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import useAxiosData from '@/store/useAxiosData'
import { BrowserView } from '@/components/device-detect'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(
  ({
    accountId,
    total,
    methodName,
  }: {
    accountId?: string | string[]
    total: (num: number) => void
    methodName?: string
  }) => {
    const { theme, lang } = filscanStore
    const { tr } = Translation({ ns: 'detail' })
    const [loadingTable, setTableLoading] = useState(false)
    const { axiosData, loading } = useAxiosData()
    const [data, setData] = useState({
      dataSource: [],
      total: 0,
    })
    const [current, setCurrent] = useState(1)
    const [fromList, setFrom] = useState({})
    const [toList, setTo] = useState({})

    const columns = useMemo(() => {
      return ercToken_list(fromList, toList).map((v) => {
        return { ...v, title: tr(v.title) }
      })
    }, [theme, tr, fromList, toList])

    useEffect(() => {
      if (accountId) {
        load()
      }
    }, [accountId, methodName])

    useEffect(() => {
      total(data.total)
    }, [data])

    const load = async (cur?: number) => {
      setTableLoading(true)
      const showIndex = cur || current
      const result: any = await axiosData(apiUrl.contract_ERC20Transfers, {
        address: accountId,
        filters: {
          page: showIndex - 1,
          limit: pageLimit,
        },
        token_name: methodName === 'all' ? '' : methodName,
      })
      setTableLoading(false)
      const showList = result?.items || []
      setData({
        dataSource: showList,
        total: result?.total,
      })
      if (showList.length > 0) {
        const formItems = showList.map((v: any) => v.from)
        const toItems = showList.map((v: any) => v.to)
        loadFnsUrl(formItems, 'form')
        loadFnsUrl(toItems, 'to')
      }
    }

    const loadFnsUrl = async (items: Array<any>, type: string) => {
      if (items.length > 0) {
        const fnsData = await axiosData(
          `${apiUrl.contract_fnsUrl}`,
          {
            addresses: items,
          },
          { loading: false },
        )
        if (type === 'form') {
          setFrom(fnsData)
        } else {
          setTo(fnsData)
        }
      }
    }

    const handleChange = (pagination: any, filters?: any, sorter?: any) => {
      let cur: number = pagination.current || current
      setCurrent(cur)
      load(cur)
    }
    return (
      <>
        <BrowserView>
          <span className="text_des absolute -top-5 text-xs">
            {tr('erc20_transfer_total', { value: formatNumber(data.total) })}
          </span>
        </BrowserView>
        <Table
          key="list_token"
          data={data.dataSource}
          total={data.total}
          columns={columns}
          loading={loading}
          onChange={handleChange}
        />
      </>
    )
  },
)
