/** @format */
import { useState, useMemo, useEffect } from 'react';
import * as echarts from 'echarts';
import Image from 'next/image';
import Link from 'next/link';
import BigNumber from 'bignumber.js';
import { useFilscanStore } from '@/store/FilscanStore';
import { Translation } from '@/components/hooks/Translation';
import { defaultOpt, getColor } from '@/utils/echarts';
import EChart from '@/components/echarts';
import { gas } from '@/contents/statistic';
import go from '@/assets/images/black_go.svg';
import fetchData from '@/store/server';
import { apiUrl } from '@/apiUrl';
import { formatFilNum } from '@/utils';

interface Props {
  active?: string;
  className?: string;
}

//仅含基础费
const showData: any = [
  {
    label: 'base_fee',
    type: 'line',
    unit: 'nanoFiL',
  },
];

function Gas(props: Props) {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'static' });
  const { active = '24h', className = '' } = props;
  const [value, setValue] = useState(active);

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const defaultOptions: any = useMemo(() => {
    return {
      yAxis: {
        type: 'value',
        scale: true,
        axisLabel: {
          fontFamily: 'DINPro',
          fontSize: 14,
          color: color.labelColor,
          formatter(v: any) {
            return new BigNumber(Number(v))
              .dividedBy(Math.pow(10, 9))
              .toFixed(2);
          },
          textStyle: {
            color: color.textStyle,
          },
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: color.lineStyle,
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
      series: {
        type: 'line',
        lineStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: 'rgba(23 , 156 , 238,1)' },
            { offset: 0.5, color: 'rgba(23 ,100  ,255,1)' },
            { offset: 1, color: 'rgba(0 ,   61  ,  185 ,  1)' },
          ]),
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1, // 渐变方向
            [
              { offset: 0, color: 'rgba(57,128 ,250,0.6)' }, // 渐变起始颜色
              { offset: 0.7, color: 'rgba(57,128 ,250,0.3)' }, // 渐变起始颜色
              { offset: 1, color: 'rgba(57 , 128,  250,0.01)' }, // 渐变结束颜色 rgba(23, 156, 238, 1)
            ]
          ),
        },
        markArea: {
          itemStyle: {
            color: 'trans',
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          var result = v[0].data.timestamp || v[0].name;
          v.forEach((item: any, index: number) => {
            if (item.data) {
              result +=
                '<br/>' +
                item.marker +
                item.seriesName +
                ': ' +
                item.data.showValue +
                ' ' +
                item.data.showUnit;
            }
          });
          return result;
        },
      },
      ...defaultOpt('line', theme),
    };
  }, [theme]);

  const [options, setOptions] = useState<any>();

  useEffect(() => {
    setValue(active);
    load(active);
  }, [active]);

  const load = (inter?: string) => {
    const interval = inter || value;
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      base_fee: [],
    };
    const newOpt = { ...defaultOptions };
    fetchData(apiUrl.static_gas, { interval }).then((res: any) => {
      res?.list?.reverse().forEach((dataItem: any) => {
        const { timestamp, base_fee, gas_in_32g, gas_in_64g } = dataItem;
        let showTime: string = '';
        if (value === '24h') {
          const newTime = timestamp.split(' ')[1];
          showTime = newTime.split(':')[0] + ':' + newTime.split(':')[1];
        } else {
          showTime = timestamp.split('+')[0];
        }
        dateList.push(showTime);
        seriesObj.base_fee.push({
          value: base_fee,
          showValue: formatFilNum(base_fee, false, false, 4, false).split(
            ' '
          )[0],
          showUnit: formatFilNum(base_fee, false, false, 4, false).split(
            ' '
          )[1],
          timestamp: timestamp.split('+')[0],
        });
      });
      newOpt.xAxis.data = dateList;
      newOpt.series = [];
      showData.forEach((item: any) => {
        newOpt.series.push({
          type: item.type,
          data: seriesObj[item.label],
          name: tr(item.label),
          smooth: false,
          yAxisIndex: item.yIndex,
          symbol: 'none',
          unit: item.unit,
          ...defaultOptions.series,
        });
      });
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  };

  return (
    <div className={`w-full h-full  ${className}`}>
      <EChart options={options} />
    </div>
  );
}

export default Gas;
