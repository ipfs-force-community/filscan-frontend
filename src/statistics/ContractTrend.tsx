/** @format */
import { EvmTxsHistory } from '@/contents/apiUrl';
import EChart from '@/components/echarts';
import { Translation } from '@/components/hooks/Translation';
import { contract_trend, timeList } from '@/contents/statistic';
import { useFilscanStore } from '@/store/FilscanStore';
import { formatDateTime } from '@/utils';
import { getColor, get_xAxis } from '@/utils/echarts';
import GoMobileIcon from '@/assets/images/icon-right-white.svg';
import GoIcon from '@/assets/images/black_go.svg';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useObserver from '@/components/hooks/useObserver';
import styles from './ContractTrend.module.scss'
import classNames from 'classnames';
import { BrowserView, MobileView } from '@/components/device-detect';
import useAxiosData from '@/store/useAxiosData';
import Select from '@/packages/select';
import useWindow from '@/components/hooks/useWindown';
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
  const {isMobile} = useWindow()
  const color = useMemo(() => {
    return getColor(theme);
  }, [theme]);

  const default_xAxis = useMemo(() => {
    return get_xAxis(theme,isMobile);
  }, [theme,isMobile]);

  const defaultOptions = useMemo(() => {
    let options = {
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
          margin:8,
          hideOverlap:true,
          textStyle: {
            //  fontSize: this.fontSize,
            color: isMobile ? color.mobileLabelColor : color.labelColor,
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
          return isMobile ? obj:undefined;
        },
        trigger: 'axis',
        backgroundColor: color.toolbox,
        borderColor: 'transparent',
        textStyle: {
          color: '#ffffff',
        },
        formatter(v: any) {
          var result = v[0].data.showTime;
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
    if (isMobile) {
      (options as any)['grid'] = {
        top:"8%",
        right:"12px",
        bottom:"16px",
        left: "12px",
        containLabel: true
      }
    }
    return options
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme,tr,isMobile]);

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
      let showTime = inter === '24h' ? formatDateTime(timestamp, 'HH:mm'):formatDateTime(timestamp, 'MM-DD HH:mm');
      if (isMobile) {
        showTime = formatDateTime(timestamp, 'MM-DD');
      }
      dateList.push(showTime);
      //amount

      seriesObj.txs_count.push({
        amount: txs_count,
        value: txs_count,
        showTime: formatDateTime(timestamp, 'YYYY-MM-DD HH:mm'),
        unit:'',
      });
    });

    contract_trend.list.forEach((item: any) => {
      seriesData.push({
        type: item.type,
        data: seriesObj[item.dataIndex],
        name: item.title,
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

  const propsRef = origin === 'home' ? { ref } : {}

  return (
    <div
      className={classNames(styles.trend, `w-full h-[full]  ${className} ${origin === 'home'?'mt-20':''}`)}
      {...propsRef}
    >
      <div className={classNames(`flex justify-between flex-wrap items-center min-h-[36px] mb-2.5 ${lang === 'en' ? 'h-[60px]':''}`,styles['title-wrap'])}>
        <div className='flex-1 flex flex-row flex-wrap items-center'>
          <div className={classNames('min-w-[120px] w-fit font-PingFang font-semibold text-lg pl-2.5',styles.title)}>
            {tr('contract_trend')}
          </div>
        </div>
        <BrowserView>
          <div className='flex gap-x-4 items-center mx-2.5'>
            <Select ns={'static'} key={`static_${origin}_contract`}
              options={timeList} value={interval}
              onChange={(interval) => { setInterval(interval); load(interval) }} />
          </div>
        </BrowserView>
        <div>
          {origin === 'home' && (
            <>
              <MobileView>
                <Link href={`/statistics/charts#fevm`}>
                  <GoMobileIcon
                    width={28}
                    height={28}
                  /></Link>
              </MobileView>
              {/* <BrowserView>
                <Link href={`/statistics/charts#fevm`}>
                  <GoIcon
                    className='cursor-pointer mr-2.5'
                    width={18}
                    height={18}
                  />
                </Link>
              </BrowserView> */}
            </>

          )}
        </div>
      </div>

      <div className={classNames(`h-[350px] w-full card_shadow border border_color pb-2 rounded-xl`,styles['chart-wrap'])}>
        <EChart options={newOptions} />
      </div>
    </div>
  );
};
