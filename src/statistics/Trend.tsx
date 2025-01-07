/** @format */
import { apiUrl } from '@/contents/apiUrl'
import EChart from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { power_trend } from '@/contents/statistic'
import { getSvgIcon } from '@/svgsIcon'
import { formatDateTime, unitConversion } from '@/utils'
import { getColor, get_xAxis } from '@/utils/echarts'
import GoIcon from '@/assets/images/black_go.svg'
import GoMobileIcon from '@/assets/images/icon-right-white.svg'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import useObserver from '@/components/hooks/useObserver'
import styles from './trend.module.scss'
import classNames from 'classnames'
import { BrowserView, MobileView } from '@/components/device-detect'
import useAxiosData from '@/store/useAxiosData'
import useWindow from '@/components/hooks/useWindown'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'
interface Props {
  origin?: string
  className?: string
}

export default observer((props: Props) => {
  const { origin, className } = props
  const { theme, lang } = filscanStore
  const { tr } = Translation({ ns: 'static' })
  const ref = useObserver()
  const { axiosData } = useAxiosData()
  const [noShow, setNoShow] = useState<Record<string, boolean>>({})
  const [options, setOptions] = useState<any>({})
  const { isMobile } = useWindow()
  const color = useMemo(() => {
    return getColor(theme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme])

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme, isMobile)
  }, [theme, isMobile])

  const defaultOptions = useMemo(() => {
    let options = {
      grid: {
        top: 30,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true,
      },
      yAxis: [
        {
          type: 'value',
          position: 'left',
          scale: true,
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: '{value} EiB',
            textStyle: {
              //  fontSize: this.fontSize,
              color: isMobile ? color.mobileLabelColor : color.labelColor,
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: color.splitLine,
            },
          },
        },
        {
          type: 'value',
          position: 'right',
          scale: true,
          nameTextStyle: {
            color: color.textStyle,
          },
          axisLabel: {
            formatter: '{value} PiB',
            textStyle: {
              //  fontSize: this.fontSize,
              color: isMobile ? color.mobileLabelColor : color.labelColor,
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: color.splitLine,
            },
          },
        },
      ],
      legend: {
        show: false,
      },
      tooltip: {
        //@ts-ignore
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = { top: 80 }
          //@ts-ignore
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5
          return isMobile ? obj : undefined
        },
        trigger: 'axis',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          var result = v[0].data.showTime
          v.forEach((item: any) => {
            if (item.data) {
              result +=
                '<br/>' +
                item.marker +
                tr(item.seriesName) +
                ': ' +
                item.data.amount +
                item.data.unit
            }
          })
          return result
        },
      },
    }
    if (isMobile) {
      ;(options as any)['grid'] = {
        top: '16px',
        right: '12px',
        bottom: '16px',
        left: '12px',
        containLabel: true,
      }
    }
    return options
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, isMobile])

  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const seriesObj: any = {}
    power_trend.list.forEach((v) => {
      seriesObj[v.dataIndex] = []
    })
    const dateList: any = []
    const legendList: any = []
    const seriesData: any = []
    const result: any = await axiosData(apiUrl.line_trend, { interval: '1m' })
    result?.list?.forEach((value: any) => {
      const {
        timestamp,
        total_raw_byte_power, //原值算力
        total_quality_adj_power, //有效算力
        power_increase, //算力增长
        power_decrease, //环比有效算力
      } = value

      const showTime = formatDateTime(timestamp, 'MM-DD')
      dateList.push(showTime)
      //amount
      const [total_raw_byte_power_amount, total_raw_byte_power_unit] =
        total_raw_byte_power &&
        unitConversion(total_raw_byte_power, 2)?.split(' ')

      const [power_increase_amount, power_increase_unit] =
        power_increase && unitConversion(power_increase, 2)?.split(' ')

      const [total_quality_adj_power_amount, total_quality_adj_power_unit] =
        total_quality_adj_power &&
        unitConversion(total_quality_adj_power, 2)?.split(' ')

      const [power_decrease_amount, power_decrease_unit] =
        power_decrease && unitConversion(power_decrease, 2)?.split(' ')

      seriesObj.total_raw_byte_power.push({
        amount: total_raw_byte_power_amount,
        value: unitConversion(total_raw_byte_power, 2, 6).split(' ')[0],
        unit: total_raw_byte_power_unit,
        showTime: formatDateTime(timestamp, 'YYYY-MM-DD HH:mm'),
      })

      seriesObj.total_quality_adj_power.push({
        amount: total_quality_adj_power_amount,
        showTime: formatDateTime(timestamp, 'YYYY-MM-DD HH:mm'),
        value: unitConversion(total_quality_adj_power, 2, 6).split(' ')[0],
        unit: total_quality_adj_power_unit,
      })
      seriesObj.power_increase.push({
        amount: power_increase_amount,
        showTime: formatDateTime(timestamp, 'YYYY-MM-DD HH:mm'),
        value: unitConversion(power_increase, 2, 5).split(' ')[0],
        unit: power_increase_unit,
      })
      seriesObj.power_decrease.push({
        amount: power_decrease_amount,
        value: unitConversion(power_decrease, 2, 5).split(' ')[0],
        showTime: formatDateTime(timestamp, 'YYYY-MM-DD HH:mm'),
        unit: power_decrease_unit,
      })
    })
    power_trend.list.forEach((item: any) => {
      legendList.push({
        name: item.dataIndex,
        color: item.color,
        type: item.type,
      })
      seriesData.push({
        type: item.type,
        data: seriesObj[item.dataIndex],
        key: item.dataIndex,
        name: item.dataIndex,
        yAxisIndex: item.yIndex,
        symbol: 'circle',
        smooth: true,
        itemStyle: {
          color: item.color,
        },
        barMaxWidth: '30',
      })
    })
    setOptions({ series: seriesData, xData: dateList, legendData: legendList })
  }

  const newOptions = useMemo(() => {
    const newSeries: any = []
    ;(options?.series || []).forEach((seriesItem: any) => {
      if (!noShow[seriesItem?.name]) {
        newSeries.push(seriesItem)
      }
    })
    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: options?.xData || [],
      },
      series: newSeries,
    }
  }, [options, defaultOptions, noShow])

  const propsRef = origin === 'home' ? { ref } : {}

  return (
    <div
      //id='power'
      className={classNames(
        styles.trend,
        `h-[full] w-full  ${className} ${origin === 'home' ? 'mt-20' : ''}`,
      )}
      {...propsRef}
    >
      <div
        className={classNames(
          `mb-2.5 flex min-h-[36px] flex-wrap items-center justify-between ${
            lang === 'en' ? 'h-[60px]' : ''
          }`,
          styles['title-wrap'],
        )}
      >
        <div className="flex flex-1 flex-row flex-wrap items-center">
          <div
            className={classNames(
              'w-fit pl-2.5 font-HarmonyOS text-lg font-semibold',
              styles.title,
            )}
          >
            {tr('power')}
          </div>
          <div className="w-fit">
            <BrowserView>
              <span className="ml-5 flex gap-x-4">
                {options?.legendData?.map((v: any) => {
                  return (
                    <span
                      className="flex cursor-pointer items-center gap-x-1 text-xs"
                      key={v.name}
                      onClick={() => {
                        setNoShow({ ...noShow, [v.name]: !noShow[v.name] })
                      }}
                      style={{ color: noShow[v.name] ? '#d1d5db' : v.color }}
                    >
                      {getSvgIcon(
                        v.type === 'bar' ? 'barLegend' : 'legendIcon',
                      )}
                      <span className="text_des text-xs font-normal">
                        {tr(v.name)}
                      </span>
                    </span>
                  )
                })}
              </span>
            </BrowserView>
          </div>
        </div>
        {origin === 'home' && (
          <Link href={`/statistics/charts#blockChain`}>
            <MobileView>
              <GoMobileIcon width={28} height={28} />
            </MobileView>
            <BrowserView>
              <GoIcon
                width={18}
                height={18}
                className="mr-2.5 cursor-pointer"
              />
            </BrowserView>
          </Link>
        )}
      </div>

      <BrowserView>
        <div
          className={`card_shadow border_color h-[350px] w-full rounded-xl border pb-2`}
        >
          <EChart options={newOptions} />
        </div>
      </BrowserView>
      <MobileView>
        <div
          className={classNames(
            `card_shadow border_color w-full rounded-xl border pb-2`,
            styles['chart-wrap'],
          )}
        >
          {(() => {
            if ((lang === 'en' || lang === 'ka') && isMobile) {
              return (
                <span
                  className={classNames(
                    'chart-legend grid grid-cols-2 gap-2',
                    styles.legend,
                  )}
                >
                  {options?.legendData?.map((v: any) => {
                    return (
                      <span
                        className="flex cursor-pointer items-center gap-x-1 text-xs"
                        key={v.name}
                        onClick={() => {
                          setNoShow({ ...noShow, [v.name]: !noShow[v.name] })
                        }}
                        style={{ color: noShow[v.name] ? '#d1d5db' : v.color }}
                      >
                        {getSvgIcon(
                          v.type === 'bar' ? 'barLegend' : 'legendIcon',
                        )}
                        <span
                          className={classNames(
                            'text_des text-xs font-normal',
                            styles.value,
                          )}
                        >
                          {tr(v.name)}
                        </span>
                      </span>
                    )
                  })}
                </span>
              )
            }
            return (
              <span
                className={classNames(
                  'chart-legend flex gap-x-4',
                  styles.legend,
                )}
              >
                {options?.legendData?.map((v: any) => {
                  return (
                    <span
                      className="flex cursor-pointer items-center gap-x-1 text-xs"
                      key={v.name}
                      onClick={() => {
                        setNoShow({ ...noShow, [v.name]: !noShow[v.name] })
                      }}
                      style={{ color: noShow[v.name] ? '#d1d5db' : v.color }}
                    >
                      {getSvgIcon(
                        v.type === 'bar' ? 'barLegend' : 'legendIcon',
                      )}
                      <span
                        className={classNames(
                          'text_des text-xs font-normal',
                          styles.value,
                        )}
                      >
                        {tr(v.name)}
                      </span>
                    </span>
                  )
                })}
              </span>
            )
          })()}
          <div className="h-[350px]">
            <EChart options={newOptions} />
          </div>
        </div>
      </MobileView>
    </div>
  )
})
