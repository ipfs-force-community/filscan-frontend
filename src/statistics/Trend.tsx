/** @format */
import { apiUrl } from '@/contents/apiUrl';
import EChart from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { power_trend } from '@/contents/statistic';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime, unitConversion } from '@/utils';
import { getColor, get_xAxis } from '@/utils/echarts';
import go from '@/assets/images/black_go.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import useObserver from '@/components/hooks/useObserver';

interface Props {
  origin?: string;
  className?: string;
}

export default (props: Props) => {
  const { origin, className } = props;
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'static' });
  const ref = useObserver();

  const [noShow, setNoShow] = useState<Record<string, boolean>>({});
  const [options, setOptions] = useState<any>({});

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme);
  }, [theme]);

  const defaultOptions = useMemo(() => {
    return {
      grid: {
        top: 30,
        left: 20,
        right: 20,
        bottom: '10%',
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
              color: color.textStyle,
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
              color: color.textStyle,
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
        trigger: 'axis',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          var result = v[0].name;
          v.forEach((item: any) => {
            if (item.data) {
              result +=
                '<br/>' +
                item.marker +
                item.seriesName +
                ': ' +
                item.data.amount +
                item.data.unit;
            }
          });
          return result;
        },
      },
    };
  }, [theme]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const seriesObj: any = {};
    power_trend.list.forEach((v) => {
      seriesObj[v.dataIndex] = [];
    });
    const dateList: any = [];
    const legendList: any = [];
    const seriesData: any = [];
    const result: any = await fetchData(apiUrl.line_trend, { interval: '1m' });
    result?.list?.reverse()?.forEach((value: any) => {
      const {
        timestamp,
        base_line_power, //基线算力
        total_raw_byte_power, //原值算力
        total_quality_adj_power, //有效算力
        change_quality_adj_power, //环比有效算力
      } = value;

      const showTime = formatDateTime(timestamp, 'MM-DD');
      dateList.push(showTime);

      //amount
      const [total_raw_byte_power_amount, total_raw_byte_power_unit] =
        total_raw_byte_power &&
        unitConversion(total_raw_byte_power, 2)?.split(' ');

      const [base_line_power_amount, base_line_power_unit] =
        base_line_power && unitConversion(base_line_power, 2)?.split(' ');

      const [total_quality_adj_power_amount, total_quality_adj_power_unit] =
        total_quality_adj_power &&
        unitConversion(total_quality_adj_power, 2)?.split(' ');

      const [change_quality_adj_power_amount, change_quality_adj_power_unit] =
        change_quality_adj_power &&
        unitConversion(change_quality_adj_power, 2)?.split(' ');

      seriesObj.total_raw_byte_power.push({
        amount: total_raw_byte_power_amount,
        value: unitConversion(total_raw_byte_power, 2, 6).split(' ')[0],
        unit: total_raw_byte_power_unit,
      });

      seriesObj.base_line_power.push({
        amount: base_line_power_amount,
        value: unitConversion(base_line_power, 2, 6).split(' ')[0],
        unit: base_line_power_unit,
      });
      seriesObj.total_quality_adj_power.push({
        amount: total_quality_adj_power_amount,
        value: unitConversion(total_quality_adj_power, 2, 6).split(' ')[0],
        unit: total_quality_adj_power_unit,
      });
      seriesObj.change_quality_adj_power.push({
        amount: change_quality_adj_power_amount,
        value: unitConversion(change_quality_adj_power, 2, 5).split(' ')[0],
        unit: change_quality_adj_power_unit,
      });
    });
    power_trend.list.forEach((item: any) => {
      legendList.push({
        name: tr(item.dataIndex),
        color: item.color,
      });
      seriesData.push({
        type: item.type,
        data: seriesObj[item.dataIndex],
        name: tr(item.dataIndex),
        yAxisIndex: item.yIndex,
        symbol: 'circle',
        smooth: true,
        itemStyle: {
          color: item.color,
        },
        barMaxWidth: '30',
      });
    });
    setOptions({ series: seriesData, xData: dateList, legendData: legendList });
  };

  const newOptions = useMemo(() => {
    const newSeries: any = [];
    (options?.series || []).forEach((seriesItem: any) => {
      if (!noShow[seriesItem?.name]) {
        newSeries.push(seriesItem);
      }
    });
    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: options?.xData || [],
      },
      series: newSeries,
    };
  }, [options, defaultOptions, noShow]);

  return (
    <div
      className={`w-full h-[full]  ${className} mt-20`}
      ref={origin === 'home' ? ref : ''}>
      <div className='flex justify-between flex-wrap items-center mb-5'>
        <div className='flex gap-x-10 items-center'>
          <span className='font-PingFang font-semibold text-lg '>
            {tr('power')}
          </span>
          <span className='flex gap-x-4'>
            {options?.legendData?.map((v: any) => {
              return (
                <span
                  className='text-xs flex cursor-pointer items-center gap-x-1'
                  key={v.name}
                  onClick={() => {
                    setNoShow({ ...noShow, [v.name]: !noShow[v.name] });
                  }}
                  style={{ color: noShow[v.name] ? '#d1d5db' : v.color }}>
                  {getSvgIcon('legendIcon')}
                  <span className='text-xs text_des font-normal'>
                    {' '}
                    {v.name}
                  </span>
                </span>
              );
            })}
          </span>
        </div>
        {origin === 'home' && (
          <Link href={`/statistics/power/`}>
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

      <div className={`h-[350px] w-full card_shadow rounded-xl`}>
        <EChart options={newOptions} />
      </div>
    </div>
  );
};
