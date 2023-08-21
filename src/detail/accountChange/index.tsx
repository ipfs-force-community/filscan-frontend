/** @format */

import { apiUrl } from '@/apiUrl';
import Echarts from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { account_change } from '@/contents/detail';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime, formatFil, formatFilNum, isMobile } from '@/utils';
import { getColor, get_xAxis } from '@/utils/echarts';
import { useEffect, useMemo, useState } from 'react';

export default ({
  accountId,
  interval,
}: {
  accountId?: string | string[];
  interval: string;
}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
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
        right: '10%',
        bottom: 20,
        containLabel: true,
      },
      yAxis: {
        type: 'value',
        scale: true,
        nameTextStyle: {
          color: color.textStyle,
          align: 'left',
        },

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
            return v + ' FIL';
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
      tooltip: {
        trigger: 'axis',
        position: 'right',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(p: Array<any>) {
          let result = p[0].data.showTime || p[0].name;
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

  const load = async () => {
    const result: any = await fetchData(apiUrl.account_change, {
      account_id: accountId,
      filters: {
        interval: interval,
      },
    });
    const dateList: Array<string> = [];
    const seriesObj: Record<string, any> = {
      balance: [], //当前余额
      available_balance: [], //可用余额
      initial_pledge: [], //扇区抵押，
      locked_funds: [], //锁仓奖励
    };
    const seriesData: any = [];
    const legendData: any = [];
    (result?.balance_trend_by_account_id_list || []).forEach((item: any) => {
      const {
        block_time,
        available_balance,
        balance,
        //precommit_deposits,
        locked_funds,
        initial_pledge,
      } = item;
      const showTime: string =
        interval === '24h'
          ? formatDateTime(block_time, 'HH:mm')
          : formatDateTime(block_time, 'YYYY-MM-DD HH:mm');
      dateList.push(showTime);
      const [balance_amount, balance_unit] = balance
        ? formatFilNum(balance, false, false, 4, false)?.split(' ')
        : [];
      const [available_balance_amount, available_balance_unit] =
        available_balance
          ? formatFilNum(available_balance, false, false, 4, false)?.split(' ')
          : [];
      //   const [precommit_deposits_amount, precommit_deposits_unit] =
      //     precommit_deposits
      //       ? formatFilNum(precommit_deposits, false, false, 4, false)?.split(' ')
      //       : [];
      const [locked_funds_amount, locked_funds_unit] = locked_funds
        ? formatFilNum(locked_funds, false, false, 4, false)?.split(' ')
        : [];
      const [initial_pledge_amount, initial_pledge_unit] = initial_pledge
        ? formatFilNum(initial_pledge, false, false, 4, false)?.split(' ')
        : [];
      if (available_balance) {
        seriesObj.available_balance.push({
          amount: available_balance_amount,
          value: formatFil(available_balance, 'FIL', 4),
          unit: available_balance_unit,
          showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
        });
      }
      if (balance) {
        seriesObj.balance.push({
          amount: balance_amount,
          value: formatFil(balance, 'FIL', 4),
          unit: balance_unit,
          showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
        });
      }
      if (initial_pledge) {
        seriesObj.initial_pledge.push({
          amount: initial_pledge_amount,
          value: formatFil(initial_pledge, 'FIL', 4),
          unit: initial_pledge_unit,
          showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
        });
      }
      if (locked_funds) {
        seriesObj.locked_funds.push({
          amount: locked_funds_amount,
          value: formatFil(locked_funds, 'FIL', 4),
          unit: locked_funds_unit,
          showTime: formatDateTime(block_time, 'YYYY-MM-DD HH:mm'),
        });
      }
    });
    account_change.list.forEach((item: any) => {
      const dataIndex = item?.dataIndex;
      legendData.push({
        name: dataIndex,
        color: item.color,
        title: item.title,
      });
      seriesData.push({
        type: item.type,
        smooth: true,
        data: seriesObj[dataIndex],
        name: dataIndex,
        symbol: 'circle',
        itemStyle: {
          color: item.color,
        },
      });
    });
    setOptions({
      series: seriesData,
      xData: dateList,
      legendData: legendData,
    });
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
  }, [options, default_xAxis, noShow, defaultOptions]);

  return (
    <div className='flex-1'>
      <div className='flex justify-between items-center'>
        <span className='text-lg font-semibold mr-5'>
          {tr(account_change.title)}
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
