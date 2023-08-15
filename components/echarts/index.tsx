/** @format */

import * as echarts from 'echarts';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from 'echarts/components';
import type { ComposeOption } from 'echarts/core';
import { useEffect, useRef } from 'react';
import { isMobile } from '@/utils';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

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
  options: ECOption;
}

const EChartsComponent: React.FC<EChartsComponentProps> = ({
  options = {},
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      const default_options = {
        backgroundColor: 'transparent',
        grid: {
          top: isMobile() ? 100 : 10,
          left: 20,
          right: 20,
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {},
        yAxis: {
          value: 'line',
        },
        series: [],
      };
      chart?.setOption({ ...default_options, ...options });

      const handleSize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleSize);
      return () => {
        chart.dispose();
        window.removeEventListener('resize', handleSize);
      };
    }
  }, [options]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>;
};

export default EChartsComponent;
