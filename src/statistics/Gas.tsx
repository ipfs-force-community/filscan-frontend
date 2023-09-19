/** @format */
import { useState, useMemo, useEffect } from 'react';
import BigNumber from 'bignumber.js';
import { useFilscanStore } from '@/store/FilscanStore';
import { Translation } from '@/components/hooks/Translation';
import { getColor, get_xAxis, seriesArea } from '@/utils/echarts';
import EChart from '@/components/echarts';
import fetchData from '@/store/server';
import { apiUrl } from '@/contents/apiUrl';
import { formatFilNum } from '@/utils';
import useAxiosData from '@/store/useAxiosData';

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
  const { axiosData } = useAxiosData();

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme);
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
          // formatter(v: any) {
          //   return v+'attoFil'
          // },

          formatter(v: any) {
            return new BigNumber(Number(v))
              .dividedBy(Math.pow(10, 9))
              .toFixed(2) +' nanoFIL';
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
      legend: {
        show: false, // 设置图例不显示
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
    const seriesObj: any = {
      base_fee: [],
    };
    const newOpt: any = {};
    axiosData(apiUrl.static_gas, { interval }).then((res: any) => {
      res?.list?.forEach((dataItem: any) => {
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
      newOpt.xData = dateList;
      newOpt.series = [];
      showData.forEach((item: any) => {
        newOpt.series.push({
          type: item.type,
          ...seriesArea,
          data: seriesObj[item.label],
          name: tr(item.label),
          smooth: false,
          yAxisIndex: item.yIndex,
          symbol: 'none',
          unit: item.unit,
        });
      });
      setOptions({ ...newOpt });
    });
  };

  const newOptions = useMemo(() => {
    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: options?.xData || [],
      },
      series: options?.series || [],
    };
  }, [options, defaultOptions]);

  return (
    <div className={`w-full h-full ${className}`}>
      <EChart options={newOptions} />
    </div>
  );
}

export default Gas;
