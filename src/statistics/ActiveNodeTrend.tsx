/** @format */
import { apiUrl } from '@/contents/apiUrl'
import EChart from '@/components/echarts'
import { Translation } from '@/components/hooks/Translation'
import { active_miner_count, timeList } from '@/contents/statistic'
import { formatDateTime } from '@/utils'
import { getColor, get_xAxis, seriesChangeArea } from '@/utils/echarts'
import { useEffect, useMemo, useState } from 'react'
import styles from './ActiveNodeTrend.module.scss'
import classNames from 'classnames'
import useAxiosData from '@/store/useAxiosData'
import Segmented from '@/packages/segmented'
import useWindow from '@/components/hooks/useWindown'
import filscanStore from '@/store/modules/filscan'
import { observer } from 'mobx-react'

interface Props {
  origin?: string
  className?: string
}

export default observer((props: Props) => {
  const { className } = props
  const { theme } = filscanStore
  const { tr } = Translation({ ns: 'static' })
  const { axiosData } = useAxiosData()
  const [options, setOptions] = useState<any>({})
  const [interval, setInterval] = useState('24h')
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
        top: 30,
        left: 20,
        right: 20,
        bottom: 20,
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        position: 'left',
        scale: true,
        nameTextStyle: {
          color: color.textStyle,
        },
        axisLabel: {
          formatter: '{value}',
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
          show: true,
          lineStyle: {
            type: 'dashed',
            color: color.splitLine,
          },
        },
      },
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
          var result = v[0]?.data?.showTime
          v.forEach((item: any) => {
            if (item.data) {
              result +=
                '<br/>' +
                item.marker +
                item.seriesName +
                ': ' +
                item.data.amount +
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
    load()
  }, [])

  const load = async (time?: string) => {
    const seriesObj: any = {}
    active_miner_count.list.forEach((v) => {
      seriesObj[v.dataIndex] = []
    })
    const dateList: any = []
    const seriesData: any = []
    const inter = time || interval
    const result: any = await axiosData(apiUrl.static_active_miner, {
      interval: inter,
    })
    result?.items?.forEach((value: any) => {
      const {
        block_time,
        active_miner_count, //合约交易
      } = value
      const showTime =
        inter === '24h'
          ? formatDateTime(block_time, 'HH:mm')
          : formatDateTime(block_time, 'MM-DD HH:mm')
      dateList.push(showTime)
      //amount
      seriesObj.active_miner_count.push({
        value: active_miner_count,
        amount: active_miner_count,
        showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
        unit: '',
      })
    })

    active_miner_count.list.forEach((item: any) => {
      seriesData.push({
        type: item.type,
        ...seriesChangeArea,
        data: seriesObj[item.dataIndex],
        name: tr(item.title),
        symbol: 'circle',
        smooth: true,
        itemStyle: {
          color: item.color,
        },
        barMaxWidth: '30',
      })
    })
    setOptions({ series: seriesData, xData: dateList })
  }

  const newOptions = useMemo(() => {
    const newSeries: any = []
    ;(options?.series || []).forEach((seriesItem: any) => {
      newSeries.push(seriesItem)
    })
    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: options?.xData || [],
      },
      series: newSeries,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, defaultOptions])
  return (
    <div
      //id='active_nodes'
      className={classNames(styles.wrap, `h-[full] w-full  ${className}`)}
    >
      <div
        className={classNames(
          'mx-2.5 mb-4 flex flex-1  flex-row flex-wrap items-center justify-between',
          styles['title-wrap'],
        )}
      >
        <div className="font-HarmonyOS w-fit min-w-[120px] text-lg font-semibold ">
          {tr('active_nodes')}
        </div>
        <Segmented
          defaultValue={interval}
          data={timeList}
          ns="static"
          isHash={false}
          onChange={(value) => {
            setInterval(value)
            load(value)
          }}
        />
      </div>
      <div
        className={classNames(
          `card_shadow border_color h-[350px] w-full rounded-xl border pb-2`,
          styles.content,
        )}
      >
        <EChart options={newOptions} />
      </div>
    </div>
  )
})
