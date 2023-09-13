/** @format */
import { apiUrl } from '@/contents/apiUrl';
import EChart from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { block_rewards, timeList } from '@/contents/statistic';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatDateTime, formatFil, formatFilNum, isMobile } from '@/utils';
import { getColor, get_xAxis, seriesChangeArea } from '@/utils/echarts';
import { useEffect, useMemo, useState } from 'react';
import styles from './trend.module.scss'
import classNames from 'classnames';
import useAxiosData from '@/store/useAxiosData';
import Segmented from '@/packages/segmented';

interface Props {
  origin?: string;
  className?: string;
}

export default (props: Props) => {
  const { className } = props;
  const { theme } = useFilscanStore();
  const { tr } = Translation({ ns: 'static' });
  const { axiosData } = useAxiosData()
  const [options, setOptions] = useState<any>({});
  const [interval,setInterval]= useState('24h')

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
      yAxis: {
        type: 'value',
        position: 'left',
        scale: true,
        nameTextStyle: {
          color: color.textStyle,
        },
        axisLabel: {
          formatter: '{value} FIL',
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
          show: true,
          lineStyle: {
            type: 'dashed',
            color: color.splitLine,
          },
        },
      },
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

  const load = async (time?: string) => {
    const seriesObj: any = {};
    block_rewards.list.forEach((v) => {
      seriesObj[v.dataIndex] = [];
    });
    const dateList:any = [];
    const seriesData: any = [];
    const inter = time || interval
    const result: any = await axiosData(apiUrl.static_block_trend, { interval:inter });
    result?.items?.forEach((value: any) => {
      const {
        block_time,
        acc_block_rewards, //合约交易
      } = value;
      const showTime = inter === '24h'?formatDateTime(block_time, 'HH:mm'):formatDateTime(block_time, 'MM-DD');
      dateList.push(showTime);
      //amount
      seriesObj.acc_block_rewards.push({
        value: formatFil(acc_block_rewards, 'FIL',2),
        amount:formatFilNum(acc_block_rewards, false,false,4,false).split(' ')[0],
        unit:'FIL'
      });
    });

    block_rewards.list.forEach((item: any) => {
      seriesData.push({
        type: item.type,
        ...seriesChangeArea,
        data: seriesObj[item.dataIndex],
        name: tr(item.title),
        symbol: 'circle',
        smooth: true,
        itemStyle: {
          color: item.color,
        },
        barMaxWidth: '30',
      });
    });
    setOptions({ series: seriesData, xData: dateList});
  };

  const newOptions = useMemo(() => {
    const newSeries: any = [];
    (options?.series || []).forEach((seriesItem: any) => {
      newSeries.push(seriesItem);
    });
    return {
      ...defaultOptions,
      xAxis: {
        ...default_xAxis,
        data: options?.xData || [],
      },
      series: newSeries,
    };
  }, [options, defaultOptions]);
  return (
    <div
      id='block_trend'
      className={classNames(styles.trend,`w-full h-[full]  ${className}`)}
    >
      <div className='flex-1 flex flex-row flex-wrap  justify-between items-center mb-4 mx-2.5' >
        <div className='min-w-[120px] w-fit font-PingFang font-semibold text-lg '>
          {tr('block_trend')}
        </div>
        <Segmented
          defaultValue={interval}
          data={timeList}
          ns='static'
          isHash={false}
          onChange={(value) => {
            setInterval(value);
            load(value)
          }}
        />
      </div>
      <div className={`h-[350px] w-full pb-2 card_shadow border border_color rounded-xl`}>
        <EChart options={newOptions} />
      </div>
    </div>
  );
};
