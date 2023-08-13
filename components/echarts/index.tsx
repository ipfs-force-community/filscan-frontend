import * as echarts from "echarts";
// import {
//   BarChart,
//   LineChart
// } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption, 
  LineSeriesOption
} from 'echarts/charts';
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption
} from 'echarts/components';
import type { 
  ComposeOption, 
} from 'echarts/core';
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

const EChartsComponent: React.FC<EChartsComponentProps> = ({ options }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = echarts.init(chartRef.current);
      const default_options = {
        backgroundColor: "transparent",
        grid: {
        top: isMobile() ? 100:5,
        left: 20,
        right: 20,
        bottom: 40,
        containLabel: true,
      },
        yAxis: {
          value:'line'
        }
      }
      chartInstance.setOption({...default_options,...options,});

      return () => {
        chartInstance.dispose();
      };
    }
  }, [options]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
  );
};

export default EChartsComponent;
