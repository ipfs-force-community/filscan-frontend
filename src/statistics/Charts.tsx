/** @format */
import EChart from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { fil_charts } from '@/contents/statistic'
import { getColor } from '@/utils/echarts'
import classNames from 'classnames'
import { useEffect, useMemo, useState } from 'react'
import styles from './Charts.module.scss'
import useWindow from '@/components/hooks/useWindown'
import { BrowserView, MobileView } from '@/components/device-detect'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

function Overview() {
  const { theme, lang } = filscanStore
  const { tr } = Translation({ ns: 'static' })
  const [legendData, setLegendData] = useState<any>({})
  const [data, setData] = useState<any>({})
  const { isMobile } = useWindow()
  const color = useMemo(() => {
    return getColor(theme)
  }, [theme])
  const defaultOtions: any = useMemo(() => {
    return {
      tooltip: {
        show: false,
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          label: {
            show: true,
            color: color.labelColor,
            formatter: (param: any) => {
              return param.name + '(' + param.value + '%)'
              //return param.name + '<br />' +`<span style="color:${color.textStyle}">(${param.value}%)</span>`
            },
          },
          data: [],
        },
      ],
    }
  }, [theme])

  useEffect(() => {
    const seriesData: any = []
    const legendData: any = {}
    fil_charts.chart.forEach((item: any) => {
      const value = item.value || '--'
      const name = `${tr(item.key)}`
      legendData[item.key] = {
        name,
        value,
        color: item.color,
        key: item.key,
        isShow: true,
      }
      seriesData.push({
        value,
        name,
        key: item.key,
        itemStyle: {
          color: item.color,
        },
      })
    })
    const newOpt = { ...defaultOtions }
    newOpt.series[0].data = seriesData
    setData(newOpt)
    setLegendData(legendData)
  }, [lang, theme])

  const options = useMemo(() => {
    const newData: any = { ...data }
    const series: any = []
    if (newData.series && newData.series.length > 0) {
      data.series[0].data?.forEach((v: any) => {
        if (legendData[v.key]?.isShow) {
          series.push(v)
        }
      })
      newData.series[0].data = series
      if (isMobile) {
        newData.series[0].radius = '80%'
        newData.series[0].label.show = false
        newData.tooltip.position = ['40%', '50%']
        newData.tooltip.show = true
        newData.tooltip.formatter = (v: any) => {
          const { name, value, data } = v
          return `${v.marker} ${data.value}% <div>${data.name}</div>`
        }
        newData.series[0].center = ['50%', '45%']
      }
    }
    return newData
  }, [data, legendData, isMobile])

  const handleLegend = (legendKey: string) => {
    const newLegend = { ...legendData }
    newLegend[legendKey].isShow = !newLegend[legendKey].isShow
    setLegendData(newLegend)
  }

  return (
    <div>
      <div
        className={classNames(
          'mb-4 flex h-9 w-fit items-center pl-2.5 font-PingFang text-lg font-semibold',
          styles.title,
        )}
      >
        {tr('charts_title')}
      </div>
      <div
        className={classNames(
          'card_shadow border_color w-full rounded-[12px] border',
          styles.content,
        )}
      >
        <div
          className={classNames(
            'border_color flex flex-row border-b',
            styles['chart-wrap'],
            styles['chart-wrap-reset'],
          )}
        >
          <div className={classNames('h-[350px] w-2/3 py-5', styles.chart)}>
            <EChart options={options} />
          </div>
          <ul className="1/3 flex flex-col  justify-center gap-y-2.5">
            {Object.keys(legendData).map((legendKey: any) => {
              const legend = legendData[legendKey]
              return (
                <li
                  key={legendKey}
                  className="text_des flex cursor-pointer items-center gap-x-2 text-xs"
                  onClick={() => {
                    handleLegend(legendKey)
                  }}
                >
                  <span
                    className={classNames(
                      'block h-2 w-2 rounded-full',
                      styles.dot,
                    )}
                    style={{
                      background: legend.isShow
                        ? legend?.color || ''
                        : '#d1d5db',
                    }}
                  />
                  <span
                    className={classNames('flex', styles['legend-label-wrap'])}
                  >
                    <BrowserView>
                      <span className="flex-shrink-0">
                        {legend?.name || ''}{' '}
                      </span>
                    </BrowserView>
                    <MobileView>
                      <span className="flex-shrink-0">
                        {legend?.name || ''}:{' '}
                      </span>
                      <span className={styles.value}>
                        {' ' + `${legend?.value}%`}
                      </span>
                    </MobileView>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
        <BrowserView>
          <div className="text_des p-10 font-DINPro-Medium text-xs">
            <ul className="border_color rounded-[5px] border">
              {fil_charts.content.map((v, index) => {
                return (
                  <li
                    key={index}
                    className="border_color flex min-h-[36px] w-full items-center break-words border-b last:border-none"
                  >
                    <div
                      style={{ width: '20%' }}
                      className="border_color flex h-full min-h-[36px] items-center  border-r px-2.5"
                    >
                      {tr(v.label)}
                    </div>
                    <div
                      style={{ width: '25%' }}
                      className="border_color flex h-full min-h-[36px]  items-center border-r px-2.5"
                    >
                      {index === 0 ? tr(v.value) : v.value}
                    </div>
                    <div style={{ width: '40%' }} className="px-2.5">
                      {tr(v.description)}
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </BrowserView>
        <MobileView>
          {fil_charts.content
            .filter((value) => {
              return value.label !== 'Allocation'
            })
            .map((v, index) => {
              return (
                <li
                  key={index}
                  className={classNames(
                    'text_des border_color flex flex-col gap-y-[15px] border-b px-[12px] py-[14px] last:border-none',
                    styles['describe-item'],
                  )}
                >
                  <div className="flex">
                    <span
                      className={classNames(
                        'min-w-[100px] pt-[2px]',
                        styles.label,
                      )}
                    >
                      {tr('Allocation')}:
                    </span>
                    <span className="font-DINPro-Medium  text-black">
                      {tr(v.label)}
                    </span>
                  </div>
                  <div className="flex">
                    <span className={classNames('min-w-[100px]', styles.label)}>
                      {tr('value')}:
                    </span>
                    <span className="font-DINPro-Medium  text-black">
                      {index === 0 ? tr(v.value) : v.value}
                    </span>
                  </div>
                  <div className="flex">
                    <span className={classNames('min-w-[100px]', styles.label)}>
                      {tr('description')}:
                    </span>
                    <span className="font-DINPro-Medium  text-black">
                      {tr(v.description)}
                    </span>
                  </div>
                </li>
              )
            })}
        </MobileView>
      </div>
    </div>
  )
}
export default observer(Overview)
