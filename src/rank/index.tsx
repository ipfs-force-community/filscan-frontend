/** @format */

import { useHash } from '@/components/hooks/useHash'
import { useEffect, useMemo, useState } from 'react'
import { getColumn, getDefaultSort, getMobileColumn } from '@/contents/rank'
import Table from '@/packages/Table'
import { apiUrl } from '@/contents/apiUrl'
import Header from './header'
import { formatFilNum, pageHomeLimit, pageLimit, unitConversion } from '@/utils'
import useAxiosData from '@/store/useAxiosData'
import classNames from 'classnames'
import styles from './index.module.scss'
import { BrowserView, MobileView } from '@/components/device-detect'
import Tb from '@/packages/mobile/table'
import useWindow from '@/components/hooks/useWindown'
import { MinerPowerRank } from '@/store/homeData'
import Progress from '@/packages/progress'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'
import { Translation } from '@/components/hooks/Translation'

const defaultFilter = {
  sector_size: 'all',
  interval: '24h',
}
const defaultData = {
  dataSource: [],
  total: 0,
}

export default observer(({ origin }: { origin: string }) => {
  const { hash } = useHash()
  const { isMobile } = useWindow()
  const { tr } = Translation({ ns: 'rank' })

  const { theme, lang } = filscanStore
  const [active, setActive] = useState('growth')
  const [progress, setProgress] = useState<any>({})
  const [data, setData] = useState({ ...defaultData })
  const [poolData, setPoolData] = useState({ ...defaultData })
  const [growthData, setGrowthData] = useState({ ...defaultData })
  const [rewardsData, setRewardsData] = useState({ ...defaultData })
  const [current, setCurrent] = useState(1)
  const [headerFilter, setHeaderFilter] = useState<any>()
  const [sort, setSort] = useState<any>({})
  const { axiosData, loading } = useAxiosData()

  useEffect(() => {
    const showHash = hash || 'growth'
    if (showHash === 'growth' || showHash === 'rewards') {
      setHeaderFilter({ ...defaultFilter })
    }
    setActive(showHash)
    setCurrent(1)
    setSort({})
    load(
      showHash,
      1,
      {
        field: getDefaultSort[showHash],
        order: 'descend',
      },
      defaultFilter,
    )
  }, [hash])

  const load = async (
    tab?: string,
    cur?: number,
    orders?: any,
    filter?: any,
  ) => {
    const showActive = tab || active
    if (showActive) {
      const index = cur || current
      const showOrder = orders ||
        (sort.field && sort) || {
          field: getDefaultSort[showActive],
          order: 'descend',
        }

      const showFilter = filter || headerFilter
      const linkUrl: any = `rank_${showActive}`
      const filters = showFilter
        ? {
            ...showFilter,
            sector_size:
              showFilter?.sector_size === 'all'
                ? null
                : showFilter?.sector_size || '',
          }
        : {}
      const data: any = await axiosData(apiUrl[linkUrl], {
        index: index - 1,
        limit: origin === 'home' ? pageHomeLimit : pageLimit,
        order: {
          field: showOrder.field,
          sort: showOrder.order === 'ascend' ? 'asc' : 'desc',
        },
        ...filters,
      })
      if (data) {
        const showData = data?.items || []
        if (
          showOrder.field === getDefaultSort[showActive] &&
          showOrder.order === 'descend' &&
          showActive !== 'rewards' &&
          index === 1
        ) {
          setProgress({
            ...progress,
            [showActive]:
              showData.length > 0
                ? showData[0][getDefaultSort[showActive]]
                : '',
          })
        }
        if (showActive === 'pool') {
          setPoolData({
            dataSource: showData,
            total: data?.total || 0,
          })
        } else if (showActive === 'growth') {
          setGrowthData({
            dataSource: showData,
            total: data?.total || 0,
          })
        } else if (showActive === 'rewards') {
          setRewardsData({
            dataSource: showData,
            total: data?.total || 0,
          })
        } else {
          setData({
            dataSource: showData,
            total: data?.total || 0,
          })
        }
      }
    }
  }

  const columns = useMemo(() => {
    const content: any = []
    getColumn(active, progress[active])
      .filter((item) => {
        if (isMobile) {
          return getMobileColumn(active)?.includes(item.dataIndex)
        }
        return true
      })
      .forEach((item) => {
        if (isMobile) {
          if (item.dataIndex === 'rank') {
            item.width = '15%'
            item.align = 'left'
          }
          if (item.dataIndex === 'miner_id') {
            item.width = '30%'
          }
          if (item.title === 'power_ratio') {
            item.align = 'right'
            item.width = '0'
            item.render = (value: any, render: MinerPowerRank) => {
              const left =
                100 - (Number(value) / Number(progress[active])) * 100
              return (
                <span className="flex justify-end gap-x-2">
                  <Progress left={left + '%'} />
                  <span>{unitConversion(value, 2) + '/D'}</span>
                </span>
              )
            }
          }

          if (item.dataIndex === 'quality_adj_power') {
            item.align = 'right'
            item.render = (text: string | number, record: any) => {
              const left = 100 - (Number(text) / Number(progress[active])) * 100
              return (
                <span className={classNames(styles['item-right-quality'])}>
                  <Progress left={left + '%'} />
                  <span>{unitConversion(record.quality_adj_power, 2)}</span>
                </span>
              )
            }
          }

          if (item.dataIndex === 'rewards') {
            item.align = 'right'
            item.render = (text: string, record: any) => {
              const showNum = formatFilNum(text, false, false, 2)
              const ratio = Number(record.rewards_ratio * 100).toFixed(2) + '%'
              return (
                <span className={classNames(styles['item-right-rewards'])}>
                  {`${showNum}/${ratio}`}
                </span>
              )
            }
          }

          if (item.dataIndex === 'pool_power') {
            item.align = 'right'
            item.render = (text: any, record: any) => {
              const left =
                100 -
                (Number(record.quality_adj_power) / Number(progress[active])) *
                  100
              return (
                <span className={styles['item-right-pool']}>
                  <Progress left={left + '%'} />
                  <span>{unitConversion(record.quality_adj_power, 2)}</span>
                </span>
              )
            }
          }
        }
        content.push({ ...item, title: tr(item.title) })
      })
    return content
  }, [active, progress[active], theme, tr])

  const handleHeaderChange = (type: string, value: string) => {
    let newActive = active
    let activeHeader = headerFilter
    if (type === 'active') {
      newActive = value
      setActive(value)
      setHeaderFilter({ ...defaultFilter })
      activeHeader = { ...defaultFilter }
    } else {
      activeHeader = {
        ...headerFilter,
        [type]: value,
      }
      setHeaderFilter(activeHeader)
    }

    setCurrent(1)
    load(newActive, 1, undefined, activeHeader)
  }

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let cur: number = pagination.current || current
    let order = { ...sort }
    if (sorter?.field) {
      if (sorter.order) {
        order = {
          field: sorter.field,
          order: sorter.order,
        }
      } else {
        order = {
          field: getDefaultSort[active],
          order: 'descend',
        }
      }
    }
    setCurrent(cur)
    setSort(order)
    load(active, cur, order)
  }

  const showData = useMemo(() => {
    if (active === 'provider') return data
    if (active === 'pool') return poolData
    if (active === 'growth') return growthData
    if (active === 'rewards') return rewardsData
    return data
  }, [active, data, poolData, growthData, rewardsData])

  return (
    <>
      <Header origin={origin} active={active} onChange={handleHeaderChange} />
      <div
        className={classNames(
          `mt-4 ${
            origin === 'home' ? 'h-[650px]' : ''
          } card_shadow border_color flex items-center rounded-xl border px-5 pt-5`,
          styles.table,
          styles.reset,
        )}
      >
        <MobileView>
          <Tb
            key={active}
            columns={columns}
            loading={loading}
            dataSource={showData.dataSource}
            total={showData.total}
            onChange={handleChange}
          />
        </MobileView>
        <BrowserView>
          <Table
            key={active}
            data={showData.dataSource}
            total={origin === 'home' ? 0 : showData.total}
            columns={columns}
            loading={loading}
            onChange={handleChange}
          />
        </BrowserView>
      </div>
    </>
  )
})
