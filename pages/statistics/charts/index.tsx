import { Translation } from '@/components/hooks/Translation'
import { useHash } from '@/components/hooks/useHash'
import { chartsNav } from '@/contents/statistic'
import { Menu_Info } from '@/contents/type'
import { getSvgIcon } from '@/svgsIcon'
import PowerTrend from '@/src/statistics/Trend'
import BlockRewardTrend from '@/src/statistics/BlockRewardTrend'
import BlockRewardPer from '@/src/statistics/BlockRewardPer'
import ActiveNodeTrend from '@/src/statistics/ActiveNodeTrend'
import Link from 'next/link'
import FilChart from '@/src/statistics/FilChart'
import Charts from '@/src/statistics/Charts'
import DCCTrend from '@/src/statistics/DCCTrend'
import classNames from 'classnames'
import { BrowserView, MobileView } from '@/components/device-detect'
import Meta from '@/src/statistics/Meta'
import styles from './index.module.scss'
import ContractTrend from '@/src/statistics/ContractTrend'
import ContractGas from '@/src/statistics/contractGas'
import ContractAddr from '@/src/statistics/contractAddr'
import ContractCon from '@/src/statistics/contractCon'
import ContractBalance from '@/src/statistics/ContractBanlace'
import { Anchor } from 'antd'
import { useMemo } from 'react'
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor'

export default () => {
  const { tr } = Translation({ ns: 'static' })
  const items: any = useMemo(() => {
    const newItems: Array<null> = []
    chartsNav.forEach((item: any) => {
      const obj: any = {
        key: item.key,
        href: `#${item.key}`,
        title: tr(item?.title),
      }
      if (item.children) {
        obj.children = item?.children?.map((v: any) => {
          return {
            key: v.key,
            href: `#${v.key}`,
            title: tr(v?.title),
          }
        })
      }
      newItems.push(obj)
    })
    return newItems
  }, [tr])
  return (
    <div className={styles['statistics-charts']}>
      <div className={styles['statistics-charts_left']}>
        <Anchor items={items} />
      </div>
      <div className={styles['statistics-charts_right']}></div>
    </div>
  )
}
