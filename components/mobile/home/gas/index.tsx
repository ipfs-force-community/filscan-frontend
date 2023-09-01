import styles from './style.module.scss';
import { observer } from 'mobx-react';
import EChart from '@/components/echarts';
import { useEffect, useMemo, useRef, useState } from 'react';
import BigNumber from 'bignumber.js';
import { useFilscanStore } from '@/store/FilscanStore';
import { getColor, get_xAxis, seriesArea } from '@/utils/echarts';
import useAxiosData from '@/store/useAxiosData';
import { useTranslation } from 'react-i18next';
import { formatFilNum } from '@/utils';
import { apiUrl } from '@/contents/apiUrl';
import StatisticsGas from '@/src/statistics/Gas';
import * as echarts from 'echarts';
import homeStore from '@/store/modules/home';
import dayjs from 'dayjs';

const showData: any = [
  {
    label: 'base_fee',
    type: 'line',
    unit: 'nanoFiL',
  },
];

const Gas = (props: any)=> {
  const { t } = useTranslation('home');
  const chartRef = useRef<HTMLDivElement>(null);
  const { axiosData } = useAxiosData();

  useEffect(()=>{
    homeStore.fetchFeeData().then(res=>{
      initChart()
    })
  },[])

  const initChart = ()=>{
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current as unknown as HTMLDivElement);
      const xAxis = homeStore.fee.map(n=>{
        return n.timestamp
      })
      const data = homeStore.fee.map(n=>{
        return n.base_fee
      })
      console.log(xAxis,'xxxxxxx');

      const option = {
        grid: {
          top: 20,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          data: xAxis,
          axisLabel: {
            formatter: function (value:string) {
              return dayjs(value).format("HH:ss");
            },
          },
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data,
            symbol: 'none',
            type: 'line'
          }
        ]
      };

      chart?.setOption(option);

      // const handleSize = () => {
      //   chart.resize();
      // };

      // window.addEventListener('resize', handleSize);
      // return () => {
      //   window.removeEventListener('resize', handleSize);
      // };
    }
  }

  return <div className={styles.gas}>
    <div className={styles['chart-header']}>
      <div className={styles.name}>{t('base_gas')}</div>
      <div>》</div>
    </div>
    <div ref={chartRef} className={styles.chart}></div>
  </div>;
}

export default observer(Gas);
