/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import Table from '@/packages/Table'
import { formatNumber, pageLimit } from '@/utils'
import { useEffect, useMemo, useState } from 'react'
import useAxiosData from '@/store/useAxiosData'
import {
  nft_transfer_columns,
  token_transfer_columns,
} from '@/contents/contract'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(
  ({ id, type }: { id?: string | string[]; type: string }) => {
    const { theme } = filscanStore
    const { tr } = Translation({ ns: 'contract' })
    const { axiosData } = useAxiosData()
    const [data, setData] = useState({
      dataSource: [],
      total: 0,
    })
    const [loadingTable, setTableLoading] = useState<boolean>(false)
    const [current, setCurrent] = useState(1)
    const [fromList, setFrom] = useState({})
    const [toList, setTo] = useState({})

    useEffect(() => {
      if (id) {
        load()
      }
    }, [id, type])

    const load = async (cur?: number) => {
      setTableLoading(true)
      const index = cur || current
      const axiosUrl =
        type === 'nfts'
          ? apiUrl.contract_NFTTransfers
          : apiUrl.contract_ERC20Transfer
      const result = await axiosData(axiosUrl, {
        contract_id: id,
        contract: id,
        page: index - 1,
        limit: pageLimit,
      })
      setTableLoading(false)
      setData({
        dataSource: result?.items || [],
        total: result?.total || 0,
      })
      if (result?.items && result.items.length > 0) {
        const formItems = result?.items.map((v: any) => v.from)
        const toItems = result?.items.map((v: any) => v.to)
        loadFnsUrl(formItems, 'form')
        loadFnsUrl(toItems, 'to')
      }
    }

    const loadFnsUrl = async (items: Array<any>, type: string) => {
      if (items.length > 0) {
        const fnsData = await axiosData(`${apiUrl.contract_fnsUrl}`, {
          addresses: items,
        })
        if (type === 'form') {
          setFrom(fnsData)
        } else {
          setTo(fnsData)
        }
      }
    }

    const columns = useMemo(() => {
      const newColumns =
        type === 'nfts' ? nft_transfer_columns : token_transfer_columns
      return newColumns(fromList, toList).map((v) => {
        return { ...v, title: tr(v.title) }
      })
    }, [theme, tr, fromList, toList])

    const handleChange = (pagination: any, filters?: any, sorter?: any) => {
      let cur: number = pagination.current || current
      setCurrent(cur)
      load(cur)
    }

    return (
      <>
        <span className="text_des ml-2.5 text-sm">
          {tr('transfer_total', { value: formatNumber(data?.total || 0) })}
        </span>
        <div className="card_shadow border_color mt-2.5 min-h-[260px] rounded-xl border p-5 ">
          <Table
            data={data.dataSource}
            total={data.total}
            columns={columns}
            loading={loadingTable}
            onChange={handleChange}
          />
        </div>
      </>
    )
  },
)
