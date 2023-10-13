/** @format */

import { apiUrl } from '@/contents/apiUrl';
import Echarts from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { power_change } from '@/contents/detail';
import Segmented from '@/packages/segmented';
import { useFilscanStore } from '@/store/FilscanStore';
import fetchData from '@/store/server';
import { getSvgIcon } from '@/svgsIcon';
import { formatDateTime, unitConversion, unitConversionNum } from '@/utils';
import { getColor, get_xAxis } from '@/utils/echarts';
import { useEffect, useMemo, useState } from 'react';
import { BrowserView, MobileView } from '@/components/device-detect';
import styles from './style.module.scss'
import classNames from 'classnames';
import { max } from 'lodash';
import useWindow from '@/components/hooks/useWindown';
export default ({ accountId,type }: { accountId?: string | string[],type:string}) => {
  const { theme, lang } = useFilscanStore();
  const { tr } = Translation({ ns: 'detail' });
  const [interval, setInterval] = useState('1m');
  const [options, setOptions] = useState<any>({});
  const [noShow, setNoShow] = useState<Record<string, boolean>>({});
  const [unit,setUnit] = useState('TiB')
  const {isMobile} = useWindow()
  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme,isMobile);
  }, [theme,isMobile]);

  const defaultOptions = useMemo(() => {
    return {
      grid: {
        top:  10,
        left: 20,
        right: '8%',
        bottom: 10,
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
            formatter: `{value} ${unit}`,
            textStyle: {
              //  fontSize: this.fontSize,
              color: isMobile ? color.mobileLabelColor : color.labelColor,
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

      tooltip: {
        trigger: 'axis',
        position: 'right',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(p: Array<any>) {
          let result = p[0].data.showTime;
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme,unit,isMobile]);

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
        account_type:type,
      },
    });
    let maxValue = 0;
    let unitNum = -1;
    ((result?.power_trend_by_account_id_list || [])).forEach((v:any) => {
      const { block_time, power, power_increase } = v;
      maxValue = Number(power) > maxValue ? Number(power):maxValue
    })

    if (maxValue) {
      const unit = unitConversion(maxValue, 4)?.split(' ')[1]
      setUnit(unit)
      unitNum= unitConversionNum(unit)
    }
    (result?.power_trend_by_account_id_list || []).forEach(
      (value: any) => {
        const { block_time, power, power_increase } = value;
        let showTime: string = '';
        showTime = formatDateTime(block_time, 'MM-DD HH:mm');
        timeData.push(showTime);
        //y轴
        const [powerValue, powerUnit] = power
          ? unitConversion(power, 4, unitNum||4).split(' ')
          : [];

        const [increaseValue, increaseUnit] = power_increase
          ? unitConversion(power_increase, 4, unitNum||4)?.split(' ')
          : [];
        //amount
        const [powerValue_amount, powerValue_unit] = power
          ? unitConversion(power, 5)?.split(' ')
          : [];
        const [power_increase_amount, power_increase_unit] = power_increase
          ? unitConversion(power_increase, 4)?.split(' ')
          : [];
        seriesObj.power.push({
          value: powerValue,
          unit: powerValue_unit,
          amount: powerValue_amount,
          showTime:formatDateTime(block_time, 'YYYY-MM-DD HH:mm')
        });
        seriesObj.power_increase.push({
          value: increaseValue,
          unit: power_increase_unit,
          amount: power_increase_amount,
          showTime:formatDateTime(block_time, 'YYYY-MM-DD HH:mm')
        });
      }
    );
    power_change.list.forEach((item: any) => {
      const { dataIndex, color, title } = item;
      legendData.push({
        dataIndex,
        color: color,
        title: title,
        type:item.type
      });
      seriesData.push({
        type: item.type,
        smooth: true,
        data: seriesObj[dataIndex],
        dataIndex,
        name: title,
        symbol: 'circle',
        barMaxWidth: '30',
        barMinWidth: '12',
        yAxisIndex:item.yIndex,
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

  const newOptions = useMemo(() => {
    const newSeries: any = [];
    (options?.series || []).forEach((seriesItem: any) => {
      if (!noShow[seriesItem?.dataIndex]) {
        newSeries.push(seriesItem);
      }
    });

    if (isMobile) {
      defaultOptions.grid.left = 0
    }

    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: options?.xData || [],
      },
      series: newSeries,
    };
  }, [options, default_xAxis, noShow, defaultOptions,isMobile]);

  const ledRender = ()=>{
    return <span className='flex gap-x-4'>
      {options?.legendData?.map((v: any) => {
        return (
          <span
            className='text-xs flex cursor-pointer items-center gap-x-1'
            key={v.dataIndex}
            onClick={() => {
              setNoShow({ ...noShow, [v.dataIndex]: !noShow[v.dataIndex] });
            }}
            style={{ color: noShow[v.dataIndex] ? '#d1d5db' : v.color }}>
            {getSvgIcon(v.type==='bar' ? 'barLegend':'legendIcon')}
            <span className='text-xs text_des font-normal'>
              {tr(v.title)}
            </span>
          </span>
        );
      })}
    </span>
  }

  return (
    <div className={classNames(styles['power-change'],'flex-1')}>
      <div className={classNames('flex justify-between items-center mb-2 mx-2.5 h-[32px]',styles.title)}>
        <div className={classNames(styles.between,'flex gpa-x-5 items-center')}>
          <span className={classNames('text-lg font-semibold mr-5',)}>
            {tr(power_change.title)}
          </span>
          {/* <Segmented
            data={power_change.tabList}
            ns='detail'
            defaultValue={interval}
            isHash={false}
            onChange={handleTabChange}
          /> */}
        </div>
        <BrowserView>{ledRender()}</BrowserView>
      </div>
      <div className={classNames('card_shadow w-full border rounded-xl p-2.5 pt-5 border_color',styles.chart)}>
        <MobileView>
          <div className="tips mb-2">
            {ledRender()}
          </div>
        </MobileView>
        <div className=' w-full h-[348px]'><Echarts options={newOptions} /></div>
      </div>
    </div>
  );
};
