/** @format */

import { BrowserView, MobileView } from '@/components/device-detect'
import Echarts from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { account_balance } from '@/contents/detail'
import SkeletonScreen from '@/packages/skeleton'
import { formatFilNum, getShowData } from '@/utils'
import { getColor } from '@/utils/echarts'
import { useEffect, useMemo, useState } from 'react'
import styles from './index.module.scss'
import { getSvgIcon } from '@/svgsIcon'
import Tooltip from '@/packages/tooltip'
import useWindow from '@/components/hooks/useWindown'
import classNames from 'classnames'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

export default observer(
  ({ data, loading }: { data: any; loading: boolean }) => {
    const { theme, lang } = filscanStore
    const { tr } = Translation({ ns: 'detail' })
    const { isMobile } = useWindow()

    const [options, setOptions] = useState<any>({})
    const [noShow, setNoShow] = useState<Record<string, boolean>>({})

    const color = useMemo(() => {
      return getColor(theme)
    }, [theme])

    const defaultOptions: any = useMemo(() => {
      return {
        grid: {
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        tooltip: {
          trigger: 'item',
          backgroundColor: color.toolbox,
          borderColor: 'transparent',
          textStyle: {
            color: '#ffffff',
          },
          formatter(v: any) {
            const { name, value } = v
            return `${v.marker} ${tr(name)}: ${formatFilNum(value)}`
          },
          position: 'right',
        },
        legend: {
          show: false,
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '68%'],
            //  radius: ['40%', '48%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              fontSize: 16,
              rich: {
                dark: {
                  color: '#000',
                },
                color: {
                  color: '#309cfe',
                },
              },
            },
            data: [],
            center: ['55%', '48%'],
          },
        ],
      }
    }, [theme])

    useEffect(() => {
      const seriesData: any = []
      const legendData: any = []
      account_balance.list.forEach((item: any) => {
        const showData = getShowData(item, data)
        const value = (showData && showData[item.dataIndex]) || '--'
        if (value !== '--') {
          const [showValue, showUnit] = value.split(' ')
          legendData.push({
            showValue: showValue,
            unit: showUnit,
            value,
          })
        } else {
          legendData.push({
            unit: 'autoFil',
            value,
          })
        }
        seriesData.push({
          value,
          dataIndex: item.dataIndex,
          name: item.dataIndex,
          itemStyle: {
            color: item.color,
          },
        })
      })
      setOptions({
        series: seriesData,
        legendData: legendData,
      })
    }, [data])

    const newOptions = useMemo(() => {
      const newOpt = { ...defaultOptions }
      const newSeries: any = []
      ;(options?.series || []).forEach((v: any) => {
        if (!noShow[v.dataIndex]) {
          newSeries.push(v)
        }
      })
      if (isMobile) {
        newOpt.series[0].radius = ['45%', '80%']
        newOpt.series[0].center = ['50%', '50%']
        newOpt.tooltip.position = ['50%', '50%']
        newOpt.tooltip.formatter = (v: any) => {
          const { name, value } = v
          return `${v.marker} ${tr(name)}:\n <div>${formatFilNum(value)}</div>`
        }
      }
      newOpt.series[0].data = newSeries

      return newOpt
    }, [options, defaultOptions, noShow])

    const renderTotal = () => {
      return (
        <div className="flex flex-col gap-x-1">
          <span
            className={classNames(
              'text_des flex items-center gap-x-2 text-sm',
              styles['title-label'],
            )}
          >
            {tr(account_balance.title)}
            <Tooltip context={tr('total_balance_tip')} />
          </span>
          <span
            className={classNames(
              'text_clip font-HarmonyOS_Bold text-xl',
              styles['title-value'],
            )}
          >
            {loading ? (
              <SkeletonScreen />
            ) : data?.balance ? (
              formatFilNum(data?.balance, false, false, 4)
            ) : (
              '--'
            )}
          </span>
        </div>
      )
    }

    const renderBalance = () => {
      return (
        <ul className="account-balance mt-12 flex flex-wrap justify-between gap-y-6">
          {account_balance.list.map((balance_item: any) => {
            const value = data[balance_item.dataIndex]
            return (
              <li
                className="flex-0 account-balance-item flex w-full items-center"
                key={balance_item.dataIndex}
              >
                <span
                  className="text_des flex min-w-[100px] cursor-pointer items-center gap-x-1 text-sm"
                  onClick={() => {
                    setNoShow({
                      ...noShow,
                      [balance_item.dataIndex]: !noShow[balance_item.dataIndex],
                    })
                  }}
                >
                  <span
                    className="flex h-[5px] w-[5px] rounded-full"
                    style={{
                      backgroundColor: noShow[balance_item.dataIndex]
                        ? '#d1d5db'
                        : balance_item.color,
                    }}
                  />
                  <Tooltip context={tr(balance_item.title_tip)} icon={false}>
                    <span
                      className={classNames(
                        'flex items-center gap-x-1',
                        styles['legend-title'],
                      )}
                    >
                      {tr(balance_item.title)}
                      {getSvgIcon('tip')}
                    </span>
                  </Tooltip>
                </span>
                <span className="ml-5 font-HarmonyOS_Medium text-sm  font-medium">
                  {loading ? (
                    <SkeletonScreen />
                  ) : value ? (
                    formatFilNum(value, false, false, 4)
                  ) : (
                    '--'
                  )}
                </span>
              </li>
            )
          })}
        </ul>
      )
    }

    return (
      <>
        <BrowserView>
          <div className="flex h-[280px] w-1/2 p-5">
            <div className="flex-1">
              {renderTotal()}
              {renderBalance()}
            </div>
            <div className="h-[280px] flex-1 ">
              <Echarts options={newOptions} />
            </div>
          </div>
        </BrowserView>

        <MobileView>
          <div className={styles['account-balance']}>
            <div className={styles.title}>{renderTotal()}</div>
            <div className={styles.chart}>
              <Echarts options={newOptions} />
            </div>
            <div className={styles.info}>{renderBalance()}</div>
          </div>
        </MobileView>
      </>
    )
  },
)
