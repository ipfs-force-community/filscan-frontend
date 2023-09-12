/** @format */
import { apiUrl } from '@/contents/apiUrl';
import EChart from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { power_trend } from '@/contents/statistic';
import { useFilscanStore } from '@/store/FilscanStore';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime, isMobile, unitConversion } from '@/utils';
import { getColor, get_xAxis } from '@/utils/echarts';
import go from '@/assets/images/black_go.svg';
import goMobile from '@/assets/images/icon-right-white.svg';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import useObserver from '@/components/hooks/useObserver';
import styles from './trend.module.scss'
import classNames from 'classnames';
import { BrowserView, MobileView } from '@/components/device-detect';
import useAxiosData from '@/store/useAxiosData';
interface Props {
  origin?: string;
  className?: string;
}

export default (props: Props) => {
  const { origin, className } = props;
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'static' });
  const ref = useObserver();
  const { axiosData } = useAxiosData()
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
        bottom: 20,
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
              //  fontSize: this.fontSize,
              color: color.labelColor,
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
              color: color.labelColor,
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
        //@ts-ignore
        position: function (pos, params, dom, rect, size) {
          // 鼠标在左侧时 tooltip 显示到右侧，鼠标在右侧时 tooltip 显示到左侧。
          var obj = {top:80};
          //@ts-ignore
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
          return isMobile() ? obj:undefined;
        },
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
                tr(item.seriesName) +
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
    const result: any = await axiosData(apiUrl.line_trend, { interval: '1m' });
    result?.list?.reverse()?.forEach((value: any) => {
      const {
        timestamp,
        total_raw_byte_power, //原值算力
        total_quality_adj_power, //有效算力
        power_increase, //算力增长
        power_decrease, //环比有效算力
      } = value;

      const showTime = formatDateTime(timestamp, 'MM-DD');
      dateList.push(showTime);

      //amount
      const [total_raw_byte_power_amount, total_raw_byte_power_unit] =
        total_raw_byte_power &&
        unitConversion(total_raw_byte_power, 2)?.split(' ');

      const [power_increase_amount, power_increase_unit] =
        power_increase && unitConversion(power_increase, 2)?.split(' ');

      const [total_quality_adj_power_amount, total_quality_adj_power_unit] =
        total_quality_adj_power &&
        unitConversion(total_quality_adj_power, 2)?.split(' ');

      const [power_decrease_amount, power_decrease_unit] =
        power_decrease &&
        unitConversion(power_decrease, 2)?.split(' ');

      seriesObj.total_raw_byte_power.push({
        amount: total_raw_byte_power_amount,
        value: unitConversion(total_raw_byte_power, 2, 6).split(' ')[0],
        unit: total_raw_byte_power_unit,
      });

      seriesObj.total_quality_adj_power.push({
        amount: total_quality_adj_power_amount,
        value: unitConversion(total_quality_adj_power, 2, 6).split(' ')[0],
        unit: total_quality_adj_power_unit,
      });
      seriesObj.power_increase.push({
        amount: power_increase_amount,
        value: unitConversion(power_increase, 2, 5).split(' ')[0],
        unit: power_increase_unit,
      });
      seriesObj.power_decrease.push({
        amount: power_decrease_amount,
        value: unitConversion(power_decrease, 2, 5).split(' ')[0],
        unit: power_decrease_unit,
      });
    });
    power_trend.list.forEach((item: any) => {
      legendList.push({
        name: item.dataIndex,
        color: item.color,
      });
      seriesData.push({
        type: item.type,
        data: seriesObj[item.dataIndex],
        key: item.dataIndex,
        name: item.dataIndex,
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

  const propsRef = origin === 'home' ? {ref}:{}

  return (
    <div
      id='power'
      className={classNames(styles.trend, `w-full h-[full]  ${className} ${origin ==='home'?'mt-20':''}`)}
      {...propsRef}
    >
      <div className='flex justify-between flex-wrap items-center min-h-[36px] mb-2.5'>
        <div className='flex-1 flex flex-row flex-wrap items-center'>
          <div className='min-w-[100px] w-fit font-PingFang font-semibold text-lg pl-2.5'>
            {tr('power')}
          </div>
          <div className='w-fit'>
            <BrowserView>
              <span className='flex gap-x-4 '>
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
                        {tr(v.name)}
                      </span>
                    </span>
                  );
                })}
              </span>
            </BrowserView>
          </div>

        </div>
        {origin === 'home' && (
          <Link href={`/statistics/power/`}>
            <MobileView>
              <Image
                src={goMobile}
                width={18}
                height={18}
                alt='go'
              />
            </MobileView>
            <BrowserView>
              <Image
                className='cursor-pointer mr-2.5'
                src={go}
                width={18}
                height={18}
                alt='go'
              />
            </BrowserView>

          </Link>
        )}
      </div>

      <div className={`h-[350px] w-full card_shadow border border_color rounded-xl`}>
        <EChart options={newOptions} />
      </div>
    </div>
  );
};
