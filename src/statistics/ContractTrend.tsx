/** @format */
import { EvmTxsHistory, apiUrl } from '@/contents/apiUrl';
import EChart from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { contract_trend, power_trend, timeList } from '@/contents/statistic';
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
import Select from '@/packages/select';
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
  const [interval,setInterval]= useState('1m')

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
          formatter: '{value}',
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

  const load = async (time?:string) => {
    const seriesObj: any = {};
    contract_trend.list.forEach((v) => {
      seriesObj[v.dataIndex] = [];
    });
    const dateList: any = [];
    const seriesData: any = [];
    const inter = time || interval
    const result: any = await axiosData(EvmTxsHistory, { interval:inter });
    result?.points?.forEach((value: any) => {
      const {
        timestamp,
        txs_count, //合约交易
      } = value;
      const showTime = inter === '24h'?formatDateTime(timestamp, 'HH:mm'):formatDateTime(timestamp, 'MM-DD');
      dateList.push(showTime);
      //amount

      seriesObj.txs_count.push({
        amount: txs_count,
        value: txs_count,
        unit:'',
      });
    });

    contract_trend.list.forEach((item: any) => {
      seriesData.push({
        type: item.type,
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
      className={classNames(styles.trend,`w-full h-[full]  ${className} mt-20`)}
      ref={origin === 'home' ? ref : ''}
    >
      <div className='flex justify-between flex-wrap items-center min-h-[36px] mb-2.5'>
        <div className='flex-1 flex flex-row flex-wrap items-center'>
          <div className='min-w-[120px] w-fit font-PingFang font-semibold text-lg pl-2.5'>
            {tr('contract_trend')}
          </div>
        </div>
        <div>
          {origin === 'home' && (
            <>
              <MobileView>
                <Link href={`/statistics/charts#contract`}>
                  <Image
                    src={goMobile}
                    width={18}
                    height={18}
                    alt='go'
                  /></Link>
              </MobileView>
              <BrowserView>
                <div className='flex gap-x-4 items-center'>
                  <Select ns={'static'} key={`static_${origin}_contract`}
                    options={timeList} value={interval}
                    onChange={(interval) => { setInterval(interval); load(interval) }} />
                  <Link href={`/statistics/charts#contract`}>
                    <Image
                      className='cursor-pointer mr-2.5'
                      src={go}
                      width={18}
                      height={18}
                      alt='go'
                    />
                  </Link>
                </div>
              </BrowserView></>
          )}
        </div>
      </div>

      <div className={`h-[350px] w-full card_shadow border border_color pb-2 rounded-xl`}>
        <EChart options={newOptions} />
      </div>
    </div>
  );
};
