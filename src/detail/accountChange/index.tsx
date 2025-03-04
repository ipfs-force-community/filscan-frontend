/** @format */

import { apiUrl } from '@/contents/apiUrl'
import Echarts from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { account_change } from '@/contents/detail'
import { getSvgIcon } from '@/svgsIcon'
import { formatDateTime, formatFil, formatFilNum } from '@/utils'
import { getColor, get_xAxis, seriesChangeArea } from '@/utils/echarts'
import { useEffect, useMemo, useState } from 'react'
import { BrowserView, MobileView } from '@/components/device-detect'
import classNames from 'classnames'
import styles from './index.module.scss'
import useWindow from '@/components/hooks/useWindown'
import useAxiosData from '@/store/useAxiosData'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'
export default observer(
  ({
    accountId,
    interval,
    list,
    header,
  }: {
    accountId?: string | string[]
    interval: string
    list?: Array<any>
    header?: JSX.Element
  }) => {
    const { theme, lang } = filscanStore
    const { tr } = Translation({ ns: 'detail' })
    const [options, setOptions] = useState<any>({})
    const { axiosData } = useAxiosData()
    const [noShow, setNoShow] = useState<Record<string, boolean>>({})
    const { isMobile } = useWindow()

    const color = useMemo(() => {
      return getColor(theme)
    }, [theme])

    const default_xAxis = useMemo(() => {
      return get_xAxis(theme, isMobile)
    }, [theme, isMobile])

    const defaultOptions = useMemo(() => {
      return {
        grid: {
          top: 10,
          left: 20,
          right: list ? 10 : '8%',
          bottom: 10,
          containLabel: true,
        },
        yAxis: {
          type: 'value',
          scale: true,
          nameTextStyle: {
            color: color.textStyle,
            align: 'left',
          },

          axisLine: {
            show: false,
          },

          axisTick: {
            show: false,
          },
          axisLabel: {
            show: true,
            lineStyle: {
              color: color.lineStyle,
            },
            textStyle: {
              color: isMobile ? color.mobileLabelColor : color.labelColor,
            },
            formatter(v: string) {
              return v + ' FIL'
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: color.splitLine,
            },
          },
        },
        tooltip: {
          trigger: 'axis',
          position: 'right',
          backgroundColor: color.toolbox,
          borderColor: 'transparent',
          textStyle: {
            color: '#ffffff',
          },
          formatter(p: Array<any>) {
            let result = p[0].data.showTime || p[0].name
            p.forEach((item: any, index: number) => {
              if (item.data) {
                result +=
                  '<br/>' +
                  item.marker +
                  tr(item.seriesName) +
                  ': ' +
                  item.data.amount +
                  ' ' +
                  item.data.unit
              }
            })
            return result
          },
        },
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, isMobile])

    useEffect(() => {
      if (accountId) {
        load()
      }
    }, [accountId, interval, isMobile])

    const load = async () => {
      const result: any = await axiosData(apiUrl.account_change, {
        account_id: accountId,
        filters: {
          interval: interval,
        },
      })
      const dateList: Array<string> = []
      const seriesObj: Record<string, any> = {
        balance: [], //当前余额
        available_balance: [], //可用余额
        initial_pledge: [], //扇区抵押，
        locked_funds: [], //锁仓奖励
      }
      const seriesData: any = []
      const legendData: any = []
      ;(result?.balance_trend_by_account_id_list || []).forEach((item: any) => {
        const {
          block_time,
          available_balance,
          balance,
          //precommit_deposits,
          locked_funds,
          initial_pledge,
        } = item
        let showTime: string =
          interval === '24h'
            ? formatDateTime(block_time, 'HH:mm')
            : formatDateTime(block_time, 'MM-DD HH:mm')

        if (isMobile && interval !== '24h') {
          showTime = formatDateTime(block_time, 'MM-DD')
        }
        dateList.push(showTime)
        const [balance_amount, balance_unit] = balance
          ? formatFilNum(balance, false, false, 4, false)?.split(' ')
          : []
        const [available_balance_amount, available_balance_unit] =
          available_balance
            ? formatFilNum(available_balance, false, false, 4, false)?.split(
                ' ',
              )
            : []
        //   const [precommit_deposits_amount, precommit_deposits_unit] =
        //     precommit_deposits
        //       ? formatFilNum(precommit_deposits, false, false, 4, false)?.split(' ')
        //       : [];
        const [locked_funds_amount, locked_funds_unit] = locked_funds
          ? formatFilNum(locked_funds, false, false, 4, false)?.split(' ')
          : []
        const [initial_pledge_amount, initial_pledge_unit] = initial_pledge
          ? formatFilNum(initial_pledge, false, false, 4, false)?.split(' ')
          : []
        if (available_balance) {
          seriesObj.available_balance.push({
            amount: available_balance_amount,
            value: formatFil(available_balance),
            unit: available_balance_unit,
            showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
          })
        }
        if (balance) {
          seriesObj.balance.push({
            amount: balance_amount,
            value: formatFil(balance),
            unit: balance_unit,
            showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
          })
        }
        if (initial_pledge) {
          seriesObj.initial_pledge.push({
            amount: initial_pledge_amount,
            value: formatFil(initial_pledge),
            unit: initial_pledge_unit,
            showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
          })
        }
        if (locked_funds) {
          seriesObj.locked_funds.push({
            amount: locked_funds_amount,
            value: formatFil(locked_funds),
            unit: locked_funds_unit,
            showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
          })
        }
      })
      ;(list || account_change.list).forEach((item: any) => {
        const dataIndex = item?.dataIndex
        let otherObj = {}
        if (item.seriesChangeArea) {
          otherObj = { ...seriesChangeArea }
        }
        legendData.push({
          dataIndex,
          color: item.color,
          title: item.title,
        })
        seriesData.push({
          ...otherObj,
          type: item.type,
          smooth: true,
          data: seriesObj[dataIndex],
          name: item.title,
          dataIndex,
          symbol: 'circle',
          itemStyle: {
            color: item.color,
          },
        })
      })
      setOptions({
        series: seriesData,
        xData: dateList,
        legendData: legendData,
      })
    }

    const newOptions = useMemo(() => {
      const newSeries: any = []
      ;(options?.series || []).forEach((seriesItem: any) => {
        if (!noShow[seriesItem?.dataIndex]) {
          newSeries.push(seriesItem)
        }
      })
      if (isMobile) {
        ;(defaultOptions as any).legend = {
          show: false,
        }
        ;(defaultOptions as any).grid.left = 0
        ;(defaultOptions as any).grid.right = '10px'
        ;(default_xAxis as any).axisLabel.padding = [0, 10, 0, 0]
      }
      return {
        ...defaultOptions,
        xAxis: {
          ...default_xAxis,
          data: options?.xData || [],
        },
        series: newSeries,
      }
    }, [options, default_xAxis, noShow, defaultOptions, isMobile])

    const ledRender = () => {
      if ((lang === 'en' || lang === 'ka') && isMobile) {
        return options?.legendData?.length > 1 ? (
          <span className={classNames('grid grid-cols-2 gap-2')}>
            {options?.legendData?.map((v: any) => {
              return (
                <span
                  className={classNames(
                    'flex cursor-pointer items-center gap-x-1 text-xs',
                    styles['legend-title-wrap'],
                  )}
                  key={v.dataIndex}
                  onClick={() => {
                    setNoShow({
                      ...noShow,
                      [v.dataIndex]: !noShow[v.dataIndex],
                    })
                  }}
                  style={{ color: noShow[v.dataIndex] ? '#d1d5db' : v.color }}
                >
                  {getSvgIcon('legendIcon')}
                  <span
                    className={classNames(
                      'text_des text-xs font-normal',
                      styles['legend-title'],
                    )}
                  >
                    {tr(v.title)}
                  </span>
                </span>
              )
            })}
          </span>
        ) : (
          <></>
        )
      }
      return options?.legendData?.length > 1 ? (
        <span className={classNames('mr-2.5 flex gap-x-4')}>
          {options?.legendData?.map((v: any) => {
            return (
              <span
                className={classNames(
                  'flex cursor-pointer items-center gap-x-1 text-xs',
                  styles['legend-title-wrap'],
                )}
                key={v.dataIndex}
                onClick={() => {
                  setNoShow({
                    ...noShow,
                    [v.dataIndex]: !noShow[v.dataIndex],
                  })
                }}
                style={{ color: noShow[v.dataIndex] ? '#d1d5db' : v.color }}
              >
                {getSvgIcon('legendIcon')}
                <span
                  className={classNames(
                    'text_des text-xs font-normal',
                    styles['legend-title'],
                  )}
                >
                  {tr(v.title)}
                </span>
              </span>
            )
          })}
        </span>
      ) : (
        <></>
      )
    }
    return (
      <div className="flex-1">
        {header ? (
          header
        ) : (
          <div
            className={classNames(
              'mb-2 flex  h-[32px] items-center justify-between',
            )}
          >
            <span className="name-height mx-2.5 mr-5 text-lg font-semibold">
              {tr(account_change.title)}
            </span>
            <BrowserView>{ledRender()}</BrowserView>
          </div>
        )}

        <div
          className={classNames(
            'card_shadow border_color w-full rounded-xl border p-2.5 pt-5',
            styles.echart,
          )}
        >
          <MobileView>
            <div className="tips mb-2">{ledRender()}</div>
          </MobileView>
          <div className="h-[348px] w-full">
            <Echarts options={newOptions} />
          </div>
        </div>
      </div>
    )
  },
)
