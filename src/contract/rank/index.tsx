/** @format */

import { apiUrl } from '@/contents/apiUrl'
import { Translation } from '@/components/hooks/Translation'
import { contract_rank, homeContractRank } from '@/contents/contract'
import Table from '@/packages/Table'
import fetchData from '@/store/server'
import { useEffect, useMemo, useState } from 'react'
import VerifySvg from '@/assets/images/verify.svg'
import GoIcon from '@/assets/images/black_go.svg'
import Link from 'next/link'
import {
  formatDateTime,
  formatNumber,
  isIndent,
  pageHomeLimit,
  pageLimit,
} from '@/utils'
import useWindow from '@/components/hooks/useWindown'
import Copy from '@/components/copy'
import { BrowserView, MobileView } from '@/components/device-detect'
import styles from './index.module.scss'
import classNames from 'classnames'
import CopySvgMobile from '@/assets/images/icon-copy.svg'

import { cloneDeep } from 'lodash'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'
import TextTooltip from '@/packages/textTooltip'
const default_sort = {
  field: 'transfer_count',
  order: 'descend',
}
export default observer(({ origin }: { origin?: string }) => {
  const { tr } = Translation({ ns: 'contract' })
  const { theme, lang } = filscanStore
  const [loading, setLoading] = useState(false)
  const [current, setCurrent] = useState(1)
  const [sort, setSort] = useState<any>({ ...default_sort })
  const { isMobile } = useWindow()
  const [dataSource, setDataSource] = useState({
    data: [],
    total: undefined,
    update_time: '',
  })

  useEffect(() => {
    load()
  }, [])

  const load = async (cur?: number, orders?: any) => {
    const index = cur || current
    const sortFile = orders || sort
    setLoading(true)
    const data: any = await fetchData(apiUrl.contract_rank, {
      page: index - 1,
      limit: origin === 'home' ? pageHomeLimit : pageLimit,
      sort: sortFile.order === 'ascend' ? 'asc' : 'desc',
      field: sortFile?.field,
    })
    setLoading(false)
    setDataSource({
      data: data?.evm_contract_list || [],
      total: data?.total,
      update_time: data?.update_time || '',
    })
  }

  const columns = useMemo(() => {
    const newArr =
      origin === 'home'
        ? contract_rank.columns.slice(0, 5)
        : cloneDeep(contract_rank.columns)
    let content = newArr
      .filter((value) => {
        if (isMobile) {
          return value.dataIndex !== 'contract_address'
        }
        return true
      })
      .map((item) => {
        if (isMobile && item.dataIndex === 'rank') {
          //@ts-ignore
          item.title = (value: string, record: any, index) => {
            return <div>{`#${record?.rank}`}</div>
          }

          item.render = (value: any, record: any) => {
            if (!record?.contract_address) return '--'
            return (
              <span className="flex items-center gap-x-2">
                <BrowserView>
                  <Link
                    className="link_text"
                    href={`/address/${record?.contract_address}`}
                  >
                    {isIndent(record?.contract_address, 5, 4)}
                  </Link>
                  <Copy text={record?.contract_address} />
                </BrowserView>
                <span className="copy-row">
                  <Link
                    className="link_text"
                    href={`/address/${record?.contract_address}`}
                  >
                    {isIndent(record?.contract_address, 5, 4)}
                  </Link>
                  <Copy
                    text={record?.contract_address}
                    icon={<CopySvgMobile />}
                    className="copy"
                  />
                </span>
              </span>
            )
          }
        }
        if (item.dataIndex === 'contract_name') {
          item.render = (text: string, record: any) => {
            if (text) {
              return (
                <div className="flex w-fit items-center gap-x-1">
                  <Link href={`/address/${record.contract_address}`}>
                    <div
                      className={
                        origin === 'home' && !isMobile ? 'noWarp_table' : ''
                      }
                    >
                      <TextTooltip text={text} />
                    </div>
                  </Link>
                  <VerifySvg width={13} height={14} />
                </div>
              )
            }
            return (
              <Link
                href="/contract/verify"
                className="text_color h-[32px] w-fit"
              >
                <div
                  className={
                    origin === 'home' && !isMobile ? 'noWarp_table' : ''
                  }
                >
                  <TextTooltip text={tr('ver_address')} />
                </div>
              </Link>
            )
          }
        }

        return {
          ...item,
          title: typeof item.title === 'string' ? tr(item.title) : item.title,
          width:
            origin === 'home' ? homeContractRank[item.dataIndex] : item.width,
        }
      })
    return content
  }, [theme, tr, isMobile])

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current
    let order = { ...sort }
    if (sorter?.field) {
      order = {
        field: sorter.field,
        order: sorter.order,
      }
    }
    setCurrent(cur)
    setSort(order)
    load(cur, order)
  }

  return (
    <>
      <MobileView>
        <div
          className={classNames(
            'font-HarmonyOS text-lg font-semibold',
            styles.title,
          )}
        >
          {tr('contract_rank')}
        </div>
        <div
          className={classNames(
            'text_des text-xs ',
            styles['title-description'],
          )}
        >
          {tr('contract_list_total', {
            value: formatNumber(dataSource?.total || 0),
          })}
        </div>
      </MobileView>
      <BrowserView>
        <div className={`flex h-[30px] items-center justify-between`}>
          <div className="pl-2.5 font-HarmonyOS text-lg	font-semibold">
            {tr('contract_rank')}
            {origin !== 'home' && (
              <span className="text_des ml-2 text-xs font-normal">
                {tr(contract_rank.title_des, {
                  value: formatDateTime(
                    dataSource.update_time,
                    'YYYY-MM-DD HH:mm',
                  ),
                })}
              </span>
            )}
          </div>
          {origin === 'home' && (
            <Link className="pr-2.5" href={`/contract/rank`}>
              <GoIcon className="cursor-pointer " width={18} height={18} />
            </Link>
          )}
        </div>
        {origin !== 'home' && (
          <div className="text_des mx-2.5 text-xs">
            {' '}
            {tr('contract_list_total', {
              value: formatNumber(dataSource?.total || 0),
            })}
          </div>
        )}
      </BrowserView>
      <div
        className={classNames(
          `card_shadow border_color  mt-4 rounded-xl	border p-5 ${
            origin === 'home' ? 'h-[580px] ' : 'h-full'
          }`,
          styles.reset,
          styles.table,
        )}
      >
        <Table
          key="contract_rank"
          className="-mt-2.5 "
          total={origin !== 'home' ? dataSource.total : 0}
          data={dataSource?.data || []}
          columns={columns || []}
          loading={loading}
          onChange={handleChange}
        />
      </div>
    </>
  )
})
