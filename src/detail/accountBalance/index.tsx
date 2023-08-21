/** @format */

import Echarts from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { account_balance } from '@/contents/detail';
import SkeletonScreen from '@/packages/skeleton';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { formatFilNum, getShowData } from '@/utils';
import { getColor } from '@/utils/echarts';
import { theme } from 'antd';
import Item from 'antd/es/list/Item';
import { useEffect, useMemo, useState } from 'react';

export default ({ data, loading }: { data: any; loading: boolean }) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });

  const [options, setOptions] = useState<any>({});
  const [noShow, setNoShow] = useState<Record<string, boolean>>({});

  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const defaultOptions: any = useMemo(() => {
    return {
      grid: {
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        containLabel: true,
      },
      tooltip: {
        show: false,
        trigger: 'item',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          const { name, value } = v;
          return `${v.marker} ${name}`;
        },
        position: 'right',
      },
      legend: {
        show: false,
      },
      series: [
        {
          type: 'pie',
          radius: ['26%', '48%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            fontSize: 16,
            rich: {
              dark: {
                color: '#000',
              },
              color: {
                color: '#309cfe',
              },
            },
          },
          data: [],
          center: ['55%', '50%'],
        },
      ],
    };
  }, [theme]);

  useEffect(() => {
    const seriesData: any = [];
    const legendData: any = [];
    account_balance.list.forEach((item: any) => {
      const showData = getShowData(item, data);
      const value = (showData && showData[item.dataIndex]) || '--';
      if (value !== '--') {
        const [showValue, showUnit] = value.split(' ');
        legendData.push({
          showValue: showValue,
          unit: showUnit,
          value,
        });
      } else {
        legendData.push({
          unit: 'autoFil',
          value,
        });
      }
      seriesData.push({
        value,
        dataIndex: item.dataIndex,
        name: item.dataIndex,
        itemStyle: {
          color: item.color,
        },
      });
    });
    setOptions({
      series: seriesData,
      legendData: legendData,
    });
  }, [data]);

  const newOptions = useMemo(() => {
    const newOpt = { ...defaultOptions };
    const newSeries: any = [];
    (options?.series || []).forEach((v: any) => {
      if (!noShow[v.dataIndex]) {
        newSeries.push(v);
      }
    });
    newOpt.series[0].data = newSeries;

    return newOpt;
  }, [options, defaultOptions, noShow]);

  return (
    <div className='flex h-[340px] w-1/2 p-7'>
      <div className='flex-1'>
        <div className='flex flex-col'>
          <span className='text-sm text_des'>{tr(account_balance.title)}</span>
          <span className='font-DINPro-Bold text-xl text_clip'>
            {loading ? (
              <SkeletonScreen />
            ) : data?.balance ? (
              formatFilNum(data?.balance, false, false, 4)
            ) : (
              '--'
            )}
          </span>
        </div>

        <ul className='mt-24 flex  flex-col flex-wrap gap-y-10 justify-between max-h-[140px]'>
          {account_balance.list.map((balance_item: any) => {
            const value = data[balance_item.dataIndex];
            return (
              <li
                className='w-1/2 flex flex-col flex-0'
                key={balance_item.dataIndex}>
                <span
                  className='text-sm text_des flex gap-x-1 items-center cursor-pointer'
                  onClick={() => {
                    setNoShow({
                      ...noShow,
                      [balance_item.dataIndex]: !noShow[balance_item.dataIndex],
                    });
                  }}>
                  <span
                    className='flex w-[5px] h-[5px] rounded-full'
                    style={{
                      backgroundColor: noShow[balance_item.dataIndex]
                        ? '#d1d5db'
                        : balance_item.color,
                    }}
                  />

                  {tr(balance_item.title)}
                </span>
                <span className='font-DINPro-Medium text-sm font-medium  ml-2'>
                  {loading ? (
                    <SkeletonScreen />
                  ) : value ? (
                    formatFilNum(value, false, false, 4)
                  ) : (
                    '--'
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='h-[310px] flex-1 '>
        <Echarts options={newOptions} />
      </div>
    </div>
  );
};
