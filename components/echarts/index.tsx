/** @format */

import * as echarts from 'echarts'
//import * as echarts from 'echarts/charts';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts'
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components'
import type { ComposeOption } from 'echarts/core'
import { useEffect, useRef } from 'react'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>

// 注册必须的组件
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   BarChart,
//   LineChart,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer
// ]);

interface EChartsComponentProps {
  options: ECOption | Record<string, any>
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({
  options = {},
}) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chart = useRef<any>(null)

  useEffect(() => {
    if (chartRef.current) {
      chart.current = echarts.init(
        chartRef.current as unknown as HTMLDivElement,
      )
      const handleSize = () => {
        chart.current.resize()
      }
      window.addEventListener('resize', handleSize)
      return () => {
        chart.current.dispose()
        window.removeEventListener('resize', handleSize)
      }
    }
  }, [chartRef.current])

  useEffect(() => {
    if (chart.current) {
      const default_options = {
        backgroundColor: 'transparent',
        grid: {
          top: 10,
          left: 20,
          right: 20,
          bottom: 20,
          containLabel: true,
        },
      }
      if (options && options.series) {
        chart.current.setOption({ ...default_options, ...options })
      }
    }
  }, [options, chart.current])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
}

export default EChartsComponent
