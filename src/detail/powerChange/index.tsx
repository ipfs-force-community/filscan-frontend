/** @format */

import { apiUrl } from '@/contents/apiUrl';
import Echarts from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { power_change } from '@/contents/detail';
import Segmented from '@/packages/segmented';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime, isMobile, unitConversion } from '@/utils';
import { getColor, get_xAxis } from '@/utils/echarts';
import { useEffect, useMemo, useState } from 'react';

export default ({ accountId }: { accountId?: string | string[] }) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
  const [interval, setInterval] = useState('7d');
  const [options, setOptions] = useState<any>({});
  const [noShow, setNoShow] = useState<Record<string, boolean>>({});

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme);
  }, [theme]);

  const defaultOptions = useMemo(() => {
    return {
      grid: {
        top: isMobile() ? 100 : 10,
        left: 20,
        right: '8%',
        bottom: 20,
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        scale: true,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: true,
          lineStyle: {
            color: color.lineStyle,
          },
          textStyle: {
            color: color.textStyle,
          },
          formatter(v: string) {
            return v + ' TiB';
          },
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: color.splitLine,
          },
        },
        // name: vm.tr("chart.title"),
        nameTextStyle: {
          color: color.textStyle,
          align: 'left',
        },
        //nameGap: 22 * rate
      },
      tooltip: {
        trigger: 'axis',
        position: 'right',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(p: Array<any>) {
          let result = p[0].name;
          p.forEach((item: any, index: number) => {
            if (item.data) {
              result +=
                '<br/>' +
                item.marker +
                tr(item.seriesName) +
                ': ' +
                item.data.amount +
                ' ' +
                item.data.unit;
            }
          });
          return result;
        },
      },
    };
  }, [theme]);

  useEffect(() => {
    if (accountId) {
      load();
    }
  }, [accountId]);

  const load = async (inter?: string) => {
    const showInter = inter || interval;
    const seriesObj: any = {
      power: [], //有效算力
      power_increase: [], //算力增长
    };
    const timeData: any = [];
    const legendData: any = [];
    const seriesData: any = [];

    const result: any = await fetchData(apiUrl.account_trend, {
      account_id: accountId,
      filters: {
        interval: showInter,
      },
    });
    (result?.power_trend_by_account_id_list?.reverse() || []).forEach(
      (value: any) => {
        const { block_time, power, power_increase } = value;
        let showTime: string = '';
        showTime = formatDateTime(block_time, 'MM-DD HH:mm');
        timeData.push(showTime);
        //y轴
        const [powerValue, powerUnit] = power
          ? unitConversion(power, 4, 4).split(' ')
          : [];
        const [increaseValue, increaseUnit] = power_increase
          ? unitConversion(power_increase, 4, 4)?.split(' ')
          : [];

        //amount
        const [powerValue_amount, powerValue_unit] = power
          ? unitConversion(power, 4)?.split(' ')
          : [];
        const [power_increase_amount, power_increase_unit] = power_increase
          ? unitConversion(power_increase, 4)?.split(' ')
          : [];
        seriesObj.power.push({
          value: powerValue,
          unit: powerValue_unit,
          amount: powerValue_amount,
        });
        seriesObj.power_increase.push({
          value: increaseValue,
          unit: power_increase_unit,
          amount: power_increase_amount,
        });
      }
    );
    power_change.list.forEach((item: any) => {
      const { dataIndex, color, title } = item;
      legendData.push({
        dataIndex,
        color: color,
        title: title,
      });
      seriesData.push({
        type: item.type,
        smooth: true,
        data: seriesObj[dataIndex],
        name: title,
        symbol: 'circle',
        barMaxWidth: '30',
        backgroundStyle: {
          color: item?.color || '',
        },
        itemStyle: {
          color: item.color,
        },
      });
    });
    setOptions({
      xData: timeData,
      series: seriesData,
      legendData,
    });
  };

  const handleTabChange = (value: string) => {
    setInterval(value);
    load(value);
  };

  const newOptions = useMemo(() => {
    const newSeries: any = [];
    (options?.series || []).forEach((seriesItem: any) => {
      if (!noShow[seriesItem?.dataIndex]) {
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
  }, [options, default_xAxis, noShow, defaultOptions]);

  return (
    <div className='flex-1'>
      <div className='flex justify-between items-center mb-2'>
        <div className='flex gpa-x-5 items-center'>
          <span className='text-lg font-semibold mr-5'>
            {tr(power_change.title)}
          </span>
          <Segmented
            data={power_change.tabList}
            ns='detail'
            defaultValue={interval}
            isHash={false}
            onChange={handleTabChange}
          />
        </div>

        <span className='flex gap-x-4'>
          {options?.legendData?.map((v: any) => {
            return (
              <span
                className='text-xs flex cursor-pointer items-center gap-x-1'
                key={v.dataIndex}
                onClick={() => {
                  setNoShow({ ...noShow, [v.dataIndex]: !noShow[v.dataIndex] });
                }}
                style={{ color: noShow[v.dataIndex] ? '#d1d5db' : v.color }}>
                {getSvgIcon('legendIcon')}
                <span className='text-xs text_des font-normal'>
                  {tr(v.title)}
                </span>
              </span>
            );
          })}
        </span>
      </div>
      <div className='card_shadow w-full h-[348px] border rounded-xl p-5 border_color'>
        <Echarts options={newOptions} />
      </div>
    </div>
  );
};