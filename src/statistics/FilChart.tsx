/** @format */
import EChart from '@/components/echarts'
import { useEffect, useMemo, useState } from 'react'
import { Translation } from '@/components/hooks/Translation'
import { getColor } from '@/utils/echarts'
import useAxiosData from '@/store/useAxiosData'
import { apiUrl } from '@/contents/apiUrl'
import { fil_overviewList } from '@/contents/statistic'
import { formatFil, formatNumberUnit } from '@/utils'
import { cloneDeep } from 'lodash'
import { BrowserView, MobileView } from '@/components/device-detect'
import styles from './FilChart.module.scss'
import classNames from 'classnames'
import useWindow from '@/components/hooks/useWindown'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

function Overview({ className }: { className?: string }) {
  const { theme, lang } = filscanStore
  const { tr } = Translation({ ns: 'static' })
  const { data: filData, loading } = useAxiosData(apiUrl.static_fil_chart, {})
  const [optionsA, setOptionA] = useState<any>({})
  const [legendA, setLegendA] = useState<any>({})
  const [optionsB, setOptionB] = useState<any>({})
  const [legendB, setLegendB] = useState<any>({})
  const { isMobile } = useWindow()
  const color = useMemo(() => {
    return getColor(theme)
  }, [theme])
  const defaultOtions: any = useMemo(() => {
    return {
      tooltip: {
        trigger: 'item',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          const { name, value, data } = v
          return `${v.marker} ${data.showName}`
        },
        position: 'right',
      },

      series: [
        {
          type: 'pie',
          radius: '50%',
          label: {
            show: true,
            color: color.labelColor,
          },
          textStyle: {
            //  fontSize: this.fontSize,
            color: color.textStyle,
          },
        },
      ],
    }
  }, [theme])

  const newData: any = useMemo(() => {
    const newList: any = {}
    const data = filData?.fil_compose || {}

    fil_overviewList.forEach((itemList: any) => {
      newList[itemList.title] = itemList.list.map((itemValue: any) => {
        const show_value = data && formatFil(data[itemValue.key], 'FIL')
        if (itemList.title === 'pie_title_a') {
          const percentage_a = Number(20 * Math.pow(10, 8))
          return {
            ...itemValue,
            percentage:
              Number((Number(show_value) / percentage_a) * 100).toFixed(2) +
              '%',
            value: show_value,
            unit: 'FIL',
          }
        } else {
          const percentage_b =
            Number(
              (Number(data[itemValue.key]) / data.total_released) * 100,
            ).toFixed(2) + '%'
          return {
            ...itemValue,
            percentage: percentage_b,
            value: show_value,
            unit: 'FIL',
          }
        }
      })
    })
    return newList
  }, [filData])

  useEffect(() => {
    loadOptions()
  }, [newData, lang, theme])

  const loadOptions = () => {
    let options_a: any = cloneDeep({ ...defaultOtions })
    let options_b: any = cloneDeep({ ...defaultOtions })
    let legend_a: any = []
    let legend_b: any = []

    fil_overviewList.forEach((item: any, index: number) => {
      const showData = (newData && newData[item.title]) || {}
      const seriesData: any = []
      const legend: any = {}
      item.list.forEach((seriesItem: any, index: number) => {
        const baseData = showData[index]
        const showValue = formatNumberUnit(baseData?.value)
        const name = `${tr(seriesItem.key)}`
        const value = `${showValue} FIL`
        legend[seriesItem.key] = {
          name,
          value,
          color: seriesItem.color,
          isShow: true,
          key: seriesItem.key,
        }
        seriesData.push({
          ...baseData,
          name,
          showName: `${tr(seriesItem.key)}: ${baseData?.value} FIL`,
          key: seriesItem.key,
          itemStyle: {
            color: seriesItem.color,
          },
        })
      })
      if (item.title === 'pie_title_a') {
        options_a.series[0].data = seriesData
        legend_a = { ...legend }
      } else {
        options_b.series[0].data = seriesData
        legend_b = { ...legend }
      }
    })
    setOptionA(options_a)
    setLegendA(legend_a)
    setOptionB(options_b)
    setLegendB(legend_b)
  }

  const newOptionsA = useMemo(() => {
    const newData: any = []
    const newOption: any = cloneDeep(optionsA)
    if (newOption?.series && newOption.series.length > 0) {
      optionsA?.series &&
        optionsA?.series[0]?.data.map((v: any) => {
          if (legendA[v.key].isShow) {
            newData.push(v)
          }
        })
      if (isMobile) {
        newOption.series[0].label.show = false
        newOption.series[0].radius = '80%'
        newOption.tooltip.position = ['15%', '50%']
        newOption.tooltip.formatter = (v: any) => {
          const { name, value, data } = v
          return `${v.marker} ${data.value} <div>${data.name}</div>`
        }
        newOption.series[0].center = ['50%', '50%']
      }
      newOption.series[0].data = newData
    }
    return newOption
  }, [legendA, optionsA, isMobile])

  const newOptionsB = useMemo(() => {
    const newData: any = []
    const newOption: any = cloneDeep(optionsB)
    if (newOption?.series && newOption.series.length > 0) {
      optionsB?.series &&
        optionsB?.series[0]?.data.map((v: any) => {
          if (legendB[v.key].isShow) {
            newData.push(v)
          }
        })
      if (isMobile) {
        newOption.series[0].label.show = false
        newOption.series[0].radius = '80%'
        newOption.tooltip.position = ['15%', '50%']
        newOption.tooltip.formatter = (v: any) => {
          const { name, value, data } = v
          return `${v.marker} ${data.value} <div>${data.name}</div>`
        }
        newOption.series[0].center = ['50%', '50%']
      }
      newOption.series[0].data = newData
    }
    return newOption
  }, [legendB, optionsB, isMobile])

  const handleLegend = (type: string, key: string) => {
    if (type === 'pie_title_a') {
      const newLegend = { ...legendA }
      newLegend[key].isShow = !newLegend[key].isShow
      setLegendA(newLegend)
    } else {
      const newLegend = { ...legendB }
      newLegend[key].isShow = !newLegend[key].isShow
      setLegendB(newLegend)
    }
  }

  return (
    <div className={classNames('flex  h-fit flex-col gap-y-5', styles.wrap)}>
      {fil_overviewList.map((dataItem, index: number) => {
        const legendData = index === 1 ? legendB : legendA
        return (
          <div key={dataItem.title} className={`h-full w-full ${className} `}>
            <div
              className={classNames(
                'mb-4 flex h-9 w-fit items-center pl-2.5 font-HarmonyOS text-lg font-semibold',
                styles.title,
              )}
            >
              {tr(dataItem.title)}
            </div>
            <div
              className={classNames(
                'card_shadow border_color rounded-[12px] border',
                styles.card,
                styles['card-reset'],
              )}
            >
              <div className={classNames('h-[400px] w-full', styles.echart)}>
                <EChart
                  options={
                    index === 1 ? { ...newOptionsB } : { ...newOptionsA }
                  }
                />
              </div>
              <BrowserView>
                <ul className="flex w-full flex-wrap gap-y-2.5 px-10 pb-10 ">
                  {Object.keys(legendData).map((legendKey: any) => {
                    const legend = legendData[legendKey]
                    return (
                      <li
                        key={legendKey}
                        className="text_des flex w-1/3 cursor-pointer items-center gap-x-2 text-xs"
                        onClick={() => {
                          handleLegend(dataItem.title, legendKey)
                        }}
                      >
                        <span
                          className="block h-2 w-2 rounded-full"
                          style={{
                            background: legend.isShow
                              ? legend?.color || ''
                              : '#d1d5db',
                          }}
                        />
                        <span>{`${legend?.name || ''}`} </span>
                      </li>
                    )
                  })}
                </ul>
              </BrowserView>
              <MobileView>
                <ul className={classNames(styles['legend-wrap'])}>
                  {Object.keys(legendData).map((legendKey: any) => {
                    const legend = legendData[legendKey]
                    return (
                      <li
                        key={legendKey}
                        className={classNames(styles['legend-item'])}
                        onClick={() => {
                          handleLegend(dataItem.title, legendKey)
                        }}
                      >
                        <div className={classNames(styles['legend-item-left'])}>
                          <span
                            className="block h-2 w-2 rounded-full"
                            style={{
                              background: legend.isShow
                                ? legend?.color || ''
                                : '#d1d5db',
                            }}
                          />
                          <span>{`${legend?.name || ''}:`} </span>
                          <span className={styles['legend-value']}>
                            {legend?.value || ''}
                          </span>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </MobileView>
            </div>
          </div>
        )
      })}
    </div>
  )
}
export default observer(Overview)
