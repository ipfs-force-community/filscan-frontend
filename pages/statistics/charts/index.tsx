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
import { Anchor, Col, Row } from 'antd'
import { useMemo, useRef } from 'react'
import { AnchorLinkItemProps } from 'antd/es/anchor/Anchor'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(() => {
  const { hash } = useHash()
  const { headerShow } = filscanStore
  console.log('----33', headerShow)
  const { tr } = Translation({ ns: 'static' })
  const rightRef = useRef<HTMLDivElement>(null)
  const items: any = useMemo(() => {
    const newItems: Array<null> = []
    chartsNav.forEach((item: any) => {
      const obj: any = {
        key: item.key,
        href: `#${item.key}`,
        title: (
          <span className={styles['statistics-author-title']}>
            {item.preIcon && getSvgIcon(item.preIcon)}
            {tr(item?.title)}
          </span>
        ),
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
    <div className={`main_contain ${styles['statistics-charts']}`}>
      <div className={styles['statistics-charts-main']}>
        <div
          className={`${styles['statistics-charts-left']} ${
            headerShow ? '' : ''
          }`}
        >
          <div className={styles['statistics-charts-title']}>
            <span>{tr('static_overview')}</span>
          </div>
          <Anchor
            items={items}
            className={`custom_anchor ${headerShow ? '' : ''}`}
            showInkInFixed={false}
            // getContainer={() => {
            //   if (rightRef.current) {
            //     return rightRef.current
            //   }
            //   return window
            // }}
          />
        </div>
        <div className={styles['statistics-charts-right']} ref={rightRef}>
          {hash === 'networks' && <Meta />}
          {hash.startsWith('fevm') && (
            <>
              <div id="fevm_trend">
                <ContractTrend />
              </div>
              <div id="fevm_con">
                <ContractCon />
              </div>
              <div id="fevm_addr">
                <ContractAddr />
              </div>
              <div id="fevm_gas">
                <ContractGas />
              </div>
              <div id="fevm_balance">
                <ContractBalance />
              </div>
            </>
          )}
          {hash.startsWith('blockChain') && (
            <>
              <div id="blockChain_power">
                <PowerTrend />
              </div>
              <div id="blockChain_cc_dc_power">
                <DCCTrend />
              </div>
              <div id="blockChain_trend">
                <BlockRewardTrend />
              </div>
              <div id="blockChain_reward_per">
                <BlockRewardPer />
              </div>
              <div id="blockChain_nodes">
                <ActiveNodeTrend />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
})
