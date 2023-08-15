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
  origin: string;
}

function Gas(props: Props) {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'static' });
  const { origin } = props;

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const defaultOptions: any = useMemo(() => {
    return {
      yAxis: [
        {
          type: 'value',
          scale: true,
          axisLabel: {
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
        {
          type: 'value',
          scale: true,
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter(v: any) {
              return (
                new BigNumber(Number(v)).dividedBy(Math.pow(10, 9)).toFixed() +
                ' FIL/TiB'
              );
            },
            textStyle: {
              //  fontSize: this.fontSize,
              color: color.textStyle,
            },
          },
          nameTextStyle: {
            color: '#ffffff',
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: color.lineStyle,
            },
          },
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: color.splitLine,
            },
          },
        },
      ],
      series: {
        type: 'line',
        smooth: true,
        itemStyle: {
          color: '#00E5FF',
        },
        yAxisIndex: 0,
        markArea: {
          itemStyle: {
            color: 'trans',
          },
        },
      },
      // tooltip: {
      //   trigger: "axis",
      //   backgroundColor: color.toolbox,
      //   borderColor: "transparent",
      //   textStyle: {
      //     color: "#ffffff",
      //   },
      //   formatter(v: any) {
      //     var result = v[0].data.timestamp || v[0].name;
      //     v.forEach((item: any, index: number) => {
      //       if (item.data) {
      //         result +=
      //           "<br/>" +
      //           item.marker +
      //           item.seriesName +
      //           ": " +
      //           item.data.showValue +
      //           " " +
      //           item.data.showUnit;
      //       }
      //     });
      //     return result;
      //   },
      // },
      ...defaultOpt('line', theme),
    };
  }, [theme]);

  const [options, setOptions] = useState<any>({});

  const showData: any = useMemo(() => {
    if (origin === 'home') {
      return [{ label: 'base_fee', yIndex: 0, type: 'line', unit: 'nanoFiL' }];
    }
  }, [origin]);

  useEffect(() => {
    load();
  }, []);

  const load = (value: string = '24h') => {
    const dateList: Array<string> = [];
    const legendList: any = [];
    const seriesObj: any = {
      base_fee: [],
    };
    const newOpt = { ...defaultOptions };
    fetchData(apiUrl.static_gas, { interval: value }).then((res: any) => {
      res?.result?.list?.reverse().forEach((dataItem: any) => {
        const { timestamp, base_fee, gas_in_32g, gas_in_64g } = dataItem;
        let showTime: string = '';
        if (value === '24h') {
          const newTime = timestamp.split(' ')[1];
          showTime = newTime.split(':')[0] + ':' + newTime.split(':')[1];
        } else {
          showTime = timestamp.split('+')[0];
        }

        dateList.push(showTime);
        // seriesObj.gas_in_32g.push({
        //   value: formatFil(gas_in_32g, 'nanoFiL'),
        //   showValue: formatFilNum(gas_in_32g, false, false,4,false).split(' ')[0],
        //   showUnit:formatFilNum(gas_in_32g, false, false,4,false).split(' ')[1],
        //   unit: 'nanoFiL',
        //  timestamp:timestamp.split("+")[0]
        // });
        seriesObj.base_fee.push({
          value: base_fee,
          showValue: formatFilNum(base_fee, false, false, 4, false).split(
            ' '
          )[0],
          showUnit: formatFilNum(base_fee, false, false, 4, false).split(
            ' '
          )[1],
          unit: 'attoFIL',
          timestamp: timestamp.split('+')[0],
        });
        // seriesObj.gas_in_64g.push({
        //   value: formatFil(gas_in_64g, 'nanoFiL'),
        //   showValue: formatFilNum(gas_in_64g, false, false,4,false).split(' ')[0],
        //   showUnit:formatFilNum(gas_in_64g, false, false,4,false).split(' ')[1],
        //   unit: 'nanoFiL',
        //   timestamp:timestamp.split("+")[0]
        // });
      });
      newOpt.xAxis.data = dateList;
      newOpt.series = [];
      showData.forEach((item: any) => {
        legendList.push(tr(item.label));
        newOpt.series.push({
          type: item.type,
          data: seriesObj[item.label],
          name: tr(item.label),
          smooth: true,
          yAxisIndex: item.yIndex,
          symbol: 'circle',
          unit: item.unit,
        });
      });
      newOpt.legend.data = legendList;
      setOptions({ ...newOpt });
    });
  };

  const options_t = useMemo(() => {
    return {
      ...defaultOptions,
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      series: [
        {
          data: [5, 8, 13, 10, 15, 17, 10, 9],
          type: 'line',
          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1, // 渐变方向
              [
                { offset: 0, color: 'rgba(0, 61, 185, 0.9)' }, // 渐变起始颜色
                { offset: 0.001, color: 'rgba(23, 156, 238, 0.6)' }, // 渐变中间颜色
                { offset: 1, color: 'rgba(255,255,255,0.1)' }, // 渐变结束颜色 rgba(23, 156, 238, 1)
              ]
            ),
          },
        },
      ],
    };
  }, [defaultOptions]);

  return (
    <div className='w-full h-full'>
      <div
        className={`flex justify-between text-xs font-PingFang ${
          origin === 'home' ? 'p-5' : ''
        } `}>
        {tr(gas.title)}
        {origin === 'home' && (
          <Link href={`/statistics/gas/`}>
            <Image
              className='cursor-pointer'
              src={go}
              width={18}
              height={18}
              alt='go'
            />
          </Link>
        )}
      </div>
      <div className='w-full h-[240px]'>
        <EChart options={options_t} />
      </div>
    </div>
  );
}

export default Gas;
