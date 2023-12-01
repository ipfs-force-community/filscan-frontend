import Table from '@/packages/mobile/table'
import styles from './index.module.scss'
import { useEffect, useMemo, useState } from 'react'
import { getColumn, mobileRankList, rank_header } from '@/contents/rank'
import { ColumnType } from 'antd/es/table'
import {
  DefiProtocol,
  MinerPowerRank,
  MinerPowerRankData,
} from '@/store/homeData'
import homeStore from '@/store/modules/home'
import { useTranslation } from 'react-i18next'
import Progress from '@/packages/progress'
import { unitConversion } from '@/utils'
import { observer } from 'mobx-react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

interface Sort {
  field: string
  order: string
}

const Rank = () => {
  const [sort, setSort] = useState<Sort>({
    field: 'power_ratio',
    order: 'descend',
  })
  const { t } = useTranslation('rank')
  const router = useRouter()
  const columns = useMemo(() => {
    return getColumn('growth', '').filter((item) => {
      if (item.dataIndex === 'rank') {
        item.width = '15%'
        item.align = 'left'
        item.render = (text: string) => (
          <span className={classNames('rank_icon', styles['rank-icon'])}>
            {text}
          </span>
        )
      }
      if (item.dataIndex === 'miner_id') {
        item.width = '30%'
      }
      if (item.title === 'power_ratio') {
        item.align = 'right'
        item.width = '0'
        item.render = (value: any, render: MinerPowerRank) => {
          const left = 100 - (Number(value) / Number(homeStore.maxPower)) * 100
          const showLeft = left > 100 ? 100 : left

          return (
            <span className="flex items-center justify-end gap-x-2">
              <Progress left={left + '%'} />
              <span>{unitConversion(value, 2) + '/D'}</span>
            </span>
          )
        }
      }
      item.title = t(item.title)
      return mobileRankList.includes(item.dataIndex)
    }) as ColumnType<MinerPowerRank>[]
  }, [t])

  useEffect(() => {
    load()
  }, [sort])

  const load = () => {
    homeStore.fetchMinerPowerRank({
      index: 1,
      limit: 10,
      interval: '24h',
      order: {
        sort: sort.order === 'ascend' ? 'asc' : 'desc',
        field: sort.field,
      },
      sector_size: null,
    })
  }

  const handleChange = (pagination: any, filters?: any, sorter?: any) => {
    let order = { ...sort }
    if (sorter?.field) {
      if (sorter.order) {
        order = {
          field: sorter.field,
          order: sorter.order,
        }
      } else {
        order = {
          field: 'power_ratio',
          order: 'descend',
        }
      }
    }
    setSort(order)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.title}>{t('growth')}</div>
      <div className={styles.content}>
        <Table
          onChange={handleChange}
          columns={columns}
          dataSource={homeStore.minerPowerRankData?.items}
          pagination={false}
        ></Table>
        <div
          onClick={() => {
            router.push('/rank#growth')
          }}
          className="text-mobile-text-warning font-HarmonyOS_Medium flex h-[45px] items-center justify-center text-[13px]"
        >
          {t('see_more')}
        </div>
      </div>
    </div>
  )
}

export default observer(Rank)
